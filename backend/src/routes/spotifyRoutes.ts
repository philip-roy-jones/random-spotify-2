import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import SpotifyService from '../services/spotifyService';

dotenv.config();

const router = express.Router();

router.get('/authorize', (_req: Request, res: Response) => {
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  SpotifyService.saveState(state) // Save the state to Redis for validation later

  const params = {
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID || '',
    scope: "user-read-private user-read-email",
    code_challenge_method: "S256",
    code_challenge: "exampleCodeChallenge",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    state: state
  };
  authUrl.search = new URLSearchParams(params as Record<string, string>).toString();

  res.json({ url: authUrl.toString() });
});

router.get('/authorize-callback', (req: Request, res: Response) => {
  const { code, state } = req.query;

  console.log(SpotifyService.verifyState(state as string));
  res.send(`Code: ${code}<br>State: ${state}<br>`);
});

export default router;