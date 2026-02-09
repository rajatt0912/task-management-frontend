const ProgressBadge = ({ status }) => {
  const getBadgeClass = () => {
    switch (status) {
      case 'TODO':
        return 'badge-todo';
      case 'IN_PROGRESS':
        return 'badge-progress';
      case 'DONE':
        return 'badge-done';
      default:
        return 'badge-todo';
    }
  };

  const getStatusText = () => {
    return status.replace('_', ' ');
  };

  return (
    <span className={`badge ${getBadgeClass()}`}>
      {getStatusText()}
    </span>
  );
};

export default ProgressBadge;
