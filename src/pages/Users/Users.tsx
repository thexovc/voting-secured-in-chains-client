import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import toast from "react-hot-toast"; // Import react-hot-toast
// import { useState } from "react";

const Users = () => {
  // console.log({ user });

  const fetchUsers = async () => {
    const jwtToken = Cookies.get("jwtToken");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/users`,
      {
        headers: {
          "Content-Type": "application/json",
          // Set the JWT token in the authorization header
          Authorization: `Bearer ${jwtToken?.slice(1, -1)}`,
        },
      }
    );
    return response.data;
  };

  const { data: allUsers } = useQuery("users", fetchUsers);

  console.log(allUsers);

  // Check if allPositions is undefined or null before mapping over it
  if (!allUsers) {
    return <div>Loading...</div>;
  }

  const handleValidation = async (userId: string) => {
    // toast.success("validating...");
    // setIsLoading(true);
    const apiUrl = `${
      import.meta.env.VITE_API_URL
    }/admin/validateUser/${userId}`;

    console.log(apiUrl);

    try {
      await axios.post(apiUrl).then(() => {
        toast.success("Validated!!");
      });

      window.location.href = window.location.href;
      // setIsLoading(false);
    } catch (error: any) {
      // setIsLoading(false);
      toast.error("Not validated"); // Show error toast message
      console.error("Error validating:", error);
    }
  };

  return (
    <div className="w-[100%] mb-8">
      <div className="flex w-[95%] mx-auto md:w-full items-center flex-col gap-4">
        <div
          className={`flex flex-col gap-2 items-center justify-between text-xl w-full md:w-2/3 px-3 cursor-pointer font-semibold  py-2 rounded-lg`}
        >
          <h1>ALL USERS</h1>
          {allUsers && <h3>TOTAL USERS: {allUsers?.length}</h3>}

          {allUsers.map((user: any, index: any) => (
            <>
              {user.name != "admin" && (
                <div
                  key={index}
                  className="w-[90%] flex-col md:w-[80%] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex w-full justify-between items-center">
                    <div className="w-[60%]">
                      <h5 className="mb-2 text-lg font-semibold  text-gray-700 dark:text-white">
                        {user.name} -{" "}
                        <span className="font-thin"> {user.matNo}</span>
                      </h5>
                    </div>
                    {user.validated ? (
                      <button
                        disabled
                        className="p-3 cursor-not-allowed text-white font-normal bg-gray-300  rounded-lg"
                      >
                        validated
                      </button>
                    ) : (
                      <button
                        onClick={() => handleValidation(user?.id)}
                        className="p-3 bg-indigo-700 text-white font-normal hover:bg-indigo-400 cursor-pointer rounded-lg"
                      >
                        validate
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
