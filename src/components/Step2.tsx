'use client'

import { useFormContext } from '@/context/Formcontext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import Hero from './Hero'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {
    RadioGroup,
    RadioGroupItem
} from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { plans } from '@/components/plans'

const planSchema = z.object({
    type: z.enum(['arcade', 'advanced', 'pro'], {
        required_error: 'Please select a plan type'
    }),
    billing: z.enum(['monthly', 'yearly'], {
        required_error: 'Please select a billing cycle'
    })
})

export function PaymentsPlan() {
    const { nextStep, prevStep, formMethods } =
        useFormContext()

    const form = useForm<z.infer<typeof planSchema>>({
        resolver: zodResolver(planSchema),
        defaultValues: {
            type:
                formMethods.getValues('plan.type') ||
                'arcade',
            billing:
                formMethods.getValues('plan.billing') ||
                'monthly'
        }
    })

    const billingCycle = form.watch('billing')

    async function onSubmit(
        data: z.infer<typeof planSchema>
    ) {
        try {
            const isValid = await form.trigger()
            if (isValid) {
                formMethods.setValue('plan', data, {
                    shouldValidate: true
                })
                toast.success('Plan selection saved')
                nextStep()
            }
        } catch (error) {
            console.error(
                'Error during plan selection:',
                error
            )
            toast.error('Please fix the errors in the form')
        }
    }

    return (
        <div className='flex h-full flex-col justify-items-stretch gap-4 sm:px-10 lg:px-[4.7rem]'>
            <Hero
                title={'Select your plan'}
                description={
                    'You have the option of monthly or yearly billing.'
                }
            />
            <div className='flex flex-1 flex-col'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            onSubmit
                        )}
                        className='flex h-full w-full flex-col justify-between space-y-6'
                    >
                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            value={
                                                field.value
                                            }
                                            onValueChange={
                                                field.onChange
                                            }
                                            className='mt-4 grid gap-3 lg:grid-cols-3'
                                        >
                                            {plans.map(
                                                plan => (
                                                    <div
                                                        key={
                                                            plan.value
                                                        }
                                                        className='relative lg:min-w-[8.625rem]'
                                                    >
                                                        <RadioGroupItem
                                                            value={
                                                                plan.value
                                                            }
                                                            id={
                                                                plan.value
                                                            }
                                                            className='absolute h-0 w-0 opacity-0'
                                                        />
                                                        <label
                                                            htmlFor={
                                                                plan.value
                                                            }
                                                            className={`flex cursor-pointer items-start justify-center gap-4 rounded-lg border p-4 transition-all lg:min-h-[10rem] lg:flex-col ${
                                                                field.value ===
                                                                plan.value
                                                                    ? 'border-[hsl(var(--purple-600))] bg-[hsl(var(--blue-50))]'
                                                                    : 'border-gray-300 hover:border-purple-300'
                                                            } `}
                                                        >
                                                            {
                                                                plan.icon
                                                            }

                                                            <div className='flex-1 md:flex md:items-center md:justify-between lg:flex-col lg:items-start'>
                                                                <div className=''>
                                                                    <div className='text-input font-medium'>
                                                                        {
                                                                            plan.label
                                                                        }
                                                                    </div>
                                                                    <div className='text-accent text-sm'>
                                                                        {billingCycle ===
                                                                        'yearly'
                                                                            ? `$${plan.yearlyPrice}/yr`
                                                                            : `$${plan.monthlyPrice}/mo`}
                                                                    </div>
                                                                </div>
                                                                {billingCycle ===
                                                                    'yearly' && (
                                                                    <div className='text-input mt-1 text-xs'>
                                                                        {
                                                                            plan.promo
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='rounded-lg bg-[hsl(var(--blue-50))] p-4'>
                            <FormField
                                control={form.control}
                                name='billing'
                                render={({ field }) => (
                                    <FormItem className='flex items-center justify-center space-x-4'>
                                        <FormLabel
                                            className={
                                                field.value ===
                                                'monthly'
                                                    ? 'font-semibold text-[hsl(var(--blue-950))]'
                                                    : 'text-accent'
                                            }
                                        >
                                            Monthly
                                        </FormLabel>
                                        <FormControl>
                                            <Switch
                                                className='cursor-pointer'
                                                checked={
                                                    field.value ===
                                                    'yearly'
                                                }
                                                onCheckedChange={checked =>
                                                    field.onChange(
                                                        checked
                                                            ? 'yearly'
                                                            : 'monthly'
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormLabel
                                            className={
                                                field.value ===
                                                'yearly'
                                                    ? 'font-semibold text-[hsl(var(--blue-950))]'
                                                    : 'text-accent'
                                            }
                                        >
                                            Yearly
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='container-btns'>
                            <Button
                                variant='ghost'
                                onClick={prevStep}
                                className='text-accent cursor-pointer'
                            >
                                Go Back
                            </Button>
                            <Button
                                type='submit'
                                variant='secondary'
                                className='next-btn'
                            >
                                Next Step
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
