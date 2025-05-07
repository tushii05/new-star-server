"use client";
import { updateFollowUnfollow } from "@/services/user.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FollowUnfollow({ userId, followerId, followerData }) {
  const [followed, setFollowed] = useState(false);
  const router = useRouter();

  const handleFollowUnfollow = async () => {
    try {
      await updateFollowUnfollow(userId, followerId);
      setFollowed((prev) => !prev);
      router.refresh();
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  useEffect(() => {
    if (followerData?.followers?.length) {
      const findIfFollowed = followerData.followers.find(
        (item) => item.follower.id === userId
      );
      setFollowed(!!findIfFollowed);
    }
  }, [followerData, userId]);

  return (
    <button className="btn btn-primary" onClick={handleFollowUnfollow}>
      {followed ? "Unfollow" : "Follow"}
    </button>
  );
}
