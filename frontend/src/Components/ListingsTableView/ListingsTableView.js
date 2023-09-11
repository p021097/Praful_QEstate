import React, { useEffect, useState } from "react";
import EditModal from "../EditModal/EditModal";
import "./ListingsTableView.css";

export default function ListingsTableView({
  listingsData,
  priceRangeFilter,
  locationFilter,
  sortby,
}) {
  // STATES:
  // currentPage
  // filterData
  // selectedRows
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // VARIABLES
  let itemsPerPage = 10;
  let displayData = applyFilters(
    filteredData,
    locationFilter,
    priceRangeFilter,
    sortby
  );
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const isAllSelected = selectedRows.length === itemsPerPage;

  // EDITING FUNCTIONS;
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (editedItem) => {
    const updatedData = [...filteredData];
    const indexToBeEdited = updatedData.findIndex(
      (item) => item.property_id === editingItem.property_id
    );
    if (indexToBeEdited !== -1) {
      updatedData[indexToBeEdited] = editedItem;
      setFilteredData(updatedData);
    }
    setEditingItem(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
  };

  // DELETE FUNCTIONS;

  const handleDelete = (id) => {
    const updatedData = filteredData.filter((ele) => ele.property_id !== id);

    const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }
    setFilteredData(updatedData);
    setSelectedRows([]);
  };

  const handleDeleteAllSelected = () => {
    if (selectedRows.length === 0) return;
    const updatedData = filteredData.filter(
      (property) => !selectedRows.includes(property.property_id)
    );

    const updatedTotalPages = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedTotalPages) setCurrentPage(updatedTotalPages);
    setFilteredData(updatedData);
    setSelectedRows([]);
  };

  // CHECKBOX HANDLERS;
  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };
  const handleSlectAll = (event, displayData) => {
    const isAllChecked = event.target.checked;
    if (isAllChecked) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      let rowsSelected = [];
      for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
        if (i < displayData.length)
          rowsSelected.push(displayData[i].property_id);
        else rowsSelected.push(Math.random());
      }

      setSelectedRows(rowsSelected);
    } else {
      setSelectedRows([]);
    }
  };

  // PAGINATION HANDLERS;

  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setSelectedRows([]);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setSelectedRows([]);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setSelectedRows([]);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };

  // NORMAL METHODS;

  function applyFilters(filteredData, location, priceRange, sortBy) {
    let updatedData = [...filteredData];
    if (location.length) {
      updatedData = updatedData.filter((listing) =>
        location.includes(listing.city)
      );
    }
    if (priceRange.length) {
      updatedData = updatedData.filter((listing) => {
        let found = false;
        priceRange.forEach((rangeEntry) => {
          let low = rangeEntry.split("-")[0];
          let high = rangeEntry.split("-")[1];
          if (
            Number(listing.price) >= Number(low) &&
            Number(listing.price) <= Number(high)
          )
            found = true;
        });
        return found;
      });
    }
    if (sortBy === "price") {
      updatedData.sort(
        (firstListing, secondListing) => firstListing - secondListing
      );
    } else if (sortBy === "date") {
      updatedData.sort(
        (firstListing, secondListing) =>
          new Date(firstListing.listing_date) -
          new Date(secondListing.listing_date)
      );
    }
    console.log("Updated Data", updatedData);
    return updatedData;
  }

  const getPageNumber = (totalPages) => {
    const pageNumbers = [];
    for (let currPage = 1; currPage <= totalPages; currPage++)
      pageNumbers.push(currPage);
    return pageNumbers;
  };

  const pageNumbers = getPageNumber(totalPages);

  // USEEFFECTS

  useEffect(() => {
    setFilteredData(listingsData);
  }, [listingsData]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [locationFilter, priceRangeFilter]);

  return (
    <div className="listings-table-container">
      {/* TABLE */}

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(event) => handleSlectAll(event, displayData)}
              />
            </th>
            <th>Property Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listings Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayData.slice(startIndex, endIndex).map((items, index) => (
            <tr className={"table-row"}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(items.property_id)}
                  onChange={(event) =>
                    handleRowCheckboxChange(event, items.property_id)
                  }
                />
              </td>
              <td className="property-name">{items.property_name}</td>
              <td>Rs {items.price}</td>
              <td>{items.address}</td>
              <td>{items.listing_date}</td>
              <td className="action-items">
                <span>
                  <button onClick={() => handleDelete(items.property_id)}>
                    Delete
                  </button>
                </span>
                <span>
                  <button
                    onClick={() => {
                      handleEdit(items);
                    }}
                  >
                    Edit
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TABLE FOOTER */}
      <div className="table-footer">
        <button onClick={handleDeleteAllSelected}>Delete Selected</button>
        <div className="pagination-container">
          <span>
            Page {totalPages < 1 ? 0 : currentPage} of {totalPages}
          </span>
          <div className="pagination">
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
              First{" "}
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {/* MAP */}
            {pageNumbers.map((page) => (
              <button
                key={page}
                className="onselect"
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditModal
          item={editingItem}
          onSave={handleEditSave}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}
