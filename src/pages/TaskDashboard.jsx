import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import DashboardStats from '../components/DashboardStats';
import RecentActivity from '../components/RecentActivity';
import { useAuth } from '../context/AuthContext';
import { getAllTasks, deleteTask } from '../services/taskService';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();

  const loadTasks = async () => {
    setLoading(true);
    const data = await getAllTasks();
    setTasks(data);
    setLoading(false);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
      await loadTasks();
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Task Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.username} ({user?.role})</p>
        </div>
        <div className="flex gap-4">
          {user?.role === 'admin' && (
            <span className="badge badge-done" style={{ marginRight: '1rem' }}>Admin Mode</span>
          )}
          <button onClick={logout} className="btn btn-outline btn-sm">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-grid animate-fade-in">
        <div className="dashboard-main">
          {/* Controls Section */}
          <div className="flex justify-between items-center gap-4 flex-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <Link to="/create" className="btn btn-primary">
              + New Task
            </Link>
          </div>

          {/* Task List */}
          {loading ? (
            <div className="loading-spinner">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <h3>No tasks found</h3>
              <p>{searchQuery ? 'Try a different search term' : 'Create your first task to get started!'}</p>
            </div>
          ) : (
            <div className="task-list">
              {filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusUpdate={loadTasks}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-sidebar">
          <DashboardStats tasks={tasks} />
          <RecentActivity tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
