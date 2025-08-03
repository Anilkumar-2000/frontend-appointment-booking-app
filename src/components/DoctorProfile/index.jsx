import "./index.css";
import { GoStarFill } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import Calendar from "react-calendar";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";

import { v7 as uuidv7 } from "uuid";

import toast from "react-hot-toast";

import "react-calendar/dist/Calendar.css";

import Popup from "reactjs-popup";

import { useState, useEffect } from "react";

// import { Link } from "react-router-dom";

const DoctorProfile = (props) => {
  const { doctorDetails } = props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState([]);
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("selected date:", date.toDateString());
  };

  const handleFormData = (event) => {
    event.preventDefault();
    const newPatient = {
      id: uuidv7,
      fullName,
      email,
      phoneNumber,
      time,
      selectedDate,
      booked: `Your Appointment is Booked Successfully with ${
        doctorDetails.name
      } on ${selectedDate.toDateString()} at ${time}`,
    };
    setFormData((prev) => [...prev, newPatient]);
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setSelectedDate("");
    setTime("");
  };

  const generateTimeSlots = (
    startHour = 9,
    endHour = 16,
    intervalMinutes = 30
  ) => {
    const slots = [];
    let id = 1;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        // Skip the last 30-minute slot after 4:00 PM
        if (hour === endHour && minute > 0) continue;

        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);

        const formattedTime = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        slots.push({
          id: id++,
          time: formattedTime,
        });
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    console.log("nani array ", formData);
  }, [formData]);

  return (
    <div className="doctor-profile-container">
      <div className="doctor-image-and-text-details-cont">
        <div className="">
          <img
            alt={doctorDetails.name}
            className="doctor-image"
            src={doctorDetails.imageUrl}
          />
        </div>

        <div className="doctor-text-details-cont">
          <h2>{doctorDetails.name}</h2>
          <div className="doctor-category-wrapper-cont">
            <p className="doctor-category">{doctorDetails.category}</p>
          </div>

          <div className="rating-and-location-wrapper-cont">
            <div className="rating-container">
              <GoStarFill size="20" className="star-icon" />
              <p>{doctorDetails.rating}</p>
            </div>

            <div className="rating-container">
              <CiLocationOn size="20" className="location-icon" />
              <p>{doctorDetails.location}</p>
            </div>
          </div>

          <div className="available-cont">
            <MdAccessTime size="20" />
            <p>
              Next available:{"  "}
              {doctorDetails.nextAvailable}
            </p>
          </div>

          <p>{doctorDetails.experience} of experience </p>
        </div>
      </div>

      <div className="buttons-container">
        <button
          type="button"
          className="view-profile-button  button"
          onClick={() => navigate(`/doctor-profile-detail/${doctorDetails.id}`)}
        >
          View Profile
        </button>

        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="book-appointment-button  button">
                Book Appointment
              </button>
            }
          >
            {(close) => (
              <>
                <div className="popup-controller-cont-wrapper">
                  <div className="popup-content-container">
                    <div className="close-button-container">
                      <button
                        type="button"
                        className="close-button"
                        onClick={() => close()}
                      >
                        <IoClose size="25" />
                      </button>
                    </div>
                    <div className="popup-body-container">
                      <div className="popup-image-and-text-details-container">
                        <img
                          alt={doctorDetails.name}
                          className="popup-image"
                          src={doctorDetails.imageUrl}
                        />
                        <div className="popup-text-details">
                          <h2>Book Appointment</h2>
                          <p>with {doctorDetails.name}-</p>
                          <p>Specialized in {doctorDetails.category}</p>
                        </div>
                      </div>

                      <div className="calendar-and-form-container">
                        <div className="calendar-container">
                          <div className="popup-icon-and-calendar-heading">
                            <CiCalendar size="25" className="calendar-icon" />
                            <h2>Select Date</h2>
                          </div>
                          <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            view="month"
                            maxDetail="month"
                            prevLabel="Prev Month"
                            nextLabel="Next Month"
                            showNeighboringMonth={false}
                          />
                        </div>
                        <div className="form-container">
                          <div className="icon-and-patient-info-heading">
                            <GoPerson size="25" className="person-icon" />
                            <h2>Patient Information</h2>
                          </div>
                          <form
                            className="submission-form-container"
                            onSubmit={handleFormData}
                          >
                            <div className="full-name-input-container">
                              <label htmlFor="fullName" className="full-name">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                className="name-input"
                                id="fullName"
                                placeholder="Enter patient's full name"
                                onChange={(event) =>
                                  setFullName(event.target.value)
                                }
                                value={fullName}
                              />
                            </div>
                            <div className="full-name-input-container">
                              <div className="popup-icon-and-title-cont">
                                <HiOutlineMail
                                  size="25"
                                  className="mail-icon"
                                />
                                <label htmlFor="email" className="full-name">
                                  Email *
                                </label>
                              </div>
                              <input
                                type="text"
                                className="name-input"
                                id="email"
                                placeholder="Enter mail address"
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                                value={email}
                              />
                            </div>
                            <div className="full-name-input-container">
                              <div className="popup-icon-and-title-cont">
                                <FiPhone size="25" className="mail-icon" />
                                <label
                                  htmlFor="phone-number"
                                  className="full-name"
                                >
                                  Phone Number *
                                </label>
                              </div>
                              <input
                                type="text"
                                className="name-input"
                                id="phone-number"
                                placeholder="Enter phone number"
                                onChange={(event) =>
                                  setPhoneNumber(event.target.value)
                                }
                                value={phoneNumber}
                              />
                            </div>
                            <div className="full-name-input-container">
                              <div className="popup-icon-and-title-cont">
                                <MdAccessTime size="25" className="mail-icon" />
                                <label htmlFor="time" className="full-name">
                                  Time *
                                </label>
                              </div>
                              <select
                                className="name-input"
                                onChange={(event) =>
                                  setTime(event.target.value)
                                }
                              >
                                {timeSlots.map((eachTime) => (
                                  <option
                                    key={eachTime.id}
                                    className="name-input"
                                    value={eachTime.time}
                                  >
                                    {eachTime.time}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <button type="submit" className="submit-button">
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>

                      <div className="patient-details-container">
                        {formData.map((each) => (
                          <div
                            className="patient-details-display-container"
                            key={each.id}
                          >
                            <p> {`Patient Name: ${each.fullName}`}</p>
                            <p>
                              {" "}
                              {`Appointment date: ${each.selectedDate.toDateString()}`}
                            </p>
                            <p> {`Appointment time: ${each.time}`}</p>
                            <p>{`Email: ${each.email}`}</p>
                            <p>{`Contact No: ${each.phoneNumber}`}</p>
                            <p>{`Appointment Status: ${each.booked}`}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
