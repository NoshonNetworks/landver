const API_URL = process.env.REACT_APP_API_URL;

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

// Similar updates for verifyLand and getAllLands functions