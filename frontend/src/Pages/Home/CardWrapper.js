import React from "react";
import CardComponent from "./TaskCard"; // Import TaskCard component to render individual task cards

export const CardWrapper = ({ tasks, pagination, onPageChange }) => {
  const { current_page, last_page, prev_page_url, next_page_url } = pagination || {}; // Destructure pagination data

  // If there are no tasks, display an empty state message
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks match the selected filters.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Task Cards Listing */}
      <div className="col-12 card-wrapper">
        {tasks.map((task) => (
          <CardComponent
            key={task.id}  // Use task ID as the key for rendering cards
            id={task.id}  // Pass task ID as a prop to TaskCard
            status={task.status}  // Pass task status as a prop
            title={task.title}  // Pass task title as a prop
            date={task.due_date}  // Pass task due date as a prop
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        {/* Previous Page Button */}
        <button 
          className="btn btn-secondary" 
          disabled={!prev_page_url} 
          onClick={() => onPageChange(prev_page_url)} 
          aria-label="Previous Page"
        >
          Previous
        </button>

        {/* Display current page and total pages */}
        <span>
          Page {current_page} of {last_page}
        </span>

        {/* Next Page Button */}
        <button 
          className="btn btn-secondary" 
          disabled={!next_page_url} 
          onClick={() => onPageChange(next_page_url)} 
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardWrapper;

