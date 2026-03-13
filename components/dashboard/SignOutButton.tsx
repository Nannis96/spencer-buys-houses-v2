"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function SignOutButton() {
    return (
        <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-white border-white/20 hover:bg-white/10"
        >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
        </Button>
    )
}
