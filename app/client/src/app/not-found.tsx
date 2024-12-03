import Link from "next/link"
import { Button } from "@/components/Button/Button"
import { MapPin } from 'lucide-react'
import Image from 'next/image'


export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="container flex max-w-md flex-col items-center gap-4 text-center">
        <Image src="/images/logo.svg" alt="landver logo" height={200} width={200} />
        <div className="rounded-full bg-primary/10 p-4">
          <MapPin className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter">Page Not Found</h1>
        <p className="text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Please check the URL or navigate back to the dashboard.
        </p>
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button variant="default" classname="bg-purple-600">Back to Dashboard</Button>
          </Link>
          <Link href="/">
            <Button variant="whiteWithBorder">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

