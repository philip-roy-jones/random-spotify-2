import React from "react";
import {Button} from "@/components";

const SpotifyAuthButton: React.FC = () => {
  const buildSpotifyAuthUrl = () => {
    const clientId = "your-client-id";
    const redirectUri = encodeURIComponent("http://localhost:3000/callback");
    const scopes = encodeURIComponent("user-read-private user-read-email");
    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
  };

  const spotifyAuthUrl = buildSpotifyAuthUrl();

  return <Button url={spotifyAuthUrl} text={"Click Me"} />;
};

export default SpotifyAuthButton;
