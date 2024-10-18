import axios from "axios";

export const updateTradieProfile = async (user, token) => {
  try {
    console.log(user, token);

    await axios.put(
      "https://localhost:7127/api/Tradie/update-tradie-profile",
      user,
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
