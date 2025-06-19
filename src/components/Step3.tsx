"use client";

import { useFormContext } from "@/context/Formcontext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,    
} from "@/components/ui/form";
import { useEffect } from "react";

const addOnsSchema = z.object({
    onlineService: z.boolean(),
    largerStorage: z.boolean(),
    customizableProfile: z.boolean(),
});

export function AddsOn() {
    const { nextStep, prevStep, formMethods } = useFormContext();

    // Initialize form with values from the main form if they exist
    const form = useForm<z.infer<typeof addOnsSchema>>({
        resolver: zodResolver(addOnsSchema),
        defaultValues: {
            onlineService:
                formMethods.getValues("addOns.onlineService") || false,
            largerStorage:
                formMethods.getValues("addOns.largerStorage") || false,
            customizableProfile:
                formMethods.getValues("addOns.customizableProfile") || false,
        },
    });

     // Watch all fields to update context immediately
    const addOnsValues = form.watch();
    useEffect(() => {
        formMethods.setValue("addOns", addOnsValues, { shouldValidate: false });
    }, [addOnsValues, formMethods]);

    const addOns = [
        {
            id: "onlineService",
            label: "Online Service",
            description: "Access to multiplayer games",
            rate: "+$10/yr",
        },
        {
            id: "largerStorage",
            label: "Larger Storage",
            description: "Extra 1TB of cloud save",
            rate: "+$20/yr",
        },
        {
            id: "customizableProfile",
            label: "Customizable Profile",
            description: "Custom theme on your profile",
            rate: "+$20/yr",
        },
    ] as const;

    async function onSubmit(data: z.infer<typeof addOnsSchema>) {
        try {
            // Save to form context
            formMethods.setValue("addOns", data, { shouldValidate: true });

            // Log the updated values
            console.log("Saved add-ons:", formMethods.getValues("addOns"));

            toast.success("Add-ons selection saved");
            nextStep();
        } catch (error) {
            console.error("Error saving add-ons:", error);
            toast.error("An error occurred while saving");
        }
    }

    return (
        <div className="grid gap-4">
            <h2 className="text-2xl font-semibold">Pick add-ons</h2>
            <p className="text-gray-500">
                Add-ons help enhance your gaming experience.
            </p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {addOns.map((addOn) => (
                        <FormField
                            key={addOn.id}
                            control={form.control}
                            name={
                                addOn.id as keyof z.infer<typeof addOnsSchema>
                            }
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div
                                            className={`flex items-center gap-4 p-4 border rounded-lg transition-colors
                                            ${
                                                field.value
                                                    ? "border-purple-600 bg-purple-50"
                                                    : "border-gray-300 hover:border-purple-300"
                                            }
                                        `}
                                        >
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="h-5 w-5 rounded"
                                            />
                                            <div className="flex-1">
                                                <FormLabel className="font-medium">
                                                    {addOn.label}
                                                </FormLabel>
                                                <FormDescription className="text-sm">
                                                    {addOn.description}
                                                </FormDescription>
                                            </div>
                                            <div className="text-sm text-purple-600">
                                                {addOn.rate}
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    ))}

                    <div className="flex justify-between mt-6">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            type="button"
                        >
                            Go Back
                        </Button>
                        <Button
                            type="submit"
                            variant="secondary"
                            className="text-white"
                        >
                            Next Step
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
