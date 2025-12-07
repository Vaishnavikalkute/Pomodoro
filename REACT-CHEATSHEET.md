# React Cheat Sheet - Quick Reference

## 🎯 The 3 Core Hooks

### useState - Store data that changes
```jsx
const [count, setCount] = useState(0);

// Update state
setCount(5);                    // Set to value
setCount(count + 1);            // Update based on current
setCount(prev => prev + 1);     // Update based on previous (safer)
```

### useEffect - Do things after render
```jsx
// Run once on mount
useEffect(() => {
  console.log('Component mounted');
}, []);

// Run when 'count' changes
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);

// Cleanup
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);  // Runs on unmount
}, []);
```

### useRef - Remember values without re-rendering
```jsx
const inputRef = useRef(null);
const countRef = useRef(0);

// Access DOM element
<input ref={inputRef} />
inputRef.current.focus();

// Store mutable value
countRef.current = countRef.current + 1;  // Doesn't cause re-render
```

## 📦 Components

### Functional Component
```jsx
function MyComponent() {
  return <div>Hello!</div>;
}

export default MyComponent;
```

### Component with Props
```jsx
function Greeting({ name, age }) {
  return <div>Hello {name}, you are {age}</div>;
}

// Usage
<Greeting name="John" age={25} />
```

## 🎨 JSX Syntax

### Variables in JSX
```jsx
const name = "John";
return <div>{name}</div>;  // Use curly braces for JavaScript
```

### Conditional Rendering
```jsx
// Ternary operator
{isLoggedIn ? <Dashboard /> : <Login />}

// AND operator
{isLoggedIn && <Dashboard />}

// If-else with variable
let content;
if (isLoggedIn) {
  content = <Dashboard />;
} else {
  content = <Login />;
}
return <div>{content}</div>;
```

### Lists
```jsx
const items = ['Apple', 'Banana', 'Orange'];

// Map array to components
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}

// With objects (better keys)
const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
{users.map(user => (
  <div key={user.id}>{user.name}</div>
))}
```

### Styling
```jsx
// Class names
<div className="bg-blue-500 text-white">Hello</div>

// Inline styles (object)
<div style={{ color: 'red', fontSize: '20px' }}>Hello</div>

// Dynamic classes
<div className={isActive ? 'active' : 'inactive'}>Hello</div>
<div className={`base-class ${isActive ? 'active' : ''}`}>Hello</div>
```

## 🎛️ Event Handling

```jsx
// Click
<button onClick={() => console.log('Clicked!')}>Click</button>
<button onClick={handleClick}>Click</button>  // Function reference

// Input change
<input onChange={(e) => setText(e.target.value)} />

// Form submit
<form onSubmit={(e) => {
  e.preventDefault();  // Important!
  handleSubmit();
}}>
```

## 📝 Forms

### Controlled Input
```jsx
const [text, setText] = useState('');

<input
  type="text"
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

### Multiple Inputs
```jsx
const [form, setForm] = useState({ name: '', email: '' });

<input
  name="name"
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>
```

## 🔄 Props vs State

| Props | State |
|-------|-------|
| Passed from parent | Managed within component |
| Read-only | Can be updated |
| Like function parameters | Like local variables |

```jsx
// Props (passed down)
<Child name="John" age={25} />

function Child({ name, age }) {
  return <div>{name} is {age}</div>;
}

// State (managed internally)
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## 🔝 Lifting State Up

When multiple components need the same state, move it to their parent:

```jsx
// Parent holds state
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Display count={count} />
      <Controls onIncrement={() => setCount(count + 1)} />
    </>
  );
}

// Child displays data
function Display({ count }) {
  return <div>Count: {count}</div>;
}

// Child triggers changes via callback
function Controls({ onIncrement }) {
  return <button onClick={onIncrement}>+</button>;
}
```

## 🚨 Common Patterns

### Toggle boolean
```jsx
const [isOpen, setIsOpen] = useState(false);
setIsOpen(!isOpen);              // Toggle
setIsOpen(prev => !prev);        // Toggle (safer)
```

### Update array
```jsx
const [items, setItems] = useState([]);

// Add item
setItems([...items, newItem]);

// Remove item
setItems(items.filter(item => item.id !== id));

// Update item
setItems(items.map(item =>
  item.id === id ? { ...item, name: 'New Name' } : item
));
```

### Update object
```jsx
const [user, setUser] = useState({ name: '', age: 0 });

// Update property
setUser({ ...user, name: 'John' });

// Update nested
setUser({ ...user, address: { ...user.address, city: 'NYC' } });
```

## 🎯 Quick Tips

1. **Always use the dependency array in useEffect**
   ```jsx
   useEffect(() => { ... }, [dependency]);  // ✅ Good
   useEffect(() => { ... });                // ⚠️ Runs on every render
   ```

2. **Don't mutate state directly**
   ```jsx
   items.push(newItem);        // ❌ Bad
   setItems([...items, newItem]);  // ✅ Good
   ```

3. **Use functional updates for state that depends on previous**
   ```jsx
   setCount(count + 1);        // ❌ Can be stale
   setCount(prev => prev + 1); // ✅ Always correct
   ```

4. **Keys must be unique and stable**
   ```jsx
   {items.map(item => <div key={item.id}>)}  // ✅ Good
   {items.map((item, i) => <div key={i}>)}   // ⚠️ Avoid
   ```

5. **Event handlers get event object**
   ```jsx
   onChange={(e) => console.log(e.target.value)}
   ```

## 🚀 Start Building!

```bash
# Create new component
// components/MyComponent.jsx
import { useState } from 'react';

function MyComponent() {
  const [state, setState] = useState(initialValue);

  return <div>Your JSX here</div>;
}

export default MyComponent;

# Use in App
import MyComponent from './components/MyComponent';

<MyComponent prop1="value" prop2={123} />
```
