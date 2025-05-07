"use client";
import { updateUser } from "@/services/user.service";
import { getMediaUrl } from "@/utils/getUrl";
import Image from "next/image";
import { useEffect, useState } from "react";

const userInterface = {
  username: "",
  email: "",
  slug: "",
  about_me: "",
  avatar: "",
  cover_image: "",
};

export default function UpdateProfileForm({ user }) {
  const [userData, setUserData] = useState(userInterface);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user?.username,
        email: user?.email,
        slug: user?.slug,
        about_me: user?.about_me,
        avatar: user?.avatar,
        cover_image: user?.cover_image,
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      if (userData[key] !== user[key]) {
        if (key === "avatar" || key === "cover_image") {
          if (typeof userData[key] === "object" && userData[key] !== null) {
            formData.append(key, userData[key]);
          }
        } else {
          formData.append(key, userData[key]);
        }
      }
    });
    await updateUser(formData, user?.id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row profile-cover mb-3  position-relative">
        <div className="col-lg-12 position-relative">
          {userData?.cover_image ? (
            <Image
              width={1190}
              height={210}
              src={
                userData.cover_image instanceof Blob
                  ? URL.createObjectURL(userData.cover_image)
                  : typeof userData.cover_image === "string"
                  ? getMediaUrl(userData.cover_image)
                  : getMediaUrl(userData.cover_image)
              }
              alt={user?.username || "avatar"}
              className="cover-img"
              sizes="(max-width : 992px) 1190px, 100%"
              loading="lazy"
            />
          ) : (
            <div className="cover-img bg-secondary" />
          )}

          <label className="camera-cover" htmlFor="cover_image">
            <input
              type="file"
              hidden
              id="cover_image"
              onChange={(e) =>
                setUserData({ ...userData, cover_image: e.target.files[0] })
              }
            />

            <svg
              width={19}
              height={19}
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.98438 3.08793C6.98438 2.67316 7.29476 2.33691 7.67763 2.33691H12.2993C12.6821 2.33691 12.9925 2.67316 12.9925 3.08793C12.9925 3.50271 12.6821 3.83895 12.2993 3.83895H7.67763C7.29476 3.83895 6.98438 3.50271 6.98438 3.08793Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.31954 15.8553H11.6574C14.0014 15.8553 15.1734 15.8553 16.0152 15.3128C16.3796 15.078 16.6926 14.7762 16.9361 14.4248C17.4987 13.6129 17.4987 12.4828 17.4987 10.2225C17.4987 7.96227 17.4985 6.83228 16.936 6.02046C16.6925 5.669 16.3796 5.36725 16.0151 5.13241C15.1732 4.58997 14.0012 4.58997 11.6573 4.58997H8.31941C5.97546 4.58997 4.80348 4.58997 3.9616 5.13241C3.59713 5.36725 3.28421 5.669 3.04068 6.02046C2.47827 6.83211 2.47827 7.96174 2.47827 10.221V10.2225C2.47827 12.4828 2.47827 13.6129 3.0408 14.4248C3.28433 14.7762 3.59725 15.078 3.96172 15.3128C4.80361 15.8553 5.97558 15.8553 8.31954 15.8553ZM6.85922 10.2225C6.85922 8.55595 8.26023 7.20499 9.98847 7.20499C11.7167 7.20499 13.1177 8.55595 13.1177 10.2225C13.1177 11.889 11.7167 13.2401 9.98847 13.2401C8.26023 13.2401 6.85922 11.889 6.85922 10.2225ZM8.11092 10.2225C8.11092 9.22263 8.95153 8.41198 9.98847 8.41198C11.0254 8.41198 11.866 9.22263 11.866 10.2225C11.866 11.2224 11.0254 12.033 9.98847 12.033C8.95153 12.033 8.11092 11.2224 8.11092 10.2225ZM14.578 7.20499C14.2324 7.20499 13.9522 7.47519 13.9522 7.80846C13.9522 8.14184 14.2324 8.41198 14.578 8.41198H14.9953C15.3409 8.41198 15.6211 8.14184 15.6211 7.80846C15.6211 7.47519 15.3409 7.20499 14.9953 7.20499H14.578Z"
                fill="white"
              />
            </svg>
          </label>
        </div>
        <div className="position-relative">
          <Image
            width={100}
            height={100}
            src={
              userData.avatar
                ? userData.avatar instanceof Blob
                  ? URL.createObjectURL(userData.avatar)
                  : userData?.avatar
                  ? getMediaUrl(userData.avatar)
                  : "/images/icon/user.svg"
                : "/images/icon/user.svg"
            }
            alt={userData?.username ?? "avatar"}
            className="img-fluid profile"
          />
          <label className="camera-profile" htmlFor="avatar">
            <input
              type="file"
              hidden
              id="avatar"
              onChange={(e) =>
                setUserData({ ...userData, avatar: e.target.files[0] })
              }
            />
            <svg
              width={19}
              height={19}
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.98438 3.08793C6.98438 2.67316 7.29476 2.33691 7.67763 2.33691H12.2993C12.6821 2.33691 12.9925 2.67316 12.9925 3.08793C12.9925 3.50271 12.6821 3.83895 12.2993 3.83895H7.67763C7.29476 3.83895 6.98438 3.50271 6.98438 3.08793Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.31954 15.8553H11.6574C14.0014 15.8553 15.1734 15.8553 16.0152 15.3128C16.3796 15.078 16.6926 14.7762 16.9361 14.4248C17.4987 13.6129 17.4987 12.4828 17.4987 10.2225C17.4987 7.96227 17.4985 6.83228 16.936 6.02046C16.6925 5.669 16.3796 5.36725 16.0151 5.13241C15.1732 4.58997 14.0012 4.58997 11.6573 4.58997H8.31941C5.97546 4.58997 4.80348 4.58997 3.9616 5.13241C3.59713 5.36725 3.28421 5.669 3.04068 6.02046C2.47827 6.83211 2.47827 7.96174 2.47827 10.221V10.2225C2.47827 12.4828 2.47827 13.6129 3.0408 14.4248C3.28433 14.7762 3.59725 15.078 3.96172 15.3128C4.80361 15.8553 5.97558 15.8553 8.31954 15.8553ZM6.85922 10.2225C6.85922 8.55595 8.26023 7.20499 9.98847 7.20499C11.7167 7.20499 13.1177 8.55595 13.1177 10.2225C13.1177 11.889 11.7167 13.2401 9.98847 13.2401C8.26023 13.2401 6.85922 11.889 6.85922 10.2225ZM8.11092 10.2225C8.11092 9.22263 8.95153 8.41198 9.98847 8.41198C11.0254 8.41198 11.866 9.22263 11.866 10.2225C11.866 11.2224 11.0254 12.033 9.98847 12.033C8.95153 12.033 8.11092 11.2224 8.11092 10.2225ZM14.578 7.20499C14.2324 7.20499 13.9522 7.47519 13.9522 7.80846C13.9522 8.14184 14.2324 8.41198 14.578 8.41198H14.9953C15.3409 8.41198 15.6211 8.14184 15.6211 7.80846C15.6211 7.47519 15.3409 7.20499 14.9953 7.20499H14.578Z"
                fill="white"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="row mt-5 pt-4">
        <div className="col-lg-12">
          <div className="md-form">
            <div className="row">
              <div className="col-lg-4 col-md-4 mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  placeholder="Enter your e-mail"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-4 col-md-4 mb-3">
                <label>Username</label>
                <input
                  className="form-control"
                  placeholder="Enter your username"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-4 col-md-4 mb-3">
                <label>Slug</label>
                <input
                  className="form-control"
                  placeholder="Enter your slug"
                  value={userData.slug}
                  onChange={(e) =>
                    setUserData({ ...userData, slug: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-12 col-md-12 mb-3">
                <label>Comment</label>
                <textarea
                  placeholder="Leave your comment"
                  className="form-control"
                  rows={4}
                  value={userData.about_me || ""}
                  onChange={(e) =>
                    setUserData({ ...userData, about_me: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-12 col-md-12 mb-3">
                <button type="submit" className="btn btn-primary px-4">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
