import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-white px-6 md:px-10 lg:px-20 pt-16 md:pt-22 lg:pt-30 font-sans">
            {children}
        </div>
    )
}