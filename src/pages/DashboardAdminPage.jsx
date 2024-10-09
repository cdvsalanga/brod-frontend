import React from "react";
import "../styles/DashboardAdmin.css";
import Header from "../components/Header";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardAdminPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
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
            <tbody>
              <tr
                className="pointer"
                onClick={() => navigate("/admin/application-details/1")}
              >
                <td className="admin-table-cell">123456789</td>
                <td className="admin-table-cell">4000</td>
                <td className="admin-table-cell">Antenna Installation</td>
                <td className="admin-table-cell">John</td>
                <td className="admin-table-cell">Doe</td>
                <td className="admin-table-cell">123456789</td>
                <td className="admin-table-cell">Antenna and Painting</td>
                <td className="admin-table-cell">30/07/2024</td>
                <td className="admin-table-cell">New</td>
                <td className="admin-table-cell">
                  <EllipsisVertical color="#8C8C8C" />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex-between flex-center">
            <div>Showing 1 to 10 of 30 items</div>
            <div className="admin-pagination">
              <span className="admin-pagination-btn">
                <ChevronLeft width={16} height={16} color="#424242" />
              </span>
              <span className="admin-pagination-btn">1</span>
              <span className="admin-pagination-btn">2</span>
              <span className="admin-pagination-btn">3</span>
              <span className="admin-pagination-btn">
                <ChevronRight width={16} height={16} color="#424242" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdminPage;
