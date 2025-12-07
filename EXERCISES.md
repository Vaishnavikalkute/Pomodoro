# React Practice Exercises

Complete these exercises to master React fundamentals! Start with Easy and work your way up.

## 🟢 Easy Exercises (15 minutes)

### Exercise 1: Add a Break Timer
Add a "5 min Break" preset button.

**Hint:** Look at the `presets` array in `Timer.jsx`
```jsx
{ label: 'Break Time', minutes: 5 }
```

### Exercise 2: Change Colors
Change the timer card colors from gray to blue.

**Hint:** Look at `DigitCard.jsx`, change `from-gray-800` to `from-blue-800`

### Exercise 3: Add Total Sessions Counter
Display total completed sessions below the Calendar button.

**Hint:** Add this in `App.jsx`:
```jsx
<p className="text-gray-500">Total Sessions: {sessions.length}</p>
```

## 🟡 Medium Exercises (20 minutes)

### Exercise 4: Add Session Description
Add a textarea for users to write notes about what they accomplished.

**Steps:**
1. Add state: `const [description, setDescription] = useState('')`
2. Add textarea in `Timer.jsx`:
```jsx
<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="What did you accomplish?"
/>
```
3. Save it in the session object
4. Display it in Calendar

### Exercise 5: Add Pause Count
Track how many times user paused the timer.

**Hint:**
```jsx
const [pauseCount, setPauseCount] = useState(0);

// In toggleTimer:
if (isRunning) {
  setPauseCount(pauseCount + 1);
}
```

### Exercise 6: Add Sound Toggle
Add a button to mute/unmute the beep sound.

**Steps:**
1. Add state: `const [isMuted, setIsMuted] = useState(false)`
2. Add button to toggle it
3. Check `isMuted` before calling `playBeeps()`

## 🔴 Hard Exercises (25 minutes)

### Exercise 7: Statistics Dashboard
Create a new component that shows:
- Total time studied today
- Total time studied this week
- Most productive day
- Average session length

**Hint:** Use `.reduce()` to calculate totals:
```jsx
const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
```

### Exercise 8: Custom Timer Duration
Let users enter a custom duration (e.g., 17 minutes).

**Steps:**
1. Add input for custom minutes
2. Validate input (1-180 minutes)
3. Add "Start Custom" button
4. Set timer to custom duration

### Exercise 9: Timer Progress Bar
Add a visual progress bar that shows how much time is left.

**Steps:**
1. Calculate percentage: `(timeLeft / totalTime) * 100`
2. Create a div with dynamic width:
```jsx
<div className="w-full bg-gray-800 h-2 rounded">
  <div
    className="bg-blue-500 h-2 rounded transition-all"
    style={{ width: `${percentage}%` }}
  />
</div>
```

### Exercise 10: Local Storage for Settings
Save user preferences (like mute setting, favorite preset).

**Steps:**
1. Save to localStorage when settings change
2. Load from localStorage on mount
3. Provide a "Reset Settings" button

## 🚀 Challenge Exercises (Advanced)

### Exercise 11: Dark/Light Theme Toggle
Implement a theme switcher.

**Hint:** Use Context API or simple state:
```jsx
const [theme, setTheme] = useState('dark');
<div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
```

### Exercise 12: Export to CSV
Add a button to export session history as CSV file.

**Hint:**
```jsx
const exportToCSV = () => {
  const csv = sessions.map(s =>
    `${s.title},${s.duration},${s.date}`
  ).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pomodoro-sessions.csv';
  a.click();
};
```

### Exercise 13: Keyboard Shortcuts
Add keyboard shortcuts:
- Space: Start/Pause
- R: Reset
- 1-4: Select presets

**Hint:** Use `useEffect` with keyboard event listener:
```jsx
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === ' ') toggleTimer();
    if (e.key === 'r') resetTimer();
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

### Exercise 14: Animations
Add smooth animations when timer reaches 0.

**Hint:** Add CSS animation:
```jsx
<div className={timeLeft === 0 ? 'animate-pulse' : ''}>
```

Or use state to trigger:
```jsx
const [isComplete, setIsComplete] = useState(false);

// When timer hits 0:
setIsComplete(true);
setTimeout(() => setIsComplete(false), 3000);
```

### Exercise 15: Recurring Sessions
Let users create recurring Pomodoro sessions (daily/weekly).

**This is complex! Break it down:**
1. Add "Make Recurring" checkbox
2. Add "Repeat" dropdown (Daily, Weekly, etc.)
3. Store recurring sessions separately
4. Show upcoming sessions
5. Create actual sessions when due

## 📝 Mini Projects

### Project 1: Pomodoro Streak Tracker
Track consecutive days of using Pomodoro.
- Count current streak
- Show longest streak
- Display streak calendar
- Award badges for milestones

### Project 2: Team Pomodoro
Multiple users can share sessions.
- Add username field
- Filter sessions by user
- Show leaderboard
- Display team statistics

### Project 3: Integration with Other Apps
- Sync with Todoist/Trello tasks
- Post to Slack when session completes
- Create calendar events automatically
- Track productivity in Notion

## 🎯 How to Practice

1. **Pick one exercise**
2. **Plan it out** - Write steps before coding
3. **Try it yourself** - No looking at solutions first
4. **Get stuck?** - That's learning! Research the topic
5. **Make it work** - Even if ugly at first
6. **Refactor** - Clean up your code
7. **Move to next** - Build momentum!

## 💡 Learning Path

**Week 1:** Easy exercises (build confidence)
**Week 2:** Medium exercises (learn patterns)
**Week 3:** Hard exercises (challenge yourself)
**Week 4:** Challenge exercises (master React)
**Month 2:** Mini projects (build portfolio)

## 🏆 You're Ready!

After completing these exercises, you'll know:
- ✅ Components inside and out
- ✅ State management patterns
- ✅ Side effects and lifecycle
- ✅ Form handling
- ✅ Data manipulation
- ✅ Real-world patterns
- ✅ How to debug React apps

**Now go build amazing things!** 🚀
