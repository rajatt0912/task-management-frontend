import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskById, updateTask } from '../services/taskService';

const EditTask = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignedTo: '',
        status: 'TODO',
        dueDate: ''
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                // Determine if getTaskById is async or sync based on mock
                // Assuming it might need to find from array
                const task = await getTaskById(parseInt(id));
                if (task) {
                    setFormData(task);
                } else {
                    alert('Task not found');
                    navigate('/user/dashboard');
                }
            } catch (error) {
                console.error("Error fetching task", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTask(parseInt(id), formData);
        navigate('/user/dashboard');
    };

    if (loading) return <div className="loading-spinner">Loading task details...</div>;

    return (
        <div className="app-container form-container animate-fade-in">
            <h1 className="page-title" style={{ marginBottom: 'var(--space-6)' }}>Edit Task</h1>
            <form onSubmit={handleSubmit} className="card">
                <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Assigned To *</label>
                    <input
                        type="text"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Status *</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Due Date *</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/user/dashboard')}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;
