import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Schedule Your Appointment",
    robots: {
        index: false,
        follow: false,
    },
}

export default function BookingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return children
}
