import '../App.css';

const DashboardStats = ({ tasks }) => {
    const totalTasks = tasks.length;
    const doneTasks = tasks.filter(t => t.status === 'DONE').length;
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const todoTasks = tasks.filter(t => t.status === 'TODO').length;

    const percentDone = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

    return (
        <div className="stats-card animate-fade-in">
            <h3 className="stats-title">Task Completion</h3>

            <div className="stats-chart-container">
                <div
                    className="circular-chart"
                    style={{ '--percent': `${percentDone * 3.6}deg` }}
                >
                    <div className="chart-text">
                        <span className="chart-percent">{percentDone}%</span>
                        <span className="chart-label">Done</span>
                    </div>
                </div>

                <div className="stats-legend">
                    <div className="legend-item">
                        <span className="legend-count" style={{ color: '#4B5563' }}>{todoTasks}</span>
                        <span className="legend-label">To Do</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-count" style={{ color: '#1E40AF' }}>{inProgressTasks}</span>
                        <span className="legend-label">In Progress</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-count" style={{ color: '#065F46' }}>{doneTasks}</span>
                        <span className="legend-label">Done</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
