import { NextRequest, NextResponse } from 'next/server';
import {dates, whoIsDoingWhat} from '~/utils/cycle.ts'

export async function GET(
	req: NextRequest,
	{ params }: Promise<{ slug: string }>
) {
	const format = (await params).format;
	console.log(format, dates(), whoIsDoingWhat())
	if (format != 'ics') {
		return new NextResponse("invalid format", { status: 400 });
	}
	return new NextResponse("hello world", { status: 200 });
}