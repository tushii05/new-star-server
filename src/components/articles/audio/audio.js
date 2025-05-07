"use client";
import React, { useState, useEffect } from "react";
import Player from "@/lib/react-player/react-player";
import { getMediaUrl } from "@/utils/getUrl";

export default function Audio({ tracks }) {
  const tracksList =
    tracks?.map((audio) => ({
      url: getMediaUrl(audio.audio.audio_path),
      name: audio.audio.audio_name,
    })) || [];

  const [currentTrack, setCurrentTrack] = useState(tracksList[0] || null);

  useEffect(() => {
    if (tracksList.length > 0 && !currentTrack) {
      setCurrentTrack(tracksList[0]); 
    }
  }, [tracksList]);

  return (
    <>
      {currentTrack && (
        <Player
          url={currentTrack.url}
          config={{ file: { forceAudio: true } }}
          height="revert"
        />
      )}

      <div className="row">
        {tracksList.length > 0 &&
          tracksList.map((audio, index) => (
            <div key={index}>
              {index + 1}.
              <button
                className="btn"
                onClick={() => {
                  setCurrentTrack(audio);
                }}
              >
                {audio.name}
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
