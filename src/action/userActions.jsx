import axios from "axios";

export const login = async (email, password) => {
  try {
    const { data } = await axios.post("http://localhost:26602/api/Auth/login", {
      email,
      password,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    return error;
  }
};

export const clientSignup = async (email, password, role) => {
  try {
    await axios.post("http://localhost:26602/api/Auth/signup", {
      _id: "",
      username: "string",
      email,
      password,
      role,
      businessPostCode: "string",
      firstName: "string",
      lastName: "string",
      contactNumber: "string",
      city: "string",
      state: "string",
      postalCode: "string",
      proximityToWork: "string",
      registeredBusinessName: "string",
      australianBusinessNumber: "string",
      typeofWork: "string",
      status: "New",
      reasonforDeclinedApplication: "string",
      aboutMeDescription: "string",
      website: "string",
      facebookAccount: "string",
      igAccount: "string",
      services: ["string"],
      profilePicture: "string",
      certificationFilesUploaded: ["string"],
      availabilityToWork: "string",
      activeJobs: 0,
      pendingOffers: 0,
      completedJobs: 0,
      estimatedEarnings: 0,
      callOutRate: "string",
      publishedAds: 0,
    });

    await login(email, password);
  } catch (error) {
    return error;
  }
};

export const tradieSignup = async (
  email,
  password,
  role,
  businessPostCode,
  firstName,
  lastName,
  contactNumber,
  registeredBusinessName,
  australianBusinessNumber,
  certificationFilesUploaded
) => {
  try {
    await axios.post("http://localhost:26602/api/Auth/signup", {
      _id: "",
      username: "string",
      email,
      password,
      role,
      businessPostCode,
      firstName,
      lastName,
      contactNumber,
      city: "string",
      state: "string",
      postalCode: "string",
      proximityToWork: "string",
      registeredBusinessName,
      australianBusinessNumber,
      typeofWork: "string",
      status: "New",
      reasonforDeclinedApplication: "string",
      aboutMeDescription: "string",
      website: "string",
      facebookAccount: "string",
      igAccount: "string",
      services: ["string"],
      profilePicture: "string",
      certificationFilesUploaded,
      availabilityToWork: "string",
      activeJobs: 0,
      pendingOffers: 0,
      completedJobs: 0,
      estimatedEarnings: 0,
      callOutRate: "string",
      publishedAds: 0,
    });

    await login(email, password);
  } catch (error) {
    return error;
  }
};

export const getUserDetails = async (userId) => {
  try {
    const { data } = await axios.get(
      `http://localhost:26602/api/Auth/userDetails?id=${userId}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};
