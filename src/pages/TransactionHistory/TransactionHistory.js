import dayjs from "dayjs";
import { MdCircle } from "react-icons/md";
import { formatNumber } from "../../functions/functions";

const transactions = [
  {
    id: "44fe46ce-b4a8-4d3b-a3ff-e9545fc91c6e",
    from: "4729437857749271",
    to: "4714725606227271",
    type: "card-to-card",
    reference: "b7dc6963792911c7",
    amount: 50000,
    status: "pending",
    timestamp: 1643356725,
  },
  {
    id: "be2932c1-25e4-4890-a3c0-e26c49d237a2",
    from: "4714894605801229",
    to: "4729437857749271",
    type: "card-from-card",
    reference: "a5f15e86dc458d51",
    amount: 120000,
    status: "success",
    timestamp: 1643345345,
  },
  {
    id: "1b752419-aace-4218-8102-f2f2b32fe967",
    from: "+256786852458",
    to: "4729437857749271",
    type: "card-from-mm",
    reference: "a6efdf58b278b02d",
    amount: 500,
    status: "success",
    timestamp: 1642269421,
  },
  {
    id: "aee6225d-7c83-4f56-a113-e7767104cbb4",
    from: "4729437857749271",
    to: "4579727331347857",
    type: "card-from-mm",
    reference: "a8faa8d65f7d329a",
    amount: 12000,
    status: "cancelled",
    timestamp: 1642169344,
  },
  {
    id: "f4c2e86f-7bc7-4c4e-9967-165723bdc724",
    from: "4729437857749271",
    to: "4579727331347857",
    type: "card-to-card",
    reference: "8e6f1cffd781de6f",
    amount: 29000,
    status: "success",
    timestamp: 1641727738,
  },
  {
    id: "ec2f2bf1-a09b-4397-9b75-5a5775fdabf3",
    from: "+256775412048",
    to: "4729437857749271",
    type: "card-from-mm",
    reference: "bafae17b084a7127",
    amount: 365000,
    status: "success",
    timestamp: 1641622176,
  },
];

function TransactionHistory() {
  const getOtherUser = ({ type, ...users }) => {
    const t = type.split("-")[1];
    return users[t];
  };

  const getTypeColor = (transactionType) => {
    const type = transactionType.split("-")[1];
    return type === "from"
      ? { borderColor: "border-green-600", textColor: "text-green-600" }
      : { borderColor: "border-purple-600", textColor: "text-purple-600" };
  };
  const getStatusColor = (status) => {
    if (status === "success")
      return { bgColor: "bg-green-200", textColor: "text-green-600" };
    else if (status === "pending")
      return { bgColor: "bg-orange-200", textColor: "text-orange-600" };
    else if (status === "processing")
      return { bgColor: "bg-blue-200", textColor: "text-blue-600" };
    else if (status === "cancelled")
      return { bgColor: "bg-red-200", textColor: "text-red-600" };
    else return { bgColor: "bg-purple-200", textColor: "text-purple-600" };
  };
  const getStatusText = (status) => {
    if (status === "pending") return "Pending Confirmation";
    return status;
  };

  const renderStatus = (status) => {
    const { bgColor, textColor } = getStatusColor(status);
    const text = getStatusText(status);
    return (
      <div
        className={`text-xs uppercase flex justify-center items-center self-start px-3 py-1 font-bold ${textColor} ${bgColor} rounded-2xl`}
      >
        {text}
      </div>
    );
  };

  const renderTransaction = ({
    id,
    from,
    to,
    type,
    reference,
    amount,
    status,
    timestamp,
  }) => {
    const dayJSDate = dayjs.unix(timestamp);
    const { borderColor, textColor } = getTypeColor(type);
    const otherSenderOrReceiver = getOtherUser({ type, from, to });
    return (
      <div
        key={id}
        className={`mx-2 my-3 bg-slate-100 border-l-4 p-3 ${borderColor}`}
      >
        <div className="flex mb-3">
          <div className="flex flex-col justify-center items-center self-center bg-white py-2 px-3 rounded-md shadow-md">
            <span className="font-bold text-lg">{dayJSDate.format("D")}</span>
            <span className="text-gray-600 text-xs">{`${dayJSDate.format(
              "MMM"
            )}'${dayJSDate.format("YY")}`}</span>
          </div>
          <div className="flex-1 flex flex-col justify-center px-2">
            <div className="text-xs uppercase text-gray-600">
              {type.split("-")[1]}
            </div>
            <div className="text-lg text-gray-600">{otherSenderOrReceiver}</div>
            {/* {renderStatus(status)} */}
          </div>
          <div className="flex flex-col justify-center items-center self-center">
            <span className="font-bold text-gray-600">UGX</span>
            <span className={`font-bold ${textColor} text-lg`}>
              {formatNumber(amount)}
            </span>
          </div>
        </div>
        {renderStatus(status)}
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="flex-1 flex flex-col max-w-md">
        <div className="flex justify-center">
          <div className="flex justify-center items-center mx-2">
            <MdCircle className="text-green-600 mx-1" />{" "}
            <span className="uppercase">Incoming</span>
          </div>
          <div className="flex justify-center items-center mx-2">
            <MdCircle className="text-purple-600 mx-1" />{" "}
            <span className="uppercase">Outgoing</span>
          </div>
        </div>
        <div>
          {transactions.map((transaction) => renderTransaction(transaction))}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
