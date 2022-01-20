import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import KeyPadInput from "../../components/KeyPadInput/KeyPadInput";
import Modal from "../../components/Modal/Modal";
import { formatNumber } from "../../functions/functions";

function SendMoney() {
  const navigate = useNavigate();

  const [receiverCardNumber, setReceiverCardNumber] = useState(null);
  const [amountToSend, setAmountToSend] = useState(null);
  const [isReceiverCardNumberModalOpen, setReceiverCardNumberModalOpen] =
    useState(null);
  const [isAmountToSendModalOpen, setAmountToSendModalOpen] = useState(null);
  const [isPINInputModalOpen, setPINInputModalOpen] = useState(false);
  const [isInitiatingTransaction, setIsInitiatingTransaction] = useState(false);
  const [receiverCardNumberError, setReceiverCardNumberError] = useState(null);
  const [amountToSendError, setAmountToSendError] = useState(null);

  const openReceiverCardNumberModal = () => {
    setReceiverCardNumberModalOpen(true);
  };

  const closeReceiverCardNumberModal = () => {
    setReceiverCardNumberModalOpen(false);
  };

  const openAmountToSendModal = () => {
    setAmountToSendModalOpen(true);
  };

  const closeAmountToSendModal = () => {
    setAmountToSendModalOpen(false);
  };

  const openPINInputModal = () => {
    setPINInputModalOpen(true);
  };

  const closePINInputModal = () => {
    setPINInputModalOpen(false);
  };

  const handleReceiverCardNumberSubmit = (receiverCardNumber) => {
    closeReceiverCardNumberModal();
    receiverCardNumberError && setReceiverCardNumberError(null);
    setReceiverCardNumber(receiverCardNumber);
  };
  const handleAmountToSendSubmit = (amountToSend) => {
    closeAmountToSendModal();
    amountToSendError && setAmountToSendError(null);
    setAmountToSend(amountToSend);
  };
  const handlePINInputSubmit = (pin) => {
    closePINInputModal();
    setIsInitiatingTransaction(true);
    setTimeout(() => {
      setIsInitiatingTransaction(false);
      navigate("/terminal/confirm-transaction/8758485423232323", {
        replace: true,
      });
    }, 3000);
  };

  const handleOnSend = () => {
    if (!receiverCardNumber || !amountToSend) {
      !receiverCardNumber &&
        setReceiverCardNumberError("Receiver's Card number required");
      !amountToSend && setAmountToSendError("Amount to Send required");
    } else openPINInputModal();
  };

  const renderReceiverCardNumberModal = () => {
    return (
      <Modal
        isOpen={isReceiverCardNumberModalOpen}
        className="flex flex-col justify-end"
        onClose={closeReceiverCardNumberModal}
      >
        <KeyPadInput
          prompt="Enter Receiver's Card Number"
          obscured={false}
          centered={false}
          min={16}
          max={16}
          onCancel={closeReceiverCardNumberModal}
          onSubmit={handleReceiverCardNumberSubmit}
          className="bg-white p-4"
        />
      </Modal>
    );
  };

  const renderAmountToSendModal = () => {
    return (
      <Modal
        isOpen={isAmountToSendModalOpen}
        className="flex flex-col justify-end"
        onClose={closeAmountToSendModal}
      >
        <KeyPadInput
          prompt="Enter Amount to Send"
          obscured={false}
          centered={false}
          isNum={true}
          minValue={500}
          maxValue={500000}
          printSeparator={true}
          onCancel={closeAmountToSendModal}
          onSubmit={handleAmountToSendSubmit}
          className="bg-white p-4"
        />
      </Modal>
    );
  };

  const renderPINInputModal = () => {
    return (
      <Modal
        isOpen={isPINInputModalOpen}
        className="flex flex-col justify-end"
        onClose={closePINInputModal}
      >
        <KeyPadInput
          prompt="Enter PIN"
          obscured={true}
          centered={true}
          min={4}
          max={4}
          onCancel={closePINInputModal}
          onSubmit={handlePINInputSubmit}
          className="bg-white p-4"
        />
      </Modal>
    );
  };

  const amountToSendStyle = amountToSend
    ? "text-left text-lg font-light"
    : "text-center text-xs";
  const receiverCardNumberStyle = receiverCardNumber
    ? "text-left text-lg font-light"
    : "text-center text-xs";

  const isProcessing =
    isPINInputModalOpen ||
    isAmountToSendModalOpen ||
    isReceiverCardNumberModalOpen ||
    isInitiatingTransaction;

  const getButtonText = () => {
    let buttonText = null;

    if (isPINInputModalOpen) {
      buttonText = "Waiting for PIN";
    } else if (isAmountToSendModalOpen) {
      buttonText = "Waiting for Amount to Send";
    } else if (isReceiverCardNumberModalOpen) {
      buttonText = "Waiting for Receiver's Card number";
    } else if (isInitiatingTransaction) {
      buttonText = "Initiating Transaction. Please wait...";
    } else {
      buttonText = "Send";
    }

    return buttonText;
  };

  return (
    <div className="flex justify-center">
      {isReceiverCardNumberModalOpen && renderReceiverCardNumberModal()}
      {isAmountToSendModalOpen && renderAmountToSendModal()}
      {isPINInputModalOpen && renderPINInputModal()}
      <div className="flex-1 flex flex-col max-w-xl">
        <div className="m-2">
          <span className="text-xs uppercase tracking-wide">
            Receiver's Card Number
          </span>
          <div
            onClick={() => {
              !isProcessing && openReceiverCardNumberModal();
            }}
            className={`hover:cursor-pointer bg-blue-300 p-2 m-0 uppercase ${receiverCardNumberStyle}`}
          >
            {receiverCardNumber || "Tap to Edit"}
          </div>
          <span className="text-xs text-red-600">
            {receiverCardNumberError}
          </span>
        </div>
        <div className="m-2">
          <span className="text-xs uppercase tracking-wide">
            Amount to Send
          </span>
          <div
            onClick={() => !isProcessing && openAmountToSendModal()}
            className={`hover:cursor-pointer bg-blue-300 p-2 m-0 uppercase ${amountToSendStyle}`}
          >
            {amountToSend ? `UGX ${formatNumber(amountToSend)}` : "Tap to Edit"}
          </div>
          <span className="text-xs text-red-600">{amountToSendError}</span>
        </div>
        <button
          onClick={handleOnSend}
          disabled={isProcessing}
          className="flex items-center bg-blue-900 text-white px-2 py-2 m-2 self-center"
        >
          <span className="flex-1 mx-2 px-3">{getButtonText()}</span>
          {isProcessing && <FaSpinner className="animate-spin mr-2" />}
        </button>
      </div>
    </div>
  );
}

export default SendMoney;
