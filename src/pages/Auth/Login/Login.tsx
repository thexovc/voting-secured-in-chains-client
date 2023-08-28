import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
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
            type="text"
            placeholder="Enter Email"
            className="p-3 rounded-lg border-indigo-300 border-[1px]"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg border-indigo-300 border-[1px]"
          />

          <button className="bg-indigo-700 p-3 rounded-lg text-white text-md font-semibold">
            Sign In
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
