import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-10 lg:px-8">
        <div className="mx-auto max-w-2xl py-4 sm:py-28 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Vote Secured In Chains
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              "Forging the Future of Trustworthy and Transparent Democratic
              Processes: Leveraging the Power of Blockchain for Secure,
              Auditable, and Immutable Voting Systems"
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={"/signup"}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
