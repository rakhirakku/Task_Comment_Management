import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegClock, FaStarHalfAlt } from "react-icons/fa";
import "./TaskDetails.scss";
import CommentForm from "./CommentForm/CommentForm";
import { fetchTaskDetails } from "../../api"; // Import the API call

const CardDetails = () => {
  const { id } = useParams(); // Extract task ID from the URL parameters

  // State to hold task details
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    date: "",
    status: "",
    description: "",
  });

  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch task details when the component mounts or when the task ID changes
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true); // Start loading
        const data = await fetchTaskDetails(id); // Call the API with the task ID
        setTaskDetails(data || {}); // Update task details or fallback to an empty object
      } catch (error) {
        console.error("Error fetching task data:", error);
        setError(error.message); // Update error state with the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchDetails();
  }, [id]);

  // Handle loading state
  if (loading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error: {error}</div>;

  // Helper function to format date and time
  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Render task details and comments
  return (
    <main className="content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12 task-details-wrap">
            {/* Task Title */}
            <h1 className="heading">{taskDetails.title}</h1>

            {/* Task Details Table */}
            <table>
              <tbody>
                <tr>
                  <th>
                    <FaRegClock /> Created At
                  </th>
                  <td>{formatDateAndTime(taskDetails.created_at)}</td>
                </tr>
                <tr>
                  <th>
                    <FaStarHalfAlt /> Status
                  </th>
                  <td>
                    <span className="status">{taskDetails.status}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Task Description */}
            <h4 className="mt-4">Description</h4>
            <p>{taskDetails.description}</p>

            {/* Comment Form Section */}
            <h6 className="mt-4">Add Comment</h6>
            <CommentForm taskId={id} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CardDetails;
