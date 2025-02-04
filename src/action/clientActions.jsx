import axios from "axios";

export const updateClientProfile = async (profileDetails, token) => {
  try {
    console.log(profileDetails);
    await axios.put(
      "https://backendapi.brod.com.au/api/Client/update-profile",
      profileDetails,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const hireTradie = async (
  clientID,
  tradieID,
  jobAdTitle,
  serviceID,
  status,
  descriptionServiceNeeded,
  clientContactNumber,
  clientPostCode,
  startDate,
  completionDate,
  clientBudget,
  budgetCurrency,
  jobActionDate,
  token
) => {
  try {
    await axios.post(
      "https://backendapi.brod.com.au/api/Client/HireTradie",
      {
        clientID,
        tradieID,
        jobAdTitle,
        serviceID,
        status,
        descriptionServiceNeeded,
        clientContactNumber,
        clientPostCode,
        startDate,
        completionDate,
        clientBudget,
        budgetCurrency,
        jobActionDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const bookmarkJob = async (
  clientID,
  tradieID,
  jobAdTitle,
  serviceID,
  status,
  descriptionServiceNeeded,
  clientContactNumber,
  clientPostCode,
  jobActionDate,
  token
) => {
  try {
    await axios.post(
      "https://backendapi.brod.com.au/api/Client/BookmarkJob",
      {
        clientID,
        tradieID,
        jobAdTitle,
        serviceID,
        status,
        descriptionServiceNeeded,
        clientContactNumber,
        clientPostCode,
        startDate: "",
        completionDate: "",
        clientBudget: 0,
        budgetCurrency: "",
        jobActionDate,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const unBookmarkJob = async (bookmarkedJobId, token) => {
  try {
    await axios.post(
      `https://backendapi.brod.com.au/api/Client/UnBookmarkJob?bookmarkedJobId=${bookmarkedJobId}`,
      "",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const getJobsByStatusClient = async (userID, status, token) => {
  try {
    const { data } = await axios.post(
      "https://backendapi.brod.com.au/api/Client/GetJobsByStatus",
      { userID, status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const updateJobStatusClient = async (
  tradieID,
  jobID,
  status,
  jobActionDate,
  token
) => {
  try {
    await axios.put(
      "https://backendapi.brod.com.au/api/Client/UpdateJobStatus",
      { tradieID, jobID, status, jobActionDate },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const addRating = async (
  tradieId,
  clientId,
  jobId,
  jobAdId,
  rating,
  clientLocation,
  ratingDescription,
  token
) => {
  try {
    await axios.post(
      "https://backendapi.brod.com.au/api/Client/AddRating",
      {
        _id: "",
        tradieId,
        clientId,
        jobId,
        jobAdId,
        rating,
        clientLocation,
        ratingDescription,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};
