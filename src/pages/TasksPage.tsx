import NavBar from "../components/Navbar";
import CreateTaskForm from "../components/CreateTaskForm";
import WeeklyBoard from "../components/WeeklyBoard";


const TasksPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <NavBar />
            <CreateTaskForm />
            <WeeklyBoard />
        </div>
    );
};

export default TasksPage;