// App.js or App.tsx
import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const App = () => {
  const [primaryColor, setPrimaryColor] = useState('#4CAF50'); // Default primary color

  // This function dynamically sets the primary color
  const handleThemeChange = (color) => {
    setPrimaryColor(color);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <style>{`
          :root {
            --color-primary: ${primaryColor}; /* Setting CSS variable for primary color */
          }
        `}</style>
      </Helmet>

      <div className="App">
        <div className="bg-primary text-white p-4">
          This is a Tailwind component with dynamic primary color!
        </div>

        {/* Add a button to change the theme dynamically */}
        <button onClick={() => handleThemeChange('#FF5733')} className="mt-4 p-2 bg-gray-800 text-white">
          Change Primary Color to Orange
        </button>
      </div>
    </HelmetProvider>
  );
};

export default App;
