import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardIcon from '../../Paper.png';
import { fetchTaskDetails } from '../../api'; // Import the API function to fetch task details
const CardComponent = ({ id }) => {
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch task details when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchTaskDetails(id); // Fetch task details by ID
        setTaskDetails(data); // Set the task details in state
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Handle card click
  const handleCardClick = () => {
    console.log("Navigating to task details for id:", id);
    navigate(`/card-details/${id}`);// Navigate to the card details page
  };

  // Loading state
  if (loading) return <div>Loading task details...</div>;

  // Error state
  if (error) return <div>Error: {error.message}</div>;
  // Destructure the task details
  const { title, status, due_date: date } = taskDetails;

  // Render the card with task details
  return (
    <div className="card p-24" id={`card-${id}`} onClick={handleCardClick}>
      <span className="status-heading">{status}</span>
      <h5 className="heading-title">
        <img src={CardIcon} alt="Card Icon" /> {taskDetails.title}
      </h5>
      <span className="date-data">{date}</span>
    </div>
  );
};

export default CardComponent;
