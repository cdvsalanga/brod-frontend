import axios from "axios";

export const getTradies = async (token) => {
  try {
    const { data } = await axios.get(
      "https://localhost:7127/api/Admin/tradies",
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

export const updateTradieStatus = async (id, status, token) => {
  try {
    await axios.put(
      "https://localhost:7127/api/Admin/tradie/update-status",
      { id, status },
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

export const getUsers = async (token) => {
  try {
    const { data } = await axios.get("https://localhost:7127/api/Admin/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

export const getFilteredTradies = async (
  typeOfWork,
  status,
  submissionDateFrom,
  submissionDateTo,
  keyword,
  token
) => {
  try {
    const { data } = await axios.post(
      "https://localhost:7127/api/Admin/GetFilteredTradies",
      { typeOfWork, status, submissionDateFrom, submissionDateTo, keyword },
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

export const getFilteredUsers = async (
  typeOfWork,
  status,
  submissionDateFrom,
  submissionDateTo,
  keyword,
  token
) => {
  try {
    const { data } = await axios.post(
      "https://localhost:7127/api/Admin/GetFilteredUsers",
      { typeOfWork, status, submissionDateFrom, submissionDateTo, keyword },
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

export const suspendUser = async (
  userID,
  weeksSuspended,
  suspensionStartDate,
  token
) => {
  try {
    await axios.put(
      "https://localhost:7127/api/Admin/suspendUser",
      { userID, weeksSuspended, suspensionStartDate, isSuspended: true },
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
