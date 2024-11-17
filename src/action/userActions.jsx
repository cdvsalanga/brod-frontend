import axios from "axios";

export const login = async (email, password) => {
  try {
    const { data } = await axios.post("http://47.130.91.115/api/Auth/login", {
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
  console.log({
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
    timeStamp,
  });
  try {
    await axios.post("http://47.130.91.115/api/Auth/signup", {
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
      timeStamp,
    });

    await login(email, password);
  } catch (error) {
    return error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const { data } = await axios.get(
      `http://47.130.91.115/api/Auth/userDetails?id=${userId}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllServices = async () => {
  try {
    const { data } = await axios.get(
      `http://47.130.91.115/api/Auth/allServices`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const googleLoginClient = async (
  email,
  email_verified,
  name,
  picture,
  given_name,
  family_name
) => {
  try {
    console.log({
      email,
      email_verified,
      name,
      picture,
      given_name,
      family_name,
    });

    const { data } = await axios.post(
      `http://47.130.91.115/api/Auth/google-login-client`,
      { email, email_verified, name, picture, given_name, family_name }
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const googleLoginTradie = async (
  email,
  email_verified,
  name,
  picture,
  given_name,
  family_name
) => {
  try {
    console.log({
      email,
      email_verified,
      name,
      picture,
      given_name,
      family_name,
    });

    const { data } = await axios.post(
      `http://47.130.91.115/api/Auth/google-login-tradie`,
      { email, email_verified, name, picture, given_name, family_name }
    );

    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getJobPostDetails = async (id) => {
  try {
    console.log({ id });

    const { data } = await axios.post(
      "http://47.130.91.115/api/Auth/JobPostDetails",
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
    console.log(filters);

    const { data } = await axios.post(
      "http://47.130.91.115/api/Auth/FilteredServices",
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
      `http://47.130.91.115/api/Auth/sms-otp?phoneNumber=${phoneNumber}`,
      ""
    );
  } catch (error) {
    console.error(error);
  }
};

export const emailOtp = async (email) => {
  try {
    await axios.post(
      `http://47.130.91.115/api/Auth/email-otp?email=${email}`,
      ""
    );
  } catch (error) {
    console.error(error);
  }
};

export const smsVerifyOtp = async (phoneNumber, userEnteredOtp) => {
  try {
    await axios.post(
      `http://47.130.91.115/api/Auth/sms-verify-otp?phoneNumber=${phoneNumber}&userEnteredOtp=${userEnteredOtp}`,
      ""
    );
  } catch (error) {
    console.error(error);
  }
};

export const emailVerifyOtp = async (email, userEnteredOtp) => {
  try {
    await axios.post(
      `http://47.130.91.115/api/Auth/email-verify-otp?email=${email}&userEnteredOtp=${userEnteredOtp}`,
      ""
    );
  } catch (error) {
    console.error(error);
  }
};

export const getNotifications = async (userId) => {
  try {
    const { data } = await axios.post(
      `http://47.130.91.115/api/Auth/GetNotifications?userId=${userId}`,
      ""
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getNotificationsNoUpdate = async (userId) => {
  try {
    const { data } = await axios.post(
      `http://47.130.91.115/api/Auth/GetNotificationsNoUpdate?userId=${userId}`,
      ""
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addNotification = async (
  userID,
  content,
  profilePicture,
  timeStamp
) => {
  try {
    console.log({ userID, content, profilePicture, timeStamp });
    await axios.post(`http://47.130.91.115/api/Auth/AddNotification`, {
      _id: "",
      userID,
      content,
      profilePicture,
      timeStamp,
      isRead: false,
    });
  } catch (error) {
    console.error(error);
  }
};

export const clientAddMessage = async (
  clientId,
  tradieId,
  message,
  timeStamp
) => {
  try {
    console.log({ clientId, tradieId, message, timeStamp });

    await axios.post(`http://47.130.91.115/api/Auth/Client-AddMessage`, {
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
    console.error(error);
  }
};

export const tradieAddMessage = async (clientId, tradieId, message) => {
  try {
    await axios.post(`http://47.130.91.115/api/Auth/Tradie-AddMessage`, {
      _id: "",
      clientId,
      tradieId,
      clientName: "",
      clientlocation: "",
      picture: "",
      message,
      timeStamp: "",
      sentByTradie: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const clientGetAllMessages = async (clientId) => {
  try {
    const { data } = await axios.post(
      `http://47.130.91.115/api/Auth/Client-GetAll-Messages`,
      {
        clientId,
        tradieId: "",
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const tradieGetAllMessages = async (tradieId) => {
  try {
    const { data } = await axios.post(
      `http://47.130.91.115/api/Auth/Tradie-GetAll-Messages`,
      {
        clientId: "",
        tradieId,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMessagesById = async (clientId, tradieId) => {
  try {
    const { data } = await axios.post(
      `http://47.130.91.115/api/Auth/GetMessages-ByID`,
      {
        clientId,
        tradieId,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};
