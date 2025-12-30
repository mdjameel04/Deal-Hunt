import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "Price check endpoint is working. Use post to trigger "
    });
}

export async function POST() {
    
}