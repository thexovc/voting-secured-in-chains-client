import React, { useState, useEffect } from "react";
import "./users.css";
import { motion } from "framer-motion";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import UsersTable from "./UsersTable/usersTable";
import fields from "./services/MOCK_DATA.json";
import axios from "axios";
import { useUser } from "../../context/UserData";
// import { useGetPackages } from "../../hooks/useApiMethods";

interface FilterData {
  name: string;
  email: string;
  matNo: string;
  status: string;
}

const Users: React.FC = () => {
  const { allUsers } = useUser();

  const [fetchNumber, setFetchNumber] = useState(2);
  const [filterState, setFilterState] = useState(false);
  const [filterData, setFilterData] = useState<FilterData>({
    name: "",
    email: "",
    matNo: "",
    status: "",
  });
  const [filteredFields, setFilteredFields] = useState(allUsers);
  // Function to handle changes in input fields and update filterData state

  // console.log({ filteredFields });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilterData({
      name: "",
      email: "",
      matNo: "",
      status: "",
    });
  };

  const performSearch = () => {
    const newFilteredFields = allUsers.filter((field: FilterData) => {
      // Priority to matNo filtering
      if (
        filterData.matNo !== "" &&
        field.matNo.toLowerCase() !== filterData.matNo.toLowerCase()
      ) {
        return false;
      }

      // If matNo is empty or matches, apply other filters
      if (
        (filterData.name !== "" &&
          field.name.toLowerCase() !== filterData.name.toLowerCase()) ||
        (filterData.email !== "" &&
          field.email.toLowerCase() !== filterData.email.toLowerCase()) ||
        (filterData.status !== "" &&
          field.status.toLowerCase() !== filterData.status.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredFields(newFilteredFields);
    setFilterState(false);
  };

  return (
    <>
      {allUsers && (
        <div className="pack__container">
          <div className="pack__content">
            <div className="pack__table">
              {/* {allUsers && <UsersTable items={allUsers} />} */}
              {allUsers && <UsersTable />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
