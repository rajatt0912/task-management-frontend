import { Link } from 'react-router-dom';
import '../App.css'; // Verify this path. If App.css is in src/, use '../App.css' if in pages/

const Home = () => {
    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="logo">TaskMaster</div>
                <div className="nav-links">
                    <Link to="/login" className="nav-link">Login</Link>
                </div>
            </nav>

            <main className="hero-section animate-fade-in">
                <h1 className="hero-title">Organize your work, <br /> Amplify your productivity.</h1>
                <p className="hero-subtitle">
                    The simple, effective way to manage tasks for teams and individuals.
                </p>

                <div className="cta-group">
                    <Link to="/login?role=user" className="btn btn-primary btn-lg">
                        Login as User
                    </Link>
                    <Link to="/login?role=admin" className="btn btn-outline btn-lg">
                        Login as Admin
                    </Link>
                </div>
            </main>

        </div>
    );
};

export default Home;
