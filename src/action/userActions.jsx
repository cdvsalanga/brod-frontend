import axios from "axios";

export const login = async (email, password) => {
  try {
    const { data } = await axios.post("https://localhost:7127/api/Auth/login", {
      email,
      password,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    return error;
  }
};

export const signup = async (
  email,
  password,
  role,
  businessPostCode,
  firstName,
  lastName,
  contactNumber,
  city,
  state,
  postalCode,
  registeredBusinessName,
  australianBusinessNumber,
  typeofWork,
  services,
  certificationFilesUploaded,
  timeStamp
) => {
  try {
    await axios.post("https://localhost:7127/api/Auth/signup", {
      _id: "",
      username: "",
      email,
      password,
      role,
      businessPostCode,
      firstName,
      lastName,
      contactNumber,
      city,
      state,
      postalCode,
      proximityToWork: "",
      registeredBusinessName,
      businessAddress: "",
      australianBusinessNumber,
      typeofWork,
      status: "New",
      reasonforDeclinedApplication: "",
      aboutMeDescription: "",
      website: "",
      facebookAccount: "",
      igAccount: "",
      services,
      profilePicture: "",
      certificationFilesUploaded,
      availabilityToWork: "",
      activeJobs: 0,
      pendingOffers: 0,
      completedJobs: 0,
      estimatedEarnings: 0,
      callOutRate: "",
      publishedAds: 0,
      isSuspended: false,
      weeksSuspended: 0,
      suspensionStartDate: "",
      timeStamp,
      lastActivityTimeStamp: "",
      lastActivity: "",
    });

    await login(email, password);
  } catch (error) {
    return error;
  }
};

export const checkEmail = async (email) => {
  try {
    console.log(email);
    const { data } = await axios.post(
      `https://localhost:7127/api/Auth/check-email`,
      `"${email}"`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const { data } = await axios.get(
      `https://localhost:7127/api/Auth/userDetails?id=${userId}`
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const getAllServices = async () => {
  try {
    const { data } = await axios.get(
      `https://localhost:7127/api/Auth/allServices`
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const ssoClient = async (
  email,
  email_verified,
  name,
  picture,
  given_name,
  family_name
) => {
  try {
    const { data } = await axios.post(
      `https://localhost:7127/api/Auth/sso-client`,
      { email, email_verified, name, picture, given_name, family_name }
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    return error;
  }
};

export const ssoTradie = async (
  email,
  email_verified,
  name,
  picture,
  given_name,
  family_name
) => {
  try {
    const { data } = await axios.post(
      `https://localhost:7127/api/Auth/sso-tradie`,
      { email, email_verified, name, picture, given_name, family_name }
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    return error;
  }
};

export const ssoLoginCommon = async (
  email,
  email_verified,
  name,
  picture,
  given_name,
  family_name
) => {
  try {
    const { data } = await axios.post(
      `https://localhost:7127/api/Auth/sso-login-common`,
      { email, email_verified, name, picture, given_name, family_name }
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const getJobPostDetails = async (id) => {
  try {
    const { data } = await axios.post(
      "https://localhost:7127/api/Auth/JobPostDetails",
      {
        id,
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const getFilteredServices = async (filters) => {
  try {
    const { data } = await axios.post(
      "https://localhost:7127/api/Auth/FilteredServices",
      filters
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const smsOtp = async (phoneNumber) => {
  try {
    await axios.post(
      `https://localhost:7127/api/Auth/sms-otp?phoneNumber=${phoneNumber}`,
      ""
    );
  } catch (error) {
    return error;
  }
};

export const emailOtp = async (email) => {
  try {
    await axios.post(
      `https://localhost:7127/api/Auth/email-otp?email=${email}`,
      ""
    );
  } catch (error) {
    return error;
  }
};

export const smsVerifyOtp = async (phoneNumber, userEnteredOtp) => {
  try {
    await axios.post(
      `https://localhost:7127/api/Auth/sms-verify-otp?phoneNumber=${phoneNumber}&userEnteredOtp=${userEnteredOtp}`,
      ""
    );
  } catch (error) {
    return error;
  }
};

export const emailVerifyOtp = async (email, userEnteredOtp) => {
  try {
    await axios.post(
      `https://localhost:7127/api/Auth/email-verify-otp?email=${email}&userEnteredOtp=${userEnteredOtp}`,
      ""
    );
  } catch (error) {
    return error;
  }
};

export const getNotifications = async (userId) => {
  try {
    const { data } = await axios.post(
      `https://localhost:7127/api/Auth/GetNotifications?userId=${userId}`,
      ""
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const getNotificationsNoUpdate = async (userId) => {
  try {
    const { data } = await axios.post(
      `https://localhost:7127/api/Auth/GetNotificationsNoUpdate?userId=${userId}`,
      ""
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const addNotification = async (
  userID,
  content,
  profilePicture,
  timeStamp
) => {
  try {
    await axios.post(`https://localhost:7127/api/Auth/AddNotification`, {
      _id: "",
      userID,
      content,
      profilePicture,
      timeStamp,
      isRead: false,
    });
  } catch (error) {
    return error;
  }
};

export const clientAddMessage = async (
  clientId,
  tradieId,
  message,
  timeStamp
) => {
  try {
    await axios.post(`https://localhost:7127/api/Auth/Client-AddMessage`, {
      _id: "",
      clientId,
      tradieId,
      tradieName: "",
      tradielocation: "",
      picture: "",
      message,
      timeStamp,
      sentByClient: true,
    });
  } catch (error) {
    return error;
  }
};

export const tradieAddMessage = async (
  clientId,
  tradieId,
  message,
  timeStamp
) => {
  try {
    await axios.post(`https://localhost:7127/api/Auth/Tradie-AddMessage`, {
      _id: "",
      clientId,
      tradieId,
      clientName: "",
      clientlocation: "",
      picture: "",
      message,
      timeStamp,
      sentByTradie: true,
    });
  } catch (error) {
    return error;
  }
};

export const clientGetAllMessages = async (clientId) => {
  try {
    const { data } = await axios.post(
      `https://localhost:7127/api/Auth/Client-GetAll-Messages`,
      {
        clientId,
        tradieId: "",
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const tradieGetAllMessages = async (tradieId) => {
  try {
    const { data } = await axios.post(
      `https://localhost:7127/api/Auth/Tradie-GetAll-Messages`,
      {
        clientId: "",
        tradieId,
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const getMessagesById = async (clientId, tradieId) => {
  try {
    const { data } = await axios.post(
      `https://localhost:7127/api/Auth/GetMessages-ByID`,
      {
        clientId,
        tradieId,
      }
    );

    return data;
  } catch (error) {
    return error;
  }
};

export const reactivate = async (userId) => {
  try {
    await axios.put(
      `https://localhost:7127/api/Auth/Reactivate?userId=${userId}`
    );
  } catch (error) {
    return error;
  }
};

export const changePassword = async (email, oldPassword, newPassword) => {
  try {
    console.log({ email, oldPassword, newPassword });
    await axios.put(`https://localhost:7127/api/Auth/ChangePassword`, {
      email,
      oldPassword,
      newPassword,
    });
  } catch (error) {
    return error;
  }
};
