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
