import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserData";
import { useEffect } from "react";
// import Cookies from "js-cookie";

const Profile = () => {
  const { user, jwtToken } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div>
      <main className="profile-page">
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative md:w-2/3 mx-auto flex flex-col min-w-0 break-words bg-neutral-100  mb-6 shadow-lg shadow-indigo-900 rounded-lg ">
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
                          {user?.manifesto}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {user?.admin && (
                  <>
                    {" "}
                    <div className="text-center mt-4 mb-6 grid grid-cols-2 gap-4 w-full justify-center">
                      <Link to={"/admin/addElection"} className="md:text-lg  ">
                        <div className="text-center mt-4  bg-indigo-600 cursor-pointer hover:bg-indigo-900 p-2 text-white font-bold rounded-md leading-normal mb-2 text-blueGray-400">
                          🗳 Create Election
                        </div>
                      </Link>

                      <Link to={"/admin/addPosition"} className="md:text-lg">
                        <div className="text-center mt-4  bg-indigo-600 cursor-pointer hover:bg-indigo-900 p-2 text-white font-bold rounded-md leading-normal mb-2 text-blueGray-400">
                          👥 Add Position
                        </div>
                      </Link>
                      <Link to={"/admin/allelection"} className="md:text-lg ">
                        <div className="text-center mt-4  bg-indigo-600 cursor-pointer hover:bg-indigo-900 p-2 text-white font-bold rounded-md leading-normal mb-2 text-blueGray-400">
                          🗣️ Add Candidate
                        </div>
                      </Link>
                      <Link to={"/admin/users"} className="md:text-lg ">
                        <div className="text-center mt-4  bg-indigo-600 cursor-pointer hover:bg-indigo-900 p-2 text-white font-bold rounded-md leading-normal mb-2 text-blueGray-400">
                          🗣️ Validate User
                        </div>
                      </Link>
                    </div>
                    <Link to={"/admin/unvalidate"} className="md:text-lg  ">
                      <div className="text-center mt-4 w-1/2 mx-auto  bg-indigo-600 cursor-pointer hover:bg-indigo-900 p-2 text-white font-bold rounded-md leading-normal mb-2 text-blueGray-400">
                        🗣️ UnValidate User
                      </div>
                    </Link>
                  </>
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
