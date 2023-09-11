import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="first-col">
        <h1 className="company-name">QEstate Homes</h1>
        <div className="company-description">
          lorem-ipsum.paragraphIn officia eiusmod id consequat dolore cupidatat
          dolor ut cupidatat non voluptate amet. Dolore fugiat non proident id
          qui mollit. Cupidatat labore dolore Lorem amet veniam pariatur eiusmod
          veniam cillum eiusmod sit sint. Veniam consectetur quis ipsum Lorem
          voluptate pariatur non excepteur eiusmod consectetur. Non pariatur
          incididunt non consequat sit incididunt ex. Commodo non cillum amet
          duis non commodo.
        </div>
      </div>
      <div className="second-col">
        <h1 className="link-header">Contact</h1>
        <ul className="link-items">
          <li>Bengaluru, India</li>
          <li>QEstate@gmail.com</li>
          <li>+91 1443146412</li>
          <li>1315484154515</li>
        </ul>
      </div>
    </div>
  );
}
