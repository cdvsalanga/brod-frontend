import React, { useEffect, useState } from "react";
import "../styles/DashboardAdmin.css";
import Header from "../components/Header";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getTradies } from "../action/adminActions";

const DashboardAdminPage = () => {
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [allTradies, setAllTradies] = useState();
  const [tradies, setTradies] = useState();
  const [itemsPerPage] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState();
  const [activePage, setActivePage] = useState(1);

  const navigate = useNavigate();

  const getAllTradies = async () => {
    setLoading(true);
    await getTradies(userInfo.token).then((res) => {
      console.log(res);
      setAllTradies(res);

      const endOffset = itemOffset + itemsPerPage;
      console.log(endOffset);

      const currentItems = res.slice(itemOffset, endOffset);

      setPageCount(Math.ceil(res.length / itemsPerPage));

      setTradies(currentItems);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (userInfo) {
      getAllTradies();
    } else {
      navigate("/login");
    }
  }, [itemOffset]);

  const pageClickHandler = (i) => {
    const clickedPage = i + 1;
    const newOffset = i * itemsPerPage;

    setActivePage(clickedPage);
    setItemOffset(newOffset);
  };

  const pageDownHandler = () => {
    if (activePage !== 1) {
      const newOffset = (activePage - 2) * itemsPerPage;

      setItemOffset(newOffset);
      setActivePage(activePage - 1);
    }
  };

  const pageUpHandler = () => {
    if (activePage !== pageCount) {
      const newOffset = activePage * itemsPerPage;

      setItemOffset(newOffset);
      setActivePage(activePage + 1);
    }
  };

  const showPagesCount = () => {
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      pages.push(
        <span
          className={
            activePage === i + 1
              ? "admin-pagination-btn admin-pagination-btn-active"
              : "admin-pagination-btn"
          }
          key={i}
          onClick={() => pageClickHandler(i)}
        >
          {i + 1}
        </span>
      );
    }
    return pages.map((page) => page);
  };

  return (
    <>
      <Header />
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="admin-dashboard">
          <h1 className="admin-dashboard-h1 mb-42">Admin Dashboard</h1>
          <div>
            <form className="flex-between mb-32">
              <div className="admin-form-input-boxes">
                <div className="admin-form-input-box">
                  <label className="block mb-12">Type of work</label>
                  <select className="admin-form-inputs admin-form-select">
                    <option>Select</option>
                  </select>
                </div>
                <div className="admin-form-input-box">
                  <label className="block mb-12">Submission Date From</label>
                  <input
                    type="date"
                    className="admin-form-inputs admin-form-date"
                  />
                </div>
                <div className="admin-form-input-box">
                  <label className="block mb-12">Submission Date To</label>
                  <input
                    type="date"
                    className="admin-form-inputs admin-form-date"
                  />
                </div>
                <div className="admin-form-input-box">
                  <label className="block mb-12">Status</label>
                  <select className="admin-form-inputs admin-form-select">
                    <option>Select</option>
                  </select>
                </div>
                <div className="admin-form-filter-box">
                  <button className="admin-form-filter pointer">
                    Clear filter
                  </button>
                </div>
              </div>
              <div className="admin-form-search">
                <Search color="#717171" className="admin-form-search-icon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="admin-form-inputs admin-form-input"
                />
              </div>
            </form>
            <table className="admin-table mb-32">
              <thead>
                <tr>
                  <th className="admin-table-cell admin-table-head gray-bg">
                    Application #
                  </th>
                  <th className="admin-table-cell admin-table-head gray-bg">
                    Business Postcode
                  </th>
                  <th className="admin-table-cell admin-table-head gray-bg">
                    Type of Work
                  </th>
                  <th className="admin-table-cell admin-table-head gray-bg">
                    First Name
                  </th>
                  <th className="admin-table-cell admin-table-head gray-bg">
                    Last Name
                  </th>
                  <th className="admin-table-cell admin-table-head gray-bg">
                    ABN
                  </th>
                  <th className="admin-table-cell admin-table-head gray-bg">
                    Business Name
                  </th>
                  <th className="admin-table-cell admin-table-head gray-bg">
                    Date Submitted
                  </th>
                  <th
                    colSpan={2}
                    className="admin-table-cell admin-table-head gray-bg"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              {tradies &&
                tradies.map((tradie) => (
                  <tbody key={tradie._id}>
                    <tr
                      className="pointer"
                      onClick={() =>
                        navigate(`/admin/application-details/${tradie._id}`)
                      }
                    >
                      <td className="admin-table-cell">{tradie._id}</td>
                      <td className="admin-table-cell">
                        {tradie.businessPostCode}
                      </td>
                      <td className="admin-table-cell">{tradie.typeofWork}</td>
                      <td className="admin-table-cell">{tradie.firstName}</td>
                      <td className="admin-table-cell">{tradie.lastName}</td>
                      <td className="admin-table-cell">
                        {tradie.australianBusinessNumber}
                      </td>
                      <td className="admin-table-cell">
                        {tradie.registeredBusinessName}
                      </td>
                      <td className="admin-table-cell">30/07/2024</td>
                      <td className="admin-table-cell">{tradie.status}</td>
                      <td className="admin-table-cell">
                        <EllipsisVertical color="#8C8C8C" />
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
            <div className="flex-between flex-center">
              <div>
                Showing 1 to {tradies && tradies.length} of{" "}
                {allTradies && allTradies.length} items
              </div>
              <div className="admin-pagination">
                <span className="admin-pagination-btn">
                  <ChevronLeft
                    width={16}
                    height={16}
                    color={activePage === 1 ? "#B3B2B5" : "#424242"}
                    onClick={pageDownHandler}
                  />
                </span>
                {showPagesCount()}
                <span className="admin-pagination-btn">
                  <ChevronRight
                    width={16}
                    height={16}
                    color={activePage === pageCount ? "#B3B2B5" : "#424242"}
                    onClick={pageUpHandler}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardAdminPage;
