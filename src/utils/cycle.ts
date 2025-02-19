const CYCLE_LENGTH_DAYS = 28;
const DAY_TO_MS = 24 * 60 * 60 * 1000;
const CYCLE_LENGTH_MS = CYCLE_LENGTH_DAYS * DAY_TO_MS;

export const Oreo = "Oreo";
export const Gingerbread = "Gingerbread";
export const KitKat = "KitKat";
export const PetitFour = "PetitFour";

export const Triage = "Triage";
export const Beta = "Beta";
export const Health = "Health";

export type Squad = "Oreo" | "Gingerbread" | "KitKat" | "PetitFour";
export type Duty = "Triage" | "Beta" | "Health";

export type WhenAndWho = {
	date: string,
	duties: Record<Duty, Squad>
}

const allSquads: [Squad] = [Oreo, Gingerbread, KitKat, PetitFour]

const dateSeed = "2025-02-19"
const dutySeed = {
	Triage : KitKat,
	Health : PetitFour,
	Beta : KitKat
}

function next(current: Record<Duty, Squad>): Record<Duty, Squad> {
  const getNextSquad = (squad: Squad): Squad => {
	const currentIndex = allSquads.indexOf(squad);
	return allSquads[(currentIndex + 1) % allSquads.length];
  };

  return {
	Triage: getNextSquad(current.Triage),
	Health: getNextSquad(current.Health),
	Beta: getNextSquad(current.Beta),
  };
}

function getCycleDates(seedDate: string, cycleLengthMs: number): string[] {
  const startDate = new Date(seedDate).getTime();
  const today = new Date().getTime();
  
  const dates: string[] = [];
  let currentDate = startDate;

  while (currentDate <= today) {
	dates.push(new Date(currentDate).toISOString().split("T")[0]);
	currentDate += cycleLengthMs;
  }
  
  dates.push(new Date(currentDate).toISOString().split("T")[0]);

  return dates;
}

export function dates() {
	return getCycleDates(dateSeed, CYCLE_LENGTH_MS)
}

export function whoIsDoingWhat(): [WhenAndWho] {
	const d = dates()
	let currentDuty = dutySeed
	const list = []
	for (const date of d) {
		list.push({
			date,
			duties: currentDuty
		})
		currentDuty = next(currentDuty)
	}
	return list
}