import { z } from 'zod'
import { db } from '@/lib/db'
import { sendBookEmail } from '@/lib/email'

const LeadSchema = z.object({
  email: z.string().trim().email(),
})

// Public subscriber list for the owner dashboard (gated by obscure URL, not auth).
export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 2000,
      select: { id: true, email: true, source: true, createdAt: true },
    })
    return Response.json({ ok: true, count: leads.length, leads })
  } catch (error) {
    console.error('GET /api/leads error:', error)
    return Response.json(
      { ok: false, error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = LeadSchema.safeParse(body)

    if (!parsed.success) {
      return Response.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const email = parsed.data.email

    // Persist the lead (duplicates are ignored via upsert).
    await db.lead.upsert({
      where: { email },
      create: { email, source: 'landing' },
      update: {},
    })

    // Send the deliverable email (PDF + audio links). A send failure does NOT
    // fail the request — the lead is saved and the on-page download still works.
    const result = await sendBookEmail(email)
    if (!result.sent) {
      console.warn(`[leads] Email not sent to ${email}: ${result.reason}`)
    }

    return Response.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error('POST /api/leads error:', error)
    return Response.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
