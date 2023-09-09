import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../../context/UserData";
import Cookies from "js-cookie";
import { Web3Button } from "@web3modal/react";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { jwtToken } = useUser();
  const navigate = useNavigate();

  function logout() {
    Cookies.remove("userData"); // Replace 'accessToken' with your actual cookie name
    Cookies.remove("jwtToken"); // Replace 'userId' with your actual cookie name

    window.location.href = "/login";
  }

  return (
    <div className="w-[100%] mb-20 vsc__bg__img">
      {" "}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 items-center">
            <Link to={"/"} className="-m-1.5 p-1.5 flex items-center">
              <span className="sr-only">Vote Secured In Chains</span>

              <h1 className="text-2xl font-bold text-indigo-600">🗳 VSC</h1>
            </Link>
          </div>
          <div className="flex lg:hidden">
            {jwtToken && (
              <div
                onClick={() => navigate("/profile")}
                className="text-md flex items-center cursor-pointer justify-center text-white w-10 h-10 border-4 border-indigo-200 bg-indigo-600 hover:bg-indigo-300 rounded-full "
              >
                🏠
              </div>
            )}
            <button
              type="button"
              onClick={() => setToggle(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              to={"/result"}
              className="text-md font-semibold text-indigo-800 leading-6 underline underline-offset-4"
            >
              📊 Result
            </Link>

            {jwtToken && (
              <>
                <Link
                  to={"/vote"}
                  className="text-md font-semibold text-indigo-800 leading-6 underline underline-offset-4"
                >
                  🗳 Vote
                </Link>
              </>
            )}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {jwtToken ? (
              <div className="flex gap-5">
                <div className="text-md flex mx-10 items-center cursor-pointer justify-center text-white w-10 h-10 border-4 border-indigo-200 bg-indigo-600 hover:bg-indigo-300 rounded-full ">
                  <Web3Button />
                </div>
                <div
                  onClick={() => navigate("/profile")}
                  className="text-md flex items-center cursor-pointer justify-center text-white w-10 h-10 border-4 border-indigo-200 bg-indigo-600 hover:bg-indigo-300 rounded-full "
                >
                  🏠
                </div>

                <div
                  onClick={logout}
                  className="text-md bg-indigo-600 rounded-md hover:bg-indigo-800 cursor-pointer font-semibold leading-6  text-white p-3"
                >
                  <span aria-hidden="true">&rarr;</span> Log Out
                </div>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="text-md bg-indigo-600 rounded-md hover:bg-indigo-800 cursor-pointer font-semibold leading-6  text-white p-3"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
        {/* mobile nav */}
        {toggle && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Vote Secured In Chain</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setToggle(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6 flex flex-col items-end px-8">
                    <div className="py-1">
                      <Link
                        onClick={() => setToggle(false)}
                        to={"/result"}
                        className="text-md font-semibold text-indigo-800 leading-6 "
                      >
                        📊 Result
                      </Link>
                    </div>
                    <div className="py-1">
                      {jwtToken && (
                        <>
                          <Link
                            onClick={() => setToggle(false)}
                            to={"/vote"}
                            className="text-md font-semibold text-indigo-800 leading-6 "
                          >
                            🗳 Vote
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="py-1 flex flex-col gap-2 items-end px-8">
                    {jwtToken ? (
                      <div className="flex gap-5">
                        <div
                          onClick={logout}
                          className="text-md bg-indigo-600 rounded-md hover:bg-indigo-800 cursor-pointer font-semibold leading-6  text-white p-3"
                        >
                          <span aria-hidden="true">&rarr;</span> Log Out
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={"/login"}
                        className="text-md bg-indigo-600 rounded-md hover:bg-indigo-800 cursor-pointer font-semibold leading-6  text-white p-3"
                      >
                        Log in <span aria-hidden="true">&rarr;</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* mobile nav */}
      </header>
    </div>
  );
};

export default Navbar;
