import React from "react";
import Header from "../components/Header";
import JobAdForm from "../components/JobAdForm";
import { useMediaQuery } from "react-responsive";

const PostJobAdPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });
  return (
    <div>
      {!isMobile && <Header />}
      <JobAdForm />
    </div>
  );
};

export default PostJobAdPage;
