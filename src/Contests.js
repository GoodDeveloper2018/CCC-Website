import React from 'react';

function Contests() {
  return (
    <div className="page-container">
      <h1>Contests</h1>
      <div className="content">
        <h2>Upcoming Contests</h2>
        <div className="contests-container">
          {/* Add your contests list here */}
          <p>No upcoming contests at the moment.</p>
        </div>
        
        <h2>Past Contests</h2>
        <div className="past-contests">
          {/* Add past contests here */}
          <p>Archive of past contests coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default Contests;
