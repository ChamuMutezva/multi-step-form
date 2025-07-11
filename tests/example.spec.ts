import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Multi Step Form/)
})

test('Next step button', async ({ page }) => {
    await page.goto('http://localhost:3000/')

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

test('should render all form fields', async ({ page }) => {
    await page.goto('http://localhost:3000/')

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
    await page.goto('http://localhost:3000/')

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

test('should validate email format', async ({ page }) => {
    await page.goto('http://localhost:3000/')

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
    await page.goto('http://localhost:3000/')

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
    await page.goto('http://localhost:3000/')

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

test('should handle long name input', async ({ page }) => {
    await page.goto('http://localhost:3000/')

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
    await page.goto('http://localhost:3000/')

    const validNumbers = [
        '27832678210',
        '+27 83 267 8210',
        '(083) 267-8210'
    ]

    for (const number of validNumbers) {
        await page.getByLabel('Phone Number').fill(number)
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

test('should have proper form accessibility', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  // Verify all inputs have proper labels
  await expect(page.getByLabel('Name')).toHaveAttribute('type', 'text');
  await expect(page.getByLabel('Email Address')).toHaveAttribute('type', 'email');
  await expect(page.getByLabel('Phone Number')).toHaveAttribute('type', 'text');
  
  // Verify button has proper role
  await expect(page.getByRole('button', { name: 'Next Step' })).toBeEnabled();
});

test('should persist form data between steps', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+27831234567'
  };
  
  // Fill form
  await page.getByLabel('Name').fill(testData.name);
  await page.getByLabel('Email Address').fill(testData.email);
  await page.getByLabel('Phone Number').fill(testData.phone);
  
  // Submit and go to next step
  await page.getByRole('button', { name: 'Next Step' }).click();
  
  // Go back and verify data persistence
  // (Assuming you have a back button - adjust as needed)
  await page.getByRole('button', { name: 'Go Back' }).click();
  
  await expect(page.getByLabel('Name')).toHaveValue(testData.name);
  await expect(page.getByLabel('Email Address')).toHaveValue(testData.email);
  await expect(page.getByLabel('Phone Number')).toHaveValue(testData.phone);
});