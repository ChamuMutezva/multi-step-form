"use client";

import { useFormContext } from "@/context/Formcontext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

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
        <div className="grid gap-4">
            <h2 className="text-2xl font-bold leading-[1.2] text-[hsl(var(--blue-950))]">
                Personal info
            </h2>
            <p className="text-base text-[hsl(var(--grey))] leading-[1.5]">
                Please provide your name, email address, and phone number.
            </p>

            {/* Use the local form instance */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6 form"
                >
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
                                        className="text-sm text-[hsl(var(--grey))] leading-[1.5]"
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
                                        className="text-sm text-[hsl(var(--grey))] leading-[1.5]"
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
                                        className="text-sm text-[hsl(var(--grey))] leading-[1.5]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-6 fixed sm:relative bottom-0 left-0 right-0 bg-white p-4 flex justify-end">
                        <Button
                            type="submit"
                            variant="secondary"
                            className="text-[var(--primary)] bg-secondary"
                        >
                            Next Step
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
