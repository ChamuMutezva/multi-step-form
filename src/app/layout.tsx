import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import './globals.css'
import { FormProvider } from '@/context/Formcontext'

export const metadata: Metadata = {
    title: 'Multi Step Form',
    description:
        'A multi-step form built with Next.js, Shadcn , Zod and React Hook Form'
}

const ubuntu = Ubuntu({
    variable: '--font-ubuntu',
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '700'],
    style: ['normal', 'italic'],
    fallback: ['system-ui', 'sans-serif'],
    preload: true,
    adjustFontFallback: true
})

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body
                className={`${ubuntu.variable} grid place-items-center antialiased`}
            >
                <FormProvider>{children}</FormProvider>
            </body>
        </html>
    )
}
