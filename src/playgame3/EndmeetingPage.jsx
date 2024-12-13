import React from "react";

const EndmeetingPage = () => {
  const participants = [
    { role: "CEO", imgSrc: "https://via.placeholder.com/100" },
    { role: "CTO", imgSrc: "https://via.placeholder.com/100" },
    { role: "CFO", imgSrc: "https://via.placeholder.com/100" },
    { role: "CHRO", imgSrc: "https://via.placeholder.com/100" },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1593642634367-d91a135587b5')`,
      }}
    >
      {/* Header */}
      <div className="absolute top-5 left-5 text-white text-2xl font-bold">
        MNC
      </div>

      {/* Participant Windows */}
      <div className="grid grid-cols-2 gap-10 mb-10">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-5 flex flex-col items-center relative w-52"
          >
            <img
              src={participant.imgSrc}
              alt={participant.role}
              className="rounded-full w-24 h-24 mb-3"
            />
            <h3 className="text-lg font-bold text-center">
              {participant.role}
            </h3>
          </div>
        ))}
      </div>

      {/* Notification Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-4/5 text-center mb-5">
        <p className="text-gray-800 text-lg font-semibold">
          Your company has experienced a data breach, compromising customer
          information.
        </p>
      </div>

      {/* End Meeting Button */}
      <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition">
        End Meeting
      </button>
    </div>
  );
};

export default EndmeetingPage;
