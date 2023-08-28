import { Link } from "react-router-dom";

const Signup = () => {
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
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />
          <input
            type="text"
            placeholder="Mat No"
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />

          <button className="bg-indigo-700 p-3 text-white rounded-lg text-md font-semibold">
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
