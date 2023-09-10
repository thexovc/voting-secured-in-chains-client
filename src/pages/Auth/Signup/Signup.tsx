import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"; // Import react-hot-toast

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matNo, setMatNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const apiUrl = `${import.meta.env.VITE_API_URL}/auth/register`;

    const requestData = {
      name: name,
      email: email,
      password: password,
      matNo: matNo,
    };

    try {
      const response = await axios.post(apiUrl, requestData);
      console.log(
        "Registration successful!, check email for QR CODE",
        response.data
      );
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Error during registration");
    }
  };

  return (
    <div className="w-[100%]  min-h-screen flex justify-center ">
      {/* <div className="log__bg__img h-[100%] w-[100%]" /> */}
      <div className="xl:w-1/3 sm:w-2/3 w-[90%] mt-10  mx-auto flex md:mt-14 flex-col gap-10 ">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-lg">Account Registration</h1>
          <p>Enter your details to get register for your account</p>
        </div>

        <div className="md:w-[80%] w-[90%] flex flex-col mx-auto gap-5">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />
          <input
            type="text"
            placeholder="Mat No"
            value={matNo}
            onChange={(e) => setMatNo(e.target.value)}
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />

          <button
            onClick={handleSignup}
            className="bg-indigo-700 p-3 text-white rounded-lg text-md font-semibold"
          >
            Sign Up
          </button>

          <div className="w-full text-center">
            Already Have an account?{" "}
            <Link to={"/login"} className="text-indigo-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
