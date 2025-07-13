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
        <div className='container-steps'>
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
                        id='step3-form'
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
                                                className={`relative flex items-center gap-4 p-4`}
                                            >
                                                <Checkbox
                                                    id={
                                                        addOn.id
                                                    }
                                                    checked={
                                                        field.value
                                                    }
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    className='hover:before:border-foreground h-5 w-5 cursor-pointer 
                                                    rounded before:absolute before:top-0 before:left-0 before:z-50
                                                     before:h-full before:w-full before:rounded before:border
                                                      before:border-gray-300 before:transition-colors before:content-[""]
                                                       '
                                                />
                                                <div className='flex-1'>
                                                    <FormLabel
                                                        htmlFor={addOn.id}
                                                        className='text-secondary-foreground font-medium'
                                                    >
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

                        <div className='container-btns'>
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
