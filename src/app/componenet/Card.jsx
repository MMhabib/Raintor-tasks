'use client'

import React from "react";

const Card = ({user}) => {
  const [visible, setVisible] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const divRef = React.useRef(null);

    const handleMouseMove = (e) => {
        const bounds = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };

    return (
         <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative w-full h-fit rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer"
    >
      {visible && (
        <div
          className="pointer-events-none blur-xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 size-60 absolute z-0 transition-opacity duration-300"
          style={{ top: position.y - 120, left: position.x - 120 }}
        />
      )}

      <div className="relative z-10 bg-white p-6 h-full w-full rounded-[10px] flex flex-col items-center justify-center text-center">
        <img
          src={user.image}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full shadow-md my-4"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {user.firstName} {user.lastName} {user.maidenName ? `(${user.maidenName})` : null}
        </h2>
        <p className="text-sm text-indigo-500 font-medium mb-4">
          {user.company?.title}
        </p>
        <p className="text-sm text-gray-500 mb-4 px-4">
          {user.university}
        </p>
        <p className="text-xs text-gray-400 mb-2">{user.email}</p>
        <p className="text-xs text-gray-400 mb-2">
          Age: {user.age} | Gender: {user.gender}
        </p>
 <div className="text-xs text-gray-600 mb-2">
          Phone: {user.phone}
        </div>

        <div className="text-xs text-gray-600 mb-2">
          Username: {user.username}
        </div>

        <div className="text-xs text-gray-600 mb-2">
          Birth Date: {user.birthDate}
        </div>

        <div className="text-xs text-gray-600 mb-2">
          Blood Group: {user.bloodGroup}
        </div>

        <div className="text-xs text-gray-600 mb-2">
          Height: {user.height} cm | Weight: {user.weight} kg
        </div>

        <div className="text-xs text-gray-600 mb-2">
          Eye Color: {user.eyeColor} | Hair: {user.hair?.color}, {user.hair?.type}
        </div>

        <div className="text-xs text-gray-600 mb-2">
          Address: {user.address?.city}, {user.address?.state}, {user.address?.country}
        </div>

        <div className="text-xs text-gray-600 mb-2">
          Company: {user.company?.name}, {user.company?.department}
        </div>

        <div className="text-xs text-gray-600 mb-2">
          Bank: {user.bank?.cardType} - {user.bank?.cardNumber} (expires {user.bank?.cardExpire})
        </div>

        <div className="text-xs text-gray-600 mb-2">
          Crypto: {user.crypto?.coin} | Network: {user.crypto?.network}
        </div>
        
      </div>
    </div>
  );
};

export default Card;