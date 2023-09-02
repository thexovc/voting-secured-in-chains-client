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
import Campaign from "./pages/Campaign/Campaign";
import Profile from "./pages/Profile/Profile";
import UserOutlet from "./pages/Outlet/UserOutlet";
import Vote from "./pages/Vote/Vote";
import Result from "./pages/Result/Result";
import Settings from "./pages/Settings/Settings";
import AddElection from "./pages/Admin/Election/AddElection";
import AddPosition from "./pages/Admin/Position/AddPosition";
import Users from "./pages/UsersLog/users";
import AddCandidate from "./pages/Admin/Candidate/AddCandidate";
import ElectionAdmin from "./pages/Admin/Election/ElectionAdmin";
import ElectionUser from "./pages/User/Election/ElectionUser";

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path="/" element={<UserOutlet />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NoMatch />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="campaign" element={<Campaign />} />
            <Route path="profile" element={<Profile />} />
            <Route path="vote" element={<ElectionUser />} />
            <Route path="voteElection" element={<Vote />} />
            <Route path="result" element={<Result />} />
            <Route path="setting" element={<Settings />} />
            <Route path="admin/addElection" element={<AddElection />} />
            <Route path="admin/addPosition" element={<AddPosition />} />
            <Route path="admin/addCandidate" element={<AddCandidate />} />
            <Route path="admin/allelection" element={<ElectionAdmin />} />
            <Route path="userdata" element={<Users />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default Router;
