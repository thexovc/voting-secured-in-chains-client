import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Home from "./pages/Home/Home";
import NoMatch from "./NoMatch";
import ErrorPage from "./ErrorPage";
import Campaign from "./pages/Campaign/Campaign";
import Profile from "./pages/Profile/Profile";
import UserOutlet from "./pages/Outlet/UserOutlet";
import Vote from "./pages/Vote/Vote";
import Result from "./pages/Result/Result";
import Settings from "./pages/Settings/Settings";
import AddElection from "./pages/Admin/Election/AddElection";
import AddPosition from "./pages/Admin/Position/AddPosition";
// import Users from "./pages/UsersLog/users";
import AddCandidate from "./pages/Admin/Candidate/AddCandidate";
import ElectionAdmin from "./pages/Admin/Election/ElectionAdmin";
import ElectionUser from "./pages/User/Election/ElectionUser";
import HomeOutlet from "./pages/Outlet/HomeOutlet";
import ElectionOption from "./pages/User/Election/ElectionOption";
import ElectionResult from "./pages/Result/ElectionResult";
import Otp from "./pages/Auth/Otp/Otp";
import Users from "./pages/Users/Users";
import UnValidate from "./pages/Users/UnValidate";

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path="/" element={<HomeOutlet />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NoMatch />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="otp/:email" element={<Otp />} />
          </Route>
          <Route path="/" element={<UserOutlet />} errorElement={<ErrorPage />}>
            <Route path="campaign/:id" element={<Campaign />} />
            <Route path="profile" element={<Profile />} />
            <Route path="vote" element={<ElectionUser />} />
            <Route path="voteOption/:id" element={<ElectionOption />} />
            <Route path="voteElection/:id" element={<Vote />} />
            <Route path="result" element={<ElectionResult />} />
            <Route path="electionresult/:id" element={<Result />} />
            <Route path="setting" element={<Settings />} />
            <Route path="admin/addElection" element={<AddElection />} />
            <Route path="admin/addPosition" element={<AddPosition />} />
            <Route path="admin/addCandidate" element={<AddCandidate />} />
            <Route path="admin/allelection" element={<ElectionAdmin />} />
            <Route path="admin/allelection" element={<ElectionAdmin />} />
            {/* <Route path="userdata" element={<Users />} /> */}
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/unvalidate" element={<UnValidate />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default Router;
