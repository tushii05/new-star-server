import Player from "@/lib/react-player/react-player";

export default function Video({ video }) {
  return (
    video && (
      <Player
        className="mt-3"
        url={video}
        config={{ file: { forceVideo: true } }}
      />
    )
  );
}
