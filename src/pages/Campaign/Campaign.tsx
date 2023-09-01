import { Link } from "react-router-dom";

const Campaign = () => {
  return (
    <div className="w-[100%] text-center">
      <div className="w-[100%] mt-8">
        <h1 className="text-2xl pb-4 font-semibold text-indigo-600">
          Election Campaign
        </h1>
      </div>
      <div className="w-5/6 md:w-1/3 mx-auto flex flex-col gap-4">
        <Link
          to={"/profile"}
          role="list"
          className="divide-y divide-gray-100 border-2 border-indigo-400 p-2 rounded-lg
          hover:bg-gray-50 cursor-pointer px-8
          "
        >
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-8">
              <div className="w-14 h-14 rounded-full bg-zinc-700 flex justify-center items-center">
                <p className="text-white text-lg">OE</p>
              </div>

              <div className="flex flex-col text-left">
                <p className="text-xl font-semibold leading-6 text-gray-900">
                  Ose Ebuka
                </p>
                <p className="mt-1 text-lg leading-5 text-gray-500">
                  Nacoss President General
                </p>
              </div>
            </div>
          </li>
        </Link>
        <Link
          to={"/profile"}
          role="list"
          className="divide-y divide-gray-100 border-2 border-indigo-400 p-2 rounded-lg
          hover:bg-gray-50 cursor-pointer px-8
          "
        >
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-8">
              <div className="w-14 h-14 rounded-full bg-zinc-700 flex justify-center items-center">
                <p className="text-white text-lg">DS</p>
              </div>

              <div className="flex flex-col text-left">
                <p className="text-xl font-semibold leading-6 text-gray-900">
                  Debbie Sharon
                </p>
                <p className="mt-1 text-lg leading-5 text-gray-500">
                  Vice President
                </p>
              </div>
            </div>
          </li>
        </Link>
        <Link
          to={"/profile"}
          role="list"
          className="divide-y divide-gray-100 border-2 border-indigo-400 p-2 rounded-lg
          hover:bg-gray-50 cursor-pointer px-8
          "
        >
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-8">
              <div className="w-14 h-14 rounded-full bg-zinc-700 flex justify-center items-center">
                <p className="text-white text-lg">FA</p>
              </div>

              <div className="flex flex-col text-left">
                <p className="text-xl font-semibold leading-6 text-gray-900">
                  Frank Ayomide
                </p>
                <p className="mt-1 text-lg leading-5 text-gray-500">
                  General Secertary
                </p>
              </div>
            </div>
          </li>
        </Link>
      </div>
    </div>
  );
};

export default Campaign;
