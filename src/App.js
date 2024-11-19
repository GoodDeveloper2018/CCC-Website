import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Resources from './Resources';
import Lessons from './Lessons';
import CCCLeaderBoard from './CCCLeaderBoard';
import Problems from './Problems';
import Contests from './Contests';

function App() {
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

// Simple Home component
function Home() {
  return (
    <div className="page-container">
      <h1>Welcome to BTHS Competitive Coding Club</h1>
      <p>Explore programming challenges, contests, and resources to enhance your competitive programming skills.</p>
    </div>
  );
}

export default App;
