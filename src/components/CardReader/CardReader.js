import { useEffect } from "react";
import { AiOutlineCreditCard } from "react-icons/ai";

function CardReader({ onCardRead, className }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onCardRead && onCardRead("3434329874839201");
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [onCardRead]);

  return (
    <div onClick={(e) => e.stopPropagation()} className={className}>
      <div className="text-blue-800 animate-pulse">
        <AiOutlineCreditCard size={100} />
      </div>
      <div>Authentication Required. Waiting for Card...</div>
    </div>
  );
}

export default CardReader;
