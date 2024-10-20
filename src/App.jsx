import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { ChromePicker } from "react-color";

import Modal from "./components/Modal.jsx";
import ThemeColors from "./components/ThemePreviewer.jsx";

import { createTheme } from "./helpers/theme.js";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemePalette, setShowThemePalette] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#528FF0");

  // Handle color change
  const handleColorChange = (color) => {
    setPrimaryColor(color.hex);
  };

  return (
    <div className="App min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white flex flex-col items-center justify-center">
      {/* Injecting dynamic styles */}
      <HelmetProvider>
        <Helmet>
          <style>
            {createTheme({
              primaryColor,
            })}
          </style>
        </Helmet>
      </HelmetProvider>

      {/* Hero Section */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold mb-4">Color Theming Made Easy</h1>
        <p className="text-lg font-medium">
          A demo to show how you can dynamically create a scalable theme in
          React
        </p>
      </header>

      {/* Button Cards Section */}
      <div className="flex  items-center space-x-8">
        {/* Open Checkout Modal */}
        <div className="bg-white w-[250px] p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Checkout Modal
          </h3>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors duration-300"
          >
            Open Checkout
          </button>
        </div>

        {/* Open Theme Palette */}
        <div className="bg-white w-[250px] p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Theme Palette
          </h3>
          <button
            onClick={() => setShowThemePalette(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors duration-300"
          >
            Open Palette
          </button>
        </div>
      </div>

      {/* Color Picker Section */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Pick Primary Color</h3>
        <ChromePicker
          color={primaryColor}
          onChangeComplete={handleColorChange}
        />
      </div>

      {/* Modal Component */}
      {isOpen && <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)} />}

      {/* Theme Colors Palette */}
      {showThemePalette && (
        <ThemeColors
          isOpen={showThemePalette}
          handleClose={() => setShowThemePalette(false)}
        />
      )}
    </div>
  );
};

export default App;
