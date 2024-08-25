import React, { useContext, useState, useEffect } from "react";
import { WidgetContext } from "../context/WidgetContext";
import AddWidgetModal from "./AddWidgetModal";
import CategorySection from "./CategorySection";
import Navbar from "./Navbar";
import { FaSyncAlt, FaClock, FaChevronUp } from "react-icons/fa"; 
import { BsThreeDotsVertical } from "react-icons/bs";

const Dashboard = () => {
  const { categories, removeWidget, refreshWidgets } =
    useContext(WidgetContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  const categoryHeadings = {
    CSPM: "Cloud Security Posture Management",
    CWPP: "Cloud Workload Protection Platform",
    Image: "Image Scanning & Security",
    Ticket: "Ticket Management",
  };

  const filteredCategories = Object.keys(categories).map((categoryKey) => ({
    name: categoryKey,
    heading: categoryHeadings[categoryKey],
    widgets: categories[categoryKey].widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const toggleOptionsMenu = () => {
    setShowOptions(!showOptions);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setShowOptions(false);
    setLastRefreshTime(new Date());
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRefresh = () => {
    refreshWidgets();
    setLastRefreshTime(new Date());
    console.log("Dashboard refreshed");
  };

  const getTimeAgo = (time) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min ago`;
    } else {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hr ago`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefreshTime((prevTime) => new Date(prevTime));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="navbar-container">
        <Navbar setSearchQuery={setSearchQuery} />
      </div>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
          <h5 className="font-weight-bold">CNAPP Dashboard</h5>
          <div className="d-flex align-items-center">
            <button
              className="add-widget-button spacing-right"
              onClick={openModal}
              style={{ marginRight: "10px", backgroundColor: "white" }}
            >
              Add Widget +
            </button>
            <button
              className="refresh-button spacing-right"
              onClick={handleRefresh}
              style={{
                borderColor: "rgb(207, 205, 205)",
                borderWidth: "1px",
                borderStyle: "solid",
                marginRight: "10px",
                backgroundColor: "white",
              }}
            >
              <FaSyncAlt color="rgb(160, 160, 163)" size="15px" />
            </button>
            <div style={{ position: "relative" }}>
              <button
                className="options-button"
                style={{
                  borderColor: "rgb(207, 205, 205)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  background: "transparent",
                  cursor: "pointer",
                  backgroundColor: "white",
                  marginRight: "10px",
                }}
                onClick={toggleOptionsMenu}
              >
                <BsThreeDotsVertical color="rgb(160, 160, 163)" size="15px" />
              </button>

              {showOptions && (
                <div
                  className="options-menu"
                  style={{
                    position: "absolute",
                    right: 0,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    borderRadius: "4px",
                    zIndex: 1000,
                  }}
                >
                  <button
                    className="three-dot"
                    onClick={openModal}
                    style={{
                      display: "block",
                      width: "100px",
                      padding: "8px",
                      border: "none",
                      background: "transparent",
                      textAlign: "right",
                      cursor: "pointer",
                    }}
                  >
                    + Add Widget
                  </button>
                </div>
              )}
            </div>

            <div
              className="time-ago-section"
              style={{
                display: "flex",
                alignItems: "center",
                color: "#0243a4",
                fontSize: "14px",
                marginRight: "10px",
                borderColor: "#0243a4",
                borderWidth: "1px",
                borderStyle: "solid",
                backgroundColor: "white",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              <FaClock
                style={{
                  marginRight: "10px",
                  color: "#0243a4",
                }}
              />
              <div
                style={{
                  height: "20px",
                  width: "1px",
                  backgroundColor: "#0243a4",
                  marginRight: "10px",
                  color: "#0243a4",
                }}
              />
              <span>{getTimeAgo(lastRefreshTime)}</span>
              <FaChevronUp
                style={{ marginLeft: "5px", color: "#0243a4" }}
              />{" "}
              {/* Adding the Chevron Up icon */}
            </div>
          </div>
        </div>

        {filteredCategories.map((category) => (
          <CategorySection
            key={category.name}
            category={category}
            widgets={category.widgets}
            removeWidget={removeWidget}
            openModal={openModal}
          />
        ))}

        {isModalOpen && <AddWidgetModal closeModal={closeModal} />}
      </div>
    </>
  );
};

export default Dashboard;
