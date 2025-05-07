"use client";
import { postCommentService } from "@/services/comment.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CommentPost({ commentItem, post_id }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    email: session?.user?.email || "",
    name: session?.user?.username || "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = session?.user;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleComments = async (e) => {
    e.preventDefault();
    if (
      (form.email || session?.user?.email) &&
      (form.name || session?.user?.username) &&
      form.comment
    ) {
      setIsSubmitting(true);
      try {
        const res = await postCommentService({
          parent_id: commentItem?.id || 0,
          post_id,
          ...(user ? { user_id: user?.id } : {}),
          email: session?.user?.email || form.email,
          name: session?.user?.username || form.name,
          comment: form.comment,
        });
        router.refresh();
        if (res?.data?.status === 0) {
          import("sonner").then((module) =>
            module.toast.warning(
              "Your comment has been sent. It will be published after being reviewed by the site management."
            )
          );
        }
        // Reset form after successful submission
        setForm({
          email: user?.email || "",
          name: user?.username || "",
          comment: "",
        });
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <form onSubmit={handleComments}>
      <div className="row">
        {!user && (
          <>
            <div className="col-lg-6 mb-3">
              <label className="fw-bold mb-1">Name</label>
              <input
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <label className="fw-bold mb-1">Email</label>
              <input
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
        <div className="col-lg-12 mb-3">
          <label className="fw-bold mb-1">Comment</label>
          <textarea
            name="comment"
            className="form-control"
            placeholder="Leave your comment"
            rows={2}
            value={form.comment}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-primary mt-3"
            type="submit"
            disabled={isSubmitting || !form.comment}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>
    </form>
  );
}
