import { RotationDashboard } from "@/components/rotation-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Who is doing what</h1>
          <p className="text-muted-foreground">Track rotating responsibilities across squads</p>
        </header>
        <RotationDashboard />
      </div>
    </main>
  )
}
