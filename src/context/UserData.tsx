import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { all } from "axios";
import { useQuery } from "react-query";

const UserContext = createContext<any>({}); // Use any as the default value type

export const UserProvider = ({ children }: any) => {
  const userData = Cookies.get("userData");
  const jwtToken = Cookies.get("jwtToken");
  const user = userData ? JSON.parse(userData) : {}; // Parse the user data
  // const [allUsers, setAllUsers] = useState([]);

  return (
    <UserContext.Provider value={{ user, jwtToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
