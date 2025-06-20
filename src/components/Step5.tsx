import React from "react";

export function ThankYou() {
    return (
        <div className="step5-thankyou p-2 text-center">
            <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                className="mb-4"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="32" cy="32" r="32" fill="#F3F6FB" />
                <path
                    d="M20 33.5L28 41.5L44 25.5"
                    stroke="#483EFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <h2>Thank You!</h2>
            <p>
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@example.com.
            </p>
        </div>
    );
}
