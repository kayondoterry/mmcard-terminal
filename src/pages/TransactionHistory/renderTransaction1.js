// const renderTransaction = ({
//   id,
//   from,
//   to,
//   type,
//   reference,
//   amount,
//   status,
//   timestamp,
// }) => {
//   return (
//     <div key={id} className={`mx-2 my-3 bg-blue-300 border-l-4 p-3 ${getBorderColor(type)}`}>
//       <div className="flex flex-col my-1">
//         <span className="text-xs uppercase font-bold">Reference</span>
//         <span className="font-light">{reference}</span>
//       </div>
//       <div className="flex flex-col my-1">
//         <span className="text-xs uppercase font-bold">From</span>
//         <span className="font-light">{from}</span>
//       </div>
//       <div className="flex flex-col my-1">
//         <span className="text-xs uppercase font-bold">To</span>
//         <span className="font-light">{to}</span>
//       </div>
//       <div className="flex flex-col my-1">
//         <span className="text-xs uppercase font-bold">Amount</span>
//         <span className="font-light">UGX {formatNumber(amount)}</span>
//       </div>
//       <div className="flex flex-col my-1">
//         <span className="text-xs uppercase font-bold">Type</span>
//         <span className="font-light">{type}</span>
//       </div>
//       <div className="flex flex-col my-1">
//         <span className="text-xs uppercase font-bold">Status</span>
//         <span className="font-light">{status}</span>
//       </div>
//       <div className="flex flex-col my-1">
//         <span className="text-xs uppercase font-bold">Date</span>
//         <span className="font-light">{timestamp}</span>
//       </div>
//     </div>
//   );
// };