export const dynamic = "force-static";

import {
  Triage,
  Health,
  Beta,
  whoIsDoingWhat,
  WhenAndWho,
} from "~/utils/cycle";

// function humanReadableDate(dateAsString : string) {
//   const date = new Date(dateAsString);
//
//   const options = { month: "long", day: "numeric", year: "numeric" };
//   const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
//
//   // Add ordinal suffix
//   const day = date.getDate();
//   const suffix = (day) => {
//     if (day > 3 && day < 21) return "th";
//     switch (day % 10) {
//       case 1: return "st";
//       case 2: return "nd";
//       case 3: return "rd";
//       default: return "th";
//     }
//   };
//
//   return formattedDate.replace(/\d+/, day + suffix(day))
// }

function DutyView({ date, duties }: WhenAndWho) {
  return (
    <div className="bg-card text-card-foreground shadow-s rounded-lg border bg-white p-8 text-black">
      <ul>
        <li>
          <strong>General Triage:</strong> {duties[Triage]}
        </li>
        <li>
          <strong>Health Monitoring:</strong> {duties[Health]}
        </li>
        <li>
          <strong>Beta Cut:</strong> {duties[Beta]}
        </li>
      </ul>
    </div>
  );
}

export default function HomePage() {
  const [upNext, ...others] = whoIsDoingWhat().reverse();
  const [current, ...older] = others;
  console.log(upNext);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-400 to-green-100 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Who is <span className="text-green-800">Doing</span> What
        </h1>
        <h1 className="font-extrabold tracking-tight text-white sm:text-xl">
          Current
        </h1>
        {current && <DutyView date={current.date} duties={current.duties} />}

        <h1 className="font-extrabold tracking-tight text-white sm:text-xl">
          Older
        </h1>
        {older.map((c) => (
          <DutyView key={c.date} date={c.date} duties={c.duties} />
        ))}
      </div>
    </main>
  );
}
