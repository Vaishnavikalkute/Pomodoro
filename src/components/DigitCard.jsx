// REACT LESSON 2: Components
// Components are reusable pieces of UI. This is a "functional component".
// It's just a JavaScript function that returns JSX (HTML-like syntax).

// REACT LESSON 3: Props
// Props are how you pass data to components. Like function parameters.
// Here, we receive a 'digit' prop and display it.

function DigitCard({ digit }) {
  // RESPONSIVE DESIGN: Different sizes for mobile, tablet, laptop
  // sm: = small screens (640px+)
  // md: = medium screens (768px+)
  // lg: = large screens (1024px+)
  return (
    <div className="w-20 h-28 sm:w-32 sm:h-40 md:w-40 md:h-52 lg:w-48 lg:h-60 mx-0.5 sm:mx-1 md:mx-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700 flex items-center justify-center">
      <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tabular-nums">
        {digit}
      </span>
    </div>
  );
}

// Export so other files can import and use this component
export default DigitCard;
