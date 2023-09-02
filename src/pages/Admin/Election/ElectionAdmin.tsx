import axios from "axios";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

const ElectionAdmin = () => {
  const navigate = useNavigate();

  const fetchElections = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/election/getAllElections`
    );
    return response.data;
  };

  const { data: allElections } = useQuery("users", fetchElections);

  const handleClick = (item: any) => {
    navigate("/admin/addCandidate", { state: { election: item } });
  };

  return (
    <div className=" w-[100%] flex flex-col justify-center">
      <h2 className="text-3xl mt-4 font-semibold text-center text-gray-700">
        Click On An Elections To Add Candidate
      </h2>
      <div className="mx-auto max-w-2xl px-2 py-4 sm:px-4 sm:py-8 lg:max-w-7xl lg:px-6">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* card */}
          {allElections?.map((item: any, index: any) => (
            <div
              onClick={() => handleClick(item)}
              key={index}
              className="flex flex-col gap-2 items-center border-2 border-indigo-400 py-5 px-10 rounded-md bg-gray-200 hover:bg-indigo-400 cursor-pointer"
            >
              <div className="text-5xl">🗳</div>
              <div className="mt-2 flex justify-center">
                <h3 className="text-xl text-gray-900 font-semibold">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
          {/* card */}
        </div>
      </div>
    </div>
  );
};

export default ElectionAdmin;
