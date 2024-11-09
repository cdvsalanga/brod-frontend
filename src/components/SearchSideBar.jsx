import React, { useState } from "react";
import "../styles/Search.css";
import { ChevronDown, ChevronUp, ListFilter, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";

const SearchSideBar = () => {
  const isMobile = useMediaQuery({ query: "(max-width:768px)" });

  const [showPostcode, setShowPostcode] = useState(
    useMediaQuery({ query: "(max-width:768px)" }) ? false : true
  );
  const [showLocation, setShowLocation] = useState(
    useMediaQuery({ query: "(max-width:768px)" }) ? false : true
  );
  const [showJobCategory, setShowJobCategory] = useState(
    useMediaQuery({ query: "(max-width:768px)" }) ? false : true
  );
  const [showKeywords, setShowKeywords] = useState(
    useMediaQuery({ query: "(max-width:768px)" }) ? false : true
  );
  const [showAvailability, setShowAvailability] = useState(
    useMediaQuery({ query: "(max-width:768px)" }) ? false : true
  );
  const [showPricing, setShowPricing] = useState(
    useMediaQuery({ query: "(max-width:768px)" }) ? false : true
  );
  const [showFilters, setShowFilters] = useState(
    useMediaQuery({ query: "(max-width:768px)" }) ? false : true
  );

  return isMobile ? (
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
                <span className="search-clear">Clear</span>
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
                {showPostcode && (
                  <div>
                    <select defaultValue={""} className="search-select">
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
                )}
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
                {showLocation && (
                  <div>
                    <div className="search-flex">
                      <label className="search-within">Within</label>
                      <div className="search-km-1">20km</div>
                    </div>
                    <input type="range" className="search-range" />
                    <div className="search-km-2">0km</div>
                  </div>
                )}
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
                {showJobCategory && (
                  <div>
                    <div className="mb-8 flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">Aircon Installer</label>
                    </div>
                    <div className="mb-8 flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">Appliance Repair</label>
                    </div>
                    <div className="mb-8 flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">Builder</label>
                    </div>
                    <div className="mb-8 flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">Garage Builder</label>
                    </div>
                    <div className="flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">
                        Pest Control Services
                      </label>
                    </div>
                    <div className="search-job-more pointer">See more</div>
                  </div>
                )}
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
                {showKeywords && (
                  <div>
                    <textarea
                      type="text"
                      className="search-textbox"
                      placeholder='e.g. "Electrician"'
                    />
                  </div>
                )}
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
                {showAvailability && (
                  <div>
                    <div className="search-label mb-12">Can start within</div>
                    <div className="mb-8 flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">Today</label>
                    </div>
                    <div className="mb-8 flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">In 3 days</label>
                    </div>
                    <div className="mb-8 flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">Within a week</label>
                    </div>
                    <div className="mb-8 flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">Within a month</label>
                    </div>
                    <div className="flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">Anytime</label>
                    </div>
                  </div>
                )}
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
                {showPricing && (
                  <div>
                    <div className="mb-8 flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">Call out rate</label>
                    </div>
                    <div className="search-ml-35">
                      <div className="search-two-range">
                        <input type="range" className="search-range range-1" />
                        <input type="range" className="search-range range-2" />
                      </div>
                      <div className="search-flex-rate mb-16">
                        <div>$5</div>
                        <div>$500</div>
                      </div>
                    </div>
                    <div className="mb-8 flex-center">
                      <input type="checkbox" className="search-checkbox" />
                      <label className="search-label">Anytime</label>
                    </div>
                    <div className="search-ml-35">
                      <div className="search-two-range">
                        <input type="range" className="search-range range-1" />
                        <input type="range" className="search-range range-2" />
                      </div>
                      <div className="search-flex-rate mb-16">
                        <div>$5</div>
                        <div>$500</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="search-btn-container">
                <button className="search-sidebar-btn">Done</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="search-sidebar">
      <div className="search-filter mb-16">Filters:</div>
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
        {showPostcode && (
          <div>
            <select defaultValue={""} className="search-select">
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
        )}
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
        {showLocation && (
          <div>
            <div className="search-flex">
              <label className="search-within">Within</label>
              <div className="search-km-1">20km</div>
            </div>
            <input type="range" className="search-range" />
            <div className="search-km-2">0km</div>
          </div>
        )}
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
        {showJobCategory && (
          <div>
            <div className="mb-8 flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Aircon Installer</label>
            </div>
            <div className="mb-8 flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Appliance Repair</label>
            </div>
            <div className="mb-8 flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Builder</label>
            </div>
            <div className="mb-8 flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Garage Builder</label>
            </div>
            <div className="flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Pest Control Services</label>
            </div>
            <div className="search-job-more pointer">See more</div>
          </div>
        )}
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
        {showKeywords && (
          <div>
            <textarea
              type="text"
              className="search-textbox"
              placeholder='e.g. "Electrician"'
            />
          </div>
        )}
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
        {showAvailability && (
          <div>
            <div className="search-label mb-12">Can start within</div>
            <div className="mb-8 flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Today</label>
            </div>
            <div className="mb-8 flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">In 3 days</label>
            </div>
            <div className="mb-8 flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Within a week</label>
            </div>
            <div className="mb-8 flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Within a month</label>
            </div>
            <div className="flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Anytime</label>
            </div>
          </div>
        )}
      </div>

      <div>
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
        {showPricing && (
          <div>
            <div className="mb-8 flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Call out rate</label>
            </div>
            <div className="search-ml-35">
              <div className="search-two-range">
                <input type="range" className="search-range range-1" />
                <input type="range" className="search-range range-2" />
              </div>
              <div className="search-flex-rate mb-16">
                <div>$5</div>
                <div>$500</div>
              </div>
            </div>
            <div className="mb-8 flex-center">
              <input type="checkbox" className="search-checkbox" />
              <label className="search-label">Anytime</label>
            </div>
            <div className="search-ml-35">
              <div className="search-two-range">
                <input type="range" className="search-range range-1" />
                <input type="range" className="search-range range-2" />
              </div>
              <div className="search-flex-rate mb-16">
                <div>$5</div>
                <div>$500</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <span className="search-clear">Clear</span>
    </div>
  );
};

export default SearchSideBar;
