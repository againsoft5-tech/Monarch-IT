import { NextRequest, NextResponse } from 'next/server'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'promo-banner')
const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/svg+xml'])
const MAX_SIZE = 5 * 1024 * 1024

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
  }

  const ext = path.extname(file.name).toLowerCase() || `.${file.type.split('/')[1]}`
  const safeExt = /^\.[a-z0-9]+$/.test(ext) ? ext : '.bin'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`

  await mkdir(UPLOAD_DIR, { recursive: true })
  const bytes = Buffer.from(await file.arrayBuffer())
  await writeFile(path.join(UPLOAD_DIR, fileName), bytes)

  return NextResponse.json({ url: `/uploads/promo-banner/${fileName}` })
}
