import { Navigate } from "react-router-dom";
import AccountBalance from "./pages/AccountBalance/AccountBalance";
import ComingSoon from "./pages/ComingSoon/ComingSoon";
import ConfirmTransaction from "./pages/ConfirmTransaction/ConfirmTransaction";
import LogIn from "./pages/LogIn/LogIn";
import SendMoney from "./pages/SendMoney/SendMoney";
import TerminalApp from "./pages/TerminalApp/TerminalApp";
import TransactionHistory from "./pages/TransactionHistory/TransactionHistory";

const routerConfig = [
  // {path: "", element: 0}
  { path: "/", element: <Navigate to="/login" replace={true} /> },
  { path: "/login", element: <LogIn /> },
  {
    path: "/terminal",
    element: <TerminalApp />,
    children: [
      { path: "account-balance", element: <AccountBalance /> },
      { path: "send-money", element: <SendMoney /> },
      { path: "transaction-history", element: <TransactionHistory /> },
      { path: "notifications", element: <ComingSoon /> },
      { path: "change-pin", element: <ComingSoon /> },
      { path: "help", element: <ComingSoon /> },
      { path: "confirm-transaction/:transactionReference", element: <ConfirmTransaction /> },
    ],
  },
];

export default routerConfig;
