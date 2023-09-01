import { Outlet } from "react-router-dom";
import Navbar from "../Auth/Navbar/Navbar";

const UserOutlet = () => {
  return (
    <div className="w-[100%] ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserOutlet;
