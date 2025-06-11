"use client";

import { createContext, useContext, useState } from "react";
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

const FormContext = createContext<{
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export function FormProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const form = useForm<FormData>({
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

    const [currentStep, setCurrentStep] = useState(1);

    return (
        <RHFProvider {...form}>
            <FormContext.Provider value={{ currentStep, setCurrentStep }}>
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

export function useFormState() {
    return useForm<FormData>();
}
