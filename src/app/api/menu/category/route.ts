import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const cats = await prisma.menuCategory.findMany({
    orderBy: { order: 'asc' },
    include: { items: { orderBy: { name: 'asc' } } },
  })
  return NextResponse.json(cats)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const cat = await prisma.menuCategory.create({ data: body })
  return NextResponse.json(cat, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const cat = await prisma.menuCategory.update({
    where: { id: body.id },
    data: body,
  })
  return NextResponse.json(cat)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await prisma.menuCategory.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
