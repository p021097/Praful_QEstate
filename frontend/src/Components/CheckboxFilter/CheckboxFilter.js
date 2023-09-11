import React from "react";
import "../Explore/Explore.css";

const location = ["Sintra", "Amper", "Świnna", "Hanji"];
const prices = ["0 - 300000", "300001 - 600000", "600001 - 1000000"];

export default function CheckboxFilter({
  handleLocationFilterChange,
  handlePriceRangeFilterChange,
  priceRangeFilter,
  locationFilter,
}) {
  return (
    <div className="checkbox-filter-container">
      {/* ----------------------------------------------------------- */}
      {/* LOCATION BASED FILTER */}
      <div className="filter">
        <h2>Location</h2>
        {location.map((location, index) => (
          <div key={index}>
            <lable>
              <input
                type="checkbox"
                value={location}
                checked={locationFilter.includes(location)}
                onChange={handleLocationFilterChange}
              />
              {location}
            </lable>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------ */}
      {/* PRICE BASED FILTER */}

      <div className="filter">
        <h2>Price Range</h2>
        {prices.map((price, index) => (
          <div key={index}>
            <lable>
              <input
                type="checkbox"
                value={price}
                checked={priceRangeFilter.includes(price)}
                onChange={handlePriceRangeFilterChange}
              />
              {price}
            </lable>
          </div>
        ))}
      </div>
    </div>
  );
}
