import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { isVisible: true },
    orderBy: { date: 'desc' },
  })
  return NextResponse.json(reviews)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const review = await prisma.review.create({ data: body })
  return NextResponse.json(review, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const review = await prisma.review.update({
    where: { id: body.id },
    data: body,
  })
  return NextResponse.json(review)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await prisma.review.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
