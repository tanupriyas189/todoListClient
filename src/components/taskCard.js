import React from "react";
import { toggleComplete } from "../api";

function TaskCard({ position, description, isComplete, id, getAllData }) {
  const changeStatus = async () => {
    await toggleComplete(id);
    getAllData();
  };
  return (
    <div className="hover:scale-105 transform transition duration-150 w-full bg-white items-center shadow-md rounded-lg flex justify-between px-8 py-4 border">
      <div className="flex space-x-4">
        {/* <div>{position}</div> */}
        <div className={`${isComplete ? "line-through" : ""}`}>
          {description}
        </div>
      </div>
      <div
        className="border flex justify-center items-center w-5 h-5 cursor-pointer rounded "
        onClick={() => {
          changeStatus();
        }}
      >
        {isComplete ? (
          <div className="hover:scale-105 transform transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        ) : (
          <div className=" text-blue-950"></div>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
