import { Outlet } from "react-router-dom";
import ProfileBar from "./components/ProfileBar";

import profilePic from "../../assets/images/profile.jpg";
import NavBar from "./components/NavBar";
import { getCurrentUser } from "../../functions/functions";

function TerminalApp() {
  const user = getCurrentUser();
  const { name, cardNumber } = user;
  return (
    <div>
      <ProfileBar profilePic={profilePic} name={name} cardNumber={cardNumber} />
      <NavBar />
      <div className="max-w-5xl mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default TerminalApp;
