import React, { useState, useEffect } from "react";
import { fetchFilterTasks } from "../../api"; // Import the filter function from api.js
import CardWrapper from "../../Pages/Home/CardWrapper"; // Import CardWrapper

export const FilterForm = () => {
  // State to hold filtered tasks
  const [filteredTasks, setFilteredTasks] = useState([]); 

  // States to hold selected filter values
  const [selectedStartDate, setSelectedStartDate] = useState(""); // Selected filter: Start Date
  const [selectedEndDate, setSelectedEndDate] = useState(""); // Selected filter: End Date
  const [selectedStatus, setSelectedStatus] = useState(""); // Selected filter: Status

  // State to manage pagination metadata
  const [pagination, setPagination] = useState(null);

  // State to handle errors during API requests
  const [error, setError] = useState(null);

  // State to manage the current page number for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch filtered tasks from API when filters or page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the API with the selected filters and current page
        const data = await fetchFilterTasks(
          selectedStartDate,
          selectedEndDate,
          selectedStatus,
          currentPage
        );

        // Set the filtered tasks
        setFilteredTasks(data.data); 

        // Set pagination metadata (current page, last page, etc.)
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
          prev_page_url: data.prev_page_url,
          next_page_url: data.next_page_url,
        });
      } catch (err) {
        // Handle any errors that occur during the API request
        setError(err);
      }
    };

    // Fetch data whenever filters or current page changes
    fetchData();
  }, [selectedStartDate, selectedEndDate, selectedStatus, currentPage]); // Dependencies: filters and current page

  // Handlers for select changes to update filter values
  const handleStartDateChange = (e) => setSelectedStartDate(e.target.value);
  const handleEndDateChange = (e) => setSelectedEndDate(e.target.value);
  const handleStatusChange = (e) => setSelectedStatus(e.target.value);

  // Handle page change when navigating through pagination
  const handlePageChange = (url) => {
    if (url) {
      // Extract the page number from the URL
      const pageNumber = new URL(url).searchParams.get("page");
      setCurrentPage(Number(pageNumber)); // Update current page based on URL
    }
  };

  // If there's an error, display it
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {/* Filter Form */}
      <form className="filter-form">
        <h6>Filter By</h6>

        {/* Filter by Due Date Range */}
        <div className="input-group">
          <label htmlFor="filter-with-date-range" className="select-label">
            Due Date
          </label>
          <div className="d-flex">
            {/* From Date Picker */}
            <input
              type="date"
              id="filter-from-date"
              className="form-control"
              value={selectedStartDate}
              onChange={handleStartDateChange}
            />
            {/* To Date Picker */}
            <input
              type="date"
              id="filter-to-date"
              className="form-control"
              value={selectedEndDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>

        {/* Filter by Status */}
        <div className="input-group">
          <label htmlFor="filter-with-status" className="select-label">
            Status
          </label>
          <select
            className="form-select"
            id="filter-with-status"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </form>

      {/* Pass filtered tasks and pagination metadata to CardWrapper */}
      <CardWrapper
        tasks={filteredTasks || []}
        pagination={pagination} // Pass pagination data
        onPageChange={handlePageChange} // Handle page change event
      />
    </div>
  );
};

export default FilterForm;
