const Profile = () => {
  return (
    <div>
      <main className="profile-page">
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-neutral-100 w-full mb-6 shadow-lg shadow-indigo-900 rounded-lg ">
              <div className="px-6 mt-5">
                <h1 className="text-center text-2xl mb-4 font-semibold underline underline-offset-2 text-indigo-900">
                  Bio
                </h1>
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-zinc-700 flex justify-center items-center">
                        <p className="text-white text-lg">OE</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                    Ose Ebuka
                  </h3>
                </div>
                <div className="mt-2 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-8/12 md:px-4">
                      <p className="mb-4 md:text-lg md:leading-relaxed md:text-justify text-left text-blueGray-700">
                        As a candidate for NACOSS President, my manifesto
                        centers on empowering tomorrow's tech leaders through
                        innovative learning opportunities, inclusive community
                        building, impactful mentorship, strategic industry
                        partnerships, and holistic skills development. I am
                        dedicated to advocating for student interests, enhancing
                        communication channels, promoting sustainability,
                        celebrating diversity, and leading with accessible and
                        responsive leadership, all aimed at creating a vibrant
                        and united community that prepares its members to excel
                        in the dynamic world of technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
