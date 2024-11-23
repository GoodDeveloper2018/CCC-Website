import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

function CCCLeaderBoard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('totalPoints', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDocs(q);
      const leaderboardData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <h1>CCC Leaderboard</h1>
      <div className="content">
        {loading ? (
          <div className="loading">Loading leaderboard...</div>
        ) : (
          <div className="leaderboard-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Total Points</th>
                  <th>Problems Solved</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr key={user.id} className={index < 3 ? 'top-three' : ''}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="user-info">
                        <img src={user.photoURL} alt="" className="user-avatar" />
                        <span>{user.displayName}</span>
                      </div>
                    </td>
                    <td>{user.totalPoints}</td>
                    <td>{user.problemsSolved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CCCLeaderBoard;
