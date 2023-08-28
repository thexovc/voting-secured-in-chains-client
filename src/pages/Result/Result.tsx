const Result = () => {
  const hh = 70;
  return (
    <div className="md:w-2/3 w-[90%] mx-auto">
      <h1 className="text-3xl text-center pt-4 pb-6"> 1,745 Total Vote</h1>
      <div className="md:w-2/3 w-[90%]  border-2 border-indigo-700 p-4 rounded-lg mx-auto">
        <p className="text-md font-medium text-gray-500 dark:text-gray-400">
          NACOSS PRESIDENT
        </p>
        <div className="flex items-center mt-4">
          <a className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Ose Ebuka
          </a>
          <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <div className={`h-5 bg-yellow-300 rounded w-[${hh}%]`}></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            980 vote
          </span>
        </div>
        <div className="flex items-center mt-4">
          <a className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Debbie Sharon
          </a>
          <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <div className="h-5 bg-yellow-300 rounded w-[17%]"></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            200 vote
          </span>
        </div>
        <div className="flex items-center mt-4">
          <a className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Frank Ayomide
          </a>
          <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <div className="h-5 bg-yellow-300 rounded w-[8%]"></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            120 vote
          </span>
        </div>
        <div className="flex items-center mt-4">
          <a className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Osaro Osayeme
          </a>
          <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <div className="h-5 bg-yellow-300 rounded w-[4%]"></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            79 vote
          </span>
        </div>
        <div className="flex items-center mt-4">
          <a className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Uche Blessing
          </a>
          <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
            <div className="h-5 bg-yellow-300 rounded w-[1%]"></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            34 vote
          </span>
        </div>
      </div>
    </div>
  );
};

export default Result;
