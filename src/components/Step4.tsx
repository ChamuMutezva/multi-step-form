import React from "react";

interface FinishingUpProps {
    handleNextStep: () => void;
}

export function FinishingUp({ handleNextStep }: Readonly<FinishingUpProps>) {
    console.log("handleNextStep function:", handleNextStep);
    return <div>Step4</div>;
}
