import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ServicesList from "../components/ServicesList";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { getJobsByStatusClient } from "../action/clientActions";
import { TailSpin } from "react-loading-icons";
import { useMediaQuery } from "react-responsive";
import { getJobPostDetails } from "../action/userActions";

const FavoritesPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const navigate = useNavigate();

  const getFavorites = async () => {
    const status = "Bookmarked";
    setLoading(true);
    await getJobsByStatusClient(userInfo.userId, status, userInfo.token).then(
      async (jobs) => {
        console.log(jobs);
        setBookmarks(jobs);

        const array = [...favorites];
        for (let i = 0; i < jobs.length; i++) {
          await getJobPostDetails(jobs[i].serviceID).then((service) => {
            if (!array.includes(service)) {
              array.push(service);
            }
          });
        }
        setFavorites(array);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (userInfo) {
      getFavorites();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <div className="loading loading-page">
          <TailSpin stroke="#1f1f23" speed={1} />
        </div>
      ) : (
        <ServicesList
          content="favorites"
          services={favorites}
          bookmarks={bookmarks}
        />
      )}
      <Footer />
    </div>
  );
};

export default FavoritesPage;
