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
            <Route path="vote" element={<Vote />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default Router;
