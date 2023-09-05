import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "react-query";

const Vote = () => {
  const { id: electionId } = useParams();

  console.log(electionId);

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

  console.log({ allPositions });

  const initialToggledPositions: boolean[] = allPositions.map(() => false);
  const [toggledPositions, setToggledPositions] = useState<boolean[]>(
    initialToggledPositions
  );

  const togglePosition = (index: number) => {
    const updatedToggledPositions = [...toggledPositions];
    updatedToggledPositions[index] = !updatedToggledPositions[index];
    setToggledPositions(updatedToggledPositions);
  };

  return (
    <div className="w-[100%] mb-8">
      <div className="flex w-[95%] mx-auto md:w-full items-center flex-col gap-4">
        {/* <h1 className="font-semibold text-xl py-4">{election.election.name}</h1> */}
        {/*  election post */}
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
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </div>
              {/* candidate */}
              {isToggled && (
                <>
                  {item?.candidate?.map((cand: any, indexCand: any) => (
                    <div
                      key={indexCand}
                      className="w-[90%] flex-col md:w-[60%] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      {/* <a href="#"></a> */}
                      <div className="flex justify-between items-center">
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {cand.name}
                        </h5>
                        {/* <p className="flex-1 text-sm font-normal text-gray-700 truncate dark:text-gray-400">
            As a candidate for NACOSS President, my manifesto centers on
            empowering
          </p> */}
                        <button className="basis-0 items-center px-5 py-2 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Vote
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {/* candidate */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vote;
