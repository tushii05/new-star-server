"use client";
import { updateUser } from "@/services/user.service";
import React, { useEffect, useState } from "react";

export default function UpdateSocialForm({ user }) {
  const [userData, setUserData] = useState({
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
    tiktok_url: "",
    whatsapp_url: "",
    youtube_url: "",
    discord_url: "",
    telegram_url: "",
    pinterest_url: "",
    linkedin_url: "",
    twitch_url: "",
    vk_url: "",
    personal_website_url: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        facebook_url: user?.facebook_url,
        twitter_url: user?.twitter_url,
        instagram_url: user?.instagram_url,
        tiktok_url: user?.tiktok_url,
        whatsapp_url: user?.whatsapp_url,
        youtube_url: user?.youtube_url,
        discord_url: user?.discord_url,
        telegram_url: user?.telegram_url,
        pinterest_url: user?.pinterest_url,
        linkedin_url: user?.linkedin_url,
        twitch_url: user?.twitch_url,
        vk_url: user?.vk_url,
        personal_website_url: user?.personal_website_url,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      if (userData[key] !== user[key]) {
        formData.append(key, userData[key]);
      }
    });

    await updateUser(formData, user?.id);
  
  };

  const replaceUnderscores = (str) => {
    return str.replace(/_/g, " ");
  };
  return (
    <form onSubmit={handleSubmit} className="row">
      <div className="col-lg-11">
        <div className="md-form">
          <div className="row">
            {userData && Object.keys(userData).length > 0
              ? Object.entries(userData).map(([key, value], index) => (
                  <div className="col-lg-12 col-md-12 mb-3" key={key + index}>
                    <label className="text-capitalize">
                      {replaceUnderscores(key)}
                    </label>
                    <input
                      className="form-control"
                      placeholder={replaceUnderscores(key)}
                      type="url"
                      value={value || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, [key]: e.target.value })
                      }
                    />
                  </div>
                ))
              : null}
            <div className="col-lg-12 col-md-12 mb-3">
              <button type="submit" className="btn btn-primary px-4">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
