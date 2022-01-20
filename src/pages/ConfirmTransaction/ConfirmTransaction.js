import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import KeyPadInput from "../../components/KeyPadInput/KeyPadInput";
import Modal from "../../components/Modal/Modal";
import { formatNumber } from "../../functions/functions";

function ConfirmTransaction() {
  const [isPINInputModalOpen, setPINInputModalOpen] = useState(false);
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [processingAction, setProcessingAction] = useState("confirm");

  const isProcessing = isPINInputModalOpen || isProcessingTransaction;

  const openPINInputModal = () => {
    setPINInputModalOpen(true);
  };

  const closePINInputModal = () => {
    setPINInputModalOpen(false);
  };

  const handlePINInputSubmit = (pin) => {
    closePINInputModal();
    setIsProcessingTransaction(true);
    setTimeout(() => {
      setIsProcessingTransaction(false);
      // navigate("/terminal/confirm-transaction/8758485423232323", {
      //   replace: true,
      // });
    }, 3000);
  };

  const handleConfirmTransaction = () => {
    setProcessingAction("confirm");
    openPINInputModal();
  };

  const handleCancelTransaction = () => {
    setProcessingAction("cancel");
    openPINInputModal();
  };

  const getConfirmButtonText = () => {
    let buttonText = null;

    if (isPINInputModalOpen) {
      buttonText = "Waiting for PIN";
    } else if (isProcessingTransaction) {
      buttonText = "Processing. Please wait...";
    } else {
      buttonText = "Confirm Transaction";
    }

    return buttonText;
  };

  const getCancelButtonText = () => {
    let buttonText = null;

    if (isPINInputModalOpen) {
      buttonText = "Waiting for PIN";
    } else if (isProcessingTransaction) {
      buttonText = "Processing. Please wait...";
    } else {
      buttonText = "Cancel Transaction";
    }

    return buttonText;
  };

  const confirmButtonStyle =
    isProcessing && processingAction === "cancel" ? "hidden" : "";
  const cancelButtonStyle =
    isProcessing && processingAction === "confirm" ? "hidden" : "";

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

  const renderButtons = () => {
    return (
      <div className="flex flex-col sm:flex-row-reverse sm:self-center">
        <button
          onClick={handleConfirmTransaction}
          disabled={isProcessing}
          className={`flex items-center bg-blue-900 text-white px-2 py-2 m-2 sm:self-center ${confirmButtonStyle}`}
        >
          <span className="flex-1 mx-2 px-3">{getConfirmButtonText()}</span>
          {isProcessing && <FaSpinner className="animate-spin mr-2" />}
        </button>
        <button
          onClick={handleCancelTransaction}
          disabled={isProcessing}
          className={`flex items-center bg-red-600 text-white px-2 py-2 m-2 sm:self-center ${cancelButtonStyle}`}
        >
          <span className="flex-1 mx-2 px-3">{getCancelButtonText()}</span>
          {isProcessing && <FaSpinner className="animate-spin mr-2" />}
        </button>
      </div>
    );
  };

  const renderTransactionInformation = () => {
    return (
      <div>
        <div className="m-2">
          <span className="text-xs uppercase tracking-wide">Receiver Name</span>
          <div className="hover:cursor-pointer bg-blue-300 p-2 m-0 uppercase text-left text-lg font-light">
            Baskadoodo Marcus
          </div>
        </div>
        <div className="m-2">
          <span className="text-xs uppercase tracking-wide">
            Receiver's Card Number
          </span>
          <div className="hover:cursor-pointer bg-blue-300 p-2 m-0 uppercase text-left text-lg font-light">
            6645646689773482
          </div>
        </div>
        <div className="m-2">
          <span className="text-xs uppercase tracking-wide">
            Amount to send
          </span>
          <div className="hover:cursor-pointer bg-blue-300 p-2 m-0 uppercase text-left text-lg font-light">
            UGX {formatNumber(25000)}
          </div>
        </div>
        <div className="m-2">
          <span className="text-xs uppercase tracking-wide">Service Fee</span>
          <div className="hover:cursor-pointer bg-blue-300 p-2 m-0 uppercase text-left text-lg font-light">
            UGX {formatNumber(500)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      {isPINInputModalOpen && renderPINInputModal()}
      <div className="flex-1 flex flex-col max-w-xl">
        <h1 className="text-center text-xl font-light">
          Confirm Transaction #8758485423232323
        </h1>
        <div className="flex flex-col sm:flex-col-reverse">
          {renderTransactionInformation()}
          {renderButtons()}
        </div>
      </div>
    </div>
  );
}

export default ConfirmTransaction;
