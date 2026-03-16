import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TaskChart from "../components/TaskChart";
import { toast } from "react-hot-toast";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");
  const name= localStorage.getItem("name");

  // Fetch tasks
  const fetchTasks = async () => {
    try {

      const res = await api.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(res.data);

    } catch (error) {

      console.log(error);
      toast.error("Error fetching tasks");

    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {

    if (!title || !subject || !deadline) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      await api.post(
        "/api/tasks",
        { title, subject, deadline },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle("");
      setSubject("");
      setDeadline("");
      toast.success("Task added successfully");
      fetchTasks();

    } catch (error) {

      toast.error("Error adding task");

    }
  };

  // Delete task
  const deleteTask = async (id) => {

    try {

      await api.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Task deleted");

      fetchTasks();

    } catch (error) {

      toast.error("Error deleting task");

    }
  };

  // Complete task
  const completeTask = async (task) => {

    try {

      await api.put(
        `/api/tasks/${task.id}`,
        { ...task, status: "COMPLETED" },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("Task marked as completed");

      fetchTasks();

    } catch (error) {

      toast.error("Error updating task");

    }
  };

  // Statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;

  const pendingTasks = tasks.filter(
    (t) => t.status === "PENDING"
  ).length;

  const overdueTasks = tasks.filter(
    (t) => t.status === "OVERDUE"
  ).length;

  // Progress
  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // Search + Filter
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) =>
      filter === "ALL" || task.status === filter
    );

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        {/* Greeting */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Welcome back { name || "User"}👋
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date().toDateString()}
            </p>
          </div>

        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

          {/* Total Tasks */}

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition">

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Total Tasks
            </p>

            <h2 className="text-3xl font-bold text-blue-500 mt-2">
              {totalTasks}
            </h2>

          </div>
          {/* Pending */}

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition">

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
              {pendingTasks}
            </h2>

          </div>
          {/* Completed */}

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition">

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Completed
            </p>

            <h2 className="text-3xl font-bold text-green-500 mt-2">
              {completedTasks}
            </h2>

          </div>
          {/* Overdue */}

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition">

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Overdue
            </p>

            <h2 className="text-3xl font-bold text-red-500 mt-2">
              {overdueTasks}
            </h2>

          </div>

        </div>

        {/* Progress Bar */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">

          <h2 className="font-semibold mb-3 text-gray-800 dark:text-white">
            Task Completion Progress
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-4">

            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>

          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {progress}% completed
          </p>

        </div>

        {/* Add Task Button */}

        <div className="flex justify-end mb-6">

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Task
          </button>

        </div>

        {/* Search + Filter */}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

          {/* Search */}

          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-4 py-2 rounded-lg border border-gray-300 
            dark:border-gray-700 
            bg-white dark:bg-slate-800 
            text-gray-800 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Filter */}

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 
            dark:border-gray-700 
            bg-white dark:bg-slate-800 
            text-gray-800 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="ALL">All Tasks</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="OVERDUE">Overdue</option>

          </select>

        </div>

        {/* Loading */}

        {loading && (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Empty State */}

        {!loading && filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
            <p className="text-3xl mb-3">📭</p>
            <p className="text-lg font-semibold">No tasks Yet</p>
            <p className="text-sm mt-1">Click the "Add Task" button to create your first task!</p>
          </div>
        )}

        {/* TASK LIST + ANALYTICS */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

          {/* LEFT SIDE → TASK LIST */}
          <div className="lg:col-span-2">

            {filteredTasks.map((task) => (

                <div
                  key={task.id}
                  className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition mb-4"
                >

                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Subject: {task.subject}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Deadline: {task.deadline}
                  </p>

                  <div className="flex justify-between items-center mt-4">

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium
                      ${task.status === "COMPLETED"
                        ? "bg-green-100 text-green-600"
                        : task.status === "OVERDUE"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"}`}
                    >
                      {task.status}
                    </span>

                    <div className="flex gap-3">

                      {task.status !== "COMPLETED" && (
                        <button
                          onClick={() => completeTask(task)}
                          className="text-green-600 hover:underline text-sm"
                        >
                          Complete
                        </button>
                      )}

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:underline text-sm"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

          </div>


          {/* RIGHT SIDE → ANALYTICS */}

          <div>

            {tasks.length > 0 && (

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">

                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  Task Analytics
                </h2>

                <TaskChart tasks={tasks} />

              </div>

            )}

          </div>

        </div>
       </div>

      {/* Add Task Modal */}

      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">

            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Create New Task
            </h2>

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border p-2 rounded w-full mb-3"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="date"
              className="border p-2 rounded w-full mb-4"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />

            <div className="flex justify-between">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  addTask();
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create Task
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;