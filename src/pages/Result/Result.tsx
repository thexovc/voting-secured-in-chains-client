import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const Result = () => {
  const { id: electionId } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const electionName = queryParams.get("election");

  const {
    data: electionResults,
    isLoading,
    isError,
  } = useQuery("electionResults", fetchElectionResults);

  async function fetchElectionResults() {
    const jwtToken = Cookies.get("jwtToken");
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/election/checkWinner/${electionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Set the JWT token in the authorization header
          Authorization: `Bearer ${jwtToken?.slice(1, -1)}`,
        },
      }
    );
    return response.data;
  }

  // console.log({ electionResults });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occured</p>;
  }

  const positionsWithTotalVotes = electionResults?.map((position: any) => ({
    ...position,
    totalVotes: position?.candidates?.reduce(
      (total: any, candidate: any) => total + candidate.votes,
      0
    ),
  }));

  // console.log({ positionsWithTotalVotes });

  const totalElectionVotes = electionResults?.reduce(
    (total: any, position: any) => {
      return (
        total +
        position?.candidates?.reduce((subTotal: any, candidate: any) => {
          return subTotal + candidate.votes;
        }, 0)
      );
    },
    0
  );

  return (
    <div className="md:w-2/3 w-[90%] mx-auto">
      <h1 className="text-3xl text-center pt-4 pb-6">
        {" "}
        {electionName || ""} Election
        <br />
        <span className="text-slate-600 text-lg">
          {totalElectionVotes} Total Vote
        </span>
      </h1>
      {positionsWithTotalVotes?.map((position: any, index: any) => (
        <div
          key={index}
          className="md:w-2/3 w-[90%] my-5 border-2 border-indigo-700 p-4 rounded-lg mx-auto"
        >
          <p className="text-md font-medium text-gray-500 dark:text-gray-400">
            {position.position}
          </p>
          {position?.candidates?.map((cand: any, candInx: any) => {
            // const perc = Number(
            //   (cand.votes / position.totalVotes) * 100
            // ).toFixed(0);
            // console.log(perc);

            // const perTxt = `w-[${perc}%]`;

            // console.log(perTxt);

            return (
              <div
                key={candInx}
                className="flex justify-between items-center mt-4"
              >
                <a className="text-lg font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  {cand.name}
                </a>
                {/* <div className="w-full h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  {/* <div className={`h-5 bg-yellow-300 rounded ${perTxt}`}></div> */}
                {/* </div> */}

                <span className="text-md font-medium text-gray-800 dark:text-gray-400">
                  {cand.votes} vote
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Result;
