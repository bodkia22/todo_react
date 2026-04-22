import type { Task } from '../types/task';
import TaskCard from './TaskCard';

interface Props {
    tasks: Task[];  // компонент приймає масив задач
}

const TaskList = ({ tasks }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;