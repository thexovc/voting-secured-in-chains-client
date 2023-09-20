import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast"; // Import react-hot-toast
import { BeatLoader } from "react-spinners";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useParams();

  const navigate = useNavigate();

  const handleOtp = async () => {
    setIsLoading(true);
    const apiUrl = `${import.meta.env.VITE_API_URL}/auth/otp`;

    console.log(apiUrl);

    const requestData = {
      email: email,
      otp: otp,
    };

    try {
      const response = await axios.post(apiUrl, requestData);
      const jwtToken = JSON.stringify(response.data.token);
      const userData = JSON.stringify(response.data.user);

      console.log(response);

      Cookies.set("jwtToken", jwtToken);
      Cookies.set("userData", userData);

      window.location.href = "/profile";

      toast.success("Otp successful!"); // Show success toast message
      setIsLoading(false);
    } catch (error: any) {
      if (error?.response?.data?.error == "User is not confirmed") {
        toast.error("email not confirmed");
        navigate("/otp");
        return;
      }
      setIsLoading(false);
      toast.error("Otp failed. Please check your credentials."); // Show error toast message
      console.error("Error during Otp:", error);
    }
  };

  return (
    <div className="w-[100%]  min-h-screen flex justify-center ">
      {/* <div className="log__bg__img h-[100%] w-[100%]" /> */}
      <div className="xl:w-1/3 sm:w-2/3 w-[90%] mt-10  mx-auto flex md:mt-14 flex-col gap-4 ">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-lg">Verify Otp</h1>
        </div>

        <div className="md:w-[80%] w-[90%] flex flex-col mx-auto gap-5">
          <input
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Enter Otp"
            className="p-3 rounded-lg border-indigo-300 border-[1px]"
          />

          <button
            onClick={handleOtp}
            className="bg-indigo-700 p-3 rounded-lg text-white text-md font-semibold"
          >
            {isLoading ? <BeatLoader color="#36d7b7" /> : "Confirm Email"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
