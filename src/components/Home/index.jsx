import React, { use, useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineToday } from "react-icons/md";

import DoctorProfile from "../DoctorProfile";

import "./index.css";

const Home = (props) => {
  const { doctorsList, doctorTabs } = props;

  const [activeTab, setActiveTab] = useState(doctorTabs[0].label);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredDoctors = doctorsList.filter(
    (each) => each.category === activeTab
  );
  console.log(searchName);
  console.log(filteredDoctors);
  const filterBySearchDoctor = filteredDoctors.filter((each) =>
    each.name.toLowerCase().includes(searchName.toLowerCase())
  );
  const filterBySearchLocation = filterBySearchDoctor.filter((each) =>
    each.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  // console.log("doctor List", doctorsList)
  // console.log("doctor tab", doctorTabs)
  // console.log(activeTab)

  return (
    <div className="Home-main-container">
      <div className="home-banner-section">
        <div className="title-and-contact-info-cont">
          <div className="title-and-description">
            <div className="icon-cont">
              <FaRegHeart size="40" />
            </div>
            <div className="title-and-desc-cont">
              <h1>HealthCare Connect</h1>
              <p>Your trusted healthcare partner</p>
            </div>
          </div>
          <div className="contact-info-and-open-cont-wrapper">
            <div className="contact-info-cont">
              <IoCallOutline size="25" />
              <p>24/7 Support: (555) 123-4567 </p>
            </div>

            <div className="open-container-cont">
              <MdAccessTime size="25" />
              <p>Open 24 Hours</p>
            </div>
          </div>
        </div>

        <div className="booking-app-cont">
          <h1>Book Your Medical Appointment</h1>
          <p>
            Connect with qualified and scheduled appointments at your conveience
          </p>
        </div>

        <div className="additional-fecilities-wrapper">
          <div className="additions-fecilities-cont">
            <p className="para">500+ Doctors</p>
            <p className="para">50+ Specilities</p>
            <p className="para">98% Satisfaction</p>
          </div>
        </div>
      </div>
      <div className="find-your-doctor-cont-wrapper">
        <div className="find-your-doctor-cont">
          <div className="find-your-doctor-container">
            <CiFilter size="40" className="filter-icon" />
            <h2 className="find-your-doctor-title">Find Your Doctor</h2>
          </div>

          <div className="filter-inputs-cont">
            <div className="name-search-container">
              <CiSearch size="30" className="search-icon" />
              <input
                type="search"
                className="input-element"
                placeholder="Search Doctor"
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
              />
            </div>

            <div className="name-search-container">
              <CiLocationOn size="30" className="search-icon" />
              <input
                type="search"
                className="input-element"
                placeholder="Location"
                value={searchLocation}
                onChange={(event) => setSearchLocation(event.target.value)}
              />
            </div>

            <div className="name-search-container">
              <MdOutlineToday size="30" className="search-icon" />
              <input
                type="date"
                className="input-element"
                placeholder="Today"
              />
            </div>
          </div>

          <div className="doctors-tab-cont-wrapper">
            <h3 className="specilities-heading">Specialities</h3>
            <div className="doctors-tab-container">
              {doctorTabs.map((each) => (
                <button
                  type="button"
                  className={`doctor-tab-btn  ${
                    each.label === activeTab ? "active-tab-btn" : ""
                  } `}
                  onClick={() => setActiveTab(each.label)}
                  key={each.id}
                >
                  {each.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="doctor-list-container-wrapper">
        <div className="doctors-list-container">
          {filterBySearchLocation.map((each) => (
            <DoctorProfile key={each.id} doctorDetails={each} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
