"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const FormSchema = z.object({
    plans: z.boolean().default(false).optional(),
    type: z.enum(["arcade", "advanced", "pro"], {
        required_error: "You need to select a notification type.",
    }),
});

interface PaymentsPlanProps {
    handleNextStep: () => void;
    handlePreviousStep: () => void;
}

export function PaymentsPlan({
    handleNextStep,
    handlePreviousStep,
}: Readonly<PaymentsPlanProps>) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            plans: false,
            type: "arcade",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("Form submitted with data:", data);
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
        handleNextStep();
    }

    return (
        <div className="grid gap-4">
            <h2 className="text-2xl font-semibold">Select your plan</h2>
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
                                <FormLabel>
                                    You have the option of monthly and yearly
                                    billing
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="flex flex-col gap-3 mt-4"
                                    >
                                        {plans.map((plan) => (
                                            <label
                                                key={plan.value}
                                                htmlFor={plan.value}
                                                className={`flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition
                                               ${
                                                   field.value === plan.value
                                                       ? "border-blue-400 bg-blue-50 shadow"
                                                       : "border-gray-200 bg-white"
                                               } hover:border-blue-400 `}
                                            >
                                                <RadioGroupItem
                                                    value={plan.value}
                                                    id={plan.value}
                                                    className="sr-only"
                                                />
                                                {plan.icon}
                                                <div className="flex-1">
                                                    <div className="text-base font-semibold">
                                                        {plan.label}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        {plan.price}
                                                    </div>
                                                    <div className="text-xs text-blue-600 font-medium">
                                                        {plan.promo}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="plans"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-center rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel
                                            className="cursor-pointer"
                                            onClick={() =>
                                                field.onChange(false)
                                            }
                                        >
                                            Monthly
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <div className="flex items-center px-2">
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="data-[state=checked]:bg-secondary data-[state=unchecked]:bg-input"
                                            />
                                        </div>
                                    </FormControl>
                                    <div className="space-y-0.5">
                                        <FormLabel
                                            className="cursor-pointer"
                                            onClick={() => field.onChange(true)}
                                        >
                                            Yearly
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-between mt-6 w-full">
                        <Button
                            className="text-[var(--secondary)]"
                            onClick={handlePreviousStep}
                        >
                            Previous Step
                        </Button>
                        <Button
                            type="submit"
                            className="text-[var(--secondary)]"
                        >
                            Next Step
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default PaymentsPlan;
