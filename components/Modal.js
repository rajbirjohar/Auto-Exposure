import React from "react";
import ReactDOM from "react-dom";
import { useCurrentUser, useUser } from "@/hooks/index";
import fetcher from "@/lib/fetch";

const Modal = ({ isShowing, hide, confirmDelete }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            class="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                class="fixed inset-0 bg-gray-500 dark:bg-gray-700 dark:bg-opacity-75 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>

              <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div class="inline-block align-bottom bg-white dark:bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-500 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        class="h-6 w-6 text-red-600 dark:text-red-100"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        class="text-lg leading-6 font-medium text-black dark:text-white"
                        id="modal-title"
                      >
                        Delete Post
                      </h3>
                      <div class="mt-2">
                        <p class="text-gray-500 dark:text-gray-300">
                          Are you sure you want to delete this post?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={confirmDelete}
                    class="w-full inline-flex justify-center rounded-sm border border-transparent shadow-sm px-4 py-2 
                    bg-red-600 dark:bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={hide}
                    class="mt-3 w-full inline-flex justify-center rounded-sm shadow-sm px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                    text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
