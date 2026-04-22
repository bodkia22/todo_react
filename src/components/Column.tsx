import type { Task } from "../types/task";
import TaskCard from "./TaskCard";
import { useDroppable } from '@dnd-kit/core'

interface ColumnProps {
    title: string;
    tasks: Task[];
    dayIndex: number;
}

const Column = ({ title, tasks, dayIndex }: ColumnProps) => {
    const { setNodeRef } = useDroppable({
        id: dayIndex  // унікальний id колонки
    })

    return (
        <div ref={setNodeRef} className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}

        </div>
    );
}

export default Column;