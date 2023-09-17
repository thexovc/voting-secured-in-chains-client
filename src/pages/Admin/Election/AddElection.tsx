import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { createElection } from "../../../utils/electionHelper";
import { BeatLoader } from "react-spinners";

const AddElection = () => {
  const [electionName, setElectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateElection = async () => {
    await checkWeb3AndSwitchToMumbai().catch((err) => {
      console.log("err", err);
      throw new Error(err);
    });

    setIsLoading(true);
    if (!electionName || !startDate) {
      toast.error("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    const apiUrl = `${import.meta.env.VITE_API_URL}/election/createElection`;

    // Format the startDate and endDate to ISO-8601 format
    const formattedStartDate = new Date(startDate).toISOString();

    var currentDate = new Date(startDate);
    var epochTime = currentDate.getTime();

    const requestData = {
      name: electionName,
      startDate: formattedStartDate,
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
      .then(async (response) => {
        console.log("Election created successfully:", response.data);

        await createElection(response.data.id, electionName, Number(epochTime))
          .then((res) => {
            setIsLoading(false);

            console.log(res);

            toast.success("Election Added! Wait for confirmation");
            // window.location.reload();
          })
          .catch((err) => {
            setIsLoading(false);

            toast.error("An error occured try again");
            console.log("err696:", err);
          });
        setIsLoading(false);
        toast.success("Election created successfully");
      })
      .catch((error) => {
        setIsLoading(false);
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
          {/* <div className="flex flex-col gap-2">
            <label>End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
            />
          </div> */}
          <button
            onClick={handleCreateElection}
            className="bg-indigo-700 p-3 hover:bg-indigo-500 text-white rounded-lg text-md font-semibold"
          >
            {isLoading ? <BeatLoader color="#36d7b7" /> : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddElection;

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
