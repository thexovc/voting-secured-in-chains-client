import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast"; // Import react-hot-toast
import { BeatLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // // Read the value of the "jwtToken" cookie
  // const jwtToken = Cookies.get("jwtToken");

  // if (jwtToken) {
  //   // Use the JWT token for authentication or other purposes
  //   console.log("JWT Token:", jwtToken);
  // } else {
  //   console.log("JWT Token not found in the cookie");
  // }

  const handleLogin = async () => {
    setIsLoading(true);
    const apiUrl = `${import.meta.env.VITE_API_URL}/auth/login`;

    console.log(apiUrl);

    const requestData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(apiUrl, requestData);
      const jwtToken = JSON.stringify(response.data.token);
      const userData = JSON.stringify(response.data.user);

      console.log(response);

      Cookies.set("jwtToken", jwtToken);
      Cookies.set("userData", userData);

      window.location.href = "/profile";

      toast.success("Login successful!"); // Show success toast message
      setIsLoading(false);
    } catch (error: any) {
      if (error.response.data.error == "User is not confirmed") {
        toast.error("email not confirmed");
        navigate(`/otp/${email}`);
        return;
      }
      setIsLoading(false);
      toast.error("Login failed. Please check your credentials."); // Show error toast message
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="w-[100%]  min-h-screen flex justify-center ">
      {/* <div className="log__bg__img h-[100%] w-[100%]" /> */}
      <div className="xl:w-1/3 sm:w-2/3 w-[90%] mt-10  mx-auto flex md:mt-14 flex-col gap-4 ">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-lg">Account Login</h1>
          <p>Enter your details to get sign in to your account</p>
        </div>

        <div className="md:w-[80%] w-[90%] flex flex-col mx-auto gap-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Email"
            className="p-3 rounded-lg border-indigo-300 border-[1px]"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border-indigo-300 border-[1px]"
          />

          <button
            onClick={handleLogin}
            className="bg-indigo-700 p-3 rounded-lg text-white text-md font-semibold"
          >
            {isLoading ? <BeatLoader color="#36d7b7" /> : " Sign In"}
          </button>

          <div className="w-full text-center">
            Don't Have An Account Yet?{" "}
            <Link to={"/signup"} className="text-indigo-600">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
