import React from "react";
import "./users.css";

import UsersTable from "./UsersTable/usersTable";

import { useUser } from "../../context/UserData";
// import { useGetPackages } from "../../hooks/useApiMethods";

const Users: React.FC = () => {
  const { allUsers } = useUser();

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
