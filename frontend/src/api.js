import axios from 'axios';

// Base URL for the Laravel API
const API_URL = 'http://localhost:8002/api'; // Update with the correct API base URL

/**
 * Fetch all tasks
 * @returns {Promise<Object[]>} - Array of task objects
 */
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Pass the error to be handled by the calling function
  }
};

/**
 * Create a new task
 * @param {Object} task - Task data to create
 * @returns {Promise<Object>} - Created task object
 */
export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

/**
 * Get task details by ID
 * @param {number} id - Task ID
 * @returns {Promise<Object>} - Task details object
 */
export const fetchTaskDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task details:', error);
    throw error;
  }
};

/**
 * Fetch comments for a specific task
 * @param {number} taskId - Task ID
 * @returns {Promise<Object[]>} - Array of comments
 */
export const fetchComments = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${taskId}/comments`);
    return response.data; // Assuming API returns an array of comments
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

/**
 * Post a new comment for a specific task
 * @param {Object} comment - Comment data (includes taskId, author, content, etc.)
 * @returns {Promise<Object>} - Saved comment object
 */
export const postComment = async (comment) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${comment.taskId}/comments`, comment);
    return response.data; // Assuming API returns the saved comment object
  } catch (error) {
    console.error('Error adding comments:', error);
    throw error;
  }
};

/**
 * Fetch filtered tasks based on due date range, status, and pagination
 * @param {string} selectedStartDate - Start of the due date range (optional)
 * @param {string} selectedEndDate - End of the due date range (optional)
 * @param {string} selectedStatus - Task status filter (optional)
 * @param {number} page - Current page for pagination (default: 1)
 * @returns {Promise<Object>} - Filtered tasks with pagination metadata
 */
export const fetchFilterTasks = async (
  selectedStartDate = '',
  selectedEndDate = '',
  selectedStatus = '',
  page = 1
) => {
  try {
    const url = `${API_URL}/tasks`; // Base URL for tasks
    const params = {}; // Query parameters for filtering

    // Add filters if provided
    if (selectedStartDate) {
      params.due_date_from = selectedStartDate; // Start date filter
    }
    if (selectedEndDate) {
      params.due_date_to = selectedEndDate; // End date filter
    }
    if (selectedStatus) {
      params.status = selectedStatus; // Status filter
    }

    // Pagination parameters
    params.page = page;
    params.per_page = 8; // Items per page

    // Make API call with query parameters
    const response = await axios.get(url, { params });
    return response.data; // Return filtered tasks and pagination metadata
  } catch (error) {
    console.error('Error fetching filtered tasks:', error);
    throw error; // Pass the error to be handled by the calling function
  }
};
