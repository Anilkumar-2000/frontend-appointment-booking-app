import React from "react";

import { FiAward } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { LiaGraduationCapSolid } from "react-icons/lia";
import { LuLanguages } from "react-icons/lu";
import { GoPeople } from "react-icons/go";

// import { FiAward } from "react-icons/fi";
import "./index.css";

import { doctorsList } from "../../data/doctorsData";
import { useParams } from "react-router-dom";

const DoctorProfileDetail = () => {
  const { id } = useParams();
  console.log(id);

  const doctor = doctorsList.find(
    (eachDoctor) => eachDoctor.id === parseInt(id)
  );

  if (!doctor) return <p>Doctor not found</p>;

  console.log(doctor);

  return (
    <div className="doctor-profile-detail-main-container">
      <div className="doctor-profile-banner">
        <div className="banner-image-and-text-details-section">
          <div className="image-container">
            <img
              src={doctor.imageUrl}
              className="doctor-profile-image"
              alt={doctor.name}
            />
          </div>

          <div className="text-details-container">
            <h1 className="doctor-name">{doctor.name}</h1>
            <p className="doctor-specialization">{doctor.specialization}</p>

            <div className="rating-and-experience-cont">
              <div className="rating-cont">
                <GoStarFill size="20" className="star-icon" />
                <p>
                  {doctor.rating} ( {doctor.reviews} reviews )
                </p>
              </div>
              <div className="rating-cont">
                <MdAccessTime size="20" className="time-icon" />
                <p>{doctor.experience} experience</p>
              </div>
            </div>

            <div className="category-and-next-available-time-cont">
              <p className="doctor-profile-details-category">
                {doctor.category}
              </p>
              <p className="doctor-available">{doctor.nextAvailable}</p>
            </div>
          </div>
        </div>

        <div className="location-fee-and-available-cont-wrapper">
          <div className="location-fee-and-available-cont">
            <div className="location-cont">
              <CiLocationOn size="30" className="location-icon" />
              <div className="location-text-details">
                <p className="location-title">Location</p>
                <p className="location-name">{doctor.location}</p>
              </div>
            </div>
          </div>

          <div className="location-fee-and-available-cont">
            <div className="location-cont">
              <MdOutlineAttachMoney size="30" className="location-icon" />
              <div className="location-text-details">
                <p className="location-title">Consultation Fee</p>
                <p className="location-name">{doctor.consultationFee}</p>
              </div>
            </div>
          </div>

          <div className="location-fee-and-available-cont">
            <div className="location-cont">
              <CiCalendar size="30" className="location-icon" />
              <div className="location-text-details">
                <p className="location-title">Available</p>
                <p className="location-name">{doctor.availability.weekdays}</p>
                <p className="doctor-timings">{doctor.availability.timings}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-doctor-and-appointment-booking-cont-wrapper">
        <div className="about-container">
          <h2>About {doctor.name}</h2>
          <p>{doctor.about}</p>
        </div>
        <div className="booking-container">
          <h2>Book Appointment</h2>

          <div className="booking-btns-cont">
            <button type="button" className="button schedule-consultation-btn">
              Schedule Consultation
            </button>
            <button type="button" className="button call-now-btn">
              Call Now
            </button>
          </div>
        </div>
      </div>

      <div className="education-experience-and-language-container">
        <div className="education-and-experience-cont">
          <div className="icon-and-heading-cont">
            <LiaGraduationCapSolid size="30" className="graduation-icon" />
            <h2>Education & Experience</h2>
          </div>

          <div className="education-cont">
            <h2>Education</h2>
            <p>{doctor.education}</p>
          </div>
          <div className="experience-cont">
            <h2>Experience</h2>
            <p>{doctor.experience}</p>
          </div>
        </div>

        <div className="languages-and-next-available-cont-wrapper">
          <div className="language-spoken-cont">
            <div className="icon-and-language-heading">
              <LuLanguages size="25" className="language-icon" />
              <h2>Languages Spoken</h2>
            </div>

            <div className="languages-cont">
              {doctor.languagesSpoken.map((eachLang) => (
                <p className="language" key={eachLang}>
                  {eachLang}
                </p>
              ))}
            </div>
          </div>
          <div className="next-available-cont">
            <h3>Next Available</h3>
            <h2>{doctor.nextAvailable}</h2>
            <p>{doctor.availability.timings}</p>
          </div>
        </div>
      </div>

      <div className="awards-and-membership-cont-wrapper">
        <div className="awards-cont">
          <div className="icon-and-award-heading">
            <FiAward size="25" className="award-icon" />
            <h2>Achievements & Awards</h2>
          </div>

          <div className="key-achievements">
            <h3>Key Achievements</h3>
            {doctor.achievements.map((each) => (
              <li key={each}>{each}</li>
            ))}
          </div>
          <div className="awards">
            <h3>Awards</h3>
            {doctor.awards.map((each) => (
              <li key={each}>{each}</li>
            ))}
          </div>
        </div>
        <div className="membership-container">
          <div className="icon-and-membership-container">
            <GoPeople size="25" className="people-icon" />
            <h2>Professional Memberships</h2>
          </div>

          <div className="taken-place-in-membership-cont">
            {doctor.memberships.map((each) => (
              <p key={each}>{each}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileDetail;
