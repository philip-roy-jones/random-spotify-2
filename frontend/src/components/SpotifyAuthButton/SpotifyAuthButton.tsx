import React from "react";
import { Button } from "@/components";

const SpotifyAuthButton: React.FC = () => {
  const handleLogin = async () => {
    try {
      const response = await fetch("/api/authorize", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Response not ok:", response.status, response.statusText);
        throw new Error(`Authorization failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.url) {
        console.error("No URL found in response:", data);
        throw new Error("Authorization URL not found in response");
      }

      // Redirect the user to the Spotify authorization URL
      window.location.href = data.url;

      // You can handle the response data here, e.g., redirect to Spotify or save tokens
    } catch (error) {
      console.error("Error during authorization:", error);
    }
  };

  return <Button onClick={handleLogin} text={"Login with Spotify"} />;
};

export default SpotifyAuthButton;
