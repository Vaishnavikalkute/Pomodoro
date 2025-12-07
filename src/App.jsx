// REACT LESSON 14: Parent Component (State Management)
// App is the parent that manages all the state and passes it down to children
// This is called "single source of truth" - one place holds the data

import { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Calendar from './components/Calendar';

function App() {
  // REACT LESSON 15: Managing State at the Top Level
  // We store sessions and showCalendar here because multiple components need them
  const [sessions, setSessions] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Load sessions from localStorage when app starts
  useEffect(() => {
    const savedSessions = localStorage.getItem('pomodoroSessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  // REACT LESSON 16: Callback Functions
  // Functions we pass to child components so they can communicate with parent
  const handleSessionComplete = (session) => {
    const updatedSessions = [...sessions, session]; // Spread operator creates new array
    setSessions(updatedSessions);
    localStorage.setItem('pomodoroSessions', JSON.stringify(updatedSessions));
    addToGoogleCalendar(session);
  };

  const handleDeleteSession = (id) => {
    const updatedSessions = sessions.filter(s => s.id !== id);
    setSessions(updatedSessions);
    localStorage.setItem('pomodoroSessions', JSON.stringify(updatedSessions));
  };

  const addToGoogleCalendar = (session) => {
    const startDate = new Date(session.completedAt);
    const endDate = new Date(startDate.getTime() + session.duration * 60000);

    const formatDateForGoogle = (date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const title = encodeURIComponent(`${session.title} (${session.type})`);
    const details = encodeURIComponent(`Completed a ${session.duration} minute ${session.type} session`);
    const dates = `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}`;
    window.open(googleCalendarUrl, '_blank', 'width=600,height=600');
  };

  // REACT LESSON 17: Component Composition
  // We compose our app by combining smaller components
  // Each component has a specific job (Timer, Calendar, etc.)
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Calendar Toggle Button - Responsive */}
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 px-4 py-2 sm:px-6 sm:py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg sm:rounded-xl transition-all duration-200 text-xs sm:text-sm md:text-base"
      >
        {showCalendar ? 'Timer' : 'Calendar'} ({sessions.length})
      </button>

      {/* REACT LESSON 18: Conditional Rendering with && */}
      {/* condition && <Component /> means "only show if condition is true" */}
      {!showCalendar && (
        <Timer onSessionComplete={handleSessionComplete} />
      )}

      {showCalendar && (
        <Calendar
          sessions={sessions}
          onDelete={handleDeleteSession}
          onAddToCalendar={addToGoogleCalendar}
        />
      )}
    </div>
  );
}

export default App;
