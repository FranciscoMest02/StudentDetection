import React from "react";
import Image from "next/image";

function Navbar() {
  return (
    <div className="navbar">
      <div className="flex items-center">
        <div className="search-bar">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <div className="profile flex items-center">
          {" "}
          {/* Add a flex container */}
          <div className="profile-photol">
            <Image
              src="/panchito.png"
              alt="Profile Photo"
              width={40}
              height={40}
            />
          </div>
          <span className="profile-name">Francisco Mestizo</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
