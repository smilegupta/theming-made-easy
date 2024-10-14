import React from "react";
import PropTypes from "prop-types";

const themes = ["surface", "primary", "success", "danger", "warning"];
const variants = [
  "0",
  "10",
  "25",
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
  "1000",
];

const ThemeColors = ({ isOpen, handleClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-primary h-full w-full flex overflow-hidden shadow-lg relative">
            <div className="h-screen w-screen overflow-auto bg-[white] p-4">
              <h2 className="mb-4 text-2xl font-bold">Base Theme Colors</h2>
              {themes.map((theme) => (
                <React.Fragment key={theme}>
                  <span
                    className={`inline-block h-8 w-8 border-2`}
                    style={{
                      backgroundColor: `hsl(var(--${theme}))`,
                    }}
                  ></span>
                  <h4 className="font-bold text-[black]">{theme}</h4>
                  <div className="mb-8 mt-2 flex w-full [&>*]:flex-1 [&>*]:p-2">
                    {variants.map((variant, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: `hsl(var(--${theme}-${variant}))`,
                          color: `hsl(var(--on-${theme}-${variant}))`,
                        }}
                        className="h-[65px] w-[82px] "
                      >
                        {theme}-{variant}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ))}

              <h2 className="mb-4 text-2xl font-bold">
                Illustration Theme Colors
              </h2>
              <div className="flex gap-4">
                <div>
                  <span
                    className="inline-block h-8 w-8 border-2"
                    style={{
                      backgroundColor: "hsl(var(--illustration-shadow))",
                    }}
                  ></span>
                  <h4 className="font-bold text-[black]">Shadow</h4>
                </div>

                <div>
                  <span
                    className="inline-block h-8 w-8 border-2"
                    style={{
                      backgroundColor: "hsl(var(--illustration-midtone))",
                    }}
                  ></span>
                  <h4 className="font-bold text-[black]">Midtone</h4>
                </div>

                <div>
                  <span
                    className="inline-block h-8 w-8 border-2"
                    style={{
                      backgroundColor: "hsl(var(--illustration-highlight))",
                    }}
                  ></span>
                  <h4 className="font-bold text-[black]">Highlight</h4>
                </div>

                <div>
                  <span
                    className="inline-block h-8 w-8 border-2"
                    style={{
                      backgroundColor: "hsl(var(--illustration-accent))",
                    }}
                  ></span>
                  <h4 className="font-bold text-[black]">Accent</h4>
                </div>
              </div>
            </div>
            <div
              className="absolute top-5 right-7 cursor-pointer z-50 text-md text-on-surface/70"
              onClick={handleClose}
            >
              &#10005;
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ThemeColors.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ThemeColors;
