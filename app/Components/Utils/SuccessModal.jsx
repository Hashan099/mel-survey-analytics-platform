"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function SuccessModal({ modalTitle }) {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const handleModalToggle = () => {
    setShowModal(!showModal);
    router.push("/");
  };

  return (
    <div>
      {showModal && (
        <div>
          {" "}
          {showModal && (
            <div
              id="popup-modal"
              tabIndex="-1"
              className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
            >
              {" "}
              <div className="relative p-4 w-full max-w-md max-h-full">
                {" "}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {" "}
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleModalToggle}
                  >
                    {" "}
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      {" "}
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />{" "}
                    </svg>{" "}
                    <span className="sr-only">Close modal</span>{" "}
                  </button>{" "}
                  <div className="p-4 md:p-5 text-center">
                    {" "}
                    <svg
                      className="mx-auto mb-4 text-green-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      {" "}
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16.707 5.293a1 1 0 0 1 1.415 1.415l-8 8a1 1 0 0 1-1.415 0l-4-4a1 1 0 0 1 1.415-1.415L9 12.586l7.293-7.293z"
                      />{" "}
                    </svg>{" "}
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      {" "}
                      {modalTitle}{" "}
                    </h3>{" "}
                    <button
                      type="button"
                      className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      onClick={handleModalToggle}
                    >
                      {" "}
                      OK{" "}
                    </button>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          )}{" "}
        </div>
      )}{" "}
    </div>
  );
}

export default SuccessModal;
