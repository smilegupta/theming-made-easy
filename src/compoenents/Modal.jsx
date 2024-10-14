import { useState } from "react";
import { SideBarIllustration } from "../assets/sidebar";
import razorpay from "../assets/razorpay.svg";

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
                      src="https://pbs.twimg.com/profile_images/1271385506505347074/QIc_CCEg_400x400.jpg"
                      alt="Razorpay Logo"
                      className="relative z-[1] h-full w-full rounded-[25%] bg-surface object-contain"
                    />
                  </div>

                  <div className="max-w-full text-2xl font-semibold text-on-primary truncate">
                    React India Demo
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-6">
                  <SideBarIllustration />
                </div>

                {/* Secured by Razorpay */}
                <div className="text-xs text-center text-white mt-4 flex">
                  Secured by
                  <img
                    className="h-[18px] w-[5rem] ml-1"
                    src={razorpay}
                    alt="Razorpay Logo"
                  />
                </div>
              </div>
            </div>

            <div className="w-2/3 p-6 rounded-lg bg-white z-10 m-3 flex">
              <div className="flex flex-col p-6 m-auto w-[21.45rem] overflow-visible px-0">
                <h3 className="font-semibold mb-2">Contact details</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <select className="border border-gray-300 p-2 rounded-md">
                      <option value="+91">+91</option>
                      {/* Add more country codes if needed */}
                    </select>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="border border-gray-300 p-2 rounded-md w-full"
                      placeholder="Mobile number"
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-full"
                    placeholder="Email"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={offersConsent}
                    onChange={(e) => setOffersConsent(e.target.checked)}
                    className="h-4 w-4 accent-primary-600"
                  />
                  <label className="ml-2 text-gray-700 text-sm">
                    Send me offers and order updates
                  </label>
                </div>

                {/* Continue Button */}
                <button className="mt-6 w-full bg-primary-600 text-on-primary-600 py-3 rounded-lg text-lg font-semibold">
                  Continue
                </button>
              </div>
            </div>

            <div className="pointer-events-none absolute -left-[9.375rem] top-[13rem]  h-[20.5rem] w-[80rem] -rotate-[22.6deg] bg-[hsl(var(--illustration-shadow))] opacity-20 mix-blend-multiply" />
          </div>
        </div>
      )}
    </>
  );
};

export default MagicCheckoutModal;
