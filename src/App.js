import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './firebase';
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Resources from './Resources';
import Lessons from './Lessons';
import CCCLeaderBoard from './CCCLeaderBoard';
import Problems from './Problems';
import Contests from './Contests';

function App() {
  const [user] = useAuthState(auth);

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with GitHub:", error);
    });
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-logo">BTHS CCC</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/problems">Problems</Link></li>
            <li><Link to="/contests">Contests</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/archived-lessons">Archived Lessons</Link></li>
          </ul>
          <div className="auth-section">
            {!user ? (
              <button className="auth-btn github" onClick={signInWithGithub}>
                <i className="fab fa-github"></i> Sign in with GitHub
              </button>
            ) : (
              <div className="user-nav-profile">
                <img src={user.photoURL} alt="Profile" className="nav-profile-pic" />
                <span className="user-name">{user.displayName}</span>
                <button className="auth-btn signout" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/leaderboard" element={<CCCLeaderBoard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/archived-lessons" element={<Lessons />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="page-container">
      <h1>Welcome to BTHS Competitive Coding Club</h1>
      <p>Explore programming challenges, contests, and resources to enhance your competitive programming skills.</p>
    </div>
  );
}

export default App;
