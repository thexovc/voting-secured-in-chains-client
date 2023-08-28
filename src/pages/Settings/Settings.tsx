const Settings = () => {
  return (
    <div className="w-[100%]  min-h-screen flex justify-center ">
      {/* <div className="log__bg__img h-[100%] w-[100%]" /> */}
      <div className="xl:w-1/3 sm:w-2/3 w-[90%] mt-10  mx-auto flex md:mt-14 flex-col gap-10 ">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-lg">Profile Setting</h1>
        </div>

        <div className="md:w-[80%] w-[90%] flex flex-col mx-auto gap-5">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor=""> Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value="Ose Ebuka"
              className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor=""> Bio</label>
            <textarea
              placeholder="Write about your self...."
              className="p-3 rounded-lg border-indigo-300 focus:ring focus:ring-indigo-500 focus:outline-none border-2 hover:border-1"
            />
          </div>

          <button className="bg-indigo-700 p-3 text-white rounded-lg text-md font-semibold">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
