/* eslint-disable react/prop-types */
const List = ({ todos }) => {
  const sort = todos.sort((a, b) => a.hour - b.hour);
  return (
    <>
      <div className="scroll-container">
        <ul className="todo-items">
          {todos.length === 0 && (
            <div className="empty-event">no hay eventos</div>
          )}
          {sort.map((todo, index) => (
            <li
              key={index}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <span className="todo-text">{todo.text}</span>
              <span>
                {todo.date} - {new Date(todo.hour).toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default List;
