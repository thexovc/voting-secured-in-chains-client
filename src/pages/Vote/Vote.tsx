import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { useUser } from "../../context/UserData";
import toast from "react-hot-toast";
import { vote } from "../../utils/electionHelper";
import { BeatLoader } from "react-spinners";

type VotedItem = {
  positionId: string;
  candidateId: string;
};

const Vote = () => {
  const { id: electionId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // const navigate = useNavigate();

  // // if (electionId) {
  // //   navigate("/vote");
  // // }

  const { user } = useUser();

  // console.log({ user });

  const fetchPositions = async () => {
    const jwtToken = Cookies.get("jwtToken");
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/election/getAllPositionsInElection/${electionId}`,
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

  const { data: allPositions } = useQuery("users", fetchPositions);

  // Check if allPositions is undefined or null before mapping over it
  if (!allPositions) {
    return <div>Loading...</div>;
  }

  const initialToggledPositions = allPositions.map(() => false);
  const [toggledPositions, setToggledPositions] = useState<boolean[]>(
    initialToggledPositions
  );

  const [alreadyVoted, setAlreadyVoted] = useState<VotedItem[]>([]);

  const togglePosition = (index: number) => {
    const updatedToggledPositions = [...toggledPositions];
    updatedToggledPositions[index] = !updatedToggledPositions[index];
    setToggledPositions(updatedToggledPositions);
  };

  const handleVote = async (positionId: string, candidateId: string) => {
    setIsLoading(true);
    if (electionId) {
      try {
        await checkWeb3AndSwitchToMumbai().catch((err) => {
          console.log("err", err);
          setIsLoading(false);
          throw new Error(err);
        });

        const jwtToken = Cookies.get("jwtToken");
        await axios
          .post(
            `${import.meta.env.VITE_API_URL}/election/vote`,
            {
              userId: user?.userId,
              positionId,
              electionId,
              candidateId,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken?.slice(1, -1)}`,
              },
            }
          )
          .then(async (res) => {
            await vote(electionId, positionId, candidateId)
              .then((res) => {
                console.log(res);
                setIsLoading(false);

                toast.success("Voted!!");
                // window.location.reload();
              })
              .catch((err) => {
                setIsLoading(false);

                toast.error("Error Voting");
                console.log("err696:", err);
              });
          })
          .catch((err) => {
            setIsLoading(false);

            console.error("Error voting for Candidate:", err);
            toast.error("Error voting for Candidate");
          });
        setAlreadyVoted([...alreadyVoted, { positionId, candidateId }]);
      } catch (error) {
        toast.error("Error Voting");
        console.error("Error submitting vote:", error);
      }
    } else {
      return;
    }
  };

  return (
    <div className="w-[100%] mb-8">
      <div className="flex w-[95%] mx-auto md:w-full items-center flex-col gap-4">
        {allPositions?.map((item: any, index: any) => {
          const isToggled = toggledPositions[index] || false;

          return (
            <div
              key={index}
              onClick={() => togglePosition(index)}
              className={`flex flex-col gap-2 items-center justify-between text-xl w-full md:w-2/3 px-3 cursor-pointer font-semibold border-2 py-2 rounded-lg`}
            >
              <div
                className={`flex items-center ${
                  isToggled && "bg-indigo-700 text-white"
                } justify-between text-xl w-full px-3 cursor-pointer font-semibold border-2 py-2 rounded-lg`}
              >
                {item.title}
                <svg
                  className="w-7 h-4 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  {/* SVG path */}
                </svg>
              </div>
              {true && (
                <>
                  {item?.candidate?.map((cand: any, indexCand: any) => (
                    <div
                      key={indexCand}
                      className="w-[90%] flex-col md:w-[60%] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="flex w-full justify-between items-center">
                        <div className="w-[60%]">
                          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {cand.name}
                          </h5>
                          <p className="flex-1 text-sm font-normal text-gray-700 truncate dark:text-gray-400">
                            As a candidate for NACOSS President, my manifesto
                            centers on empowering
                          </p>
                        </div>
                        <button
                          onClick={() => handleVote(item.id, cand.id)}
                          className={`basis-0 items-center px-5 py-2 text-md font-medium text-center text-white bg-blue-800 rounded-lg ${
                            alreadyVoted.some(
                              (vote) =>
                                vote.positionId === item.id &&
                                vote.candidateId === cand.id
                            )
                              ? "opacity-50  bg-orange-800 cursor-not-allowed"
                              : "hover:bg-blue-500  cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300"
                          }`}
                          disabled={alreadyVoted.some(
                            (vote) =>
                              vote.positionId === item.id &&
                              vote.candidateId === cand.id
                          )}
                        >
                          {alreadyVoted.some(
                            (vote) =>
                              vote.positionId === item.id &&
                              vote.candidateId === cand.id
                          ) ? (
                            "Voted"
                          ) : (
                            <>
                              {isLoading ? (
                                <div className="flex w-full">
                                  <BeatLoader color="#36d7b7" />
                                </div>
                              ) : (
                                "vote"
                              )}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vote;

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
  } catch (error) {
    console.error("Error switching to the Polygon Mumbai Testnet:", error);
    toast.error(
      "Error switching to the Polygon Mumbai Testnet. Please switch manually."
    );
  }
}
