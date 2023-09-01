import "./App.css";
import Router from "./Router";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserData";

function App() {
  return (
    <>
      <UserProvider>
        <Router /> <Toaster />
      </UserProvider>
    </>
  );
}

export default App;
