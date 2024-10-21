import axiosInstance from "./axiosInstance"; // Import the axiosInstance

export const registerLand = async (landData) => {
  try {
    const response = await axiosInstance.post("/api/land/register", landData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Access response data
  } catch (error) {
    console.error("Error registering land:", error);
    throw error;
  }
};

export const getAllLands = async () => {
  try {
    console.log(
      "Fetching all lands from:",
      `${axiosInstance.defaults.baseURL}/api/land`
    );
    const response = await axiosInstance.get("/api/land", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting all lands:", error);
    throw error;
  }
};

export const getLandById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/land/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting land by ID:", error);
    throw error;
  }
};

export const verifyLand = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/land/${id}/verify`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying land:", error);
    throw error;
  }
};
