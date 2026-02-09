import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import DashboardStats from '../components/DashboardStats';
import RecentActivity from '../components/RecentActivity';
import { useAuth } from '../context/AuthContext';
import { getAllTasks, deleteTask } from '../services/taskService';

const UserDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const loadTasks = async () => {
        setLoading(true);
        try {
            const data = await getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error("Failed to load tasks", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(taskId);
            await loadTasks();
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const [statusFilter, setStatusFilter] = useState('ALL');

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="app-container">
            <header className="page-header">
                <div>
                    <h1 className="page-title">My Tasks</h1>
                    <p className="text-gray-500">Welcome, {user?.username}</p>
                </div>
                <div className="flex gap-4 items-center">
                    <button onClick={handleLogout} className="btn btn-outline btn-sm">
                        Logout
                    </button>
                </div>
            </header>

            <div className="dashboard-grid animate-fade-in">
                <main className="dashboard-main">
                    {/* Controls Section */}
                    <div className="toolbar-container">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="form-select"
                            style={{ width: 'auto' }}
                        >
                            <option value="ALL">All Status</option>
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                        <Link to="/create" className="btn btn-primary">
                            + New Task
                        </Link>
                    </div>

                    {/* Task List */}
                    {loading ? (
                        <div className="loading-spinner">Loading your tasks...</div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="empty-state">
                            <h3>No tasks found</h3>
                            <p>{searchQuery ? 'Try a different search term' : 'Create a new task to get started!'}</p>
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
                </main>

                <aside className="dashboard-sidebar">
                    <DashboardStats tasks={tasks} />
                    <RecentActivity tasks={tasks} />
                </aside>
            </div>
        </div>
    );
};

export default UserDashboard;
