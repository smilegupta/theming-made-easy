import { useState } from "react";
import PropTypes from "prop-types";
import { SideBarIllustration } from "../assets/sidebar.jsx";
import { RazorpayLogo } from "../assets/razorpay.jsx";

const MagicCheckoutModal = ({ isOpen, handleClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [offersConsent, setOffersConsent] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-primary rounded-lg w-11/12 h-[36.5rem] max-w-[62.5rem] flex overflow-hidden shadow-lg relative">
            {/* Right Panel */}
            <div className="w-1/3 p-6 flex flex-col justify-between z-10">
              <div>
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div className="z-[1] flex items-center justify-center overflow-hidden rounded-[25%] border border-on-primary/15 bg-on-primary/5 font-heading text-2xl uppercase text-on-primary h-12 min-h-12 w-12 min-w-12 !border-none">
                    <img
                      src="https://img.freepik.com/free-vector/hamburger-realistic-isolated_1284-12692.jpg"
                      alt="Razorpay Logo"
                      className="relative z-[1] h-full w-full rounded-[25%] bg-surface object-contain"
                    />
                  </div>

                  <div className="max-w-full text-2xl font-semibold text-on-primary truncate">
                    Snacks Express
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="mt-6 absolute bottom-[28px] left-[78px]">
                  <SideBarIllustration />
                </div>

                {/* Secured by Razorpay */}
                <div className="text-xs text-center text-on-primary mt-4 items-end flex gap-1 [&_*]:!fill-on-primary">
                  <span>Secured By</span>
                  <RazorpayLogo height={"18px"} />
                </div>
              </div>
            </div>

            {/* Left Panel */}
            <div className="w-2/3 p-6 rounded-lg bg-white z-10 mr-3 my-3 flex">
              <div className="flex flex-col p-6 m-auto w-[21.45rem] overflow-visible px-0">
                <h3 className="relative z-[1] font-heading text-2xl font-semibold text-on-surface">
                  Contact details
                </h3>
                <p className="mt-1 text-base text-on-surface/70">
                  Enter mobile &amp; email to continue
                </p>
                <div className="mt-6 space-y-3.5">
                  <div className="flex items-center space-x-2">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full rounded-lg border border-surface-900/10 focus:border-on-surface focus:ring-2 focus:ring-on-surface/10 focus-visible:outline-none bg-surface-0 px-4 py-2.5 text-lg text-on-surface-50 border-primary-500 border-opacity-20 placeholder:text-on-surface-50 placeholder:text-opacity-60"
                      placeholder="Mobile number"
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-surface-900/10 focus:border-on-surface focus:ring-2 focus:ring-on-surface/10 focus-visible:outline-none bg-surface-0 px-4 py-2.5 text-lg text-on-surface-50 border-primary-500 border-opacity-20 placeholder:text-on-surface-50 placeholder:text-opacity-60"
                    placeholder="Email"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={offersConsent}
                    onChange={(e) => setOffersConsent(e.target.checked)}
                    className="h-4 w-5 accent-primary-950"
                  />
                  <label className="ml-2 text-md text-on-surface text-opacity-70">
                    Send me offers and order updates
                  </label>
                </div>

                {/* Continue Button */}
                <button className="mt-6 w-full bg-primary-950 text-on-primary-950 py-3 rounded-lg text-lg font-semibold">
                  Continue
                </button>
              </div>
            </div>

            {/* Shadow Illustration */}
            <div className="pointer-events-none absolute -left-[9.375rem] top-[13rem]  h-[20.5rem] w-[80rem] -rotate-[22.6deg] bg-[hsl(var(--illustration-shadow))] opacity-20 mix-blend-multiply" />

            {/* Close Button */}
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
MagicCheckoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default MagicCheckoutModal;
