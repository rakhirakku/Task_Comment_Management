import React, { useState, useEffect } from 'react';
import './CommentForm.scss';
import { fetchComments, postComment } from '../../../api'; // Corrected import path

const CommentForm = ({ taskId }) => {
  // State for form inputs
  const [author_name, setName] = useState(""); // Author name input
  const [content, setComment] = useState(""); // Comment content input
  const [comments, setComments] = useState([]); // State to store all comments
  const [error, setError] = useState(null); // State for error handling
  const [popupVisible, setPopupVisible] = useState(false); // State for success popup visibility

  // Fetch comments when the component mounts or taskId changes
  useEffect(() => {
    if (!taskId) {
      console.error('Task ID is missing');
      return; // Early return if taskId is not provided
    }

    const getComments = async () => {
      try {
        const data = await fetchComments(taskId); // Fetch comments by task ID
        setComments(data || []); // Update comments state with fetched data
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("Failed to fetch comments."); // Display error if fetching fails
      }
    };

    getComments(); // Call the function to fetch comments
  }, [taskId]);

  // Handle form submission for adding a new comment
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Validate input fields
    if (author_name && content) {
      try {
        const newComment = { author_name, content, taskId }; // Prepare new comment data
        const savedComment = await postComment(newComment); // Post new comment to API

        // Add the saved comment to the current comments list
        setComments((prevComments) => [...prevComments, savedComment]);

        // Clear input fields after successful submission
        setName("");
        setComment("");

        // Show success popup
        setPopupVisible(true);

        // Hide the popup after 3 seconds
        setTimeout(() => {
          setPopupVisible(false);
        }, 3000);
      } catch (err) {
        console.error("Error submitting comment:", err);
        setError("Failed to submit comment."); // Display error if submission fails
      }
    }
  };

  return (
    <>
      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Success Popup */}
      {popupVisible && (
        <div className="popup-success">
          <p>Comment added successfully!</p>
        </div>
      )}

      {/* Comment Form */}
      <form className="comment-form" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="col-12 col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            value={author_name}
            onChange={(e) => setName(e.target.value)} // Update author_name state
            placeholder="Name"
            required // Make input required
          />
        </div>

        {/* Comment Input */}
        <div className="col-12 col-md-4 mb-4">
          <textarea
            className="form-control"
            id="text-area"
            placeholder="Please add a comment"
            rows="3"
            value={content}
            onChange={(e) => setComment(e.target.value)} // Update content state
            required // Make input required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-secondary px-4 mt-2 mb-4">
          Submit
        </button>
      </form>

      <hr />

      {/* Comments Section */}
      <h4>Comments</h4>
      <ul className="comment-list mt-4">
        {comments && comments.length > 0 ? (
          comments.map((commentItem, index) => (
            <li key={index}>
              {/* Display author name */}
              <span className="author-name">{commentItem.author_name}</span>
              {/* Display comment content */}
              <p className="comment-content">{commentItem.content}</p>
            </li>
          ))
        ) : (
          <p>No comments yet.</p> // Fallback message for empty comments
        )}
      </ul>
    </>
  );
};

export default CommentForm;
