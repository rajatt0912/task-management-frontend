import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressBadge from './ProgressBadge';
import { updateTaskStatus } from '../services/taskService';

const TaskCard = ({ task, onStatusUpdate, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOverdue = () => {
    if (task.status === 'DONE') return false;
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today;
  };

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    await updateTaskStatus(task.id, newStatus);
    setIsUpdating(false);
    onStatusUpdate();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await onDelete(task.id);
      setIsDeleting(false);
    }
  };

  const getButtonClass = (statusType) => {
    const isActive = task.status === statusType;
    let baseClass = "btn btn-sm";

    if (isActive) {
      if (statusType === 'TODO') return `${baseClass} btn-secondary`;
      if (statusType === 'IN_PROGRESS') return `${baseClass} btn-primary`;
      if (statusType === 'DONE') return `${baseClass} btn-success`;
    }

    return `${baseClass} btn-outline`;
  };

  return (
    <div className={`card task-card ${isOverdue() ? 'border-danger' : ''}`}>
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <ProgressBadge status={task.status} />
      </div>

      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}

      {isOverdue() && (
        <div className="overdue-badge">
          ⚠️ OVERDUE
        </div>
      )}

      <div className="task-meta">
        <div className="task-meta-item">
          <strong>Assigned to:</strong> {task.assignedTo}
        </div>
        <div className="task-meta-item">
          <strong>Due:</strong> {task.dueDate}
        </div>
      </div>

      <div className="task-actions" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleStatusChange('TODO')}
            disabled={isUpdating || isDeleting || task.status === 'TODO'}
            className={getButtonClass('TODO')}
          >
            TODO
          </button>
          <button
            onClick={() => handleStatusChange('IN_PROGRESS')}
            disabled={isUpdating || isDeleting || task.status === 'IN_PROGRESS'}
            className={getButtonClass('IN_PROGRESS')}
          >
            IN PROGRESS
          </button>
          <button
            onClick={() => handleStatusChange('DONE')}
            disabled={isUpdating || isDeleting || task.status === 'DONE'}
            className={getButtonClass('DONE')}
          >
            DONE
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link to={`/edit/${task.id}`} className="btn btn-sm btn-outline">
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting || isUpdating}
            className="btn btn-sm btn-outline"
            style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
