"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { useState, useMemo } from "react"

const TEAMS = ["Oreo (1)", "Gingerbread (2)", "KitKat (3)", "Petit Four (4)", "Lollipop (5)", "Pie (6)"]

const RESPONSIBILITIES = ["Beta Cut", "Health Monitoring", "General Triage"]

// Helper function to calculate rotation based on month offset
function getRotation(monthOffset: number) {
  const now = new Date()
  const targetDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)

  // Use the month number as the rotation offset
  const rotationIndex = 3 + ((targetDate.getMonth() + targetDate.getFullYear() * 12) % TEAMS.length)
  console.log("getRotation", targetDate, rotationIndex)
  return {
    date: targetDate,
    assignments: RESPONSIBILITIES.map((_, idx) => {
      const teamIndex = (rotationIndex + idx) % TEAMS.length
      return TEAMS[teamIndex]
    }),
  }
}

function formatMonth(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

export function RotationDashboard() {
  const [monthOffset, setMonthOffset] = useState(0)

  const previousRotation = useMemo(() => getRotation(monthOffset - 1), [monthOffset])
  const currentRotation = useMemo(() => getRotation(monthOffset), [monthOffset])
  const nextRotation = useMemo(() => getRotation(monthOffset + 1), [monthOffset])

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setMonthOffset(monthOffset - 1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-muted transition-colors text-card-foreground border border-border"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Previous</span>
        </button>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">{formatMonth(currentRotation.date)}</span>
        </div>

        <button
          onClick={() => setMonthOffset(monthOffset + 1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-muted transition-colors text-card-foreground border border-border"
        >
          <span className="text-sm font-medium">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Current Period - Highlighted */}
      <Card className="p-6 border-2 border-primary/50 bg-card/80 backdrop-blur">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground mb-1">Current Period</h2>
            <p className="text-sm text-muted-foreground">{formatMonth(currentRotation.date)}</p>
          </div>
          <Badge className="bg-primary text-primary-foreground">Active</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {RESPONSIBILITIES.map((responsibility, idx) => (
            <div key={responsibility} className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-card-foreground text-sm">{responsibility}</h3>
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
              <p className="text-lg font-semibold text-card-foreground">{currentRotation.assignments[idx]}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Previous and Next Periods */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Previous Period */}
        <Card className="p-6 bg-card">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-card-foreground mb-1">Previous Period</h2>
            <p className="text-sm text-muted-foreground">{formatMonth(previousRotation.date)}</p>
          </div>

          <div className="space-y-3">
            {RESPONSIBILITIES.map((responsibility, idx) => (
              <div
                key={responsibility}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <span className="text-sm text-muted-foreground">{responsibility}</span>
                <span className="text-sm font-medium text-card-foreground">{previousRotation.assignments[idx]}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Next Period */}
        <Card className="p-6 bg-card">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-card-foreground mb-1">Next Period</h2>
            <p className="text-sm text-muted-foreground">{formatMonth(nextRotation.date)}</p>
          </div>

          <div className="space-y-3">
            {RESPONSIBILITIES.map((responsibility, idx) => (
              <div
                key={responsibility}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
              >
                <span className="text-sm text-muted-foreground">{responsibility}</span>
                <span className="text-sm font-medium text-card-foreground">{nextRotation.assignments[idx]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Team Overview */}
      <Card className="p-6 bg-card">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">All Teams</h2>
        <div className="flex flex-wrap gap-2">
          {TEAMS.map((team) => (
            <Badge key={team} variant="outline" className="px-3 py-1 text-sm bg-muted/50">
              {team}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  )
}
