import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Auth/Navbar/Navbar";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useUser } from "../../context/UserData";

const UserOutlet = () => {
  const { user, jwtToken } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user data exists in context or cookies
    if (!jwtToken) {
      Cookies.remove("userData");
      Cookies.remove("jwtToken");
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      {jwtToken && (
        <div className="w-[100%] ">
          <Navbar />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default UserOutlet;
