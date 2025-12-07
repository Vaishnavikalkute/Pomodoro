// REACT LESSON 4: useState Hook
// Hooks are special functions that let you use React features.
// useState lets you add state (data that can change) to your component.

import { useState, useEffect, useRef } from 'react';
import DigitCard from './DigitCard';
import Separator from './Separator';

function Timer({ onSessionComplete }) {
  // REACT LESSON 5: State
  // useState returns [currentValue, functionToUpdateValue]
  // When state changes, React re-renders the component
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('');
  const [currentLabel, setCurrentLabel] = useState('Focus Time');

  // REACT LESSON 6: useRef Hook
  // useRef creates a mutable value that persists across re-renders
  // Unlike state, changing it doesn't cause re-renders
  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);

  const presets = [
    { label: 'Focus Time', minutes: 25 },
    { label: 'Deep Work', minutes: 45 },
    { label: 'Extended Focus', minutes: 55 },
    { label: 'Power Session', minutes: 90 }
  ];

  // REACT LESSON 7: useEffect Hook
  // useEffect runs side effects (code that affects things outside React)
  // The empty array [] means "run once when component mounts"
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    // Cleanup function - runs when component unmounts
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []); // Empty dependency array = run once on mount

  // This useEffect runs whenever isRunning or timeLeft changes
  // The array [isRunning, timeLeft] is the "dependency array"
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            playBeeps();
            if (sessionTitle.trim()) {
              onSessionComplete({
                id: Date.now(),
                title: sessionTitle,
                type: currentLabel,
                duration: presets.find(p => p.label === currentLabel)?.minutes || 25,
                completedAt: new Date().toISOString(),
                date: new Date().toLocaleDateString()
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, sessionTitle, currentLabel, onSessionComplete]);

  const playBeeps = () => {
    const playBeep = (delay) => {
      setTimeout(() => {
        const context = audioContextRef.current;
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);

        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.3);
      }, delay);
    };

    playBeep(0);
    playBeep(500);
    playBeep(1000);
  };

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      minutes: String(mins).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0')
    };
  };

  const { minutes, seconds } = formatTime(timeLeft);
  const [min1, min2] = minutes.split('');
  const [sec1, sec2] = seconds.split('');

  // REACT LESSON 8: Event Handlers
  // Functions that run when user interacts with UI
  const selectPreset = (preset) => {
    setIsRunning(false);
    setCurrentLabel(preset.label);
    setTimeLeft(preset.minutes * 60);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    const currentPreset = presets.find(p => p.label === currentLabel);
    if (currentPreset) {
      setTimeLeft(currentPreset.minutes * 60);
    }
  };

  const saveToGoogleCalendar = () => {
    if (!sessionTitle.trim()) {
      alert('Please enter a session title first!');
      return;
    }

    const currentPreset = presets.find(p => p.label === currentLabel);
    const now = new Date();
    const startDate = now;
    const endDate = new Date(startDate.getTime() + (currentPreset?.minutes || 25) * 60000);

    const formatDateForGoogle = (date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const title = encodeURIComponent(`${sessionTitle} (${currentLabel})`);
    const details = encodeURIComponent(`Completed a ${currentPreset?.minutes || 25} minute ${currentLabel} session`);
    const dates = `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}`;
    window.open(googleCalendarUrl, '_blank', 'width=600,height=600');
  };

  // REACT LESSON 9: Conditional Rendering
  // You can use JavaScript conditions to show/hide elements
  return (
    <div className={`w-full flex flex-col items-center ${isRunning ? 'md:justify-center' : ''}`}>
      {/* RESPONSIVE: Hide title and input when timer is running on mobile */}
      <h1 className={`text-2xl sm:text-3xl md:text-4xl font-light text-gray-400 mb-4 sm:mb-6 md:mb-8 ${isRunning ? 'hidden md:block' : ''}`}>
        {currentLabel}
      </h1>

      {/* REACT LESSON 10: Controlled Components */}
      {/* Input value is controlled by React state */}
      <input
        type="text"
        value={sessionTitle}
        onChange={(e) => setSessionTitle(e.target.value)} // Update state on every keystroke
        placeholder="What are you working on?"
        className={`mb-6 sm:mb-8 md:mb-12 px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 w-full max-w-xs sm:max-w-md text-center ${isRunning ? 'hidden md:block' : ''}`}
      />

      {/* FULLSCREEN TIMER on mobile when running */}
      <div className={`flex items-center justify-center ${isRunning ? 'mb-8 sm:mb-12 md:mb-16' : 'mb-8 sm:mb-12 md:mb-16'}`}>
        <DigitCard digit={min1} />
        <DigitCard digit={min2} />
        <Separator />
        <DigitCard digit={sec1} />
        <DigitCard digit={sec2} />
      </div>

      {/* Show session title above timer when running on mobile */}
      {isRunning && (
        <p className="md:hidden text-gray-400 text-center mb-8 px-4 text-sm">
          {sessionTitle}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 w-full max-w-xs sm:max-w-none justify-center px-4 sm:px-0">
        <button
          onClick={toggleTimer}
          disabled={!sessionTitle.trim()}
          className={`px-8 sm:px-12 py-3 sm:py-4 font-medium rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base ${
            sessionTitle.trim()
              ? 'bg-white hover:bg-gray-100 text-black cursor-pointer'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-8 sm:px-12 py-3 sm:py-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base"
        >
          Reset
        </button>
      </div>

      <div className={`mb-8 sm:mb-12 md:mb-16 w-full max-w-xs sm:max-w-none px-4 sm:px-0 flex justify-center ${isRunning ? 'hidden md:flex' : ''}`}>
        <button
          onClick={saveToGoogleCalendar}
          disabled={!sessionTitle.trim()}
          className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 font-medium rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
            sessionTitle.trim()
              ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17 3h-2V2a1 1 0 00-2 0v1H7V2a1 1 0 00-2 0v1H3a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm0 14H3V8h14v9z"/>
          </svg>
          Save to Google Calendar
        </button>
      </div>

      {/* REACT LESSON 11: Lists and Keys */}
      {/* When rendering lists, each item needs a unique 'key' prop */}
      <div className={`grid grid-cols-2 sm:flex sm:flex-wrap md:flex-nowrap gap-2 sm:gap-4 w-full max-w-xs sm:max-w-lg md:max-w-none justify-center px-4 sm:px-0 ${isRunning ? 'hidden md:flex' : ''}`}>
        {presets.map((preset) => (
          <button
            key={preset.label} // Unique key helps React track which items changed
            onClick={() => selectPreset(preset)}
            className={`px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-xs sm:text-sm md:text-base ${
              currentLabel === preset.label
                ? 'bg-white text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {preset.minutes} min
          </button>
        ))}
      </div>
    </div>
  );
}

export default Timer;
