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
        <div className="min-h-screen bg-[#1a1a1a] text-white px-6 md:px-8 lg:px-22 pt-16 md:pt-22 font-sans">
            {children}
        </div>
    )
}