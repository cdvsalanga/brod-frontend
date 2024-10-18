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

export const signup = async (email, password, role) => {
  try {
    await axios.post("https://localhost:7127/api/Auth/signup", {
      _id: "",
      username: "",
      email,
      password,
      role,
      businessPostCode: "",
      firstName: "",
      lastName: "",
      contactNumber: "",
      city: "",
      state: "",
      postalCode: "",
      proximityToWork: "",
      registeredBusinessName: "",
      australianBusinessNumber: "",
      typeofWork: "",
      status: "New",
      reasonforDeclinedApplication: "",
      aboutMeDescription: "",
      website: "",
      facebookAccount: "",
      igAccount: "",
      services: [],
      profilePicture: "",
      certificationFilesUploaded: [],
      availabilityToWork: "",
      activeJobs: 0,
      pendingOffers: 0,
      completedJobs: 0,
      estimatedEarnings: 0,
      callOutRate: "",
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
      `https://localhost:7127/api/Auth/userDetails?id=${userId}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllServices = async () => {
  try {
    const { data } = await axios.get(
      `https://localhost:7127/api/Auth/allServices`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};
