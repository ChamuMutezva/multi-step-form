"use client";

import { useFormContext } from "@/context/Formcontext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import Hero from "./Hero";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const personalInfoSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
        message: "Phone number must be at least 10 digits.",
    }),
});

export function PersonalInformation() {
    const { nextStep, formMethods } = useFormContext();

    // Initialize form with values from the main form if they exist
    const form = useForm<z.infer<typeof personalInfoSchema>>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: formMethods.getValues("personalInfo") || {
            name: "",
            email: "",
            phone: "",
        },
    });

    async function onSubmit(data: z.infer<typeof personalInfoSchema>) {
        try {
            // Validate all fields
            const isValid = await form.trigger();

            if (isValid) {
                // Save to form context
                formMethods.setValue("personalInfo", data, {
                    shouldValidate: true,
                });

                // Get updated values and log them
                const currentValues = formMethods.getValues();
                console.log("Saved values:", currentValues);

                toast.success("Personal information saved");
                nextStep();
            } else {
                toast.error("Please fix the errors in the form");
            }
        } catch (error) {
            console.error("Error saving personal information:", error);
            toast.error("An error occurred while saving");
        }
    }

    return (
        <div className="flex flex-col gap-4 h-full justify-items-stretch sm:px-10 lg:px-[4.7rem]">
            <Hero
                title={"Personal info"}
                description={
                    "Please provide your name, email address, and phone number."
                }
            />
            <div className="flex-1 flex flex-col">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full flex flex-col justify-between h-full space-y-6 form"
                    >
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[hsl(var(--blue-950))] text-xs leading-[1.2] font-medium">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Chamu"
                                                {...field}
                                                className="text-sm sm:text-base text-input py-6 leading-[1.5] cursor-pointer"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[hsl(var(--blue-950))] text-xs leading-[1.2] font-medium">
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ckmutezva@gmail.com"
                                                className="text-sm sm:text-base text-input py-6 leading-[1.5] cursor-pointer"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[hsl(var(--blue-950))] text-xs leading-[1.2] font-medium">
                                            Phone Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="+27 832678210"
                                                {...field}
                                                className="text-sm sm:text-base text-input py-6 leading-[1.5] cursor-pointer"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="mt-6 fixed sm:relative bottom-0 left-0 right-0 bg-white p-4 flex justify-end w-full">
                            <Button
                                type="submit"
                                variant="secondary"
                                className="text-[var(--primary)] bg-secondary cursor-pointer"
                            >
                                Next Step
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
