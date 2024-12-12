import React, { useState } from 'react';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const closePopup = () => {
    
      setIsOpen(false);
   
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={togglePopup}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Click Me
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={closePopup}
        >
        <div className='bg-[#ffcb33] rounded-2xl lg:w-[30%] mx-3'>
            <div className='border-[4px] border-white m-4 rounded-2xl max-sm:m-2'>
                <div className='p-6 max-sm:p-1'>

                <div className='lg:text-4xl text-3xl font-bold text-white  text-center max-sm:text-[20px]'>LOOKS LIKE WE COULDN'T FIND A MATCH </div>
                <div className='lg:text-4xl text-3xl font-bold text-white  text-center max-sm:text-[20px]'>TRY AGAIN FOR A BETTER SHOT!</div>
                </div>
                <button className='bg-white rounded-full mb-6 text-[#ffcb33] text-2xl max-sm:text-[18px] font-bold px-4 py-2  mx-auto w-[200px] flex justify-center'>OKAY</button>

            </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Popup;
