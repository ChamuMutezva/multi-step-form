/**
 * @fileoverview
 * Provides a React context and provider for managing a multi-step form using React Hook Form and Zod validation.
 *
 * This context manages the current step of the form and exposes it to child components.
 * The form state and validation are handled using react-hook-form and zod.
 *
 * @module FormContext
 */

////////////////////////////////////////////////////////////////////////////////

/**
 * Zod schema for the entire multi-step form.
 *
 * - `personalInfo`: Contains user's name, email, and phone number with validation.
 * - `plan`: Contains selected plan type and billing cycle.
 * - `addOns`: Contains boolean flags for selected add-ons.
 */

////////////////////////////////////////////////////////////////////////////////

/**
 * TypeScript type inferred from the Zod form schema.
 *
 * @typedef {object} FormData
 * @property {object} personalInfo - User's personal information.
 * @property {string} personalInfo.name - User's name (min 2 characters).
 * @property {string} personalInfo.email - User's email (must be valid).
 * @property {string} personalInfo.phone - User's phone number (min 10 digits).
 * @property {object} plan - Selected plan information.
 * @property {"arcade"|"advanced"|"pro"} plan.type - Plan type.
 * @property {"monthly"|"yearly"} plan.billing - Billing cycle.
 * @property {object} addOns - Selected add-ons.
 * @property {boolean} addOns.onlineService - Online service add-on.
 * @property {boolean} addOns.largerStorage - Larger storage add-on.
 * @property {boolean} addOns.customizableProfile - Customizable profile add-on.
 */

////////////////////////////////////////////////////////////////////////////////

/**
 * React context for managing the current step of the multi-step form.
 *
 * @type {React.Context<{
 *   currentStep: number;
 *   setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
 * } | null>}
 */

////////////////////////////////////////////////////////////////////////////////

/**
 * Provides the form context and step management to child components.
 *
 * Wraps children with both React Hook Form's provider and the custom FormContext provider.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Child components that will consume the form context.
 * @returns {JSX.Element} Provider component wrapping children.
 */

////////////////////////////////////////////////////////////////////////////////

/**
 * Custom hook to access the form step context.
 *
 * Throws an error if used outside of a FormProvider.
 *
 * @returns {{ currentStep: number; setCurrentStep: React.Dispatch<React.SetStateAction<number>> }}
 */

////////////////////////////////////////////////////////////////////////////////

/**
 * Custom hook to access the React Hook Form state for the form.
 *
 * @returns {ReturnType<typeof useForm<FormData>>} The form methods and state.
 */
"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { useForm, FormProvider as RHFProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define Zod schema for the entire form
const formSchema = z.object({
    personalInfo: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
    }),
    plan: z.object({
        type: z.enum(["arcade", "advanced", "pro"]),
        billing: z.enum(["monthly", "yearly"]),
    }),
    addOns: z.object({
        onlineService: z.boolean(),
        largerStorage: z.boolean(),
        customizableProfile: z.boolean(),
    }),
});

export type FormData = z.infer<typeof formSchema>;

type FormContextType = {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    formMethods: ReturnType<typeof useForm<FormData>>;
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [currentStep, setCurrentStep] = useState(1);
    const formMethods = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            personalInfo: { name: "", email: "", phone: "" },
            plan: { type: "arcade", billing: "monthly" },
            addOns: {
                onlineService: false,
                largerStorage: false,
                customizableProfile: false,
            },
        },
        mode: "onChange",
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
    const reset = () => setCurrentStep(1);

    const contextValue = useMemo(
        () => ({
            currentStep,
            setCurrentStep,
            nextStep,
            prevStep,
            reset,
            formMethods, // Add this to context
        }),
        [currentStep, formMethods] // Add formMethods to dependencies
    );

    return (
        <RHFProvider {...formMethods}>
            <FormContext.Provider value={contextValue}>
                {children}
            </FormContext.Provider>
        </RHFProvider>
    );
}

export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
}

export function useAppForm() {
    return useForm<FormData>();
}
