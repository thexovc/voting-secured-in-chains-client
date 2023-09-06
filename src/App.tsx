import "./App.css";
import Router from "./Router";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserData";
import { FloatingWhatsApp } from "react-floating-whatsapp";

function App() {
  return (
    <>
      <FloatingWhatsApp
        accountName="Voting Secured By Chains"
        phoneNumber="2348103312533"
      />

      <UserProvider>
        <Router /> <Toaster />
      </UserProvider>
    </>
  );
}

export default App;
