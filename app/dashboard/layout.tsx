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
        <main className="bg-[#1a1a1a] pt-24 min-h-screen">
            {children}
        </main>
    )
}