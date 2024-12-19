import React, { useState } from "react";
import "./CreateTask.scss";
import TopHeader from "../../Layout/Header/TopHeader";
import { createTask } from "../../api"; // Import API function to create a task

export const CreateTask = () => {
  // State to manage the form data (title, status, dueDate, description)
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    dueDate: "",
    description: "",
  });

  // State to control the visibility of the success popup
  const [popupVisible, setPopupVisible] = useState(false);

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for form submission (creating a new task)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the new task data to be sent to the API
      const newTask = {
        title: formData.title,
        status: formData.status,
        due_date: formData.dueDate,
        description: formData.description,
      };

      // Call the API to create a task
      await createTask(newTask);

      // Reset form data after successful task creation
      setFormData({
        title: "",
        status: "",
        dueDate: "",
        description: "",
      });

      // Show success popup
      setPopupVisible(true);

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000);
    } catch (error) {
      // Handle error (if API request fails)
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <main className="content-wrapper">
      {/* Render top header */}
      <TopHeader />
      {/* Show success popup if a task was submitted successfully */}
      {popupVisible && (
        <div className="alert alert-success mt-3" role="alert">
          Task Submitted Successfully!
        </div>
      )}

      {/* Task creation form */}
      <form className="create-task-form" onSubmit={handleSubmit}>
        <h4 className="mb-4 form-heading">Create Task</h4>
        <div className="row">
          {/* Title input field */}
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status selection field */}
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="filter-with-status" className="form-label">
              Select Status
            </label>
            <select
              className="form-select"
              name="status"
              id="filter-with-status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select status</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Due Date input field */}
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description input field */}
          <div className="col-12 mb-4">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please add a description"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-secondary px-4">
          Submit
        </button>
      </form>
    </main>
  );
};

export default CreateTask;
