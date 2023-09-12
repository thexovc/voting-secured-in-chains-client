import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserData";
import { useEffect } from "react";
// import Cookies from "js-cookie";

const Profile = () => {
  const { user, jwtToken } = useUser();
  const navigate = useNavigate();

  // console.log("user profilerr", user);

  useEffect(() => {
    // Check if user data exists in context or cookies
    if (!jwtToken) {
      // Cookies.remove("userData");
      // Cookies.remove("jwtToken");
      navigate("/login");
    }
  }, [user]);

  return (
    <div>
      <main className="profile-page">
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-neutral-100 w-full mb-6 shadow-lg shadow-indigo-900 rounded-lg ">
              <div className="px-6 mt-5">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-zinc-700 flex justify-center items-center">
                        <p className="text-white font-semibold  text-4xl flex-1 flex justify-center items-center">
                          {user!.name.slice(0, 2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                    {user?.name}
                  </h3>
                </div>
                {!user?.admin && (
                  <div className="text-center mt-4 mb-6">
                    <h3 className="text-2xl font-semibold leading-normal mb-2 text-blueGray-400 ">
                      MatNo: {user?.matNo}
                    </h3>
                  </div>
                )}
                {user?.candidate && (
                  <div className="mt-2 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-8/12 md:px-4">
                        <p className="mb-4 md:text-lg md:leading-relaxed md:text-justify text-left text-blueGray-700">
                          As a candidate for NACOSS President, my manifesto
                          centers on empowering tomorrow's tech leaders through
                          innovative learning opportunities, inclusive community
                          building, impactful mentorship, strategic industry
                          partnerships, and holistic skills development. I am
                          dedicated to advocating for student interests,
                          enhancing communication channels, promoting
                          sustainability, celebrating diversity, and leading
                          with accessible and responsive leadership, all aimed
                          at creating a vibrant and united community that
                          prepares its members to excel in the dynamic world of
                          technology.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {user?.admin && (
                  <div className="text-center mt-4 mb-6 flex gap-4 w-full justify-center">
                    <div className="text-center mt-4  bg-indigo-600 cursor-pointer hover:bg-indigo-900 p-2 text-white font-bold rounded-md leading-normal mb-2 text-blueGray-400">
                      <Link to={"/admin/addElection"} className="md:text-lg  ">
                        🗳 Create Election
                      </Link>
                    </div>

                    <div className="text-center mt-4  bg-indigo-600 cursor-pointer hover:bg-indigo-900 p-2 text-white font-bold rounded-md leading-normal mb-2 text-blueGray-400">
                      <Link to={"/admin/addPosition"} className="md:text-lg">
                        👥 Add Position
                      </Link>
                    </div>
                    <div className="text-center mt-4  bg-indigo-600 cursor-pointer hover:bg-indigo-900 p-2 text-white font-bold rounded-md leading-normal mb-2 text-blueGray-400">
                      <Link to={"/admin/allelection"} className="md:text-lg ">
                        🗣️ Add Candidate
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
