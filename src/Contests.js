import React from 'react';

function Contests() {
  const upcomingContests = [
    {
      name: "USACO December Contest",
      date: "December 15-18, 2023",
      details: "First Contest of 2023-2024 Season"
    },
    {
      name: "USACO January Contest",
      date: "January 26-29, 2024",
      details: "Second Contest of 2023-2024 Season"
    },
    {
      name: "USACO February Contest",
      date: "February 16-19, 2024",
      details: "Third Contest of 2023-2024 Season"
    },
    {
      name: "USACO US Open",
      date: "March 15-18, 2024",
      details: "Final Contest of 2023-2024 Season"
    }
  ];

  const specialEvents = [
    {
      name: "USACO Training Camp",
      date: "May 23 - June 1, 2024",
      details: "Invitation-only training camp for top performers"
    },
    {
      name: "EGOI",
      date: "July 21-27, 2024",
      location: "The Netherlands",
      details: "European Girls' Olympiad in Informatics"
    },
    {
      name: "IOI",
      date: "September 1-8, 2024",
      location: "Egypt",
      details: "International Olympiad in Informatics"
    }
  ];

  return (
    <div className="page-container">
      <h1>USACO Contests Schedule 2023-2024</h1>
      
      <div className="important-notice">
        <h3>Important Notice for Platinum Contestants</h3>
        <p>
          USA students wishing to receive a certified score in the platinum contest 
          must start Saturday at 12:00 ET, when platinum problems will be first released.
        </p>
      </div>

      <div className="content">
        <h2>Regular Contest Schedule</h2>
        <div className="contests-container">
          {upcomingContests.map((contest, index) => (
            <div key={index} className="contest-card">
              <h3>{contest.name}</h3>
              <div className="contest-info">
                <span className="date">📅 {contest.date}</span>
                <p>{contest.details}</p>
              </div>
            </div>
          ))}
        </div>
        
        <h2>Special Events</h2>
        <div className="special-events">
          {specialEvents.map((event, index) => (
            <div key={index} className="contest-card special">
              <h3>{event.name}</h3>
              <div className="contest-info">
                <span className="date">📅 {event.date}</span>
                {event.location && <span className="location">📍 {event.location}</span>}
                <p>{event.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contests;
