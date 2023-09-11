import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import config from "../../config";
import CheckboxFilter from "../CheckboxFilter/CheckboxFilter";
import SortingFilter from "../SortingFilter/SortingFilter";
import ListingsTableView from "../ListingsTableView/ListingsTableView";
import "./Explore.css";

export default function Explore() {
  // STATES :
  const [listingsData, setListingsData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [sortby, setSortBy] = useState("");

  async function fetchListings() {
    try {
      const response = await axios.get(
        `${config.backendEnpoint}/real-estate-data`
      );
      setListingsData(response.data.listings);
    } catch (error) {
      console.log(error);
    }
  }

  //   FILTERShANDLERS:

  const handleLocationFilterChange = (event) => {
    const isChecked = event.target.checked;
    // if a location filter is checked, then add it to the locationFilter state
    if (isChecked)
      setLocationFilter((prevState) => [...prevState, event.target.value]);
    // if a location filter is not checked, then remove it to the locationFilter state
    else
      setLocationFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
  };

  const handlePriceRangeFilterChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked)
      setPriceRangeFilter((prevState) => [...prevState, event.target.value]);
    else
      setPriceRangeFilter((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
  };

  const handleSortByChange = (event) => {
    // if dropdown is selected then add it to the sortBy state
    setSortBy(event.target.value);
  };

  //   USEEFFECTS:

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      {/* Header */}
      <Header onPage="explore" />

      <div className="property-listings-view">
        {/* CheckboxFilter */}

        <CheckboxFilter
          handleLocationFilterChange={handleLocationFilterChange}
          handlePriceRangeFilterChange={handlePriceRangeFilterChange}
          locationFilter={locationFilter}
          priceRangeFilter={priceRangeFilter}
        />

        {/* SortingFilter */}
        <SortingFilter
          sortby={sortby}
          handleSortByChange={handleSortByChange}
        />

        {/* ListingTableView */}
        <ListingsTableView
          listingsData={listingsData}
          priceRangeFilter={priceRangeFilter}
          locationFilter={locationFilter}
          sortby={sortby}
        />
      </div>
    </>
  );
}
