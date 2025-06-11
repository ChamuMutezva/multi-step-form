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
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().optional(),
});

interface PersonalInformationProps {
    handleNextStep: () => void;
}

export function PersonalInformation({
    handleNextStep,
}: Readonly<PersonalInformationProps>) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
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
        handleNextStep();
    }
    /*
VStep 1 Your info Step
 2 Select plan Step 3 Add-ons Step 4 Summary 

  Name e.g. Stephen King Email Address e.g. stephenking@lorem.com Phone Number e.g. +1 234 567 890 Next Step Select your plan You have the option of monthly or yearly billing. Arcade $9/mo Advanced $12/mo Pro $15/mo Monthly Yearly Go Back Next Step Pick add-ons Add-ons help enhance your gaming experience. Online service Access to multiplayer games +$1/mo Larger storage Extra 1TB of cloud save +$2/mo Customizable Profile Custom theme on your profile +$2/mo Go Back Next Step Finishing up Double-check everything looks OK before confirming. Total (per month/year) Go Back Confirm Thank you! Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
    */

    return (
        <div>
            <h2>Personal info</h2>
            <p>Please provide your name, email address, and phone number.</p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
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
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="ckmutezva@gmail.com"
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
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+27 832678210"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-6 relative bottom-0 left-0 right-0 bg-white p-4 flex justify-end">
                        <Button
                            type="submit"
                            className="text-[var(--secondary)]"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
