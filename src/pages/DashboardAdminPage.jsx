import React, { useEffect, useState } from "react";
import "../styles/DashboardAdmin.css";
import Header from "../components/Header";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  EllipsisVertical,
  ListFilter,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getTradies } from "../action/adminActions";
import { useMediaQuery } from "react-responsive";
import { TailSpin } from "react-loading-icons";

const DashboardAdminPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showWorkFilter, setShowWorkFilter] = useState(false);
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
      <Header headerText={"Admin Dashboard"} />
      {loading ? (
        <div className="loading loading-page">
          <TailSpin stroke="#1f1f23" speed={1} />
        </div>
      ) : isMobile ? (
        <div className="admin-dashboard">
          <div className="flex-center gap-24 mb-12">
            <input
              type="text"
              placeholder="Search"
              className="admin-form-inputs admin-form-input"
            />
            <div
              className="flex-center gap-4 pointer"
              onClick={() => setShowFilter(true)}
            >
              <ListFilter color="#5F6368" />
              Filters
            </div>
          </div>
          {allTradies &&
            allTradies.map((tradie) => (
              <div
                className="admin-data mb-8 pointer"
                key={tradie._id}
                onClick={() =>
                  navigate(`/admin/application-details/${tradie._id}`)
                }
              >
                <div className="admin-data-container">
                  <div className="admin-data-title mb-6">
                    {tradie.typeofWork}
                  </div>
                  <div className="flex-center">
                    <span>{tradie.firstName + " " + tradie.lastName}</span>
                    <span className="admin-data-separator" />
                    <div className="flex-center gap-8">
                      <MapPin width={20} height={20} color="#8C8C8C" />
                      {tradie.postalCode}
                    </div>
                    <span className="admin-data-separator" />
                    <span
                      className={
                        tradie.status === "New"
                          ? "admin-data-status admin-data-status-new"
                          : tradie.status === "Approved"
                          ? "admin-data-status-approved"
                          : "admin-data-status admin-data-status-declined"
                      }
                    >
                      {tradie.status}
                    </span>
                  </div>
                </div>
                <EllipsisVertical
                  width={28}
                  height={28}
                  color="#717171"
                  className="pointer"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))}
        </div>
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
      {showFilter && isMobile && (
        <div className="admin-filter">
          <div className="admin-filter-container">
            <div className="flex-between flex-center mb-16">
              <div className="admin-filter-text flex-center gap-12">
                <X className="pointer" onClick={() => setShowFilter(false)} />
                Filters
              </div>
              <span className="admin-filter-clear">Clear</span>
            </div>
            <div className="mb-16">
              <div className="flex-center flex-between mb-16">
                Status
                {showStatusFilter ? (
                  <ChevronUp
                    color="#717171"
                    className="pointer"
                    onClick={() => setShowStatusFilter(false)}
                  />
                ) : (
                  <ChevronDown
                    color="#717171"
                    className="pointer"
                    onClick={() => setShowStatusFilter(true)}
                  />
                )}
              </div>
              {showStatusFilter && (
                <div>
                  <div className="flex-center mb-8">
                    <input type="checkbox" className="checkbox" />
                    <label>New</label>
                  </div>
                  <div className="flex-center mb-8">
                    <input type="checkbox" className="checkbox" />
                    <label>Approved</label>
                  </div>
                  <div className="flex-center">
                    <input type="checkbox" className="checkbox" />
                    <label>Declined</label>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-16">
              <div className="flex-center flex-between mb-16">
                Type of Work
                {showWorkFilter ? (
                  <ChevronUp
                    color="#717171"
                    className="pointer"
                    onClick={() => setShowWorkFilter(false)}
                  />
                ) : (
                  <ChevronDown
                    color="#717171"
                    className="pointer"
                    onClick={() => setShowWorkFilter(true)}
                  />
                )}
              </div>
              {showWorkFilter && (
                <select
                  className="admin-filter-select admin-form-inputs pointer"
                  defaultValue={""}
                  // required
                >
                  <option value={""} disabled hidden>
                    Select
                  </option>
                  <option>Air Conditioning Installer / Supplier</option>
                  <option>Antenna Installer / Supplier</option>
                  <option>Appliance Installer</option>
                  <option>Appliance Repairer</option>
                  <option>Arborist</option>
                  <option>Architect</option>
                  <option>Asbestos Removal Expert</option>
                  <option>Awning Installer / Supplier</option>
                  <option>Balustrading Installer</option>
                  <option>Bamboo Flooring Installer / Supplier</option>
                  <option>Bath and Basin Resurfacing</option>
                  <option>Bathroom Building / Renovation</option>
                  <option>Blinds Installer / Supplier</option>
                  <option>Bricklayer</option>
                  <option>Builder</option>
                  <option>Building Certifier</option>
                  <option>Building Consultant</option>
                  <option>Building Designer</option>
                  <option>Building Inspector</option>
                  <option>Building Surveyor</option>
                  <option>Cabinet Maker</option>
                  <option>Carpenter</option>
                  <option>Carpet / Upholstery Cleaning</option>
                  <option>Carpet Layer / Repairs</option>
                  <option>Carport Builder</option>
                  <option>Chimney Installer</option>
                  <option>House Cleaning Services</option>
                  <option>Commercial Cleaning Services</option>
                  <option>Concrete Kerb Builder</option>
                  <option>Concrete Resurfacer</option>
                  <option>Concretor</option>
                  <option>Curtain Installer / Supplier</option>
                  <option>Custom Furniture Designer</option>
                  <option>Damp Proofing Services</option>
                  <option>Deck Builder</option>
                  <option>Deep Cleaning</option>
                  <option>Demolition Services</option>
                  <option>Door Installer / Supplier</option>
                  <option>Drafter</option>
                  <option>Drains Installer / Maintenance</option>
                  <option>Electrician</option>
                  <option>Equipment Hire Supplier</option>
                  <option>EV Charger Installation</option>
                  <option>Excavation Services</option>
                  <option>Renovation and Extensions Builder</option>
                  <option>Fence Builder</option>
                  <option>Floor Coating</option>
                  <option>Floor Sanding and Polishing Services</option>
                  <option>Fly Screen Installer / Supplier</option>
                  <option>Frame and Truss Maintenance</option>
                  <option>Removalist</option>
                  <option>Garage Builder</option>
                  <option>Garden Designer</option>
                  <option>Gardener</option>
                  <option>Gas Fitter</option>
                  <option>Gate Insaller / Supplier</option>
                  <option>Gazebo Builder / Supplier</option>
                  <option>Glazier</option>
                  <option>Glass Balustrade Installer / Supplier</option>
                  <option>Gutter Installer / Maintenance / Supplier</option>
                  <option>Handyman</option>
                  <option>Heating System Installer / Supplier</option>
                  <option>Hot Water System Installer / Supplier</option>
                  <option>Hybrid Flooring</option>
                  <option>IKEA Kitchen Installer</option>
                  <option>Insulation Installer / Supplier</option>
                  <option>Interior Decorator</option>
                  <option>Interior Designer</option>
                  <option>Irrigation System Expert</option>
                  <option>Joiner</option>
                  <option>Kitchen Designer</option>
                  <option>Kitchen Building / Renovations</option>
                  <option>Landscape Architect</option>
                  <option>Landscaper</option>
                  <option>Lawn and Turf Installer / Supplier</option>
                  <option>Lawn Mowing Services</option>
                  <option>Leak Detection</option>
                  <option>Lighting Expert</option>
                  <option>Locksmith</option>
                  <option>Mattres Cleaning</option>
                  <option>Painter</option>
                  <option>Patio Builder</option>
                  <option>Paving Supplier</option>
                  <option>Paving</option>
                  <option>Pergola Builder</option>
                  <option>Pest Control Services</option>
                  <option>Pest Inspector</option>
                  <option>Plasterer</option>
                  <option>Plumber</option>
                  <option>Pool Builder</option>
                  <option>Pool Fence Installer / Maintenance</option>
                  <option>Pool Maintenance Services</option>
                  <option>Pressure Cleaning Services</option>
                  <option>Construction Project Manager</option>
                  <option>Rainwater Tanks Installer / Supplier</option>
                  <option>Renderer</option>
                  <option>Reproduction Stone Supplier</option>
                  <option>Retaining Wall Builder</option>
                  <option>Roller Door Installer / Supplier</option>
                  <option>Roofer</option>
                  <option>Rubbish Removal Services</option>
                  <option>Scaffolding Services</option>
                  <option>Screen Enclosure Supplier</option>
                  <option>Security Screen Installer / Supplier</option>
                  <option>Security Systems Specialist</option>
                  <option>Shade and Sail Installer / Supplier</option>
                  <option>Shed Builder / Supplier</option>
                  <option>Shopfitter</option>
                  <option>Shower Screen Installer / Supplier</option>
                  <option>Skip and Truck Hire Services</option>
                  <option>Skylight Installer / Supplier</option>
                  <option>Soil Testing</option>
                  <option>Solar Power Installer / Maintenance</option>
                  <option>Splashback Intaller / Supplier</option>
                  <option>Stonemason</option>
                  <option>Storage Services</option>
                  <option>Structural Engineer</option>
                  <option>Surveyor</option>
                  <option>Tile Supplier</option>
                  <option>Tiler</option>
                  <option>Timber Floor Installation / Repairs</option>
                  <option>Town Planner</option>
                  <option>Tree Feller</option>
                  <option>Underfloor Heating Installer / Supplier</option>
                  <option>Underpinning Services</option>
                  <option>Upholstery Repairer</option>
                  <option>Ventilation System Specialists</option>
                  <option>Vinyl and Laminate Installer</option>
                  <option>Wallpaper Installer / Supplier</option>
                  <option>Wardrobe Builder</option>
                  <option>Waterproofer</option>
                  <option>Window Cleaning Services</option>
                  <option>Window Installer / Repairs</option>
                  <option>Window Shutter Installer / Supplier</option>
                  <option>Window Tinting Services</option>
                </select>
              )}
            </div>
            <div className="mb-16">
              <div className="mb-16">Submission Date From - To</div>
              <div className="flex-between">
                <input
                  type="date"
                  className="admin-form-inputs admin-form-date"
                />
                <input
                  type="date"
                  className="admin-form-inputs admin-form-date"
                />
              </div>
            </div>
            <div className="flex-end">
              <button className="admin-filter-btn pointer">Done</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardAdminPage;
