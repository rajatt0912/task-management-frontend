import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css'; // Ensure we have access to styles

const Login = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam === 'admin' || roleParam === 'user') {
            setRole(roleParam);
        }
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim()) {
            setError('Username is required');
            return;
        }

        if (role === 'admin' && adminPassword !== 'admin123') {
            setError('Invalid Admin Password');
            return;
        }

        login(username, role);

        if (role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/user/dashboard');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card animate-fade-in">
                <div className="text-left mb-4">
                    <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-primary mb-2">
                        &larr; Back to Home
                    </button>
                </div>
                <h1 className="login-title">OnlyTasks</h1>
                <p className="login-subtitle">Login to your {role} account</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <div className="role-selector">
                            <label className={`role-option ${role === 'user' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    value="user"
                                    checked={role === 'user'}
                                    onChange={() => setRole('user')}
                                />
                                User
                            </label>
                            <label className={`role-option ${role === 'admin' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    value="admin"
                                    checked={role === 'admin'}
                                    onChange={() => setRole('admin')}
                                />
                                Admin
                            </label>
                        </div>
                    </div>

                    {role === 'admin' ? (
                        <div className="form-group animate-slide-down">
                            <label className="form-label">Admin Password</label>
                            <input
                                type="password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                className="form-input"
                                placeholder="Enter admin password (admin123)"
                            />
                        </div>
                    ) : (
                        <div className="form-group animate-slide-down">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Enter any password"
                            />
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn btn-primary btn-block">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
