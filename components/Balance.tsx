import { FaDollarSign } from "react-icons/fa6";

export const Balance = ({ quantity }: { quantity: number }) => {
  return (
    <span
      className="font-ibm-plex text-purple-500 flex items-center p-0.5 border border-gray-500
         bg-black rounded-lg justify-center"
    >
      <FaDollarSign size={18} className="text-teal-500" />
      {quantity}
    </span>
  );
};

export const BalanceSm = ({ quantity }: { quantity: number }) => {
  return (
    <span
      className="font-ibm-plex text-purple-500 flex items-center p-0.5 border border-gray-500
         bg-black rounded-lg justify-center text-sm"
    >
      <FaDollarSign size={14} className="text-teal-500" />
      {quantity}
    </span>
  );
};

export const BalanceLg = ({ quantity }: { quantity: number }) => {
  return (
    <span
      className="font-ibm-plex text-purple-500 flex items-center p-0.5 border border-gray-500
         bg-black rounded-lg text-xl justify-center"
    >
      <FaDollarSign size={20} className="text-teal-500" />
      {quantity}
    </span>
  );
};
