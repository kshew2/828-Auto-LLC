export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, { ...options, headers });

  // Log the response to see what you're getting
  const text = await response.text(); // Get response as text
  //console.log('Response:', text); // Log it

  if (response.status === 401) {
    // Token is expired or invalid, logout the user
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    window.location.href = '/admin'; // Redirect to login page
  }

  try {
    return JSON.parse(text); // Try parsing the response as JSON
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error('Failed to parse response as JSON');
  }
};
