import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/taskService';

const CreateTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'TODO',
    dueDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(formData);
    navigate('/');
  };

  return (
    <div className="app-container form-container animate-fade-in">
      <h1 className="page-title" style={{ marginBottom: 'var(--space-6)' }}>Create New Task</h1>
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
            placeholder="Enter task title"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Enter task description"
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
            placeholder="Enter assignee name"
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
            Create Task
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
