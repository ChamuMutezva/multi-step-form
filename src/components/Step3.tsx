'use client'

import { useFormContext } from '@/context/Formcontext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Hero from './Hero'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form'
import { useEffect } from 'react'

const addOnsSchema = z.object({
    onlineService: z.boolean(),
    largerStorage: z.boolean(),
    customizableProfile: z.boolean()
})

export function AddsOn() {
    const { nextStep, prevStep, formMethods } =
        useFormContext()
    const billingCycle = formMethods.watch('plan.billing')

    // Initialize form with values from the main form if they exist
    const form = useForm<z.infer<typeof addOnsSchema>>({
        resolver: zodResolver(addOnsSchema),
        defaultValues: {
            onlineService:
                formMethods.getValues(
                    'addOns.onlineService'
                ) || false,
            largerStorage:
                formMethods.getValues(
                    'addOns.largerStorage'
                ) || false,
            customizableProfile:
                formMethods.getValues(
                    'addOns.customizableProfile'
                ) || false
        }
    })

    // Watch all fields to update context immediately
    const addOnsValues = form.watch()

    useEffect(() => {
        formMethods.setValue('addOns', addOnsValues, {
            shouldValidate: false
        })
    }, [addOnsValues, formMethods])

    const addOns = [
        {
            id: 'onlineService',
            label: 'Online Service',
            description: 'Access to multiplayer games',
            monthlyPrice: 1,
            yearlyPrice: 10
        },
        {
            id: 'largerStorage',
            label: 'Larger Storage',
            description: 'Extra 1TB of cloud save',
            monthlyPrice: 2,
            yearlyPrice: 20
        },
        {
            id: 'customizableProfile',
            label: 'Customizable Profile',
            description: 'Custom theme on your profile',
            monthlyPrice: 2,
            yearlyPrice: 20
        }
    ] as const

    async function onSubmit(
        data: z.infer<typeof addOnsSchema>
    ) {
        try {
            formMethods.setValue('addOns', data, {
                shouldValidate: true
            })
            toast.success('Add-ons selection saved')
            nextStep()
        } catch (error) {
            console.error('Error saving add-ons:', error)
            toast.error('An error occurred while saving')
        }
    }

    return (
        <div className='flex h-full flex-col justify-items-stretch gap-4 sm:px-10 lg:px-[4.7rem]'>
            <Hero
                title={'Pick add-ons'}
                description={
                    'Add-ons help enhance your gaming experience.'
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
                        {addOns.map(addOn => (
                            <FormField
                                key={addOn.id}
                                control={form.control}
                                name={
                                    addOn.id as keyof z.infer<
                                        typeof addOnsSchema
                                    >
                                }
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div
                                                className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                                                    field.value
                                                        ? 'border-accent-foreground bg-card'
                                                        : 'border-gray-300 hover:border-purple-300'
                                                } `}
                                            >
                                                <Checkbox
                                                    checked={
                                                        field.value
                                                    }
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    className='h-5 w-5 rounded'
                                                />
                                                <div className='flex-1'>
                                                    <FormLabel className='text-secondary-foreground font-medium'>
                                                        {
                                                            addOn.label
                                                        }
                                                    </FormLabel>
                                                    <FormDescription className='text-accent text-sm'>
                                                        {
                                                            addOn.description
                                                        }
                                                    </FormDescription>
                                                </div>
                                                <div className='text-accent-foreground text-sm'>
                                                    +$
                                                    {billingCycle ===
                                                    'yearly'
                                                        ? addOn.yearlyPrice
                                                        : addOn.monthlyPrice}
                                                    /
                                                    {billingCycle ===
                                                    'yearly'
                                                        ? 'yr'
                                                        : 'mo'}
                                                </div>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        ))}

                        <div className='fixed right-0 bottom-0 left-0 mt-6 flex w-full justify-between bg-white p-4 sm:relative'>
                            <Button
                                variant='ghost'
                                onClick={prevStep}
                                type='button'
                                className='text-accent cursor-pointer'
                            >
                                Go Back
                            </Button>
                            <Button
                                type='submit'
                                variant='secondary'
                                className='text-white'
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
