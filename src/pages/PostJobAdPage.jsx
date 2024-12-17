import React from "react";
import Header from "../components/Header";
import JobAdForm from "../components/JobAdForm";
import { useMediaQuery } from "react-responsive";
import Cookies from "../components/Cookies";

const PostJobAdPage = () => {
  const acceptedCookies = document.cookie.includes("Brod");
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  return (
    <div>
      {!isMobile && <Header />}
      <JobAdForm />
      {!acceptedCookies && <Cookies showCookies={true} />}
    </div>
  );
};

export default PostJobAdPage;
