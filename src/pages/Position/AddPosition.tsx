import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const AddPosition = () => {
  const [electionName, setElectionName] = useState("");
  const [positionTitle, setPositionTitle] = useState("");

  const fetchElections = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/election/getAllElections`
    );
    return response.data;
  };

  const { data: allElections } = useQuery("users", fetchElections);

  console.log({ allElections });

  const handleAddPosition = async () => {
    // console.log({ electionName, positionTitle });

    if (!positionTitle) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const apiUrl = `${import.meta.env.VITE_API_URL}/election/addPosition`;

    const requestData = {
      title: positionTitle,
      electionId: electionName,
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
        console.log("Position added successfully:", response.data);
        toast.success("Position added successfully");
        setPositionTitle("");
      })
      .catch((error) => {
        console.error("Error adding Position:", error);
        toast.error("Error adding Position");
      });
  };

  return (
    <div className="w-[100%]  min-h-screen flex justify-center ">
      <div className="xl:w-1/3 sm:w-2/3 w-[90%] mt-10  mx-auto flex md:mt-14 flex-col gap-10 ">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-xl">Create A Position</h1>
        </div>
        <div className="md:w-[80%] w-[90%] flex flex-col mx-auto gap-5">
          <select
            value={electionName}
            onChange={(e) => setElectionName(e.target.value)}
            className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
          >
            <option value="sjj">Choose Election</option>
            {allElections?.map((item: any, index: any) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Position Title"
            value={positionTitle}
            onChange={(e) => setPositionTitle(e.target.value)}
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

export default AddPosition;
