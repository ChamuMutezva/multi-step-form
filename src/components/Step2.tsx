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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { plans } from "@/components/plans";

const planSchema = z.object({
    type: z.enum(["arcade", "advanced", "pro"], {
        required_error: "Please select a plan type",
    }),
    billing: z.enum(["monthly", "yearly"], {
        required_error: "Please select a billing cycle",
    }),
});

export function PaymentsPlan() {
    const { nextStep, prevStep, formMethods } = useFormContext();

    const form = useForm<z.infer<typeof planSchema>>({
        resolver: zodResolver(planSchema),
        defaultValues: {
            type: formMethods.getValues("plan.type") || "arcade",
            billing: formMethods.getValues("plan.billing") || "monthly",
        },
    });

    const billingCycle = form.watch("billing");

    async function onSubmit(data: z.infer<typeof planSchema>) {
        try {
            const isValid = await form.trigger();
            if (isValid) {
                formMethods.setValue("plan", data, { shouldValidate: true });
                toast.success("Plan selection saved");
                nextStep();
            }
        } catch (error) {
            console.error("Error during plan selection:", error);
            toast.error("Please fix the errors in the form");
        }
    }

    return (
        <div className="grid gap-4">
            <h2 className="text-2xl font-semibold">Select your plan</h2>
            <p className="text-gray-500">
                You have the option of monthly or yearly billing.
            </p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="grid gap-3 mt-4"
                                    >
                                        {plans.map((plan) => (
                                            <div
                                                key={plan.value}
                                                className="relative"
                                            >
                                                <RadioGroupItem
                                                    value={plan.value}
                                                    id={plan.value}
                                                    className="absolute opacity-0 w-0 h-0"
                                                />
                                                <label
                                                    htmlFor={plan.value}
                                                    className={`flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-all
                                                        ${
                                                            field.value ===
                                                            plan.value
                                                                ? "border-[hsl(var(--purple-600))] bg-[hsl(var(--blue-50))]"
                                                                : "border-gray-300 hover:border-purple-300"
                                                        }
                                                    `}
                                                >
                                                    {plan.icon}

                                                    <div className="flex-1 sm:flex sm:justify-between sm:items-center">
                                                        <div className="">
                                                            <div className="font-medium">
                                                                {plan.label}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {billingCycle ===
                                                                "yearly"
                                                                    ? plan.yearlyPrice
                                                                    : plan.monthlyPrice}
                                                            </div>
                                                        </div>
                                                        {billingCycle ===
                                                            "yearly" && (
                                                            <div className="text-xs text-purple-600 mt-1">
                                                                {plan.promo}
                                                            </div>
                                                        )}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <FormField
                            control={form.control}
                            name="billing"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-center space-x-4">
                                    <FormLabel
                                        className={
                                            field.value === "monthly"
                                                ? "font-semibold"
                                                : ""
                                        }
                                    >
                                        Monthly
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value === "yearly"}
                                            onCheckedChange={(checked) =>
                                                field.onChange(
                                                    checked
                                                        ? "yearly"
                                                        : "monthly"
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormLabel
                                        className={
                                            field.value === "yearly"
                                                ? "font-semibold"
                                                : ""
                                        }
                                    >
                                        Yearly
                                    </FormLabel>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-between mt-6">
                        <Button variant="ghost" onClick={prevStep}>
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
