import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Mock data for analytics
    const stats = {
        totalTasks: 120,
        completedTasks: 85,
        pendingTasks: 35,
        users: 15
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="app-container">
            <header className="page-header">
                <div>
                    <h1 className="page-title">Admin Dashboard</h1>
                    <p className="text-gray-500">Welcome, {user?.username}</p>
                </div>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                    Logout
                </button>
            </header>

            <main className="dashboard-grid animate-fade-in">
                <section className="dashboard-main">
                    <h2 className="section-title">Overview</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3 className="stat-label">Total Tasks</h3>
                            <p className="stat-value">{stats.totalTasks}</p>
                        </div>
                        <div className="stat-card success">
                            <h3 className="stat-label">Completed</h3>
                            <p className="stat-value">{stats.completedTasks}</p>
                        </div>
                        <div className="stat-card warning">
                            <h3 className="stat-label">Pending</h3>
                            <p className="stat-value">{stats.pendingTasks}</p>
                        </div>
                        <div className="stat-card info">
                            <h3 className="stat-label">Active Users</h3>
                            <p className="stat-value">{stats.users}</p>
                        </div>
                    </div>

                    <div className="charts-container mt-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                        {/* Pie Chart: Pending vs Done */}
                        <div className="chart-card">
                            <h3 className="card-title">Task Status Distribution</h3>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                                <div className="circular-chart" style={{
                                    '--percent': `${(stats.completedTasks / stats.totalTasks) * 360}deg`,
                                    '--success': '#10B981'
                                }}>
                                    <div className="chart-text">
                                        <span className="chart-percent">{Math.round((stats.completedTasks / stats.totalTasks) * 100)}%</span>
                                        <span className="chart-label">Done</span>
                                    </div>
                                </div>
                                <div className="stats-legend">
                                    <div className="legend-item">
                                        <span className="legend-count" style={{ color: '#10B981' }}>{stats.completedTasks}</span>
                                        <span className="legend-label">Done</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-count" style={{ color: '#6B7280' }}>{stats.pendingTasks}</span>
                                        <span className="legend-label">Pending</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bar Chart: Tasks per User (Mock) */}
                        <div className="chart-card">
                            <h3 className="card-title">Tasks per User</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                                {[
                                    { name: 'Alice', count: 12, color: '#4F46E5' },
                                    { name: 'Bob', count: 8, color: '#3B82F6' },
                                    { name: 'Charlie', count: 15, color: '#10B981' },
                                    { name: 'Dave', count: 5, color: '#F59E0B' },
                                    { name: 'Eve', count: 10, color: '#8B5CF6' }
                                ].map((user) => (
                                    <div key={user.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                        <div style={{
                                            flex: 1,
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center'
                                        }}>
                                            <div style={{
                                                width: '60%',
                                                height: `${(user.count / 15) * 100}%`,
                                                backgroundColor: user.color,
                                                borderRadius: '4px 4px 0 0',
                                                transition: 'height 0.3s ease'
                                            }}></div>
                                        </div>
                                        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#6B7280', fontWeight: '500' }}>{user.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
