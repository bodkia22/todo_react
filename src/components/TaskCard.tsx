import type { Task } from '../types/task';
import { deleteTask } from '../api/tasks';
import { useQueryClient } from '@tanstack/react-query';
import { useDraggable } from '@dnd-kit/core'

interface Props {
    task: Task;
}

const TaskCard = ({ task }: Props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id
    })

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : undefined

    const queryClient = useQueryClient()

    const handleDeleteTask = async () => {
        await deleteTask(task.id)
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
    };

    return (
        <div className="bg-gray-800 rounded-xl p-5 flex flex-col gap-3 hover:bg-gray-750 
        transition-colors border border-gray-700"
            ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className="flex items-start justify-between">
                <h2 className="text-white font-semibold text-base">{task.title}</h2>
                <button
                    onClick={handleDeleteTask} onPointerDown={(e) => e.stopPropagation()}
                    className="text-gray-500 hover:text-red-400 transition-colors text-lg leading-none"
                >
                    ✕
                </button>
            </div>
            <p className="text-gray-400 text-sm">{task.description}</p>
            <div className="flex items-center justify-between mt-1">
                <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 0 ? 'bg-gray-700 text-gray-400' :
                    task.priority === 1 ? 'bg-yellow-900 text-yellow-400' :
                        'bg-red-900 text-red-400'
                    }`}>
                    {task.priority === 0 ? 'Low' : task.priority === 1 ? 'Medium' : 'High'}
                </span>
            </div>
        </div>
    );
};

export default TaskCard;