import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, updateDoc, increment, arrayUnion, getDoc, setDoc } from 'firebase/firestore';

function Problems() {
  const [problems, setProblems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('beginner');
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const categories = {
    beginner: { name: 'Beginner Problems', rating: [800, 1200] },
    intermediate: { name: 'Intermediate Challenges', rating: [1200, 1800] },
    advanced: { name: 'Advanced Algorithms', rating: [1800, 2400] }
  };

  const problemTypes = [
    'implementation',
    'math',
    'strings',
    'data structures',
    'dp',
    'greedy',
    'brute force',
    'number theory',
    'graphs',
    'binary search'
  ];

  useEffect(() => {
    fetchProblems();
  }, [selectedCategory, selectedTag]);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://codeforces.com/api/problemset.problems');
      const { problems } = response.data.result;
      
      // Filter problems based on rating range and selected tag
      const filteredProblems = problems.filter(problem => {
        const rating = problem.rating || 0;
        const { rating: [minRating, maxRating] } = categories[selectedCategory];
        const matchesRating = rating >= minRating && rating <= maxRating;
        
        // If a tag is selected, check if the problem has that tag
        if (selectedTag) {
          return matchesRating && problem.tags.includes(selectedTag);
        }
        return matchesRating;
      });

      setProblems(filteredProblems.slice(0, 20));
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
    setLoading(false);
  };

  const handleProblemSolved = async (problem) => {
    if (!user) {
      alert('Please sign in to track your progress');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // Create new user document if it doesn't exist
        await setDoc(userRef, {
          displayName: user.displayName,
          photoURL: user.photoURL,
          totalPoints: 0,
          problemsSolved: 0,
          solvedProblems: []
        });
      }

      // Check if problem was already solved
      if (userDoc.exists() && userDoc.data().solvedProblems.includes(problem.contestId + problem.index)) {
        alert('You have already solved this problem!');
        return;
      }

      // Update user's stats
      await updateDoc(userRef, {
        totalPoints: increment(problem.rating || 0),
        problemsSolved: increment(1),
        solvedProblems: arrayUnion(problem.contestId + problem.index)
      });

      alert('Problem marked as solved! Points added to your total.');
    } catch (error) {
      console.error('Error updating solved problems:', error);
      alert('Error updating your progress');
    }
  };

  return (
    <div className="page-container">
      <h1>Practice Problems</h1>
      <div className="problem-categories">
        {Object.entries(categories).map(([key, value]) => (
          <button
            key={key}
            className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(key)}
          >
            {value.name}
          </button>
        ))}
      </div>

      <div className="content">
        <div className="problem-types">
          <button
            className={`tag-btn ${selectedTag === null ? 'active' : ''}`}
            onClick={() => setSelectedTag(null)}
          >
            All Types
          </button>
          {problemTypes.map(type => (
            <button
              key={type}
              className={`tag-btn ${selectedTag === type ? 'active' : ''}`}
              onClick={() => setSelectedTag(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading problems...</div>
        ) : (
          <div className="problems-list">
            {problems.length > 0 ? (
              problems.map((problem) => (
                <div key={`${problem.contestId}-${problem.index}`} className="problem-card">
                  <h3>{problem.name}</h3>
                  <div className="problem-info">
                    <span className="rating">Rating: {problem.rating || 'Unrated'}</span>
                    <div className="tags">
                      {problem.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="solve-btn"
                  >
                    Solve Problem
                  </a>
                  {user && (
                    <button
                      className="solve-btn"
                      onClick={() => handleProblemSolved(problem)}
                    >
                      Mark as Solved
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="no-problems">
                No problems found for the selected criteria
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Problems;
