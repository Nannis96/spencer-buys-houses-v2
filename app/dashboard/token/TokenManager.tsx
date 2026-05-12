"use client"

import React, { useState } from "react"

type Props = {
    initialToken: string | null
    initialExpiresAt: string | null
    apiAuthToken: string
    userEmail: string
    userName?: string
}

export default function TokenManager({ initialToken, initialExpiresAt, apiAuthToken, userEmail, userName }: Props) {
    const [token, setToken] = useState<string | null>(initialToken)
    const [expiresAt, setExpiresAt] = useState<string | null>(initialExpiresAt)
    const [loading, setLoading] = useState(false)
    const [copyStatus, setCopyStatus] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    async function copyToken() {
        if (!token) return
        try {
            await navigator.clipboard.writeText(token)
            setCopyStatus("Copied")
            setTimeout(() => setCopyStatus(null), 2000)
        } catch (err) {
            setCopyStatus("Error copying")
        }
    }

    async function generateNew() {
        const ok = confirm("Generate new token? This will invalidate the current one immediately.")
        if (!ok) return

        setLoading(true)
        setError(null)

        try {
            const res = await fetch("/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiAuthToken}`,
                },
            })

            if (!res.ok) {
                const body = await res.json().catch(() => ({}))
                throw new Error(body?.error || "Failed to generate token")
            }

            const body = await res.json()
            setToken(body.token)
            setExpiresAt(body.expiresAt ?? null)
        } catch (err: any) {
            setError(err?.message ?? "Unknown error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white/5 border border-gray-800 rounded-2xl p-6">
            <label className="text-sm text-gray-400">User</label>
            <div className="font-medium mb-4">{userName ?? userEmail}</div>

            <label className="text-sm text-gray-400">Token</label>
            <div className="mt-2 mb-4">
                <div className="break-all bg-black/20 p-3 rounded-md font-mono text-sm">
                    {token ?? <span className="text-gray-400">No token issued yet.</span>}
                </div>
                {expiresAt ? <div className="text-xs text-gray-400 mt-2">Expires: {new Date(expiresAt).toLocaleString()}</div> : null}
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={copyToken}
                    disabled={!token}
                    className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-black font-medium disabled:opacity-40"
                >
                    {copyStatus ?? "Copy token"}
                </button>

                <button
                    onClick={generateNew}
                    disabled={loading}
                    className="px-4 py-2 rounded-md border border-[var(--color-primary)] text-[var(--color-primary)] font-medium disabled:opacity-40"
                >
                    {loading ? "Generating..." : "Generate new token"}
                </button>
            </div>

            {error ? <div className="text-sm text-red-400 mt-3">{error}</div> : null}
        </div>
    )
}
