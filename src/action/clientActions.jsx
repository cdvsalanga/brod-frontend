import axios from "axios";

export const updateClientProfile = async (profileDetails, token) => {
  try {
    console.log(profileDetails);
    await axios.put(
      "http://47.130.91.115/api/Client/update-profile",
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
    console.log({
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
      token,
    });

    await axios.post(
      "http://47.130.91.115/api/Client/HireTradie",
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
    console.log({
      clientID,
      tradieID,
      jobAdTitle,
      serviceID,
      status,
      descriptionServiceNeeded,
      clientContactNumber,
      clientPostCode,
      jobActionDate,
      startDate: "",
      completionDate: "",
      clientBudget: 0,
      budgetCurrency: "",
      token,
    });
    await axios.post(
      "http://47.130.91.115/api/Client/BookmarkJob",
      {
        clientID,
        tradieID,
        jobAdTitle,
        serviceID,
        status,
        descriptionServiceNeeded,
        clientContactNumber,
        clientPostCode,
        jobActionDate,
        startDate: "",
        completionDate: "",
        clientBudget: 0,
        budgetCurrency: "",
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

export const getJobsByStatusClient = async (userID, status, token) => {
  try {
    console.log({ userID, status, token });
    const { data } = await axios.post(
      "http://47.130.91.115/api/Client/GetJobsByStatus",
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

export const unBookmarkJob = async (bookmarkedJobId, token) => {
  try {
    console.log({ bookmarkedJobId, token });
    const { res } = await axios.post(
      `http://47.130.91.115/api/Client/UnBookmarkJob?bookmarkedJobId=${bookmarkedJobId}`,
      "",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    return error;
  }
};
