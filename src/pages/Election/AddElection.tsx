import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const AddElection = () => {
  const [electionName, setElectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreateElection = async () => {
    if (!electionName || !startDate || !endDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const apiUrl = `${import.meta.env.VITE_API_URL}/election/createElection`;

    // Format the startDate and endDate to ISO-8601 format
    const formattedStartDate = new Date(startDate).toISOString();
    const formattedEndDate = new Date(endDate).toISOString();

    const requestData = {
      name: electionName,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    const jwtToken = Cookies.get("jwtToken");

    // console.log({ jwt: jwtToken?.slice(1, -1) });

    if (!jwtToken) {
      alert("JWT token not found in cookies. Please log in.");
      return;
    }

    axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          // Set the JWT token in the authorization header
          Authorization: `Bearer ${jwtToken?.slice(1, -1)}`,
        },
      })
      .then((response) => {
        console.log("Election created successfully:", response.data);
        toast.success("Election created successfully");
      })
      .catch((error) => {
        console.error("Error creating election:", error);
        toast.error("Error creating election");
      });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/users`
        );
        console.log(response.data);
        // setFilteredFields(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-[100%]  min-h-screen flex justify-center ">
      <div className="xl:w-1/3 sm:w-2/3 w-[90%] mt-10  mx-auto flex md:mt-14 flex-col gap-10 ">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-xl">Create An Election</h1>
        </div>

        <div className="md:w-[80%] w-[90%] flex flex-col mx-auto gap-5">
          <div className="flex flex-col gap-2">
            <label>Election Name</label>
            <input
              type="text"
              placeholder="Election Name"
              value={electionName}
              onChange={(e) => setElectionName(e.target.value)}
              className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
            />
          </div>
          <button
            onClick={handleCreateElection}
            className="bg-indigo-700 p-3 text-white rounded-lg text-md font-semibold"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddElection;
