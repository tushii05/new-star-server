"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

export default function Player({ url, ...props }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <ReactPlayer url={url} controls={true} width={"100%"} {...props} />
  ) : null;
}
