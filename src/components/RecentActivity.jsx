import '../App.css';

const RecentActivity = ({ tasks }) => {
    // Sort tasks by last updated (descending) and take top 5
    const recentTasks = [...tasks]
        .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
        .slice(0, 5);

    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    const getActivityType = (task) => {
        if (task.status === 'DONE') return 'completed';
        if (task.updatedAt === task.createdAt) return 'created';
        return 'updated';
    };

    return (
        <div className="card animate-fade-in" style={{ height: 'fit-content' }}>
            <h3 className="stats-title">Recent Activity</h3>

            <div className="activity-list">
                {recentTasks.length === 0 ? (
                    <p className="text-sm text-gray-500">No activity yet</p>
                ) : (
                    recentTasks.map(task => {
                        const type = getActivityType(task);
                        return (
                            <div key={task.id} className={`activity-item ${type}`}>
                                <div className="activity-text">
                                    <strong>{task.title}</strong>
                                    {type === 'created' && ' was created'}
                                    {type === 'updated' && ' was updated'}
                                    {type === 'completed' && ' was completed'}
                                </div>
                                <div className="activity-time">{formatTime(task.updatedAt || task.createdAt)}</div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
