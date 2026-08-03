import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST() {
  try {
    await execAsync('npx tsx prisma/seed.ts')
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
