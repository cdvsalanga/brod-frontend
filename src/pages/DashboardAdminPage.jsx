import React, { useEffect, useState } from "react";
import "../styles/DashboardAdmin.css";
import Header from "../components/Header";
import {
  ArrowLeft,
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
import { Link, useNavigate } from "react-router-dom";
import {
  getFilteredTradies,
  getFilteredUsers,
  getTradies,
  getUsers,
  suspendUser,
} from "../action/adminActions";
import { useMediaQuery } from "react-responsive";
import { TailSpin } from "react-loading-icons";
import dateFormat, { masks } from "dateformat";
import { deleteUser, reactivate } from "../action/userActions";

const DashboardAdminPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [loading, setLoading] = useState(false);
  const [suspendLoading, setSuspendLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showWorkFilter, setShowWorkFilter] = useState(false);
  const [showPostalCode, setShowPostalCode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [actionsId, setActionsId] = useState();
  const [allTradies, setAllTradies] = useState();
  const [tradies, setTradies] = useState();
  const [allUsers, setAllUsers] = useState();
  const [users, setUsers] = useState();
  const [itemsPerPage] = useState(10);
  let [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState();
  let [activePage, setActivePage] = useState(1);
  const [typeofWork, setTypeOfWork] = useState("");
  const [submissionDateFrom, setSubmissionDateFrom] = useState("");
  const [submissionDateTo, setSubmissionDateTo] = useState("");
  const [status, setStatus] = useState("");
  const [keyword, setKeyword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  let [item, setItem] = useState("Tradies");
  const [isFiltering, setIsFiltering] = useState(false);
  const [weeks, setWeeks] = useState(1);
  const [suspendingUser, setSuspendingUser] = useState();
  const [deletingUser, setDeletingUser] = useState();

  const navigate = useNavigate();

  const getAllTradies = async () => {
    setLoading(true);
    await getTradies(userInfo.token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
      setAllTradies(res);

      const endOffset = itemOffset + itemsPerPage;

      const currentItems = res.slice(itemOffset, endOffset);

      setPageCount(Math.ceil(res.length / itemsPerPage));

      setTradies(currentItems);
      setLoading(false);
    });
  };

  const getAllUsers = async () => {
    setLoading(true);
    await getUsers(userInfo.token).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }

      const filteredUsers = res.filter((user) => user.role !== "Admin");

      setAllUsers(filteredUsers);

      const endOffset = itemOffset + itemsPerPage;

      const currentItems = filteredUsers.slice(itemOffset, endOffset);

      setPageCount(Math.ceil(filteredUsers.length / itemsPerPage));

      setUsers(currentItems);
      setLoading(false);
    });
  };

  const filterHandler = async (e) => {
    e.preventDefault();
    setIsFiltering(true);
    setLoading(true);
    const dateFrom = submissionDateFrom === "" ? null : submissionDateFrom;
    const dateTo = submissionDateTo === "" ? null : submissionDateTo;

    if (item === "Tradies") {
      await getFilteredTradies(
        typeofWork,
        status,
        dateFrom,
        dateTo,
        keyword,
        postalCode,
        userInfo.token
      ).then((res) => {
        if (res && res.status === 401) {
          alert("Your session expired, please login again.");
          localStorage.removeItem("userInfo");
          navigate("/login");
          return;
        }

        // res.reverse();
        setAllTradies(res);
        setTradies(res);
        setLoading(false);
      });
    } else {
      await getFilteredUsers(
        typeofWork,
        status,
        dateFrom,
        dateTo,
        keyword,
        postalCode,
        userInfo.token
      ).then((res) => {
        if (res && res.status === 401) {
          alert("Your session expired, please login again.");
          localStorage.removeItem("userInfo");
          navigate("/login");
          return;
        }

        // res.reverse();
        const filteredUsers = res.filter((user) => user.role !== "Admin");

        setAllUsers(filteredUsers);
        setUsers(filteredUsers);
        setLoading(false);
      });
    }
  };

  const clearHandler = () => {
    setIsFiltering(false);
    setTypeOfWork("");
    setSubmissionDateFrom("");
    setSubmissionDateTo("");
    setStatus("");
    setKeyword("");
    setPostalCode("");
    itemOffset = 0;
    activePage = 1;
    setActivePage(1);
    if (item === "Tradies") {
      getAllTradies();
    } else {
      getAllUsers();
    }
  };

  const suspendUserHandler = async () => {
    setLoading(true);
    setShowModal(false);
    const timeStamp = new Date().toISOString();
    await suspendUser(
      suspendingUser._id,
      weeks,
      timeStamp,
      userInfo.token
    ).then((res) => {
      if (res && res.status === 401) {
        alert("Your session expired, please login again.");
        localStorage.removeItem("userInfo");
        navigate("/login");
        return;
      }
      window.location.reload();
    });
  };

  const reactivateHandler = async (userId) => {
    setLoading(true);

    await reactivate(userId).then(() => {
      window.location.reload();
    });
  };

  const deleteUserHandler = async () => {
    setLoading(true);
    setShowModalDelete(false);
    await deleteUser(deletingUser._id).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    if (userInfo) {
      if (item === "Tradies") {
        getAllTradies();
      } else {
        getAllUsers();
      }
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

  const typeOfWorkElements = () => (
    <select
      className={
        isMobile
          ? "admin-filter-select admin-form-inputs pointer"
          : "admin-form-inputs admin-form-select pointer"
      }
      value={typeofWork}
      onChange={(e) => setTypeOfWork(e.target.value)}
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
  );

  const submissionDateFromElements = () => (
    <input
      type="date"
      value={submissionDateFrom}
      className={
        isMobile
          ? "admin-form-inputs admin-form-date"
          : "admin-form-inputs admin-form-date pointer"
      }
      onChange={(e) => setSubmissionDateFrom(e.target.value)}
    />
  );

  const submissionDateToElements = () => (
    <input
      type="date"
      value={submissionDateTo}
      className={
        isMobile
          ? "admin-form-inputs admin-form-date"
          : "admin-form-inputs admin-form-date pointer"
      }
      onChange={(e) => setSubmissionDateTo(e.target.value)}
    />
  );

  const statusElements = () => (
    <select
      value={status}
      className={
        isMobile
          ? "admin-filter-select admin-form-inputs pointer"
          : "admin-form-inputs admin-form-select pointer"
      }
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value={""} disabled hidden>
        Select
      </option>
      <option>New</option>
      <option>Approved</option>
      <option>Declined</option>
    </select>
  );

  // const postalCodeElements = () => (
  //   <input
  //     value={postalCode}
  //     onChange={(e) => setPostalCode(e.target.value)}
  //     type="text"
  //     className="admin-form-inputs admin-form-pcode"
  //   />
  // );
  return (
    <>
      <Header headerText={"Admin Dashboard"} />
      {loading ? (
        <div className="loading loading-page">
          <TailSpin stroke="#1f1f23" speed={1} />
        </div>
      ) : isMobile ? (
        <div className="admin-dashboard">
          <form onSubmit={filterHandler} className="flex-center gap-24 mb-12">
            <input
              type="text"
              placeholder="Search"
              className="admin-form-inputs admin-form-input"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div
              className="flex-center gap-4 pointer"
              onClick={() => setShowFilter(true)}
            >
              <ListFilter color="#5F6368" />
              Filters
            </div>
          </form>
          <div className="flex-center mb-16">
            <div
              className={
                item === "Tradies" ? "admin-nav admin-nav-active" : "admin-nav"
              }
              onClick={() => {
                setItem("Tradies");
                clearHandler();
              }}
            >
              Tradepersons
            </div>
            <div
              className={
                item === "All Users"
                  ? "admin-nav admin-nav-active"
                  : "admin-nav"
              }
              onClick={() => {
                setItem("All Users");
                clearHandler();
              }}
            >
              All Users
            </div>
          </div>
          {item === "Tradies"
            ? allTradies &&
              allTradies.map((tradie) => (
                <div
                  // to={`/admin/application-details/${tradie._id}`}
                  // className={
                  //   tradie.status === "New"
                  //     ? "admin-data mb-8 pointer link-none admin-table-new"
                  //     : "admin-data mb-8 pointer link-none"
                  // }
                  className={
                    tradie.status === "New"
                      ? "admin-data mb-8 admin-table-new"
                      : "admin-data mb-8"
                  }
                  key={tradie._id}
                >
                  <div
                    className={
                      tradie.status === "New"
                        ? "admin-data-container admin-table-new"
                        : "admin-data-container"
                    }
                  >
                    <div
                      className={
                        tradie.status === "New"
                          ? "admin-data-title mb-6 admin-table-new"
                          : "admin-data-title mb-6"
                      }
                    >
                      {tradie.typeofWork}
                    </div>
                    <div
                      className={
                        tradie.status === "New"
                          ? "flex-center admin-table-new"
                          : "flex-center"
                      }
                    >
                      <div
                        className={
                          tradie.status === "New"
                            ? "admin-data-name admin-table-new"
                            : "admin-data-name"
                        }
                      >
                        {tradie.firstName + " " + tradie.lastName}
                      </div>
                      <span className="admin-data-separator" />
                      <div
                        className={
                          tradie.status === "New"
                            ? "admin-data-loc flex-center gap-4 admin-table-new"
                            : "admin-data-loc flex-center gap-4"
                        }
                      >
                        <MapPin
                          width={20}
                          height={20}
                          color="#8C8C8C"
                          className={
                            tradie.status === "New" && "admin-table-new"
                          }
                        />
                        {tradie.postalCode}
                      </div>
                      <span className="admin-data-separator" />
                      <div
                        className={
                          tradie.status === "New"
                            ? "admin-data-status admin-data-status-new"
                            : tradie.status === "Approved"
                            ? "admin-data-status admin-data-status-approved"
                            : "admin-data-status admin-data-status-declined"
                        }
                      >
                        {tradie.status}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      tradie.status === "New"
                        ? "pos-relative admin-table-new"
                        : "pos-relative"
                    }
                  >
                    <EllipsisVertical
                      width={28}
                      height={28}
                      color={actionsId === tradie._id ? "#000000" : "#8C8C8C"}
                      className={
                        tradie.status === "New"
                          ? "pointer admin-table-new"
                          : "pointer"
                      }
                      onClick={() => {
                        if (actionsId !== tradie._id) {
                          setActionsId(tradie._id);
                          setShowActions(true);
                        } else {
                          setActionsId("");
                          setShowActions(false);
                        }
                      }}
                    />
                    {showActions && actionsId === tradie._id && (
                      <div className="admin-data-actions">
                        <Link to={`/admin/application-details/${tradie._id}`}>
                          <button
                            type="button"
                            className="admin-table-btn admin-table-btn-black mb-12 pointer"
                          >
                            Details
                          </button>
                        </Link>
                        {tradie.isSuspended ? (
                          <button
                            type="button"
                            className="admin-table-btn admin-table-btn-black mb-12 pointer"
                            onClick={() => reactivateHandler(tradie._id)}
                          >
                            Reactivate
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="admin-table-btn admin-table-btn-red mb-12 pointer"
                            onClick={() => {
                              setSuspendingUser(tradie);
                              setShowModal(true);
                            }}
                          >
                            Suspend
                          </button>
                        )}
                        <button
                          type="button"
                          className="admin-table-btn admin-table-btn-red pointer"
                          onClick={() => {
                            setDeletingUser(tradie);
                            setShowModalDelete(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            : allUsers &&
              allUsers.map((user) => (
                <div
                  className="admin-data mb-8"
                  key={user._id}
                  // onClick={() =>
                  //   navigate(`/admin/application-details/${user._id}`)
                  // }
                >
                  <div className="admin-data-container">
                    <div className="admin-data-title mb-6">{user.email}</div>
                    <div className="flex-center">
                      <div className="admin-data-user-name">
                        {user.firstName + " " + user.lastName}
                      </div>
                      <span className="admin-data-separator" />
                      <div className="admin-data-role">{user.role}</div>
                      <span className="admin-data-separator" />
                      <div className="admin-data-activity">
                        {user.lastActivity} (
                        {dateFormat(user.lastActivityTimeStamp, "dd/mm/yyyy")})
                      </div>

                      {/* <div className="admin-data-btn">
                        {user.isSuspended ? (
                          <button
                            type="button"
                            className="admin-table-btn admin-table-btn-black pointer"
                            onClick={() => reactivateHandler(user._id)}
                          >
                            Reactivate
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="admin-table-btn admin-table-btn-red pointer"
                            onClick={() => {
                              setSuspendingUser(user);
                              setShowModal(true);
                            }}
                          >
                            Suspend
                          </button>
                        )}
                      </div>
                      <span className="admin-data-separator" />
                      <div className="admin-data-del-btn">
                        <button
                          type="button"
                          className="admin-table-btn admin-table-btn-red pointer"
                          onClick={() => {
                            setDeletingUser(user);
                            setShowModalDelete(true);
                          }}
                        >
                          Delete
                        </button>
                      </div> */}
                    </div>
                  </div>
                  <div className="pos-relative">
                    <EllipsisVertical
                      width={28}
                      height={28}
                      color={actionsId === user._id ? "#000000" : "#8C8C8C"}
                      className="pointer"
                      onClick={() => {
                        if (actionsId !== user._id) {
                          setActionsId(user._id);
                          setShowActions(true);
                        } else {
                          setActionsId("");
                          setShowActions(false);
                        }
                      }}
                    />
                    {showActions && actionsId === user._id && (
                      <div className="admin-data-actions">
                        {user.isSuspended ? (
                          <button
                            type="button"
                            className="admin-table-btn admin-table-btn-black mb-12 pointer"
                            onClick={() => reactivateHandler(user._id)}
                          >
                            Reactivate
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="admin-table-btn admin-table-btn-red mb-12 pointer"
                            onClick={() => {
                              setSuspendingUser(user);
                              setShowModal(true);
                            }}
                          >
                            Suspend
                          </button>
                        )}
                        <button
                          type="button"
                          className="admin-table-btn admin-table-btn-red pointer"
                          onClick={() => {
                            setDeletingUser(user);
                            setShowModalDelete(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
        </div>
      ) : (
        <div className="admin-dashboard">
          <h1 className="admin-dashboard-h1 mb-42">Admin Dashboard</h1>
          <div>
            <form onSubmit={filterHandler} className="flex-between mb-32">
              <div className="admin-form-input-boxes">
                <div className="admin-form-input-box">
                  <label className="block mb-12">Type of work</label>
                  {typeOfWorkElements()}
                </div>
                <div className="admin-form-input-box">
                  <label className="block mb-12">Submission Date From</label>
                  {submissionDateFromElements()}
                </div>
                <div className="admin-form-input-box">
                  <label className="block mb-12">Submission Date To</label>
                  {submissionDateToElements()}
                </div>
                <div className="admin-form-input-box">
                  <label className="block mb-12">Status</label>
                  {statusElements()}
                </div>
                {/* <div className="admin-form-input-box">
                  <label className="block mb-12">Postal Code</label>
                  {postalCodeElements()}
                </div> */}
                <div className="admin-form-filter-box">
                  <button
                    type="button"
                    className="admin-form-filter pointer"
                    onClick={clearHandler}
                  >
                    Clear filter
                  </button>
                </div>
                <button
                  type="button"
                  className="admin-filter-btn pointer"
                  onClick={filterHandler}
                >
                  Done
                </button>
              </div>
              <div className="admin-form-search">
                <Search color="#717171" className="admin-form-search-icon" />
                <input
                  type="text"
                  placeholder="Search"
                  className="admin-form-inputs admin-form-input"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </form>
            <div className="flex-center mb-16">
              <div
                className={
                  item === "Tradies"
                    ? "admin-nav admin-nav-active"
                    : "admin-nav"
                }
                onClick={() => {
                  item = "Tradies";
                  setItem("Tradies");
                  clearHandler();
                }}
              >
                Tradepersons
              </div>
              <div
                className={
                  item === "All Users"
                    ? "admin-nav admin-nav-active"
                    : "admin-nav"
                }
                onClick={() => {
                  item = "All Users";
                  setItem("All Users");
                  clearHandler();
                }}
              >
                All Users
              </div>
            </div>
            {item === "Tradies" ? (
              <table className="admin-table mb-32">
                <thead>
                  <tr>
                    <th className="admin-table-cell admin-table-head gray-bg">
                      ID
                    </th>
                    <th className="admin-table-cell admin-table-head gray-bg">
                      Postal Code
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
                      // className="pointer"
                      // onClick={() =>
                      //   navigate(`/admin/application-details/${tradie._id}`)
                      // }
                      >
                        <td
                          className={
                            tradie.status === "New"
                              ? "admin-table-new admin-table-cell"
                              : "admin-table-cell"
                          }
                        >
                          {tradie._id}
                        </td>
                        <td
                          className={
                            tradie.status === "New"
                              ? "admin-table-new admin-table-cell"
                              : "admin-table-cell"
                          }
                        >
                          {tradie.postalCode}
                        </td>
                        <td
                          className={
                            tradie.status === "New"
                              ? "admin-table-new admin-table-cell"
                              : "admin-table-cell"
                          }
                        >
                          {tradie.typeofWork}
                        </td>
                        <td
                          className={
                            tradie.status === "New"
                              ? "admin-table-new admin-table-cell"
                              : "admin-table-cell"
                          }
                        >
                          {tradie.firstName}
                        </td>
                        <td
                          className={
                            tradie.status === "New"
                              ? "admin-table-new admin-table-cell"
                              : "admin-table-cell"
                          }
                        >
                          {tradie.lastName}
                        </td>
                        <td
                          className={
                            tradie.status === "New"
                              ? "admin-table-new admin-table-cell"
                              : "admin-table-cell"
                          }
                        >
                          {tradie.australianBusinessNumber}
                        </td>
                        <td
                          className={
                            tradie.status === "New"
                              ? "admin-table-new admin-table-cell"
                              : "admin-table-cell"
                          }
                        >
                          {tradie.registeredBusinessName}
                        </td>
                        <td
                          className={
                            tradie.status === "New"
                              ? "admin-table-new admin-table-cell"
                              : "admin-table-cell"
                          }
                        >
                          {dateFormat(tradie.timeStamp, "dd/mm/yyyy")}
                        </td>
                        <td
                          className={
                            tradie.status === "New"
                              ? "admin-table-new admin-table-cell"
                              : "admin-table-cell"
                          }
                        >
                          <span
                            className={
                              tradie.status === "New"
                                ? "admin-data-status admin-data-status-new"
                                : tradie.status === "Approved"
                                ? "admin-data-status admin-data-status-approved"
                                : "admin-data-status admin-data-status-declined"
                            }
                          >
                            {tradie.status}
                          </span>
                        </td>
                        <td
                          className={
                            tradie.status === "New"
                              ? "pos-relative admin-table-cell admin-table-new"
                              : "pos-relative admin-table-cell"
                          }
                        >
                          <EllipsisVertical
                            color={
                              actionsId === tradie._id ? "#000000" : "#8C8C8C"
                            }
                            className={
                              tradie.status === "New"
                                ? "pointer admin-table-new"
                                : "pointer"
                            }
                            onClick={() => {
                              if (actionsId !== tradie._id) {
                                setActionsId(tradie._id);
                                setShowActions(true);
                              } else {
                                setActionsId("");
                                setShowActions(false);
                              }
                            }}
                          />
                          {showActions && actionsId === tradie._id && (
                            <div className="admin-data-actions">
                              <Link
                                to={`/admin/application-details/${tradie._id}`}
                              >
                                <button
                                  type="button"
                                  className="admin-table-btn admin-table-btn-black mb-12 pointer"
                                >
                                  Details
                                </button>
                              </Link>
                              {tradie.isSuspended ? (
                                <button
                                  type="button"
                                  className="admin-table-btn admin-table-btn-black mb-12 pointer"
                                  onClick={() => reactivateHandler(tradie._id)}
                                >
                                  Reactivate
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="admin-table-btn admin-table-btn-red mb-12 pointer"
                                  onClick={() => {
                                    setSuspendingUser(tradie);
                                    setShowModal(true);
                                  }}
                                >
                                  Suspend
                                </button>
                              )}
                              <button
                                type="button"
                                className="admin-table-btn admin-table-btn-red pointer"
                                onClick={() => {
                                  setDeletingUser(tradie);
                                  setShowModalDelete(true);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            ) : (
              <table className="admin-table mb-32">
                <thead>
                  <tr>
                    <th className="admin-table-cell admin-table-head gray-bg">
                      Email
                    </th>
                    <th className="admin-table-cell admin-table-head gray-bg">
                      First Name
                    </th>
                    <th className="admin-table-cell admin-table-head gray-bg">
                      Last Name
                    </th>
                    <th className="admin-table-cell admin-table-head gray-bg">
                      City
                    </th>
                    <th className="admin-table-cell admin-table-head gray-bg">
                      State
                    </th>
                    <th className="admin-table-cell admin-table-head gray-bg">
                      Postal Code
                    </th>
                    <th className="admin-table-cell admin-table-head gray-bg">
                      Role
                    </th>
                    <th className="admin-table-cell admin-table-head gray-bg">
                      Last Activity
                    </th>
                    <th
                      colSpan={2}
                      className="admin-table-cell admin-table-head gray-bg"
                    >
                      Date of Last Activity
                    </th>
                    {/* <th
                      colSpan={2}
                      className="admin-table-cell admin-table-head gray-bg"
                    >
                      Actions
                    </th> */}
                  </tr>
                </thead>
                {users &&
                  users.map((user) => (
                    <tbody key={user._id}>
                      <tr>
                        <td className="admin-table-cell">{user.email}</td>
                        <td className="admin-table-cell">{user.firstName}</td>
                        <td className="admin-table-cell">{user.lastName}</td>
                        <td className="admin-table-cell">{user.city}</td>
                        <td className="admin-table-cell">{user.state}</td>
                        <td className="admin-table-cell">{user.postalCode}</td>
                        <td className="admin-table-cell">{user.role}</td>
                        <td className="admin-table-cell">
                          {user.lastActivity}
                        </td>
                        <td className="admin-table-cell">
                          {dateFormat(user.lastActivityTimeStamp, "dd/mm/yyyy")}
                        </td>
                        <td className="pos-relative">
                          <EllipsisVertical
                            color={
                              actionsId === user._id ? "#000000" : "#8C8C8C"
                            }
                            className="pointer"
                            onClick={() => {
                              if (actionsId !== user._id) {
                                setActionsId(user._id);
                                setShowActions(true);
                              } else {
                                setActionsId("");
                                setShowActions(false);
                              }
                            }}
                          />
                          {showActions && actionsId === user._id && (
                            <div className="admin-data-actions">
                              {user.isSuspended ? (
                                <button
                                  type="button"
                                  className="admin-table-btn admin-table-btn-black mb-12 pointer"
                                  onClick={() => reactivateHandler(user._id)}
                                >
                                  Reactivate
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="admin-table-btn admin-table-btn-red mb-12 pointer"
                                  onClick={() => {
                                    setSuspendingUser(user);
                                    setShowModal(true);
                                  }}
                                >
                                  Suspend
                                </button>
                              )}
                              <button
                                type="button"
                                className="admin-table-btn admin-table-btn-red pointer"
                                onClick={() => {
                                  setDeletingUser(user);
                                  setShowModalDelete(true);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                        {/* <td className="admin-table-cell">
                          {user.status === "Deactivated" ? (
                            // Show Reactivate button if user status is Deactivated
                            <button
                              type="button"
                              className="admin-table-btn admin-table-btn-black pointer"
                              onClick={() => reactivateHandler(user._id)}
                            >
                              Reactivate
                            </button>
                          ) : user.isSuspended ? (
                            // Show Reactivate button if user is suspended
                            <button
                              type="button"
                              className="admin-table-btn admin-table-btn-black pointer"
                              onClick={() => reactivateHandler(user._id)}
                            >
                              Reactivate
                            </button>
                          ) : (
                            // Default Suspend button
                            <button
                              type="button"
                              className="admin-table-btn admin-table-btn-red pointer"
                              onClick={() => {
                                setSuspendingUser(user);
                                setShowModal(true);
                              }}
                            >
                              Suspend
                            </button>
                          )}
                        </td>
                        <td className="admin-table-cell">
                          <button
                            type="button"
                            className="admin-table-btn admin-table-btn-red pointer"
                            onClick={() => {
                              setDeletingUser(user);
                              setShowModalDelete(true);
                            }}
                          >
                            Delete
                          </button>
                        </td> */}
                      </tr>
                    </tbody>
                  ))}
              </table>
            )}

            {!isFiltering && (
              <div className="flex-between flex-center">
                <div>
                  {item === "Tradies"
                    ? `Showing 1 to ${tradies && tradies.length} of ${
                        allTradies && allTradies.length
                      } items`
                    : `Showing 1 to ${users && users.length} of ${
                        allUsers && allUsers.length
                      } items`}
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
            )}
          </div>
        </div>
      )}
      {showModalDelete && (
        <div className="admin-modal">
          <div className="admin-modal-box">
            <h1 className="admin-dashboard-h1 mb-32">Delete User</h1>
            <div className="admin-modal-text mb-20">
              Are you sure you want to delete {deletingUser.firstName}{" "}
              {deletingUser.lastName}?
            </div>
            <div className="flex-between">
              <button
                type="button"
                className="admin-modal-btn pointer"
                onClick={() => {
                  setShowModalDelete(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-modal-btn admin-modal-btn-red pointer"
                onClick={deleteUserHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-box">
            <h1 className="admin-dashboard-h1 mb-32">Suspend User</h1>
            <div className="admin-modal-text mb-20">
              You are about to suspend{" "}
              {suspendingUser.firstName + " " + suspendingUser.lastName}. Please
              select how many weeks.
            </div>
            <select
              value={weeks}
              className="admin-modal-select pointer mb-20"
              onChange={(e) => setWeeks(e.target.value)}
            >
              <option value={1}>1 week</option>
              <option value={2}>2 weeks</option>
              <option value={4}>1 month</option>
              <option value={9999999}>Permanent</option>
            </select>
            <div className="flex-between">
              <button
                type="button"
                className="admin-modal-btn pointer"
                onClick={() => {
                  setWeeks(1);
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-modal-btn admin-modal-btn-red pointer"
                onClick={suspendUserHandler}
              >
                Suspend
              </button>
            </div>
          </div>
        </div>
      )}
      {showFilter && isMobile && (
        <div className="admin-filter scroll-lock">
          <div className="admin-filter-container">
            <div className="flex-between flex-center mb-16">
              <div className="admin-filter-text flex-center gap-12">
                <X className="pointer" onClick={() => setShowFilter(false)} />
                Filters
              </div>
              <span
                className="admin-filter-clear pointer"
                onClick={clearHandler}
              >
                Clear
              </span>
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
              {showStatusFilter && statusElements()}
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
              {showWorkFilter && typeOfWorkElements()}
            </div>
            {/* <div className="mb-16">
              <div className="flex-center flex-between mb-16">
                Postal Code
                {showPostalCode ? (
                  <ChevronUp
                    color="#717171"
                    className="pointer"
                    onClick={() => setShowPostalCode(false)}
                  />
                ) : (
                  <ChevronDown
                    color="#717171"
                    className="pointer"
                    onClick={() => setShowPostalCode(true)}
                  />
                )}
              </div>
              {showPostalCode && postalCodeElements()}
            </div> */}
            <div className="mb-16">
              <div className="mb-16">Submission Date From - To</div>
              <div className="flex-between">
                {submissionDateFromElements()}
                {submissionDateToElements()}
              </div>
            </div>
            <div className="flex-end">
              <button
                type="button"
                className="admin-filter-btn pointer"
                onClick={filterHandler}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardAdminPage;
