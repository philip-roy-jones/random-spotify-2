import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/authorize', (_req: Request, res: Response) => {
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const params = {
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID || '',
    scope: "user-read-private user-read-email",
    code_challenge_method: "S256",
    code_challenge: "exampleCodeChallenge",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    state: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  };
  authUrl.search = new URLSearchParams(params as Record<string, string>).toString();

  res.json({ url: authUrl.toString() });
});

router.get('/authorize-callback', (req: Request, res: Response) => {
  const code = req.query.code;
  const state = req.query.state;
  res.send(`Code: ${code}<br>State: ${state}<br>`);
});

export default router;