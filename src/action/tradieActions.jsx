import axios from "axios";

export const updateTradieProfile = async (user, token) => {
  try {
    await axios.put(
      "http://47.130.91.115/api/Tradie/update-tradie-profile",
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
    await axios.post(
      "http://47.130.91.115/api/Tradie/add-tradie-job-ad",
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
            clientName: "",
            clientLocation: "",
            ratingDescription: "",
            rating: 0,
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
    const { data } = await axios.get(
      `http://47.130.91.115/api/Tradie/publishedAds?userId=${userId}`,
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
    const { data } = await axios.get(
      `http://47.130.91.115/api/Tradie/unpublishedAds?userId=${userId}`,
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
    const { data } = await axios.post(
      "http://47.130.91.115/api/Tradie/job-ad-getDetails-byServiceID",
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
    await axios.put(
      "http://47.130.91.115/api/Tradie/job-ads/update-isActive",
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
    await axios.put(
      "http://47.130.91.115/api/Tradie/update-job-ad-Details",
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

export const getJobsByStatusTradie = async (userID, status, token) => {
  try {
    const { data } = await axios.post(
      "http://47.130.91.115/api/Tradie/GetJobsByStatus",
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

export const updateJobStatusTradie = async (
  tradieID,
  jobID,
  status,
  jobActionDate,
  token
) => {
  try {
    await axios.put(
      "http://47.130.91.115/api/Tradie/UpdateJobStatus",
      { tradieID, jobID, status, jobActionDate },
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
