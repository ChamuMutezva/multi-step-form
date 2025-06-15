import React from "react";

type AddsOnProps = {
    handleNextStep: () => void;
};

export function AddsOn({ handleNextStep }: Readonly<AddsOnProps>) {
    console.log("AddsOn component rendered");
    console.log("handleNextStep function:", handleNextStep);
    return <div>Step3</div>;
}
