const API_URL = process.env.REACT_APP_API_URL;
console.log('API_URL:', API_URL);

export const registerLand = async (landData) => {
  try {
    const response = await fetch(`${API_URL}/api/land/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(landData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error registering land:', error);
    throw error;
  }
};

export const getAllLands = async () => {
  try {
    const response = await fetch(`${API_URL}/api/land`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error getting all lands:', error);
    throw error;
  }
};

export const getLandById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/land/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error getting land by ID:', error);
    throw error;
  }
};

export const verifyLand = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/land/${id}/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error verifying land:', error);
    throw error;
  }
};