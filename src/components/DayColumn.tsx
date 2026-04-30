import type { Task } from "../types/task";
import { isSameDay } from "../utils/date";
import TaskCard from "./TaskCard";
import { useDroppable } from '@dnd-kit/core'

interface DayColumnProps {
  date: Date;
  tasks: Task[];
}

const DayColumn = ({ date, tasks }: DayColumnProps) => {
  const dropId = `day-${date.toISOString()}`   // унікальний ID для дропа
  const { setNodeRef } = useDroppable({ id: dropId })

  const title = date.toLocaleDateString('en-US', { weekday: 'long' })
  const subtitle = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })  // "28 Apr"
  const isToday = isSameDay(date, new Date())

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-800 rounded-lg p-4 flex flex-col gap-2 ${isToday ? 'border-2 border-red-500' : ''}`}
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default DayColumn;