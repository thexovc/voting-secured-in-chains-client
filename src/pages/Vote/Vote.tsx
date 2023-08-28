import { useState } from "react";

interface ObjectWithBooleanValues {
  [key: string]: boolean;
}

const Vote = () => {
  const [isActive, setIsActive] = useState<ObjectWithBooleanValues>({
    president: false,
    vp: false,
    gsc: false,
  });

  const handleToggle = (key: string) => {
    setIsActive((prevObjectState) => ({
      ...prevObjectState,
      [key]: !prevObjectState[key],
    }));
  };

  return (
    <div className="w-[100%]">
      <div className="flex w-[95%] mx-auto md:w-full items-center flex-col gap-4">
        {/*  election post */}
        <div
          onClick={() => handleToggle("president")}
          className={`flex items-center ${
            isActive.president && "bg-indigo-700 text-white"
          } justify-between text-xl w-full md:w-2/3 px-3 cursor-pointer font-semibold border-2 py-2 rounded-lg`}
        >
          Nacoss President
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

        {isActive.president && (
          <div className="w-[90%] md:w-[60%] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Ose Ebuka
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 truncate dark:text-gray-400">
              As a candidate for NACOSS President, my manifesto centers on
              empowering tomorrow's tech leaders through innovative learning
              opportunities, inclusive community building, impactful mentorship,
              strategic industry partnerships, and holistic skills development.
              I am dedicated to advocating for student interests, enhancing
              communication channels, promoting sustainability, celebrating
              diversity, and leading with accessible and responsive leadership,
              all aimed at creating a vibrant and united community that prepares
              its members to excel
            </p>
            <button className="inline-flex items-center px-5 py-2 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Vote
            </button>
          </div>
        )}
        {/* election post  */}
        {/*  election post */}
        <div
          onClick={() => handleToggle("gsc")}
          className={`flex items-center ${
            isActive.gsc && "bg-indigo-700 text-white"
          } justify-between text-xl w-full md:w-2/3 px-3 cursor-pointer font-semibold border-2 py-2 rounded-lg`}
        >
          Nacoss General Secertary
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

        {isActive.gsc && (
          <div className="w-[90%] md:w-[60%] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Frank Ayomide
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 truncate dark:text-gray-400">
              As a candidate for NACOSS General Secertary, my manifesto centers
              on empowering tomorrow's tech leaders through innovative learning
              opportunities, inclusive community building, impactful mentorship,
              strategic industry partnerships, and holistic skills development.
              I am dedicated to advocating for student interests, enhancing
              communication channels, promoting sustainability, celebrating
              diversity, and leading with accessible and responsive leadership,
              all aimed at creating a vibrant and united community that prepares
              its members to excel
            </p>
            <button className="inline-flex items-center px-5 py-2 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Vote
            </button>
          </div>
        )}
        {/* election post  */}
      </div>
    </div>
  );
};

export default Vote;
