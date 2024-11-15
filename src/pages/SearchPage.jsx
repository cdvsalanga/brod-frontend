import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import ServicesHeader from "../components/ServicesHeader";
import SearchSideBar from "../components/SearchSideBar";
import ServicesList from "../components/ServicesList";
import Footer from "../components/Footer";
import "../styles/Search.css";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { ChevronDown, ChevronUp, ListFilter, X } from "lucide-react";
import { getFilteredServices } from "../action/userActions";
import { TailSpin } from "react-loading-icons";
import { getJobsByStatusClient } from "../action/clientActions";

const SearchPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const { search } = useLocation();

  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [showPostcode, setShowPostcode] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showJobCategory, setShowJobCategory] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [proximityToWorkMin, setProximityToWorkMin] = useState(0);
  const [proximityToWorkMax, setProximityToWorkMax] = useState(0);
  const [jobCategories, setJobCategories] = useState([]);
  const [keywords, setKeywords] = useState(search.split("=")[1]);
  const [availabilityToWork, setAvailabilityToWork] = useState([]);
  const [callOutRateMin, setCallOutRateMin] = useState(0);
  const [callOutRateMax, setCallOutRateMax] = useState(0);
  const [pricingStartsMin, setPricingStartsMin] = useState(0);
  const [pricingStartsMax, setPricingStartsMax] = useState(0);
  const [filteredServices, setFilteredServices] = useState();
  const [bookmarks, setBookmarks] = useState();
  const [checked, setChecked] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const ref = useRef([]);
  const availRef = useRef([]);

  const filters = {};

  const getFilteredServicesData = async () => {
    setLoading(true);
    // (filters.postcode = ""),
    //   (filters.proximityToWorkMin = 0),
    //   (filters.proximityToWorkMax = 0),
    //   (filters.jobCategories = [""]),
    //   (filters.keywords = search.split("=")[1]),
    //   (filters.availabilityToWork = [""]),
    //   (filters.callOutRateMin = 0),
    //   (filters.callOutRateMax = 0),
    //   (filters.pricingStartsMin = 0),
    //   (filters.pricingStartsMax = 0),
    await getFilteredServices(filters).then(async (data) => {
      console.log(data);
      setFilteredServices(data);
      if (userInfo) {
        const status = "Bookmarked";
        await getJobsByStatusClient(
          userInfo.userId,
          status,
          userInfo.token
        ).then((jobs) => {
          setBookmarks(jobs);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
  };

  const useFilters = async () => {
    filters.postcode = postcode;
    filters.proximityToWorkMin = proximityToWorkMin;
    filters.proximityToWorkMax = proximityToWorkMax;
    if (jobCategories.length === 0) {
      filters.jobCategories = [""];
    } else {
      filters.jobCategories = jobCategories;
    }
    filters.keywords = keywords;
    if (availabilityToWork.length === 0) {
      filters.availabilityToWork = [""];
    } else {
      filters.availabilityToWork = availabilityToWork;
    }
    filters.callOutRateMin = callOutRateMin;
    filters.callOutRateMax = callOutRateMax;
    filters.pricingStartsMin = pricingStartsMin;
    filters.pricingStartsMax = pricingStartsMax;

    // setLoading(true);
    // await getFilteredServices(filters).then((data) => {
    //   console.log(data);
    //   setFilteredServices(data);
    //   setLoading(false);
    // });

    getFilteredServicesData();
  };

  const clearFilter = () => {
    (filters.postcode = ""),
      (filters.proximityToWorkMin = 0),
      (filters.proximityToWorkMax = 0),
      (filters.jobCategories = [""]),
      (filters.keywords = search.split("=")[1]),
      (filters.availabilityToWork = [""]),
      (filters.callOutRateMin = 0),
      (filters.callOutRateMax = 0),
      (filters.pricingStartsMin = 0),
      (filters.pricingStartsMax = 0),
      setPostcode("");
    setProximityToWorkMin(0);
    setProximityToWorkMax(0);
    setJobCategories([]);
    setKeywords(search.split("=")[1]);
    setAvailabilityToWork([]);
    setCallOutRateMin(0);
    setCallOutRateMax(0);
    setPricingStartsMin(0);
    setPricingStartsMax(0);
    setChecked(false);

    clearCheckbox();

    getFilteredServicesData();

    // window.location.reload();
  };

  const availabilityChangeHandler = (e) => {
    if (e.target.checked) {
      availabilityToWork.push(e.target.value);
    } else {
      const index = availabilityToWork.indexOf(e.target.value);
      if (index > -1) {
        availabilityToWork.splice(index, 1);
      }
    }
  };

  const jobCategoriesChangeHandler = (e) => {
    console.log(e.target.value);
    if (e.target.checked) {
      jobCategories.push(e.target.value);
    } else {
      const index = jobCategories.indexOf(e.target.value);
      if (index > -1) {
        jobCategories.splice(index, 1);
      }
    }
  };

  useEffect(() => {
    if (search) {
      // setKeywords(search.split("=")[1]);
      // useFilters();
      clearFilter();
      getFilteredServicesData();
    }
    console.log(checked);
  }, [search, checked]);

  const clearCheckbox = () => {
    console.log({ ref, availRef });
    for (let i = 0; i < ref.current.length; i++) {
      console.log(i);
      ref.current[i].checked = false;
    }

    for (let i = 0; i < availRef.current.length; i++) {
      console.log(i);
      availRef.current[i].checked = false;
    }
  };

  const postCodeElements = () => {
    if (showPostcode) {
      return (
        <div>
          <select
            value={postcode}
            className="search-select"
            onChange={(e) => setPostcode(e.target.value)}
          >
            <option value={""} disabled hidden>
              Select Postcode
            </option>
            <option>1000</option>
            <option>2000</option>
            <option>3000</option>
            <option>4000</option>
            <option>5000</option>
          </select>
        </div>
      );
    }
  };

  const locationElements = () => {
    if (showLocation) {
      return (
        <div>
          <div className="search-flex">
            <label className="search-within">Within</label>
            <div className="search-km-1">{proximityToWorkMax + "km"}</div>
          </div>
          <input
            type="range"
            className="search-range"
            min={0}
            max={50}
            step={1}
            value={proximityToWorkMax}
            onChange={(e) => setProximityToWorkMax(Number(e.target.value))}
          />
          <div className="search-km-2">0km</div>
        </div>
      );
    }
  };

  const jobCategoryElements = () => (
    <div className={!showJobCategory && "none"}>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[0] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Air Conditioning Installer / Supplier"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes(
            "Air Conditioning Installer / Supplier"
          )}
        />
        <label className="search-label">
          Air Conditioning Installer / Supplier
        </label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[1] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Antenna Installer / Supplier"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes(
            "Antenna Installer / Supplier"
          )}
        />
        <label className="search-label">Antenna Installer / Supplier</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[2] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Appliance Installer"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Appliance Installer")}
        />
        <label className="search-label">Appliance Installer</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[3] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Appliance Repairer"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Appliance Repairer")}
        />
        <label className="search-label">Appliance Repairer</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[4] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Arborist"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Arborist")}
        />
        <label className="search-label">Arborist</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[5] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Architect"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Architect")}
        />
        <label className="search-label">Architect</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[6] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Asbestos Removal Expert"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Asbestos Removal Expert")}
        />
        <label className="search-label">Asbestos Removal Expert</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[7] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Awning Installer / Supplier"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Awning Installer / Supplier")}
        />
        <label className="search-label">Awning Installer / Supplier</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[8] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Balustrading Installer"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Balustrading Installer")}
        />
        <label className="search-label">Balustrading Installer</label>
      </div>
      <div className="search-checkbox-container">
        <input
          ref={(element) => {
            ref.current[9] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Bamboo Flooring Installer / Supplier"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes(
            "Bamboo Flooring Installer / Supplier"
          )}
        />
        <label className="search-label">
          Bamboo Flooring Installer / Supplier
        </label>
      </div>

      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[10] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Bath and Basin Resurfacing"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Bath and Basin Resurfacing")}
        />
        <label className="search-label">Bath and Basin Resurfacing</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[11] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Bathroom Building / Renovation"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes(
            "Bathroom Building / Renovation"
          )}
        />
        <label className="search-label">Bathroom Building / Renovation</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[12] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Blinds Installer / Supplier"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Blinds Installer / Supplier")}
        />
        <label className="search-label">Blinds Installer / Supplier</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[13] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Bricklayer"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Bricklayer")}
        />
        <label className="search-label">Bricklayer</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[14] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Builder"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Builder")}
        />
        <label className="search-label">Builder</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[15] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Building Certifier"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Building Certifier")}
        />
        <label className="search-label">Building Certifier</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[16] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Building Consultant"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Building Consultant")}
        />
        <label className="search-label">Building Consultant</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[17] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Building Designe"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Building Designe")}
        />
        <label className="search-label">Building Designer</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[18] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Building Inspector"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Building Inspector")}
        />
        <label className="search-label">Building Inspector</label>
      </div>
      <div className="search-checkbox-container mb-8">
        <input
          ref={(element) => {
            ref.current[19] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"Building Surveyor"}
          onChange={(e) => jobCategoriesChangeHandler(e)}
          defaultChecked={jobCategories.includes("Building Surveyor")}
        />
        <label className="search-label">Building Surveyor</label>
      </div>

      <div className={!showMore && "none"}>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[20] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Cabinet Maker"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Cabinet Maker")}
          />
          <label className="search-label">Cabinet Maker</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[21] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Carpenter"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Carpenter")}
          />
          <label className="search-label">Carpenter</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[22] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Carpet / Upholstery Cleaning"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Carpet / Upholstery Cleaning"
            )}
          />
          <label className="search-label">Carpet / Upholstery Cleaning</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[23] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Carpet Layer / Repairs"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Carpet Layer / Repairs")}
          />
          <label className="search-label">Carpet Layer / Repairs</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[24] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Carport Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Carport Builder")}
          />
          <label className="search-label">Carport Builder</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[25] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Chimney Installer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Chimney Installer")}
          />
          <label className="search-label">Chimney Installer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[26] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Commercial Cleaning Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Commercial Cleaning Services"
            )}
          />
          <label className="search-label">Commercial Cleaning Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[27] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Concrete Kerb Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Concrete Kerb Builder")}
          />
          <label className="search-label">Concrete Kerb Builder</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[28] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Concrete Resurfacer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Concrete Resurfacer")}
          />
          <label className="search-label">Concrete Resurfacer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[29] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Concretor"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Concretor")}
          />
          <label className="search-label">Concretor</label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[30] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Construction Project Manager"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Construction Project Manager"
            )}
          />
          <label className="search-label">Construction Project Manager</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[31] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Curtain Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Curtain Installer / Supplier"
            )}
          />
          <label className="search-label">Curtain Installer / Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[32] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Custom Furniture Designer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Custom Furniture Designer")}
          />
          <label className="search-label">Custom Furniture Designer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[33] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Damp Proofing Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Damp Proofing Services")}
          />
          <label className="search-label">Damp Proofing Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[34] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Deck Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Deck Builder")}
          />
          <label className="search-label">Deck Builder</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[35] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Deep Cleaning"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Deep Cleaning")}
          />
          <label className="search-label">Deep Cleaning</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[36] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Demolition Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Demolition Services")}
          />
          <label className="search-label">Demolition Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[37] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Door Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Door Installer / Supplier")}
          />
          <label className="search-label">Door Installer / Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[38] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Drafter"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Drafter")}
          />
          <label className="search-label">Drafter</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[39] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Drains Installer / Maintenance"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Drains Installer / Maintenance"
            )}
          />
          <label className="search-label">Drains Installer / Maintenance</label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[40] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Electrician"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Electrician")}
          />
          <label className="search-label">Electrician</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[41] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Equipment Hire Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Equipment Hire Supplier")}
          />
          <label className="search-label">Equipment Hire Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[42] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"EV Charger Installation"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("EV Charger Installation")}
          />
          <label className="search-label">EV Charger Installation</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[43] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Excavation Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Excavation Services")}
          />
          <label className="search-label">Excavation Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[44] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Fence Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Fence Builder")}
          />
          <label className="search-label">Fence Builder</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[45] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Floor Coating"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Floor Coating")}
          />
          <label className="search-label">Floor Coating</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[46] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Floor Sanding and Polishing Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Floor Sanding and Polishing Services"
            )}
          />
          <label className="search-label">
            Floor Sanding and Polishing Services
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[47] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Fly Screen Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Fly Screen Installer / Supplier"
            )}
          />
          <label className="search-label">
            Fly Screen Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[48] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Frame and Truss Maintenance"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Frame and Truss Maintenance"
            )}
          />
          <label className="search-label">Frame and Truss Maintenance</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[49] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Garage Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Garage Builder")}
          />
          <label className="search-label">Garage Builder</label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[50] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Garden Designer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Garden Designer")}
          />
          <label className="search-label">Garden Designer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[51] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Gardener"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Gardener")}
          />
          <label className="search-label">Gardener</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[52] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Gas Fitter"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Gas Fitter")}
          />
          <label className="search-label">Gas Fitter</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[53] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Gate Insaller / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Gate Insaller / Supplier")}
          />
          <label className="search-label">Gate Insaller / Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[54] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Gazebo Builder / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Gazebo Builder / Supplier")}
          />
          <label className="search-label">Gazebo Builder / Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[55] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Glazier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Glazier")}
          />
          <label className="search-label">Glazier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[56] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Glass Balustrade Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Glass Balustrade Installer / Supplier"
            )}
          />
          <label className="search-label">
            Glass Balustrade Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[57] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Gutter Installer / Maintenance / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Gutter Installer / Maintenance / Supplier"
            )}
          />
          <label className="search-label">
            Gutter Installer / Maintenance / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[58] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Handyman"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Handyman")}
          />
          <label className="search-label">Handyman</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[59] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Heating System Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Heating System Installer / Supplier"
            )}
          />
          <label className="search-label">
            Heating System Installer / Supplier
          </label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[60] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Hot Water System Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Hot Water System Installer / Supplier"
            )}
          />
          <label className="search-label">
            Hot Water System Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[61] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"House Cleaning Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("House Cleaning Services")}
          />
          <label className="search-label">House Cleaning Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[62] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Hybrid Flooring"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Hybrid Flooring")}
          />
          <label className="search-label">Hybrid Flooring</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[63] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"IKEA Kitchen Installer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("IKEA Kitchen Installer")}
          />
          <label className="search-label">IKEA Kitchen Installer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[64] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Insulation Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Insulation Installer / Supplier"
            )}
          />
          <label className="search-label">
            Insulation Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[65] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Interior Decorator"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Interior Decorator")}
          />
          <label className="search-label">Interior Decorator</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[66] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Interior Designer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Interior Designer")}
          />
          <label className="search-label">Interior Designer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[67] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Irrigation System Expert"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Irrigation System Expert")}
          />
          <label className="search-label">Irrigation System Expert</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[68] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Joiner"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Joiner")}
          />
          <label className="search-label">Joiner</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[69] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Kitchen Designer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Kitchen Designer")}
          />
          <label className="search-label">Kitchen Designer</label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[70] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Kitchen Building / Renovations"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Kitchen Building / Renovations"
            )}
          />
          <label className="search-label">Kitchen Building / Renovations</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[71] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Landscape Architect"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Landscape Architect")}
          />
          <label className="search-label">Landscape Architect</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[72] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Landscaper"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Landscaper")}
          />
          <label className="search-label">Landscaper</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[73] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Lawn and Turf Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Lawn and Turf Installer / Supplier"
            )}
          />
          <label className="search-label">
            Lawn and Turf Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[74] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Lawn Mowing Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Lawn Mowing Services")}
          />
          <label className="search-label">Lawn Mowing Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[75] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Leak Detection"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Leak Detection")}
          />
          <label className="search-label">Leak Detection</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[76] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Lighting Expert"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Lighting Expert")}
          />
          <label className="search-label">Lighting Expert</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[77] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Locksmith"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Locksmith")}
          />
          <label className="search-label">Locksmith</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[78] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Mattres Cleaning"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Mattres Cleaning")}
          />
          <label className="search-label">Mattres Cleaning</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[79] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Painter"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Painter")}
          />
          <label className="search-label">Painter</label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[80] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Patio Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Patio Builder")}
          />
          <label className="search-label">Patio Builder</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[81] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Paving Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Paving Supplier")}
          />
          <label className="search-label">Paving Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[82] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Paving"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Paving")}
          />
          <label className="search-label">Paving</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[83] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Pergola Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Pergola Builder")}
          />
          <label className="search-label">Pergola Builder</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[84] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Pest Control Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Pest Control Services")}
          />
          <label className="search-label">Pest Control Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[85] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Pest Inspector"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Pest Inspector")}
          />
          <label className="search-label">Pest Inspector</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[86] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Plasterer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Plasterer")}
          />
          <label className="search-label">Plasterer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[87] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Plumber"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Plumber")}
          />
          <label className="search-label">Plumber</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[88] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Pool Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Pool Builder")}
          />
          <label className="search-label">Pool Builder</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[89] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Pool Fence Installer / Maintenance"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Pool Fence Installer / Maintenance"
            )}
          />
          <label className="search-label">
            Pool Fence Installer / Maintenance
          </label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[90] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Pool Maintenance Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Pool Maintenance Services")}
          />
          <label className="search-label">Pool Maintenance Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[91] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Pressure Cleaning Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Pressure Cleaning Services"
            )}
          />
          <label className="search-label">Pressure Cleaning Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[92] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Rainwater Tanks Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Rainwater Tanks Installer / Supplier"
            )}
          />
          <label className="search-label">
            Rainwater Tanks Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[93] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Removalist"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Removalist")}
          />
          <label className="search-label">Removalist</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[94] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Renderer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Renderer")}
          />
          <label className="search-label">Renderer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[95] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Renovation and Extensions Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Renovation and Extensions Builder"
            )}
          />
          <label className="search-label">
            Renovation and Extensions Builder
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[96] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Reproduction Stone Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Reproduction Stone Supplier"
            )}
          />
          <label className="search-label">Reproduction Stone Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[97] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Retaining Wall Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Retaining Wall Builder")}
          />
          <label className="search-label">Retaining Wall Builder</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[98] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Roller Door Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Roller Door Installer / Supplier"
            )}
          />
          <label className="search-label">
            Roller Door Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[99] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Roofer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Roofer")}
          />
          <label className="search-label">Roofer</label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[100] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Rubbish Removal Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Rubbish Removal Services")}
          />
          <label className="search-label">Rubbish Removal Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[101] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Scaffolding Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Scaffolding Services")}
          />
          <label className="search-label">Scaffolding Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[102] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Screen Enclosure Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Screen Enclosure Supplier")}
          />
          <label className="search-label">Screen Enclosure Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[103] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Security Screen Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Security Screen Installer / Supplier"
            )}
          />
          <label className="search-label">
            Security Screen Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[104] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Security Systems Specialist"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Security Systems Specialist"
            )}
          />
          <label className="search-label">Security Systems Specialist</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[105] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Shade and Sail Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Shade and Sail Installer / Supplier"
            )}
          />
          <label className="search-label">
            Shade and Sail Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[106] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Shed Builder / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Shed Builder / Supplier")}
          />
          <label className="search-label">Shed Builder / Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[107] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Shopfitter"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Shopfitter")}
          />
          <label className="search-label">Shopfitter</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[108] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Shower Screen Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Shower Screen Installer / Supplier"
            )}
          />
          <label className="search-label">
            Shower Screen Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[109] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Skip and Truck Hire Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Skip and Truck Hire Services"
            )}
          />
          <label className="search-label">Skip and Truck Hire Services</label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[110] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Skylight Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Skylight Installer / Supplier"
            )}
          />
          <label className="search-label">Skylight Installer / Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[111] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Soil Testing"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Soil Testing")}
          />
          <label className="search-label">Soil Testing</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[112] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Solar Power Installer / Maintenance"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Solar Power Installer / Maintenance"
            )}
          />
          <label className="search-label">
            Solar Power Installer / Maintenance
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[113] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Splashback Intaller / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Splashback Intaller / Supplier"
            )}
          />
          <label className="search-label">Splashback Intaller / Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[114] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Stonemason"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Stonemason")}
          />
          <label className="search-label">Stonemason</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[115] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Storage Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Storage Services")}
          />
          <label className="search-label">Storage Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[116] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Structural Engineer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Structural Engineer")}
          />
          <label className="search-label">Structural Engineer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[117] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Surveyor"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Surveyor")}
          />
          <label className="search-label">Surveyor</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[118] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Tile Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Tile Supplier")}
          />
          <label className="search-label">Tile Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[119] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Tiler"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Tiler")}
          />
          <label className="search-label">Tiler</label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[120] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Timber Floor Installation / Repairs"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Timber Floor Installation / Repairs"
            )}
          />
          <label className="search-label">
            Timber Floor Installation / Repairs
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[121] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Town Planner"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Town Planner")}
          />
          <label className="search-label">Town Planner</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[122] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Tree Feller"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Tree Feller")}
          />
          <label className="search-label">Tree Feller</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[123] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Underfloor Heating Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Underfloor Heating Installer / Supplier"
            )}
          />
          <label className="search-label">
            Underfloor Heating Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[124] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Underpinning Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Underpinning Services")}
          />
          <label className="search-label">Underpinning Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[125] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Upholstery Repairer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Upholstery Repairer")}
          />
          <label className="search-label">Upholstery Repairer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[126] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Ventilation System Specialists"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Ventilation System Specialists"
            )}
          />
          <label className="search-label">Ventilation System Specialists</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[127] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Vinyl and Laminate Installer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Vinyl and Laminate Installer"
            )}
          />
          <label className="search-label">Vinyl and Laminate Installer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[128] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Wallpaper Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Wallpaper Installer / Supplier"
            )}
          />
          <label className="search-label">Wallpaper Installer / Supplier</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[129] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Wardrobe Builder"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Wardrobe Builder")}
          />
          <label className="search-label">Wardrobe Builder</label>
        </div>

        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[130] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Waterproofer"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Waterproofer")}
          />
          <label className="search-label">Waterproofer</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[131] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Window Cleaning Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Window Cleaning Services")}
          />
          <label className="search-label">Window Cleaning Services</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[132] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Window Installer / Repairs"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Window Installer / Repairs"
            )}
          />
          <label className="search-label">Window Installer / Repairs</label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[133] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Window Shutter Installer / Supplier"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes(
              "Window Shutter Installer / Supplier"
            )}
          />
          <label className="search-label">
            Window Shutter Installer / Supplier
          </label>
        </div>
        <div className="search-checkbox-container mb-8">
          <input
            ref={(element) => {
              ref.current[134] = element;
            }}
            type="checkbox"
            className="checkbox"
            value={"Window Tinting Services"}
            onChange={(e) => jobCategoriesChangeHandler(e)}
            defaultChecked={jobCategories.includes("Window Tinting Services")}
          />
          <label className="search-label">Window Tinting Services</label>
        </div>
        <div
          className="search-job-more pointer"
          onClick={() => {
            setShowMore(false);
          }}
        >
          See less
        </div>
      </div>
      {!showMore && (
        <div
          className="search-job-more pointer"
          onClick={() => setShowMore(true)}
        >
          See more
        </div>
      )}
    </div>
  );

  const keywordsElements = () => {
    if (showKeywords) {
      return (
        <div>
          <textarea
            value={keywords}
            type="text"
            className="search-textbox"
            placeholder='e.g. "Electrician"'
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
      );
    }
  };

  const availabilityElements = () => (
    <div className={!showAvailability && "none"}>
      <div className="search-label mb-12">Can start within</div>
      <div className="mb-8 flex-center">
        <input
          ref={(element) => {
            availRef.current[0] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"today"}
          onChange={(e) => availabilityChangeHandler(e)}
          defaultChecked={availabilityToWork.includes("today") ? true : false}
        />
        <label className="search-label">Today</label>
      </div>
      <div className="mb-8 flex-center">
        <input
          ref={(element) => {
            availRef.current[1] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"3 days"}
          onChange={(e) => availabilityChangeHandler(e)}
          defaultChecked={availabilityToWork.includes("3 days") ? true : false}
        />
        <label className="search-label">In 3 days</label>
      </div>
      <div className="mb-8 flex-center">
        <input
          ref={(element) => {
            availRef.current[2] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"within a week"}
          onChange={(e) => availabilityChangeHandler(e)}
          defaultChecked={
            availabilityToWork.includes("within a week") ? true : false
          }
        />
        <label className="search-label">Within a week</label>
      </div>
      <div className="mb-8 flex-center">
        <input
          ref={(element) => {
            availRef.current[3] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"within a month"}
          onChange={(e) => availabilityChangeHandler(e)}
          defaultChecked={
            availabilityToWork.includes("within a month") ? true : false
          }
        />
        <label className="search-label">Within a month</label>
      </div>
      <div className="flex-center">
        <input
          ref={(element) => {
            availRef.current[4] = element;
          }}
          type="checkbox"
          className="checkbox"
          value={"anytime"}
          onChange={(e) => availabilityChangeHandler(e)}
          defaultChecked={availabilityToWork.includes("anytime") ? true : false}
        />
        <label className="search-label">Anytime</label>
      </div>
    </div>
  );

  const pricingElements = () => {
    if (showPricing) {
      return (
        <div>
          <label className="search-label block mb-8">Call out rate</label>
          <div className="search-two-range">
            <div className="search-slider" />
            <input
              type="range"
              className="search-range range-1 transparent"
              min={0}
              max={500}
              step={1}
              value={callOutRateMin}
              onChange={(e) => setCallOutRateMin(Number(e.target.value))}
            />
            <input
              type="range"
              className="search-range range-2 transparent"
              min={0}
              max={500}
              step={1}
              value={callOutRateMax}
              onChange={(e) => setCallOutRateMax(Number(e.target.value))}
            />
          </div>
          <div className="search-flex-rate mb-16">
            <div>${callOutRateMin}</div>
            <div>${callOutRateMax}</div>
          </div>
          <label className="search-label mb-8 block">Anytime</label>
          <div className="search-two-range">
            <div className="search-slider" />
            <input
              type="range"
              className="search-range range-1 transparent"
              min={0}
              max={500}
              step={1}
              value={pricingStartsMin}
              onChange={(e) => setPricingStartsMin(Number(e.target.value))}
            />
            <input
              type="range"
              className="search-range range-2 transparent"
              min={0}
              max={500}
              step={1}
              value={pricingStartsMax}
              onChange={(e) => setPricingStartsMax(Number(e.target.value))}
            />
          </div>
          <div className="search-flex-rate mb-16">
            <div>${pricingStartsMin}</div>
            <div>${pricingStartsMax}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Header />
      <ServicesHeader />
      <div className="search-body-container">
        <div className="search-body">
          {/* <SearchSideBar /> */}
          {isMobile ? (
            <>
              <div
                className="search-filter flex-center mb-12 pointer"
                onClick={() => setShowFilters(true)}
              >
                <ListFilter color="#5F6368" className="gray-bg" />
                Filters
              </div>
              {showFilters && (
                <div className="search-sidebard-bg scroll-lock">
                  <div className="search-sidebar">
                    <div className="search-sidebar-container">
                      <div className="search-sidebard-close flex-between flex-center mb-16">
                        <div className="flex-center">
                          <X
                            color="#717171"
                            className="pointer"
                            onClick={() => setShowFilters(false)}
                          />
                          Filters
                        </div>
                        <span
                          className="search-clear pointer"
                          onClick={clearFilter}
                        >
                          Clear
                        </span>
                      </div>
                      <div className="mb-16">
                        <div className="search-flex">
                          <label>Postcode</label>
                          {showPostcode ? (
                            <ChevronUp
                              className="pointer"
                              color="#717171"
                              onClick={() => setShowPostcode(false)}
                            />
                          ) : (
                            <ChevronDown
                              className="pointer"
                              color="#717171"
                              onClick={() => setShowPostcode(true)}
                            />
                          )}
                        </div>
                        {postCodeElements()}
                      </div>

                      <div className="mb-16">
                        <div className="search-flex">
                          <label>Location</label>
                          {showLocation ? (
                            <ChevronUp
                              className="pointer"
                              color="#717171"
                              onClick={() => setShowLocation(false)}
                            />
                          ) : (
                            <ChevronDown
                              className="pointer"
                              color="#717171"
                              onClick={() => setShowLocation(true)}
                            />
                          )}
                        </div>
                        {locationElements()}
                      </div>

                      <div className="mb-16">
                        <div className="search-flex">
                          <label>Job Category</label>
                          {showJobCategory ? (
                            <ChevronUp
                              className="pointer"
                              color="#717171"
                              onClick={() => {
                                setShowMore(false);
                                ref.current.length = 0;
                                setShowJobCategory(false);
                              }}
                            />
                          ) : (
                            <ChevronDown
                              className="pointer"
                              color="#717171"
                              onClick={() => {
                                setShowJobCategory(true);
                              }}
                            />
                          )}
                        </div>
                        {jobCategoryElements()}
                      </div>

                      <div className="mb-16">
                        <div className="search-flex">
                          <label>Keywords</label>
                          {showKeywords ? (
                            <ChevronUp
                              className="pointer"
                              color="#717171"
                              onClick={() => setShowKeywords(false)}
                            />
                          ) : (
                            <ChevronDown
                              className="pointer"
                              color="#717171"
                              onClick={() => setShowKeywords(true)}
                            />
                          )}
                        </div>
                        {keywordsElements()}
                      </div>

                      <div className="mb-16">
                        <div className="search-flex">
                          <label>Availability</label>
                          {showAvailability ? (
                            <ChevronUp
                              className="pointer"
                              color="#717171"
                              onClick={() => setShowAvailability(false)}
                            />
                          ) : (
                            <ChevronDown
                              className="pointer"
                              color="#717171"
                              onClick={() => setShowAvailability(true)}
                            />
                          )}
                        </div>
                        {availabilityElements()}
                      </div>

                      <div className="mb-16">
                        <div className="search-flex">
                          <label>Pricing</label>
                          {showPricing ? (
                            <ChevronUp
                              className="pointer"
                              color="#717171"
                              onClick={() => setShowPricing(false)}
                            />
                          ) : (
                            <ChevronDown
                              className="pointer"
                              color="#717171"
                              onClick={() => setShowPricing(true)}
                            />
                          )}
                        </div>
                        {pricingElements()}
                      </div>
                      <div className="search-btn-container">
                        <button
                          type="button"
                          className="search-sidebar-btn pointer"
                          onClick={useFilters}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="search-sidebar">
              <div className="flex-between mb-16">
                <div className="search-filter">Filters:</div>
                <span className="search-clear pointer" onClick={clearFilter}>
                  Clear
                </span>
              </div>
              <div className="mb-16">
                <div className="search-flex">
                  <label>Postcode</label>
                  {showPostcode ? (
                    <ChevronUp
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowPostcode(false)}
                    />
                  ) : (
                    <ChevronDown
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowPostcode(true)}
                    />
                  )}
                </div>
                {postCodeElements()}
              </div>

              <div className="mb-16">
                <div className="search-flex">
                  <label>Location</label>
                  {showLocation ? (
                    <ChevronUp
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowLocation(false)}
                    />
                  ) : (
                    <ChevronDown
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowLocation(true)}
                    />
                  )}
                </div>
                {locationElements()}
              </div>

              <div className="mb-16">
                <div className="search-flex">
                  <label>Job Category</label>
                  {showJobCategory ? (
                    <ChevronUp
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowJobCategory(false)}
                    />
                  ) : (
                    <ChevronDown
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowJobCategory(true)}
                    />
                  )}
                </div>
                {jobCategoryElements()}
              </div>

              <div className="mb-16">
                <div className="search-flex">
                  <label>Keywords</label>
                  {showKeywords ? (
                    <ChevronUp
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowKeywords(false)}
                    />
                  ) : (
                    <ChevronDown
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowKeywords(true)}
                    />
                  )}
                </div>
                {keywordsElements()}
              </div>

              <div className="mb-16">
                <div className="search-flex">
                  <label>Availability</label>
                  {showAvailability ? (
                    <ChevronUp
                      className="pointer"
                      color="#717171"
                      onClick={() => {
                        setShowAvailability(false);
                      }}
                    />
                  ) : (
                    <ChevronDown
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowAvailability(true)}
                    />
                  )}
                </div>
                {availabilityElements()}
              </div>

              <div className="mb-16">
                <div className="search-flex">
                  <label>Pricing</label>
                  {showPricing ? (
                    <ChevronUp
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowPricing(false)}
                    />
                  ) : (
                    <ChevronDown
                      className="pointer"
                      color="#717171"
                      onClick={() => setShowPricing(true)}
                    />
                  )}
                </div>
                {pricingElements()}
              </div>
              <div className="flex-end">
                <button
                  type="button"
                  className="search-sidebar-btn pointer"
                  onClick={useFilters}
                >
                  Done
                </button>
              </div>
            </div>
          )}
          {loading ? (
            <div
              className={isMobile ? "loading loading-page gray-bg" : "loading"}
            >
              <TailSpin
                stroke="#1f1f23"
                speed={1}
                className={isMobile && "gray-bg"}
              />
            </div>
          ) : (
            <ServicesList
              content="search"
              services={filteredServices}
              bookmarks={bookmarks}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
