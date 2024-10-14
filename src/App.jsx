// App.js or App.tsx
import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Modal from "./compoenents/Modal";
import { createTheme } from "./compoenents/helpers";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <style>
          {createTheme({
            primaryColor: "orange",
          })}
        </style>
      </Helmet>
      <div className="App">
        <div
          className="text-on-primary-700 p-4"
          style={{ background: `hsl(var(--illustration-shadow)/ 1)` }}
        >
          This is a Tailwind component with dynamic primary color!
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 mx-2 p-2 bg-gray-800 text-white"
        >
          Open Modal
        </button>

        <svg width="100" height="100">
          <rect
            width="100"
            height="100"
            fill="hsl(var(--illustration-shadow))"
          />
        </svg>

        <Modal isOpen={isOpen} handleClose={handleClose} />
      </div>
    </HelmetProvider>
  );
};

export default App;
