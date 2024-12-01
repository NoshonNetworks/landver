'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertOctagon } from 'lucide-react'
import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"

interface ErrorBoundaryProps {
    error: Error
    reset: () => void
    message?: string
}

export function ErrorBoundary({ error, reset, message }: ErrorBoundaryProps) {
    useEffect(() => {
        // Log the error to Sentry with additional context
        Sentry.withScope((scope) => {
            scope.setExtra("componentStack", error.stack)
            Sentry.captureException(error)
        })
    }, [error])

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <AlertOctagon className="h-5 w-5 text-destructive" />
                    <CardTitle>Error</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    {message || "An error occurred while loading this section. Please try again."}
                </p>
            </CardContent>
            <CardFooter>
                <Button onClick={reset} variant="default" size="sm">
                    Retry
                </Button>
            </CardFooter>
        </Card>
    )
}

