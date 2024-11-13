import axios from "axios";

export const getTradies = async (token) => {
  try {
    console.log({ token });
    const { data } = await axios.get("http://47.130.91.115/api/Admin/tradies", {
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

export const updateTradieStatus = async (id, status, token) => {
  try {
    console.log({ id, status, token });
    await axios.put(
      "http://47.130.91.115/api/Admin/tradie/update-status",
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