import NavBar from "../components/Navbar";
import CreateTaskForm from "../components/CreateTaskForm";
import WeeklyBoard from "../components/WeeklyBoard";
import Modal from "../components/Modal";
import { useState } from "react";

const TasksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <div className="p-8">
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mb-6 transition-colors">
          Create New Task
        </button>
        <WeeklyBoard />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CreateTaskForm onTaskCreated={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default TasksPage;