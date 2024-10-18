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
  token
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
      token
    );

    await axios.post(
      "https://localhost:7127/api/Tradie/add-tradie-job-ad",
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
        isActive: true,
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
