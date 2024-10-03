import axios from "axios";

export const login = async (email, password) => {
  try {
    const { data } = await axios.post("http://localhost:26602/api/Auth/login", {
      email,
      password,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.error(error);
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
