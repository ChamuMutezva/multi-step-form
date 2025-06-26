'use client'

import { useFormContext } from '@/context/Formcontext'
import { Button } from '@/components/ui/button'
import { plans } from '@/components/plans'
import Hero from './Hero'

export function FinishingUp() {
    const { prevStep, nextStep, formMethods } =
        useFormContext()
    const formData = formMethods.getValues()
    const isYearly = formData.plan.billing === 'yearly'

    // Get selected plan details
    const selectedPlan = plans.find(
        plan => plan.value === formData.plan.type
    )
    const planPrice = isYearly
        ? (selectedPlan?.yearlyPrice ?? 0)
        : (selectedPlan?.monthlyPrice ?? 0)
    const billingPeriod = isYearly ? 'yr' : 'mo'

    // Add-ons configuration
    const addOnsConfig = [
        {
            id: 'onlineService',
            label: 'Online Service',
            monthlyPrice: 1,
            yearlyPrice: 10
        },
        {
            id: 'largerStorage',
            label: 'Larger Storage',
            monthlyPrice: 2,
            yearlyPrice: 20
        },
        {
            id: 'customizableProfile',
            label: 'Customizable Profile',
            monthlyPrice: 2,
            yearlyPrice: 20
        }
    ]

    // Calculate add-ons total and filter selected add-ons
    type SelectedAddOn = {
        label: string
        price: number
        billingPeriod: string
    }
    const { addOnsTotal, selectedAddOns } =
        addOnsConfig.reduce<{
            addOnsTotal: number
            selectedAddOns: SelectedAddOn[]
        }>(
            (acc, addOn) => {
                if (
                    formData.addOns[
                        addOn.id as keyof typeof formData.addOns
                    ]
                ) {
                    const price = isYearly
                        ? addOn.yearlyPrice
                        : addOn.monthlyPrice
                    acc.addOnsTotal += price
                    acc.selectedAddOns.push({
                        label: addOn.label,
                        price,
                        billingPeriod
                    })
                }
                return acc
            },
            { addOnsTotal: 0, selectedAddOns: [] }
        )

    const grandTotal = planPrice + addOnsTotal

    const handleConfirm = () => {
        console.log('Final submission:', formData)
        nextStep()
    }

    return (
        <div className='flex h-full flex-col justify-between gap-4 sm:px-10 lg:px-[4.7rem]'>
            <Hero
                title='Finishing up'
                description='Double-check everything looks OK before confirming.'
            />

            <div className='rounded-lg bg-gray-50 p-6'>
                <div className='flex items-center justify-between border-b border-gray-300 pb-4'>
                    <div>
                        <h3 className='text-input font-medium capitalize'>
                            {selectedPlan?.label} (
                            {formData.plan.billing})
                        </h3>
                        <button
                            type='button'
                            onClick={() => prevStep()}
                            className='hover:text-foreground text-sm text-gray-500 underline transition-colors'
                        >
                            Change
                        </button>
                    </div>
                    <div className='text-input font-semibold'>
                        ${planPrice}/{billingPeriod}
                    </div>
                </div>

                {/* Add-ons Summary */}
                {selectedAddOns.length > 0 && (
                    <div className='space-y-3 pt-4'>
                        {selectedAddOns.map(addOn => (
                            <div
                                key={addOn.label}
                                className='flex justify-between'
                            >
                                <span className='text-gray-500'>
                                    {addOn.label}
                                </span>
                                <span className='text-input font-normal'>
                                    +${addOn.price}/
                                    {addOn.billingPeriod}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Grand Total */}
            <div className='flex items-center justify-between px-6'>
                <span className='text-gray-500'>
                    Total (per {isYearly ? 'year' : 'month'}
                    )
                </span>
                <span className='text-accent-foreground text-xl font-semibold'>
                    ${grandTotal}/{billingPeriod}
                </span>
            </div>

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
                    onClick={handleConfirm}
                    variant='secondary'
                    className='bg-accent-foreground hover:bg-muted text-white'
                >
                    Confirm
                </Button>
            </div>
        </div>
    )
}
