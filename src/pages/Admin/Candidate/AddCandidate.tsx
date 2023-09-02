import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const AddCandidate = () => {
  const location = useLocation();
  const stateData = location.state && location.state.election;

  // console.log({ stateData });

  const [positionId, setPositionId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const fetchElections = async () => {
    const jwtToken = Cookies.get("jwtToken");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/election/getAllPositionsInElection/${
        stateData.id
      }`,
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

  const { data: allPositions } = useQuery("users", fetchElections);

  // console.log({ allPositions });

  const handleAddPosition = async () => {
    // console.log({ electionName, positionTitle });

    if (!userEmail) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!userName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const apiUrl = `${import.meta.env.VITE_API_URL}/election/addCandidate`;

    const requestData = {
      name: userName,
      email: userEmail,
      positionId,
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
        console.log("Candidate added successfully:", response.data);
        toast.success("Candidate added successfully");
        setUserEmail("");
        setUserName("");
      })
      .catch((error) => {
        console.error("Error adding Candidate:", error);
        toast.error("Error adding Candidate");
        setUserEmail("");
        setUserName("");
      });
  };

  return (
    <div className="w-[100%]  min-h-screen flex justify-center ">
      <div className="xl:w-1/3 sm:w-2/3 w-[90%] mt-10  mx-auto flex md:mt-14 flex-col gap-5 ">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-2xl text-indigo-900">
            {stateData.name} - <span className="text-indigo-500">election</span>
          </h1>
        </div>

        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-xl">Add A Candidate</h1>
        </div>
        <div className="md:w-[80%] w-[90%] flex flex-col mx-auto gap-5">
          <select
            value={positionId}
            onChange={(e) => setPositionId(e.target.value)}
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          >
            <option value="sjj">Choose Position</option>
            {allPositions?.map((item: any, index: any) => (
              <option key={index} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          <input
            type="email"
            placeholder="Candidate Email Matching Database"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />
          <input
            type="text"
            placeholder="Candidate Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          />

          <button
            onClick={handleAddPosition}
            className="bg-indigo-700 p-3 text-white rounded-lg text-md font-semibold"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
