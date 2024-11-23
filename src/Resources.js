import React from 'react';

function Resources() {
  const handleBookClick = () => {
    window.open('https://darrenyao.com/usacobook/cpp.pdf#page=12', '_blank');
  };

  const handleDSClick = () => {
    window.open('https://usaco.guide/bronze/intro-ds?lang=cpp', '_blank');
  };

  const handleAlgoClick = () => {
    window.open('https://www.geeksforgeeks.org/top-algorithms-and-data-structures-for-competitive-programming/', '_blank');
  };

  const handlePracticeClick = () => {
    window.open('https://usaco.guide/problems/', '_blank');
  };

  return (
    <div className="page-container">
      <h1>Learning Resources</h1>
      <div className="content">
        <h2>Competitive Programming Resources</h2>
        <ul>
          <li onClick={handleAlgoClick} style={{ cursor: 'pointer' }}>Algorithm Tutorials</li>
          <li onClick={handleDSClick} style={{ cursor: 'pointer' }}>Data Structures Guide</li>
          <li onClick={handlePracticeClick} style={{ cursor: 'pointer' }}>Practice Platforms</li>
          <li onClick={handleBookClick} style={{ cursor: 'pointer' }}>Recommended Books</li>
        </ul>
      </div>
    </div>
  );
}

export default Resources;
