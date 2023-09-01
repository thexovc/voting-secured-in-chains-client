import { createContext, useContext } from "react";
import Cookies from "js-cookie";

const UserContext = createContext<any>({}); // Use any as the default value type

export const UserProvider = ({ children }: any) => {
  const userData = Cookies.get("userData");
  const jwtToken = Cookies.get("jwtToken");
  const user = userData ? JSON.parse(userData) : {}; // Parse the user data

  return (
    <UserContext.Provider value={{ user, jwtToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
