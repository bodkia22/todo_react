import NavBar from "../components/Navbar";
import CreateTaskForm from "../components/CreateTaskForm";
import WeeklyBoard from "../components/WeeklyBoard";


const TasksPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <div className="p-8">
        <CreateTaskForm />
        <WeeklyBoard />
      </div>
    </div>
  );
};

export default TasksPage;