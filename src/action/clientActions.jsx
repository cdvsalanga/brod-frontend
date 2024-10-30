import axios from "axios";

export const updateClientProfile = async (profileDetails, token) => {
  try {
    console.log(profileDetails);
    await axios.put(
      "http://18.141.207.215/api/Client/update-profile",
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
      token,
    });

    await axios.post(
      "http://18.141.207.215/api/Client/HireTradie",
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
