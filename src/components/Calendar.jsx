// REACT LESSON 12: Passing Functions as Props
// We receive onDelete and onAddToCalendar functions from parent
// This is called "lifting state up" - parent manages data, children trigger actions

function Calendar({ sessions, onDelete, onAddToCalendar }) {
  return (
    <div className="w-full max-w-4xl px-4 sm:px-0">
      <h2 className="text-2xl sm:text-3xl font-light text-gray-100 mb-6 sm:mb-8 text-center">
        Pomodoro History
      </h2>

      {/* REACT LESSON 13: Conditional Rendering with Ternary */}
      {/* condition ? whenTrue : whenFalse */}
      {sessions.length === 0 ? (
        <p className="text-gray-500 text-center text-sm sm:text-base md:text-lg px-4">
          No completed sessions yet. Start a timer to track your work!
        </p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {/* .slice().reverse() creates a reversed copy without mutating original */}
          {sessions.slice().reverse().map((session) => (
            <div
              key={session.id}
              className="bg-gray-900 border border-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:border-gray-700 transition-all duration-200 gap-3 sm:gap-0"
            >
              <div className="flex-1">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1">
                  {session.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {session.type} • {session.duration} min • {session.date} •{' '}
                  {new Date(session.completedAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onAddToCalendar(session)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-all duration-200 text-xs sm:text-sm"
                >
                  Add to Cal
                </button>
                <button
                  onClick={() => onDelete(session.id)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-lg transition-all duration-200 text-xs sm:text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calendar;
