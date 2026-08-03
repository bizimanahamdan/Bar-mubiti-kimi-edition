import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const categoryId = searchParams.get('categoryId')
  const where = categoryId ? { categoryId } : {}
  const items = await prisma.menuItem.findMany({
    where,
    orderBy: { name: 'asc' },
    include: { category: true },
  })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const item = await prisma.menuItem.create({ data: body })
  return NextResponse.json(item, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const item = await prisma.menuItem.update({
    where: { id: body.id },
    data: body,
  })
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await prisma.menuItem.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
