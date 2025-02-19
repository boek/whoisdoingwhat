import Link from "next/link";
import { whoIsDoingWhat } from "~/utils/cycle"

function humanReadableDate(dateAsString) {
  const date = new Date(dateAsString);
  
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  
  // Add ordinal suffix
  const day = date.getDate();
  const suffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };
  
  return formattedDate.replace(/\d+/, day + suffix(day))
}

function DutyView({ date, duties }) {
  console.log(duties)
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-s p-8 bg-white text-black">
      <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2 text-black ">📅 {humanReadableDate(date)}</h3>
      <ul>
        <li><strong>Triage:</strong> {duties.Triage}</li>
        <li><strong>Health Monitoring:</strong> {duties.Health}</li>
        <li><strong>Beta Cut:</strong> {duties.Beta}</li>
      </ul>
    </div>
  )
}

export default function HomePage() {
  const [upNext, ...others] = whoIsDoingWhat().reverse()
  const [current, ...older] = others
  console.log(upNext)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-orange-400 to-orange-100 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Who is <span className="text-orange-800">Doing</span> What
        </h1>
        <h1 className="font-extrabold tracking-tight text-white sm:text-xl">
          Up next
        </h1>
        <DutyView date={upNext.date} duties={upNext.currentDuty} />
        <h1 className="font-extrabold tracking-tight text-white sm:text-xl">
          Current
        </h1>
        <DutyView date={current.date} duties={current.currentDuty} />
          <h1 className="font-extrabold tracking-tight text-white sm:text-xl">
            Older
          </h1>
          {older.forEach((c) =>  <DutyView date={c.date} duties={c.currentDuty} />)}
      </div>
    </main>
  );
}
