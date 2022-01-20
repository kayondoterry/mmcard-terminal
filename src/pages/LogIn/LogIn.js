import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardReader from "../../components/CardReader/CardReader";
import KeyPadInput from "../../components/KeyPadInput/KeyPadInput";
import Modal from "../../components/Modal/Modal";
import { loginUser } from "../../functions/functions";

function LogIn() {
  const navigate = useNavigate();

  const [cardInfo, setCardInfo] = useState(null);
  const [isCardReaderModalOpen, setIsCardReaderModalOpen] = useState(false);
  const [isPINInputModalOpen, setIsPINInputModalOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isGettingCardInfo, setIsGettingCardInfo] = useState(false);

  const closeCardReaderModal = () => {
    setIsCardReaderModalOpen(false);
  };

  const openCardReaderModal = () => {
    setIsCardReaderModalOpen(true);
  };

  const closePINInputModal = () => {
    setIsPINInputModalOpen(false);
  };

  const openPINInputModal = () => {
    setIsPINInputModalOpen(true);
  };

  const handleCardRead = (data) => {
    closeCardReaderModal();
    setIsGettingCardInfo(true);
    setTimeout(() => {
      setCardInfo({
        cardNumber: "4729437857749271",
        user: { name: "Terry Kayondo" },
      });
      setIsGettingCardInfo(false);
      closeCardReaderModal();
      openPINInputModal();
    }, 3000);
  };

  const handlePINSubmit = (pin) => {
    closePINInputModal();
    setIsLoggingIn(true);
    setTimeout(() => {
      loginUser({ cardNumber: cardInfo.cardNumber, pin });
      navigate("/terminal", { replace: true });
      // setIsLoggingIn(false);
    }, 3000);
  };

  const firstName = cardInfo && cardInfo.user.name.split(" ")[0];
  return (
    <div className="fixed w-full h-full flex flex-col justify-center items-center">
      {isCardReaderModalOpen && (
        // <Modal
        //   isOpen={isCardReaderModalOpen}
        //   onClose={closeCardReaderModal}
        //   className="flex flex-col justify-center items-center"
        // >
        //   <CardReader
        //     onCardRead={handleCardRead}
        //     className="flex flex-col justify-center items-center p-8 m-2 bg-white max-w-md shadow-lg"
        //   />
        // </Modal>
        <Modal
          isOpen={isCardReaderModalOpen}
          onClose={closeCardReaderModal}
          className="flex flex-col justify-end"
        >
          <CardReader
            onCardRead={handleCardRead}
            className="flex flex-col justify-center items-center p-4 bg-white"
          />
        </Modal>
      )}
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
      <h1 className="text-6xl text-blue-800 mb-3">
        Welcome{firstName && `,${firstName}`}
      </h1>
      <button
        disabled={
          isCardReaderModalOpen ||
          isPINInputModalOpen ||
          isGettingCardInfo ||
          isLoggingIn
        }
        onClick={openCardReaderModal}
        className="flex items-center bg-blue-900 text-white px-2 py-2 mx-2"
      >
        <span className="flex-1 mx-2">
          {isCardReaderModalOpen
            ? "Waiting for Card"
            : isPINInputModalOpen
            ? "Waiting for PIN"
            : isGettingCardInfo
            ? "Getting Card Information"
            : isLoggingIn
            ? "Logging In. Please wait..."
            : "Tap to log in"}
        </span>
        {(isCardReaderModalOpen ||
          isPINInputModalOpen ||
          isGettingCardInfo ||
          isLoggingIn) && <FaSpinner className="animate-spin mr-2" />}
      </button>
    </div>
  );
}

export default LogIn;
