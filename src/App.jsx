import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Modal from "./components/Modal.jsx";
import { createTheme } from "./helpers/theme.js";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      {/* Injecting dynamic styles */}
      <HelmetProvider>
        <Helmet>
          <style>{createTheme({ primaryColor: "#DF742C" })}</style>
        </Helmet>
      </HelmetProvider>

      {/* Tailwind component with dynamic color */}
      <div className="text-on-primary-500 bg-primary-500 p-4">
        This is a Tailwind component with dynamic primary color!
      </div>

      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 p-2 bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
      >
        Open Checkout
      </button>

      {/* Modal Component */}
      {isOpen && <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default App;
