# Pomodoro Timer - Learn React in 1 Hour

This project teaches you all the React basics you need to know!

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## 📚 React Concepts Covered (18 Lessons)

### **Lesson 1: Entry Point** (`src/main.jsx`)
- How React apps start
- `ReactDOM.createRoot()` and `.render()`
- Connecting React to HTML

### **Lesson 2: Components** (`src/components/DigitCard.jsx`)
- What are components?
- Functional components
- Reusable UI pieces

### **Lesson 3: Props** (`src/components/DigitCard.jsx`)
- Passing data to components
- Destructuring props
- Using props in JSX

### **Lesson 4: useState Hook** (`src/components/Timer.jsx`)
- Adding state to components
- How state updates trigger re-renders
- Array destructuring `[value, setValue]`

### **Lesson 5: State** (`src/components/Timer.jsx`)
- What is state?
- When to use state
- Multiple state variables

### **Lesson 6: useRef Hook** (`src/components/Timer.jsx`)
- Mutable values that don't cause re-renders
- Accessing DOM elements
- Persisting values across renders

### **Lesson 7: useEffect Hook** (`src/components/Timer.jsx`)
- Side effects in React
- Dependency arrays
- Cleanup functions
- Component lifecycle

### **Lesson 8: Event Handlers** (`src/components/Timer.jsx`)
- onClick, onChange events
- Passing functions to event handlers
- Updating state from events

### **Lesson 9: Conditional Rendering** (`src/components/Timer.jsx`)
- Showing/hiding elements
- Ternary operators
- && operator for conditionals

### **Lesson 10: Controlled Components** (`src/components/Timer.jsx`)
- Form inputs controlled by React state
- value + onChange pattern
- Real-time state updates

### **Lesson 11: Lists and Keys** (`src/components/Timer.jsx`)
- Rendering arrays with `.map()`
- Why keys are important
- Unique keys for list items

### **Lesson 12: Passing Functions as Props** (`src/components/Calendar.jsx`)
- Parent-child communication
- Callback props
- Lifting state up

### **Lesson 13: Conditional Rendering with Ternary** (`src/components/Calendar.jsx`)
- `condition ? whenTrue : whenFalse`
- Empty states
- Alternative UI patterns

### **Lesson 14: Parent Component** (`src/App.jsx`)
- Top-level state management
- Single source of truth
- Organizing component hierarchy

### **Lesson 15: Managing State at Top Level** (`src/App.jsx`)
- When to lift state up
- Sharing state between components
- State vs Props

### **Lesson 16: Callback Functions** (`src/App.jsx`)
- Passing functions down
- Child-to-parent communication
- Event bubbling up

### **Lesson 17: Component Composition** (`src/App.jsx`)
- Building apps from smaller pieces
- Component responsibility
- Separation of concerns

### **Lesson 18: Conditional Rendering with &&** (`src/App.jsx`)
- Short-circuit evaluation
- `condition && <Component />`
- Toggle visibility

## 📂 Project Structure

```
pomodoro-react/
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
└── src/
    ├── main.jsx            # Entry point
    ├── App.jsx             # Main app component
    ├── index.css           # Global styles
    └── components/
        ├── Timer.jsx       # Timer component
        ├── Calendar.jsx    # Calendar/history component
        ├── DigitCard.jsx   # Single digit display
        └── Separator.jsx   # Colon separator

```

## 🎯 Key React Patterns You'll Learn

### 1. **Component-Based Architecture**
Break UI into reusable pieces:
- `DigitCard` - Single digit display
- `Timer` - Complete timer with controls
- `Calendar` - Session history
- `App` - Orchestrates everything

### 2. **State Management**
```jsx
const [count, setCount] = useState(0);
setCount(count + 1); // Update state
```

### 3. **Props Flow**
```jsx
// Parent passes data down
<Timer onComplete={handleComplete} />

// Child receives and uses it
function Timer({ onComplete }) {
  // Use onComplete
}
```

### 4. **Side Effects**
```jsx
useEffect(() => {
  // Runs after render
  const timer = setInterval(() => {}, 1000);

  // Cleanup
  return () => clearInterval(timer);
}, [dependency]); // Runs when dependency changes
```

### 5. **Controlled Forms**
```jsx
<input
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

## 🔥 Features You Built

1. ✅ Timer with multiple presets (25, 45, 55, 90 min)
2. ✅ Start/Pause/Reset controls
3. ✅ Session title input
4. ✅ Audio alerts when timer completes
5. ✅ Save to Google Calendar
6. ✅ Local session history
7. ✅ Delete sessions
8. ✅ Persistent storage (localStorage)

## 🎨 Technologies Used

- **React 18** - UI library
- **Vite** - Build tool (super fast!)
- **Tailwind CSS** - Utility-first CSS
- **Web Audio API** - Sound effects
- **localStorage** - Data persistence

## 💡 Next Steps to Practice

1. **Add a custom duration input**
   - Learn about form handling
   - Practice validation

2. **Add statistics**
   - Calculate total time studied
   - Count sessions per day
   - Practice with .reduce() and data manipulation

3. **Add themes**
   - Light/dark mode toggle
   - Learn about context API
   - Global state management

4. **Add animations**
   - Learn React Spring or Framer Motion
   - Animate timer transitions

5. **Add sound options**
   - Let users choose alert sounds
   - Practice with audio files

## 📖 Study Guide (1 Hour Plan)

### **Minutes 0-15: Setup & Structure**
- Read through the file structure
- Understand how files connect
- Run `npm install` and `npm run dev`

### **Minutes 15-30: Core Concepts**
- Study Lessons 1-6 (Components, Props, State, Hooks)
- Play with useState in Timer.jsx
- Try changing initial values

### **Minutes 30-45: Advanced Patterns**
- Study Lessons 7-12 (useEffect, Events, Conditionals)
- Understand the timer countdown logic
- See how data flows from child to parent

### **Minutes 45-60: Practice**
- Try adding a new preset button
- Change the timer display colors
- Add a new feature (like a pause count)

## 🐛 Common Mistakes to Avoid

1. **Mutating state directly**
   ```jsx
   // ❌ Wrong
   sessions.push(newSession);

   // ✅ Right
   setSessions([...sessions, newSession]);
   ```

2. **Missing dependencies in useEffect**
   ```jsx
   // ❌ Wrong - missing dependency
   useEffect(() => {
     console.log(count);
   }, []);

   // ✅ Right
   useEffect(() => {
     console.log(count);
   }, [count]);
   ```

3. **Forgetting keys in lists**
   ```jsx
   // ❌ Wrong
   items.map(item => <div>{item}</div>)

   // ✅ Right
   items.map(item => <div key={item.id}>{item}</div>)
   ```

## 🎓 You Now Know React!

After this project, you understand:
- ✅ How React apps are structured
- ✅ Components and JSX
- ✅ Props and state
- ✅ The 3 main hooks (useState, useEffect, useRef)
- ✅ Event handling
- ✅ Conditional rendering
- ✅ Lists and keys
- ✅ Parent-child communication
- ✅ Side effects and cleanup

**You're ready to build your own React apps!** 🚀
