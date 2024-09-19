import React from "react";
import "../styles/Search.css";
import { ChevronUp } from "lucide-react";

const SearchSideBar = () => {
  return (
    <div className="search-sidebar">
      <div className="search-filter search-mb-16">Filters:</div>

      <div className="search-mb-16">
        <div className="search-flex">
          <label>Postcode</label>
          <ChevronUp color="#717171" />
        </div>
        <div>
          <select className="search-select">
            <option disabled selected hidden>
              Select Postcode
            </option>
            <option>1000</option>
            <option>2000</option>
            <option>3000</option>
            <option>4000</option>
            <option>5000</option>
          </select>
        </div>
      </div>

      <div className="search-mb-16">
        <div className="search-flex">
          <label>Location</label>
          <ChevronUp color="#717171" />
        </div>
        <div>
          <div className="search-flex">
            <label className="search-within">Within</label>
            <div className="search-km-1">20km</div>
          </div>
          <input type="range" className="search-range" />
          <div className="search-km-2">0km</div>
        </div>
      </div>

      <div className="search-mb-16">
        <div className="search-flex">
          <label>Job Category</label>
          <ChevronUp color="#717171" />
        </div>
        <div>
          <div className="search-mb-8 flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Aircon Installer</label>
          </div>
          <div className="search-mb-8 flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Appliance Repair</label>
          </div>
          <div className="search-mb-8 flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Builder</label>
          </div>
          <div className="search-mb-8 flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Garage Builder</label>
          </div>
          <div className="flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Pest Control Services</label>
          </div>
          <div className="search-job-more">See more</div>
        </div>
      </div>

      <div className="search-mb-16">
        <div className="search-flex">
          <label>Keywords</label>
          <ChevronUp color="#717171" />
        </div>
        <div>
          <textarea
            type="text"
            className="search-textbox"
            placeholder="e.g. ‘‘Electrician’’"
          />
        </div>
      </div>

      <div className="search-mb-16">
        <div className="search-flex">
          <label>Availability</label>
          <ChevronUp color="#717171" />
        </div>
        <div>
          <div className="search-label search-mb-12">Can start within</div>
          <div className="search-mb-8 flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Today</label>
          </div>
          <div className="search-mb-8 flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">In 3 days</label>
          </div>
          <div className="search-mb-8 flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Within a week</label>
          </div>
          <div className="search-mb-8 flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Within a month</label>
          </div>
          <div className="flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Anytime</label>
          </div>
        </div>
      </div>

      <div>
        <div className="search-flex">
          <label>Pricing</label>
          <ChevronUp color="#717171" />
        </div>
        <div>
          <div className="search-mb-8 flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Call out rate</label>
          </div>
          <div className="search-ml-35">
            <div className="search-two-range">
              <input type="range" className="search-range range-1" />
              <input type="range" className="search-range range-2" />
            </div>
            <div className="search-flex-rate search-mb-16">
              <div>$5</div>
              <div>$500</div>
            </div>
          </div>
          <div className="search-mb-8 flex-center">
            <input type="checkbox" className="search-checkbox" />
            <label className="search-label">Anytime</label>
          </div>
          <div className="search-ml-35">
            <div className="search-two-range">
              <input type="range" className="search-range range-1" />
              <input type="range" className="search-range range-2" />
            </div>
            <div className="search-flex-rate search-mb-16">
              <div>$5</div>
              <div>$500</div>
            </div>
          </div>
        </div>
      </div>

      <span className="search-clear">Clear</span>
    </div>
  );
};

export default SearchSideBar;
