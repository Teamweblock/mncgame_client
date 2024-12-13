import React from "react";

const RoleCard = ({ role, color, imgSrc }) => {
    return (
        <div
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 border-2"
            style={{ borderColor: color }}
        >
            <img
                src={imgSrc}
                alt={`${role} avatar`}
                className="w-20 h-20 rounded-full mb-4"
            />
            <h2 className={`text-xl font-bold`} style={{ color }}>
                {role}
            </h2>
            <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                style={{ backgroundColor: color }}
            >
                View About Role
            </button>
        </div>
    );
};

export default RoleCard;
