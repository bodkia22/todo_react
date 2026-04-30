import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { Task } from "../types/task"
import { getTasksForCurrentUser, updateTask } from "../api/tasks"
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import TodoColumn from "./TodoColumn"
import DayColumn from "./DayColumn"
import { useState } from "react"
import WeekNavigator from "./WeekNavigator"
import { addDays, dateKey, getMonday, getWeekDates } from "../utils/date"

const WeeklyBoard = () => {
  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasksForCurrentUser
  })

  const [currentWeekStart, setCurrentWeekStart] = useState(() => getMonday(new Date()))

  const queryClient = useQueryClient()

  const weekDates = getWeekDates(currentWeekStart)

  // групуємо задачі: без дати — окремо, з датою — у мапу за рядковим ключем дати
  const tasksWithoutDate: Task[] = []
  const tasksByDate: Record<string, Task[]> = {}

  for (const task of tasks) {
    if (!task.due_date) {
      tasksWithoutDate.push(task)
    } else {
      const key = dateKey(new Date(task.due_date))
      if (!tasksByDate[key]) tasksByDate[key] = []
      tasksByDate[key].push(task)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const taskId = active.id as number
    const dropId = over.id as string

    let newDate: string | null = null
    if (dropId.startsWith('day-')) {
      newDate = dropId.replace('day-', '')        // ISO-рядок
    }
    // якщо dropId === 'todo' → newDate лишається null

    queryClient.setQueryData<Task[]>(['tasks'], (old) =>
      old?.map(task =>
        task.id === taskId ? { ...task, due_date: newDate ?? undefined } : task
      ) ?? []
    )

    await updateTask(taskId, { due_date: newDate })
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <WeekNavigator
        weekStart={currentWeekStart}
        onPrevious={() => setCurrentWeekStart(prev => addDays(prev, -7))}
        onToday={() => setCurrentWeekStart(getMonday(new Date()))}
        onNext={() => setCurrentWeekStart(prev => addDays(prev, 7))}
      />
      <div className="grid grid-cols-8 gap-4">
        <TodoColumn tasks={tasksWithoutDate} />
        {weekDates.map(date => (
          <DayColumn
            key={date.toISOString()}
            date={date}
            tasks={tasksByDate[dateKey(date)] ?? []}
          />
        ))}
      </div>
    </DndContext>
  )
}

export default WeeklyBoard