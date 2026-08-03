import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const hours = await prisma.openingHour.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(hours)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const hour = await prisma.openingHour.update({
    where: { id: body.id },
    data: body,
  })
  return NextResponse.json(hour)
}
