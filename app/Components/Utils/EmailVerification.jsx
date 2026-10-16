import React from "react";
import { useAuth } from "../../../Contexts/AuthContext"; 
const EmailVerification = () => {

    const { user } = useAuth();

  return (
    <div className="flex items-center justify-center flex-col mt-5">
      <section className="max-w-2xl mx-auto bg-white">
      <div className="h-[200px] bg-green-500 w-full text-white flex items-center justify-center flex-col gap-5 px-3 ">
      <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-white"></div>
            <EmailIcon />
            <div className="w-10 h-[1px] bg-white"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-center text-sm sm:text-xl tracking-widest font-normal">
             Prending Account Verification
            </div>
            <div className="text-center text-xl sm:text-3xl tracking-wider font-bold capitalize">
           Verify your Email address to finalize the account verification.
            </div>
          </div>
        </div>
        <main className="m-8 p-5 sm:px-10  bg-green-100">
          <h2 className="text-gray-700 ">Hello {user.email}</h2>
          <p className="mt-2 leading-loose text-gray-600 ">
            Please check your E-mail inbox that you used to create this account to verify your Email address.
          </p>
          <p className="mt-8 text-gray-600">
            Thank you, <br />
           MEL System
          </p>
        </main>
      </section>
    </div>
  );
};
export default EmailVerification;

const EmailIcon = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"></path>
    </svg>
  );
};
