import { useLocation, useNavigate, useParams } from "react-router-dom";

const ElectionOption = () => {
  const navigate = useNavigate();

  const { id: electionId } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const electionName = queryParams.get("election");

  const handleClick = () => {
    navigate(`/voteElection/${electionId}`);
  };

  return (
    <div className=" w-[100%] flex flex-col items-center justify-center">
      <h2 className=" text-3xl mt-4 font-semibold text-center text-gray-700">
        {electionName || ""}
      </h2>
      <div className="mx-auto w-full  justify-center px-2 py-4 ">
        <div className="flex justify-center mt-6  gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* card */}
          <div
            onClick={() => navigate(`/campaign/${electionId}`)}
            className="flex flex-col gap-2 items-center border-2 border-indigo-400 py-5 px-10 rounded-md bg-gray-200 hover:bg-indigo-400 cursor-pointer"
          >
            <div className="text-5xl">📃</div>
            <div className="mt-2 flex justify-center">
              <h3 className="text-xl text-gray-900 font-semibold">Campaign</h3>
            </div>
          </div>
          {/* card */}

          {/* card */}
          <div
            onClick={handleClick}
            className="flex flex-col gap-2 items-center border-2 border-indigo-400 py-5 px-10 rounded-md bg-gray-200 hover:bg-indigo-400 cursor-pointer"
          >
            <div className="text-5xl">🗳</div>
            <div className="mt-2 flex justify-center">
              <h3 className="text-xl text-gray-900 font-semibold">VOTE</h3>
            </div>
          </div>

          {/* card */}
        </div>
      </div>
    </div>
  );
};

export default ElectionOption;
