import React from "react";

const Modal = ({ isOpen, handleClose, merchantThemeColor }) => {
  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 h-[36.5rem] max-w-[62.5rem] flex overflow-hidden shadow-lg">
            {/* <div className="w-1/3 bg-blue-600 text-white p-6 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4">
                Magic Checkout Demo
              </h2>
            </div> */}

            {/* Right Panel */}
            {/* <div className="w-2/3 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Review Order</h2>
                <button
                  className="text-xl font-bold text-gray-500 hover:text-gray-700"
                  onClick={handleClose}
                >
                  &times;
                </button>
              </div>
              <h1> Things will come here</h1>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
