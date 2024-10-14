import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

import Modal from "./components/Modal.jsx";
import ThemeColors from "./components/ThemePreviewer.jsx";

import { createTheme } from "./helpers/theme.js";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemePalette, setShowThemePalette] = useState(false);

  return (
    <div className="App">
      {/* Injecting dynamic styles */}
      <HelmetProvider>
        <Helmet>
          <style>{createTheme({ primaryColor: "#DF742C" })}</style>
        </Helmet>
      </HelmetProvider>

      {/* Tailwind component with dynamic color */}
      <div className="text-on-primary-400 bg-primary-400 p-4">
        This is a Tailwind component with dynamic primary color!
      </div>

      {/* Open Modal Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 p-2 bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
      >
        Open Checkout
      </button>

      {/* Open Theme Palette Button */}
      <button
        onClick={() => setShowThemePalette(true)}
        className="mt-4 mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
      >
        Open Theme Palette
      </button>

      {/* Modal Component */}
      {isOpen && <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)} />}

      <ThemeColors
        isOpen={showThemePalette}
        handleClose={() => setShowThemePalette(false)}
      />
    </div>
  );
};

export default App;
