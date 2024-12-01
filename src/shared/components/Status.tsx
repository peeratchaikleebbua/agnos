import React from "react";

export enum IStatusColor {
  GREEN = "green",
  BLUE = "blue",
  RED = "red",
  gray = "gray",
}

export interface IStatus {
  status: {
    status: string;
    color: string;
  };
}

const Status = ({ status }: IStatus) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <button
        disabled
        className={`text-white font-medium px-4 py-2 rounded-md ${handleStatusColor(
          status.color
        )}`}
      >
        {status.status || "Waiting"}
      </button>
      <span className="relative flex h-3 w-3 -top-5 ">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${handleStatusColor(
            status.color
          )} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-3 w-3 ${handleStatusColor(
            status.color
          )}`}
        ></span>
      </span>
    </div>
  );
};

function handleStatusColor(color: string) {
  switch (color) {
    case IStatusColor.GREEN:
      return "bg-green-500";
    case IStatusColor.BLUE:
      return "bg-sky-500";
    case IStatusColor.RED:
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}
export default Status;
