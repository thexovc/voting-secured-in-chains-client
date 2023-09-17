import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { addCandidate } from "../../../utils/electionHelper";
import { BeatLoader } from "react-spinners";

const AddCandidate = () => {
  const location = useLocation();
  const stateData = location.state && location.state.election;
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      await checkWeb3AndSwitchToMumbai().catch((err) => {
        console.log("err", err);
        throw new Error(err);
      });

      setIsLoading(true);
      // console.log({ electionName, positionTitle });

      if (!userEmail) {
        toast.error("Please fill in all required fields.");
        setIsLoading(false);
        return;
      }
      if (!userName) {
        toast.error("Please fill in all required fields.");
        setIsLoading(false);
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
        toast.error("JWT token not found in cookies. Please log in.");
        setIsLoading(false);
        return;
      }

      axios
        .post(apiUrl, requestData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken?.slice(1, -1)}`,
          },
        })
        .then(async (response) => {
          console.log("Candidate added successfully:", response.data);

          await addCandidate(
            stateData.id,
            positionId,
            response.data.id,
            userName,
            "0xeFbBCE6f581DC3A42aB1Fd3742A297ef93bdf6C7"
          )
            .then((res) => {
              setIsLoading(false);

              console.log(res);

              setIsLoading(false);
              toast.success("Position Added! Wait for confirmation");
              // window.location.reload();
            })
            .catch((err) => {
              setIsLoading(false);

              toast.error("An error occured try again");
              console.log("err696:", err);
            });
          setIsLoading(false);

          toast.success("Candidate added successfully");
          setUserEmail("");
          setUserName("");
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error adding Candidate:", error);
          toast.error(
            "Error adding Candidate, ensure the email exist and the candidate is not already running in this election"
          );
          setUserEmail("");
          setUserName("");
        });
    } catch (error) {
      console.log(error);
    }
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
            className="bg-indigo-700 p-3 hover:bg-indigo-500 text-white rounded-lg text-md font-semibold"
          >
            {isLoading ? <BeatLoader color="#36d7b7" /> : "Add Candidate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;

async function checkWeb3AndSwitchToMumbai() {
  // Check if the Web3 provider is available
  if (typeof window.ethereum === "undefined") {
    toast.error("Connect Your wallet");
    throw new Error("Web3 provider not detected. ");
  }

  // Check if the user is already on the Mumbai Testnet (chain ID 80001)
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  if (chainId === "0x13881" || chainId === "0x13881") {
    // toast.error("You are already on the Polygon Mumbai Testnet.");
    return;
  }

  try {
    // Request to switch to the Polygon Mumbai Testnet (chain ID 80001)
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }], // Polygon Mumbai Testnet chain ID
    });

    // Check if the user has switched to the Mumbai Testnet
    const newChainId = await window.ethereum.request({ method: "eth_chainId" });
    if (newChainId === "0x13881") {
      // toast.success("Switched to the Polygon Mumbai Testnet successfully.");
    } else {
      toast.error(
        "Failed to switch to the Polygon Mumbai Testnet. Please switch manually."
      );
    }

    // Check if the connected account has ETH
    const account = (
      await window.ethereum.request({ method: "eth_accounts" })
    )[0];
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });

    // Convert the balance from wei to Ether
    const etherBalance = window.ethereum.utils.fromWei(balance, "ether");

    // Check if the balance is greater than 0.05 ETH
    if (parseFloat(etherBalance) < 0.05) {
      throw new Error("Connected account has less than 0.05 ETH.");
    }
  } catch (error) {
    console.error("Error switching to the Polygon Mumbai Testnet:", error);
    toast.error(
      "Error switching to the Polygon Mumbai Testnet. Please switch manually."
    );
  }
}
