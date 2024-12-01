'use client'
import { Button } from "@/components/ui/button"
import { AlertTriangle } from 'lucide-react'
import { useEffect } from "react"
import Image from 'next/image'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="container flex max-w-md flex-col items-center gap-4 text-center">
                <Image src="/images/logo.svg" alt="landver logo" height={200} width={200} />
                <div className="rounded-full bg-destructive/10 p-4">
                    <AlertTriangle className="h-12 w-12 text-destructive" />
                </div>
                <h1 className="text-4xl font-bold tracking-tighter">Something went wrong!</h1>
                <p className="text-muted-foreground">
                    An unexpected error occurred. Our team has been notified and is working to fix the issue.
                </p>
                <div className="flex gap-2">
                    <Button onClick={reset} variant="default" className="bg-purple-600">
                        Try Again
                    </Button>
                    <Button onClick={() => window.location.href = '/dashboard'} variant="outline">
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}

