import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import { logoutUser } from "../../../functions/functions";

const navLinks = [
  { text: "Account\nBalance", to: "/terminal/account-balance" },
  { text: "Send\nMoney", to: "/terminal/send-money" },
  { text: "View Last 10\nTransactions", to: "/terminal/transaction-history" },
  { text: "Notifications", to: "/terminal/notifications" },
  { text: "Change\nPIN", to: "/terminal/change-pin" },
  { text: "Help", to: "/terminal/help" },
];

const newLineToBR = (text) => {
  const lines = text.split("\n");
  if (lines.length === 1) return text;
  return lines.map((line, index) => {
    return <span key={index}>{line}</span>;
  });
};

function NavBar() {
  const navigate = useNavigate();
  const renderNavLinks = (navLinks) => {
    return navLinks.map(({ text, to }, index) => (
      <NavLink
        key={index}
        to={to}
        replace={true}
        className={({isActive}) => `flex flex-col justify-center items-center text-center rounded-3xl bg-white my-2 mx-3 text-xs lg:text-sm font-bold uppercase tracking-wide px-8 lg:py-2 ${isActive?"text-blue-800":""}`}
      >
        {newLineToBR(text)}
      </NavLink>
    ));
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <div className="bg-blue-900 flex justify-center p-2 sticky top-0">
      <div className="flex p-1 max-w-5xl overflow-x-auto">
        {renderNavLinks(navLinks)}
        <button onClick={handleLogout} className="flex flex-col justify-center items-center text-center rounded-3xl bg-red-600 text-2xl text-white my-2 mx-3 font-bold uppercase tracking-wide px-8 py-4">
          <AiOutlinePoweroff />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
