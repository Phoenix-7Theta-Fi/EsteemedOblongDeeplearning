import type { NextApiRequest, NextApiResponse } from 'next'
import OpenTok from 'opentok'

// Initialize OpenTok with your API key and secret
const apiKey = process.env.NEXT_PUBLIC_VONAGE_API_KEY!
const apiSecret = process.env.VONAGE_API_SECRET!

if (!apiKey || !apiSecret) {
  throw new Error('Vonage API key or secret is missing')
}

const opentok = new OpenTok(apiKey, apiSecret)

type Data = {
  sessionId: string
  token: string
} | {
  error: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // Create a new session
    opentok.createSession({ mediaMode: 'routed' }, (error, session) => {
      if (error) {
        console.error('Error creating OpenTok session:', error)
        res.status(500).json({ error: 'Failed to create session' })
        return
      }

      // Generate a token for this session
      const token = opentok.generateToken(session.sessionId)

      // Send the session ID and token back to the client
      res.status(200).json({ 
        sessionId: session.sessionId,
        token: token
      })
    })
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
}