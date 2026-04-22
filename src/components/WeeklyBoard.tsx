import { useQuery, useQueryClient } from "@tanstack/react-query"
import Column from "./Column"
import type { Task } from "../types/task"
import { getTasksForCurrentUser, updateTask } from "../api/tasks"
import { DndContext, type DragEndEvent } from '@dnd-kit/core'

const WeeklyBoard = () => {
    const { data: tasks = [] } = useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: getTasksForCurrentUser
    })
    const queryClient = useQueryClient()

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return

        const taskId = active.id as number
        const dayIndex = over.id as number
        const newDate = getNextDateForDay(dayIndex)

        queryClient.setQueryData<Task[]>(['tasks'], (old) =>
            old?.map(task =>
                task.id === taskId ? { ...task, due_date: newDate ?? undefined } : task
            ) ?? []
        )

        await updateTask(taskId, { due_date: newDate })
        // invalidateQueries ВИДАЛИ
    }

    const tasksByDay = tasks.reduce((acc, task) => {
        if (!task.due_date) {
            acc[-1].push(task) // Todo — без дати
        } else {
            const day = new Date(task.due_date).getDay() // 0=Нд, 1=Пн...
            acc[day].push(task)
        }
        return acc
    }, { [-1]: [], 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] } as Record<number, Task[]>)

    return (
        <DndContext onDragEnd={handleDragEnd}>

            <div className="grid grid-cols-8 gap-4">
                <Column title="Todo" tasks={tasksByDay[-1]} dayIndex={-1} />
                <Column title="Monday" tasks={tasksByDay[1]} dayIndex={1} />
                <Column title="Tuesday" tasks={tasksByDay[2]} dayIndex={2} />
                <Column title="Wednesday" tasks={tasksByDay[3]} dayIndex={3} />
                <Column title="Thursday" tasks={tasksByDay[4]} dayIndex={4} />
                <Column title="Friday" tasks={tasksByDay[5]} dayIndex={5} />
                <Column title="Saturday" tasks={tasksByDay[6]} dayIndex={6} />
                <Column title="Sunday" tasks={tasksByDay[0]} dayIndex={0} />
            </div>
        </DndContext>

    )
}

export default WeeklyBoard;

const getNextDateForDay = (dayIndex: number): string | null => {
    if (dayIndex === -1) return null  // Todo — без дати

    const today = new Date()
    const currentDay = today.getDay()
    const daysUntil = (dayIndex - currentDay + 7) % 7 || 7
    const date = new Date(today)
    date.setDate(today.getDate() + daysUntil)
    return date.toISOString()
}