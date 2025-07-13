import { test, expect } from '@playwright/test'
import { describe } from 'node:test'

test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('http://localhost:3000/')
})

test.describe('Multi Step Form Tests', () => {
    test('should load the app', async ({ page }) => {
        // Check if the app loads successfully
        await expect(page).toHaveURL(
            'http://localhost:3000/'
        )
    })
})

test.describe('Step 1 Tests', () => {
    test('should display the Hero component', async ({
        page
    }) => {
        // Check if the Hero component is visible
        const hero = page.locator('#hero')
        await expect(hero).toBeVisible()
    })

    test('has title', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Multi Step Form/)
    })

    test('Next step button', async ({ page }) => {
        // Wait for the Hero component to be visible first
        const hero = page.locator('#hero')
        await hero.waitFor()

        // Expects page to have a heading with the name of Personal info.
        await expect(
            page.getByRole('heading', {
                name: 'Personal info',
                level: 2
            })
        ).toBeVisible()

        // Click the Next Step button.
        await page
            .getByRole('button', { name: 'Next Step' })
            .click()
    })

    test('should render all form fields', async ({
        page
    }) => {
        // Verify that all form fields are present
        await expect(page.getByLabel('Name')).toBeVisible()
        await expect(
            page.getByLabel('Email Address')
        ).toBeVisible()
        await expect(
            page.getByLabel('Phone Number')
        ).toBeVisible()
        await expect(
            page.getByRole('button', { name: 'Next Step' })
        ).toBeVisible()
    })

    test('should show correct placeholders', async ({
        page
    }) => {
        await page.goto('http://localhost:3000/')

        // Verify that placeholders are correct
        await expect(
            page.getByPlaceholder('Chamu')
        ).toBeVisible()
        await expect(
            page.getByPlaceholder('ckmutezva@gmail.com')
        ).toBeVisible()
        await expect(
            page.getByPlaceholder('+27 832678210')
        ).toBeVisible()
    })

    test('should show validation errors for empty fields on submissions', async ({
        page
    }) => {
        // Click the Next Step button without filling out the form
        await page
            .getByRole('button', { name: 'Next Step' })
            .click()

        // Verify that validation errors are shown
        await expect(
            page.getByText(
                'Username must be at least 2 characters.'
            )
        ).toBeVisible()
        await expect(
            page.getByText(
                'Please enter a valid email address.'
            )
        ).toBeVisible()
        await expect(
            page.getByText(
                'Phone number must be at least 10 digits.'
            )
        ).toBeVisible()
    })

    test('should validate email format', async ({
        page
    }) => {
        await page
            .getByLabel('Email Address')
            .fill('invalid-email')
        await page
            .getByRole('button', { name: 'Next Step' })
            .click()

        // Verify that the email validation error is shown
        await expect(
            page.getByText(
                'Please enter a valid email address.'
            )
        ).toBeVisible()
    })

    test('should validate phone number length', async ({
        page
    }) => {
        await page.getByLabel('Phone Number').fill('12345')
        await page
            .getByRole('button', { name: 'Next Step' })
            .click()

        // Verify that the phone number validation error is shown
        await expect(
            page.getByText(
                'Phone number must be at least 10 digits.'
            )
        ).toBeVisible()
    })

    test('should submit valid form', async ({ page }) => {
        // Fill valid data
        await page.getByLabel('Name').fill('Chamu Mutezva')
        await page
            .getByLabel('Email Address')
            .fill('valid@example.com')
        await page
            .getByLabel('Phone Number')
            .fill('+27832678210')

        await page
            .getByRole('button', { name: 'Next Step' })
            .click()

        // Verify success (adjust based on your app's behavior)
        await expect(
            page.getByText('Personal information saved')
        ).toBeVisible()
        // OR verify navigation to next step if applicable
    })

    test('should handle long name input', async ({
        page
    }) => {
        const longName = 'A'.repeat(100)
        await page.getByLabel('Name').fill(longName)
        await page
            .getByRole('button', { name: 'Next Step' })
            .click()

        // Verify no error for long name
        await expect(
            page.getByText(
                'Username must be at least 2 characters.'
            )
        ).not.toBeVisible()
    })

    test('should accept various phone number formats', async ({
        page
    }) => {
        const validNumbers = [
            '27832678210',
            '+27 83 267 8210',
            '(083) 267-8210'
        ]

        for (const number of validNumbers) {
            await page
                .getByLabel('Phone Number')
                .fill(number)
            await page
                .getByRole('button', { name: 'Next Step' })
                .click()
            await expect(
                page.getByText(
                    'Phone number must be at least 10 digits.'
                )
            ).not.toBeVisible()
            await page.reload()
        }
    })

    test('should have proper form accessibility', async ({
        page
    }) => {
        // Verify all inputs have proper labels
        await expect(
            page.getByLabel('Name')
        ).toHaveAttribute('type', 'text')
        await expect(
            page.getByLabel('Email Address')
        ).toHaveAttribute('type', 'email')
        await expect(
            page.getByLabel('Phone Number')
        ).toHaveAttribute('type', 'text')

        // Verify button has proper role
        await expect(
            page.getByRole('button', { name: 'Next Step' })
        ).toBeEnabled()
    })

    test('should persist form data between steps', async ({
        page
    }) => {
        const testData = {
            name: 'Test User',
            email: 'test@example.com',
            phone: '+27831234567'
        }

        // Fill form
        await page.getByLabel('Name').fill(testData.name)
        await page
            .getByLabel('Email Address')
            .fill(testData.email)
        await page
            .getByLabel('Phone Number')
            .fill(testData.phone)

        // Submit and go to next step
        await page
            .getByRole('button', { name: 'Next Step' })
            .click()

        // Go back and verify data persistence
        // (Assuming you have a back button - adjust as needed)
        await page
            .getByRole('button', { name: 'Go Back' })
            .click()

        await expect(page.getByLabel('Name')).toHaveValue(
            testData.name
        )
        await expect(
            page.getByLabel('Email Address')
        ).toHaveValue(testData.email)
        await expect(
            page.getByLabel('Phone Number')
        ).toHaveValue(testData.phone)
    })
})

test.describe('Step 2 - Billing Cycle Switch Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to Step 2 with valid form data
        await page.getByLabel('Name').fill('Jane Doe')
        await page
            .getByLabel('Email Address')
            .fill('jane@example.com')
        await page
            .getByLabel('Phone Number')
            .fill('+27831234567')
        await page
            .getByRole('button', { name: 'Next Step' })
            .click()
        await page.waitForSelector('#step2-form')
    })

    test('should default to monthly billing', async ({
        page
    }) => {
        const billingSwitch = page.getByRole('switch')
        const monthlyLabel = page.locator(
            'label:has-text("Monthly")'
        )
        const yearlyLabel = page.locator(
            'label:has-text("Yearly")'
        )

        // Verify initial state
        await expect(billingSwitch).not.toBeChecked()
        await expect(monthlyLabel).toHaveClass(
            /font-semibold/
        )
        await expect(yearlyLabel).not.toHaveClass(
            /font-semibold/
        )

        // Verify plan prices show monthly rates
        await expect(page.getByText('$9/mo')).toBeVisible()
        await expect(page.getByText('$12/mo')).toBeVisible()
        await expect(page.getByText('$15/mo')).toBeVisible()
    })

    test('should toggle to yearly billing', async ({
        page
    }) => {
        const billingSwitch = page.getByRole('switch')
        const monthlyLabel = page.locator(
            'label:has-text("Monthly")'
        )
        const yearlyLabel = page.locator(
            'label:has-text("Yearly")'
        )

        // Toggle and verify state
        await billingSwitch.click()
        await expect(billingSwitch).toBeChecked()
        await expect(yearlyLabel).toHaveClass(
            /font-semibold/
        )
        await expect(monthlyLabel).not.toHaveClass(
            /font-semibold/
        )

        // Verify plan prices update to yearly rates
        await expect(page.getByText('$90/yr')).toBeVisible()
        await expect(
            page.getByText('$120/yr')
        ).toBeVisible()
        await expect(
            page.getByText('$150/yr')
        ).toBeVisible()

        // Verify promo text appears for yearly plans
        await expect(
            page.getByText('2 months free').first()
        ).toBeVisible()
    })

    test('should persist billing selection when toggling back', async ({
        page
    }) => {
        const billingSwitch = page.getByRole('switch')

        // Toggle to yearly
        await billingSwitch.click()
        await expect(billingSwitch).toBeChecked()

        // Toggle back to monthly
        await billingSwitch.click()
        await expect(billingSwitch).not.toBeChecked()

        // Verify prices revert to monthly
        await expect(page.getByText('$9/mo')).toBeVisible()
        await expect(page.getByText('$12/mo')).toBeVisible()
        await expect(page.getByText('$15/mo')).toBeVisible()
        await expect(
            page.getByText('2 months free')
        ).not.toBeVisible()
    })

    test('should update selected plan display when toggling', async ({
        page
    }) => {
        // Select a plan first
        await page
            .getByRole('radio', { name: 'Advanced' })
            .click()

        // Verify initial monthly price
        const advancedCard = page.locator(
            'label:has-text("Advanced")'
        )
        await expect(advancedCard).toContainText('$12/mo')

        // Toggle to yearly
        await page.getByRole('switch').click()
        await expect(advancedCard).toContainText('$120/yr')
        await expect(advancedCard).toContainText(
            '2 months free'
        )
    })

    test('should maintain selected plan when toggling', async ({
        page
    }) => {
        // Select a plan and verify
        await page
            .getByRole('radio', { name: 'Pro' })
            .click()
        await expect(
            page.getByRole('radio', { name: 'Pro' })
        ).toBeChecked()

        // Toggle billing and verify plan remains selected
        await page.getByRole('switch').click()
        await expect(
            page.getByRole('radio', { name: 'Pro' })
        ).toBeChecked()
        await expect(
            page.locator('label:has-text("Pro")')
        ).toContainText('$150/yr')

        // Toggle back and verify
        await page.getByRole('switch').click()
        await expect(
            page.getByRole('radio', { name: 'Pro' })
        ).toBeChecked()
        await expect(
            page.locator('label:has-text("Pro")')
        ).toContainText('$15/mo')
    })
})

test.describe('Step 3 Navigation Tests', () => {
    test('should proceed from Step 2 to Step 3 on valid selection', async ({
        page
    }) => {
        // Fill step 1 and proceed to step 2
        await page.goto('http://localhost:3000/')
        await page.getByLabel('Name').fill('Jane Doe')
        await page
            .getByLabel('Email Address')
            .fill('jane@example.com')
        await page
            .getByLabel('Phone Number')
            .fill('+27831234567')
        await page
            .getByRole('button', { name: 'Next Step' })
            .click()
        await page.waitForSelector('#step2-form')

        // Select a plan if not already selected
        await page
            .getByRole('radio', { name: 'Arcade' })
            .check()
        // Ensure the billing cycle is set to monthly
        const billingSwitch = page.getByRole('switch')
        if (await billingSwitch.isChecked()) {
            await billingSwitch.click()
        }

        // Click Next Step to proceed to step 3
        await page
            .getByRole('button', { name: 'Next Step' })
            .click()

        // Verify navigation to step 3 (adjust selector/text as needed)
        await expect(
            page.getByRole('heading', {
                name: /Pick add-ons/i
            })
        ).toBeVisible()
        await expect(
            page.locator('#step3-form')
        ).toBeVisible()

        // Get all checkbox elements
        const checkboxes = await page
            .getByRole('checkbox')
            .all()

        // Verify we have exactly 3 checkboxes
        expect(checkboxes.length).toBe(3)

        // Check first checkbox (Online Service)
        await checkboxes[0].check()
        await expect(checkboxes[0]).toBeChecked()

        // Check third checkbox (Customizable Profile)
        await checkboxes[2].check()
        await expect(checkboxes[2]).toBeChecked()

        // Verify second checkbox (Larger Storage) remains unchecked
        await expect(checkboxes[1]).not.toBeChecked()

        // Verify the form submission works with these selections
        await page
            .getByRole('button', { name: 'Next Step' })
            .click()

        // Add verification for successful submission if needed
        // For example, check if navigated to next step or toast appears
        // await expect(page.getByText('Add-ons selection saved')).toBeVisible();
    })
})
