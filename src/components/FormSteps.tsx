// app/form/components/FormSteps.tsx
"use client";

import { useFormContext } from "../context/Formcontext";
import styles from "./FormSteps.module.css";

export default function FormSteps() {
    const { currentStep } = useFormContext();

    const steps = [
        { number: 1, title: "Personal Info" },
        { number: 2, title: "Select Plan" },
        { number: 3, title: "Add-ons" },
        { number: 4, title: "Summary" },
    ];

    return (
        <div className={styles.stepsContainer}>
            {steps.map((step) => (
                <div key={step.number} className={styles.step}>
                    <div
                        className={`${styles.stepNumber} ${
                            currentStep === step.number ? styles.active : ""
                        }`}
                    >
                        {step.number}
                    </div>
                    <div className={styles.stepInfo}>
                        <span>STEP {step.number}</span>
                        <strong>{step.title}</strong>
                    </div>
                </div>
            ))}
        </div>
    );
}
