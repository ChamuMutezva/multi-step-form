'use client'

import { useFormContext } from '@/context/Formcontext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import Hero from './Hero'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const personalInfoSchema = z.object({
    name: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.'
    }),
    phone: z.string().min(10, {
        message: 'Phone number must be at least 10 digits.'
    })
})

export function PersonalInformation() {
    const { nextStep, formMethods } = useFormContext()

    // Initialize form with values from the main form if they exist
    const form = useForm<
        z.infer<typeof personalInfoSchema>
    >({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: formMethods.getValues(
            'personalInfo'
        ) || {
            name: '',
            email: '',
            phone: ''
        }
    })

    async function onSubmit(
        data: z.infer<typeof personalInfoSchema>
    ) {
        try {
            // Validate all fields
            const isValid = await form.trigger()

            if (isValid) {
                // Save to form context
                formMethods.setValue('personalInfo', data, {
                    shouldValidate: true
                })

                // Get updated values and log them
                const currentValues =
                    formMethods.getValues()
                console.log('Saved values:', currentValues)

                toast.success('Personal information saved')
                nextStep()
            } else {
                toast.error(
                    'Please fix the errors in the form'
                )
            }
        } catch (error) {
            console.error(
                'Error saving personal information:',
                error
            )
            toast.error('An error occurred while saving')
        }
    }

    return (
        <div className='flex h-full flex-col justify-items-stretch gap-4 sm:px-10 lg:px-[4.7rem]'>
            <Hero
                title={'Personal info'}
                description={
                    'Please provide your name, email address, and phone number.'
                }
            />
            <div className='flex flex-1 flex-col'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            onSubmit
                        )}
                        className='form flex h-full w-full flex-col justify-between space-y-6'
                    >
                        <div className='flex flex-col gap-6'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='input-label'>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Chamu'
                                                {...field}
                                                className='input-text'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='input-label'>
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='ckmutezva@gmail.com'
                                                className='input-text'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='phone'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='input-label'>
                                            Phone Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='+27 832678210'
                                                {...field}
                                                className='input-text'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='fixed right-0 bottom-0 left-0 mt-6 flex w-full justify-end bg-white p-4 sm:relative'>
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
