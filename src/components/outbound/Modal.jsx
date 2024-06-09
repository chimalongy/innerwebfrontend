import React, { useState, useEffect } from "react";

function Modal({ modalstate, modalSwitch, children, header }) {
    const [modalChildren, setModalChildren] = useState(children);

    // Use useEffect to update modalChildren if children prop changes
    useEffect(() => {
        setModalChildren(children);
    }, [children]);

    if (!modalstate) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center bg-black bg-opacity-80 justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-[500px] w-[90%] max-h-[90%] overflow-y-auto">
                <div className=" sticky flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-white">{header}</h3>
                    <button onClick={() => { setModalChildren(null); modalSwitch(); }}>
                        <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                            />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    {modalChildren}
                </div>
            </div>
        </div>
    );
}

export default Modal;
