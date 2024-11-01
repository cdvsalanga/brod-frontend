import axios from "axios";

export const updateTradieProfile = async (user, token) => {
  try {
    console.log(user, token);

    await axios.put(
      "http://18.141.207.215/api/Tradie/update-tradie-profile",
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

export const addTradieJobAd = async (
  userID,
  businessPostcode,
  jobCategory,
  jobAdTitle,
  descriptionOfService,
  pricingOption,
  pricingStartsAt,
  currency,
  thumbnailImage,
  projectGallery,
  token,
  isActive
) => {
  try {
    console.log(
      userID,
      businessPostcode,
      jobCategory,
      jobAdTitle,
      descriptionOfService,
      pricingOption,
      pricingStartsAt,
      currency,
      thumbnailImage,
      projectGallery,
      token,
      isActive
    );

    await axios.post(
      "http://18.141.207.215/api/Tradie/add-tradie-job-ad",
      {
        _id: "",
        userID,
        businessPostcode,
        jobCategory,
        jobAdTitle,
        descriptionOfService,
        pricingOption,
        pricingStartsAt,
        currency,
        thumbnailImage,
        projectGallery,
        isActive,
        clientReviews: [
          {
            reviewDescription: "",
            starRating: 0,
            clientID: "",
            clientUserName: "",
            clientCity: "",
            clientState: "",
            clientPostalCode: "",
          },
        ],
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

export const getPublishedAds = async (userId, token) => {
  try {
    console.log({ userId, token });

    const { data } = await axios.get(
      `http://18.141.207.215/api/Tradie/publishedAds?userId=${userId}`,
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

export const getUnPublishedAds = async (userId, token) => {
  try {
    console.log({ userId, token });

    const { data } = await axios.get(
      `http://18.141.207.215/api/Tradie/unpublishedAds?userId=${userId}`,
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

export const getJobAdDetailsByServiceId = async (serviceID, token) => {
  try {
    console.log({ serviceID, token });

    const { data } = await axios.post(
      "http://18.141.207.215/api/Tradie/job-ad-getDetails-byServiceID",
      {
        serviceID,
      },
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

export const updateIsActive = async (jobID, isActive, token) => {
  try {
    console.log({ jobID, isActive, token });

    await axios.put(
      "http://18.141.207.215/api/Tradie/job-ads/update-isActive",
      {
        jobID,
        isActive,
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

export const updateJobAdDetails = async (jobAdData, token) => {
  try {
    console.log({ jobAdData, token });

    await axios.put(
      "http://18.141.207.215/api/Tradie/update-job-ad-Details",
      jobAdData,
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

export const getJobsByStatus = async (userID, status, token) => {
  try {
    console.log({ userID, status, token });

    const { data } = await axios.post(
      "http://18.141.207.215/api/Tradie/GetJobsByStatus",
      { userID, status },
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

export const updateJobStatus = async (tradieID, jobID, status, token) => {
  try {
    console.log({ tradieID, jobID, status, token });

    await axios.put(
      "http://18.141.207.215/api/Tradie/UpdateJobStatus",
      { tradieID, jobID, status, token },
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
