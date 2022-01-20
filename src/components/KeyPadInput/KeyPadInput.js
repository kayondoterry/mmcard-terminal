import { useState } from "react";
import { MdBackspace } from "react-icons/md";
import { formatNumber } from "../../functions/functions";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

function KeyPadInput({
  onCancel,
  onSubmit,
  max,
  min,
  obscured,
  centered,
  prompt,
  className,
  isNum,
  minValue,
  maxValue,
  printSeparator,
}) {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(null);

  const handleKeyPress = (key) => {
    inputError && setInputError(null);
    input.length < (max || Number.POSITIVE_INFINITY) &&
      setInput(input.concat(key));
  };

  const handleBackspace = () => {
    input.length > 0 && setInput(input.slice(0, input.length - 1));
  };

  const handleSubmit = () => {
    if (isNum) submitNumber(parseInt(input || 0));
    else submitString(input);
  };

  const submitString = (data) => {
    const mx = max || Number.POSITIVE_INFINITY;
    const mn = min || 0;

    if (mn === mx && data.length !== mn) {
      setInputError(`${mn} characters required`);
    } else if (data.length < mn) {
      setInputError(`Minimum ${mn} characters required`);
    } else if (data.length > mx) {
      setInputError(`Maximum ${mx} characters allowed`);
    } else {
      onSubmit && onSubmit(data);
    }
  };

  const submitNumber = (num) => {
    const mx = maxValue || Number.POSITIVE_INFINITY;
    const mn = minValue || 0;
    if (num < mn) {
      setInputError(
        `Minimum value allowed: ${printSeparator ? formatNumber(mn) : mn}`
      );
    } else if (num > mx) {
      setInputError(
        `Maximum value allowed: ${printSeparator ? formatNumber(mx) : mx}`
      );
    } else {
      onSubmit && onSubmit(num);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const renderKeys = () => {
    return keys.map((key) => (
      <button
        onClick={() => handleKeyPress(key)}
        key={key}
        className="flex-1 bg-blue-900 text-white text-2xl py-3 px-2 my-1 mx-0.5"
      >
        {key}
      </button>
    ));
  };

  const textAlign = centered ? "text-center" : "text-right";

  return (
    <div onClick={(e) => e.stopPropagation()} className={className}>
      <div className="flex mx-0.5 my-1">
        <div className="flex flex-col sm:flex-row sm:justify-end flex-1">
          <div className="text-sm flex items-center mr-1">
            {(prompt && `${prompt}: `) || ""}
          </div>
          <div className="flex flex-1 font-light sm:max-w-lg">
            <input
              disabled
              value={
                obscured
                  ? "*".repeat(input.length)
                  : printSeparator
                  ? formatNumber(input)
                  : input
              }
              className={`flex-1 border-0 bg-blue-100 px-1 py-2 md:py-1 text-2xl md:text-4xl text-gray-800 ${textAlign}`}
              type="text"
              size={1}
            />

            <button
              onClick={handleBackspace}
              className="flex justify-center items-center w-16 bg-gray-500 text-3xl text-white"
            >
              <MdBackspace />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <span className="text-red-600 text-xs">{inputError}</span>
      </div>
      <div className="flex overflow-y-auto">{renderKeys()}</div>
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <button
          onClick={handleCancel}
          className="m-1 px-8 py-3 text-lg rounded-2xl text-white font-semibold bg-red-600"
        >
          CANCEL
        </button>
        <button
          onClick={handleSubmit}
          className="m-0.5 px-8 py-3 text-lg rounded-2xl text-white font-semibold bg-green-600"
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
}

export default KeyPadInput;
