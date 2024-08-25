import React from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ setSearchQuery }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm"
      style={{
        backgroundColor: "white",
        width: "100%",
        height: "40px",
        padding: 0,
      }}
    >
      <div
        className="d-flex justify-content-between"
        style={{ width: "100%", padding: "0 15px" }}
      >
        <div className="d-flex align-items-center font-weight-bold">
          Dashboard V2
        </div>

        <div className="mx-auto position-relative" style={{ width: "450px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search any widget..."
            style={{
              fontSize: "1rem",
              height: "22px",
              paddingLeft: "2.5rem",
              textAlign: "center",
              backgroundColor: "#f1f4f8",
              border: "1px solid #ccc",
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#aaa",
              fontSize: "1rem",
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
