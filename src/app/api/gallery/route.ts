import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(images)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const img = await prisma.galleryImage.create({ data: body })
  return NextResponse.json(img, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const img = await prisma.galleryImage.update({
    where: { id: body.id },
    data: body,
  })
  return NextResponse.json(img)
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await prisma.galleryImage.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
