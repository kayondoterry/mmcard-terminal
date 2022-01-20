import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import KeyPadInput from "../../components/KeyPadInput/KeyPadInput";
import Modal from "../../components/Modal/Modal";
import { formatNumber } from "../../functions/functions";

function AccountBalance() {
  const [isPINInputModalOpen, setIsPINInputModalOpen] = useState(true);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [accountBalance, setAccountBalance] = useState(null);

  const closePINInputModal = () => {
    setIsPINInputModalOpen(false);
  };

  const openPINInputModal = () => {
    setIsPINInputModalOpen(true);
  };

  const handlePINSubmit = (pin) => {
    closePINInputModal();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
      fetchBalance();
    }, 3000);
  };

  const fetchBalance = () => {
    setIsFetchingBalance(true);
    setTimeout(() => {
      setAccountBalance(45500);
      setIsFetchingBalance(false);
    }, 3000);
  };

  const handleGetBalanceClick = () => {
    if (isAuthenticated) {
      fetchBalance();
    } else {
      openPINInputModal();
    }
  };

  return (
    <div className="flex justify-center">
      {isPINInputModalOpen && (
        <Modal
          isOpen={isPINInputModalOpen}
          onClose={closePINInputModal}
          className="flex flex-col justify-end"
        >
          <KeyPadInput
            prompt="Enter PIN"
            obscured={true}
            centered={true}
            min={4}
            max={4}
            onCancel={closePINInputModal}
            onSubmit={handlePINSubmit}
            className="bg-white p-4"
          />
        </Modal>
      )}
      <div className="flex flex-col items-center">
        <span className="my-2 mx-1 text-4xl lg:text-6xl">
          UGX {isAuthenticated && accountBalance ? formatNumber(accountBalance) : "******"}
        </span>
        <button
          onClick={handleGetBalanceClick}
          disabled={
            isPINInputModalOpen || isFetchingBalance || isAuthenticating
          }
          className="flex items-center bg-blue-900 text-white px-2 py-2 mx-2"
        >
          <span className="flex-1 mx-2">
            {isPINInputModalOpen
              ? "Waiting for PIN"
              : isFetchingBalance
              ? "Fetching Balance. Please wait..."
              : isAuthenticating
              ? "Authenticating..."
              : isAuthenticated
              ? "Refresh"
              : "Get Balance"}
          </span>
          {(isPINInputModalOpen || isFetchingBalance || isAuthenticating) && (
            <FaSpinner className="animate-spin mr-2" />
          )}
        </button>
      </div>
    </div>
  );
}

export default AccountBalance;
