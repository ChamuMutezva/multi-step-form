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

const FormSchema = z.object({
    plans: z.boolean().default(false).optional(),
    type: z.enum(["arcade", "advanced", "pro"], {
        required_error: "You need to select a notification type.",
    }),
});

function PaymentsPlan() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            plans: false,
            type: "arcade",
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold">Select your plan</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>
                                    You have the option of monthly and yearly
                                    billing
                                </FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={"arcade"}
                                        className="flex flex-col"
                                    >
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <RadioGroupItem value="arcade" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Arcade - $9/mo
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <RadioGroupItem value="advanced" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Advanced - $12/mo
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <RadioGroupItem value="pro" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Pro - $15/mo
                                            </FormLabel>
                                        </FormItem>
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
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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
                                                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
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
                    <Button type="submit" className="text-[var(--secondary)]">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default PaymentsPlan;
