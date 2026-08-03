import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const info = await prisma.businessInfo.findFirst()
  return NextResponse.json(info)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const info = await prisma.businessInfo.update({
    where: { id: '1' },
    data: body,
  })
  return NextResponse.json(info)
}
