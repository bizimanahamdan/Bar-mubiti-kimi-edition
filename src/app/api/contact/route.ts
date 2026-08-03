import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(messages)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const msg = await prisma.contactMessage.create({ data: body })
  return NextResponse.json(msg, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const msg = await prisma.contactMessage.update({
    where: { id: body.id },
    data: body,
  })
  return NextResponse.json(msg)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await prisma.contactMessage.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
