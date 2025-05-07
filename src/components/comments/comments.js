"use client";
import timeAgo from "@/utils/time-conversion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMediaUrl } from "@/utils/getUrl";
import dynamic from "next/dynamic";
const CommentPost = dynamic(() => import("./comment-post"));

export default function Comments({ comments, post_id, session }) {
  const router = useRouter();
  const handleDeleteComment = async (comment_id) => {
    const { deleteCommentService } = await import("@/services/comment.service");
    await deleteCommentService(comment_id, session?.id);
    router.refresh();
  };
  return (
    <>
      <section className="my-3 py-2">
        <h2 className="sec-heading text-dark">COMMENTS ({comments?.length})</h2>
        {comments?.length
          ? comments.map((comment, commentIndex) => (
              <div
                key={commentIndex}
                id="accordionFlushExample"
                className="accordion accordion-flush"
              >
                <div className="comment-row mb-2 pb-1">
                  <div className="d-flex align-items-center">
                    <div className="pe-3">
                      <Image
                        width={100}
                        height={100}
                        src={
                          comment?.user?.avatar
                            ? getMediaUrl(comment.user.avatar)
                            : "/images/icon/user.svg"
                        }
                        alt={comment?.user?.username ?? "avatar"}
                        className="img-fluid"
                        quality={30}
                      />
                    </div>
                    <div>
                      <p className="mb-0 p1-c">{comment?.user?.username}</p>
                      <p className="mb-0 p2-c">{comment?.comment}</p>
                      <div className="row social-c-icons mt-1">
                        <div className="col-12 d-flex align-items-center">
                          <p className="mb-0 pe-3">
                            {timeAgo(comment?.created_at)}
                          </p>
                          <p className="mb-0 pe-3">
                            <span
                              type="button"
                              className="collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target={
                                "#flush-collapseOne" + commentIndex
                              }
                              aria-expanded="false"
                              aria-controls={"flush-collapseOne" + commentIndex}
                            >
                              <svg
                                width={17}
                                height={18}
                                viewBox="0 0 17 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.77148 8.56114C1.77148 8.8862 1.90692 9.13541 2.17781 9.30877L7.6225 12.9332C7.76336 13.0307 7.91505 13.0848 8.07758 13.0957C8.24011 13.1065 8.39722 13.0686 8.54891 12.9819C8.70061 12.8952 8.81979 12.7815 8.90648 12.6406C8.99316 12.4997 9.0365 12.3481 9.0365 12.1855V10.3652C10.2067 10.3652 11.2577 10.7011 12.1895 11.3729C13.1214 12.0447 13.7769 12.9169 14.1561 13.9896C14.3728 13.3828 14.4812 12.7815 14.4812 12.1855C14.4812 11.1995 14.2374 10.2894 13.7498 9.45505C13.2622 8.62074 12.6013 7.95979 11.767 7.4722C10.9327 6.98462 10.0225 6.74083 9.0365 6.74083V4.92051C9.0365 4.75798 8.99316 4.60629 8.90648 4.46543C8.81979 4.32457 8.70061 4.2108 8.54891 4.12412C8.39722 4.03744 8.24011 3.99952 8.07758 4.01035C7.91505 4.02119 7.76336 4.07536 7.6225 4.17288L2.17781 7.79726C1.90692 7.97062 1.77148 8.22525 1.77148 8.56114Z"
                                  fill="#1E3A8A"
                                />
                              </svg>
                              Reply
                            </span>
                          </p>
                          {/* <p className="mb-0 pe-3">
                            <svg
                              width={17}
                              height={18}
                              viewBox="0 0 17 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.7674 3.92103C10.7674 2.90523 9.76382 2.22803 8.97962 2.22803C8.4338 2.22803 8.39114 2.64247 8.30716 3.46053C8.26992 3.81945 8.22522 4.25557 8.12635 4.76753C7.86495 6.12329 6.96156 7.85557 6.09745 8.37363V12.386C6.09475 13.9097 6.60265 14.4176 8.80355 14.4176H11.3586C12.8322 14.4176 13.1891 13.4472 13.3218 13.0876L13.3306 13.0632C13.4078 12.856 13.5731 12.6928 13.7627 12.5079C13.9726 12.3007 14.2124 12.0657 14.3905 11.7088C14.6011 11.2869 14.5733 10.9118 14.5482 10.5779C14.5327 10.3754 14.5185 10.1885 14.5598 10.0158C14.6031 9.833 14.6586 9.69417 14.7121 9.56144C14.809 9.32036 14.8984 9.09688 14.8984 8.66144C14.8984 7.64564 14.3918 6.96979 13.3306 6.96979H10.4966C10.4966 6.96979 10.7674 4.93683 10.7674 3.92103ZM3.72454 7.64564C3.45513 7.64564 3.19676 7.75266 3.00626 7.94316C2.81576 8.13366 2.70874 8.39203 2.70874 8.66144V13.4018C2.70874 13.6713 2.81576 13.9296 3.00626 14.1201C3.19676 14.3106 3.45513 14.4176 3.72454 14.4176C3.99395 14.4176 4.25232 14.3106 4.44282 14.1201C4.63332 13.9296 4.74034 13.6713 4.74034 13.4018V8.66144C4.74034 8.39203 4.63332 8.13366 4.44282 7.94316C4.25232 7.75266 3.99395 7.64564 3.72454 7.64564Z"
                                fill="#575757"
                              />
                            </svg>
                            Like (0)
                          </p> */}
                          {session && session?.id === comment?.user?.id && (
                            <p
                              className="mb-0"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteComment(comment?.id)}
                            >
                              <svg
                                width={17}
                                height={18}
                                viewBox="0 0 17 18"
                                fill="#DC3545"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.15031 14.6093L2.96182 6.29123H13.797L12.6086 14.6093C12.5624 14.932 12.4014 15.2273 12.1551 15.4409C11.9088 15.6545 11.5937 15.7721 11.2677 15.7721H5.49117C5.16515 15.7721 4.85006 15.6545 4.60375 15.4409C4.35744 15.2273 4.19644 14.932 4.15031 14.6093ZM14.4742 3.58243H11.0882V2.90523C11.0882 2.72562 11.0169 2.55337 10.8899 2.42637C10.7629 2.29938 10.5906 2.22803 10.411 2.22803H6.34783C6.16822 2.22803 5.99598 2.29938 5.86898 2.42637C5.74198 2.55337 5.67063 2.72562 5.67063 2.90523V3.58243H2.28462C2.10502 3.58243 1.93277 3.65378 1.80577 3.78078C1.67877 3.90778 1.60742 4.08003 1.60742 4.25963C1.60742 4.43924 1.67877 4.61148 1.80577 4.73848C1.93277 4.86548 2.10502 4.93683 2.28462 4.93683H14.4742C14.6538 4.93683 14.8261 4.86548 14.9531 4.73848C15.0801 4.61148 15.1514 4.43924 15.1514 4.25963C15.1514 4.08003 15.0801 3.90778 14.9531 3.78078C14.8261 3.65378 14.6538 3.58243 14.4742 3.58243Z"
                                  fill="#DC3545`"
                                />
                              </svg>
                              Delete
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* reply code start here */}
                <div
                  className="col-10 collapse offset-1 ps-lg-4"
                  id={"flush-collapseOne" + commentIndex}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div>
                    <CommentPost commentItem={comment} post_id={post_id} />
                    {comment?.childComments?.length
                      ? comment.childComments.map(
                          (childComment, childCommentIndex) => (
                            <div
                              className="comment-row mt-4 mb-4"
                              key={childCommentIndex}
                            >
                              <div className="d-flex align-items-center">
                                <div className="pe-3">
                                  <Image
                                    width={1000}
                                    height={1000}
                                    src={
                                      childComment?.user?.avatar
                                        ? getMediaUrl(childComment.user.avatar)
                                        : "/images/icon/user.svg"
                                    }
                                    alt={comment?.user?.username ?? "avatar"}
                                    className="img-fluid"
                                  />{" "}
                                </div>
                                <div>
                                  <p className="mb-0 p1-c">
                                    {childComment?.user?.username}
                                  </p>
                                  <p className="mb-0 p2-c">
                                    {childComment?.comment}
                                  </p>
                                  <div className="row social-c-icons mt-1">
                                    <div className="col-12 d-flex align-items-center">
                                      <p className="mb-0 pe-3">
                                        {timeAgo(childComment?.created_at)}
                                      </p>
                                      {/* <p className="mb-0 pe-3">
                                        <svg
                                          width={17}
                                          height={18}
                                          viewBox="0 0 17 18"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10.7674 3.92103C10.7674 2.90523 9.76382 2.22803 8.97962 2.22803C8.4338 2.22803 8.39114 2.64247 8.30716 3.46053C8.26992 3.81945 8.22522 4.25557 8.12635 4.76753C7.86495 6.12329 6.96156 7.85557 6.09745 8.37363V12.386C6.09475 13.9097 6.60265 14.4176 8.80355 14.4176H11.3586C12.8322 14.4176 13.1891 13.4472 13.3218 13.0876L13.3306 13.0632C13.4078 12.856 13.5731 12.6928 13.7627 12.5079C13.9726 12.3007 14.2124 12.0657 14.3905 11.7088C14.6011 11.2869 14.5733 10.9118 14.5482 10.5779C14.5327 10.3754 14.5185 10.1885 14.5598 10.0158C14.6031 9.833 14.6586 9.69417 14.7121 9.56144C14.809 9.32036 14.8984 9.09688 14.8984 8.66144C14.8984 7.64564 14.3918 6.96979 13.3306 6.96979H10.4966C10.4966 6.96979 10.7674 4.93683 10.7674 3.92103ZM3.72454 7.64564C3.45513 7.64564 3.19676 7.75266 3.00626 7.94316C2.81576 8.13366 2.70874 8.39203 2.70874 8.66144V13.4018C2.70874 13.6713 2.81576 13.9296 3.00626 14.1201C3.19676 14.3106 3.45513 14.4176 3.72454 14.4176C3.99395 14.4176 4.25232 14.3106 4.44282 14.1201C4.63332 13.9296 4.74034 13.6713 4.74034 13.4018V8.66144C4.74034 8.39203 4.63332 8.13366 4.44282 7.94316C4.25232 7.75266 3.99395 7.64564 3.72454 7.64564Z"
                                            fill="#575757"
                                          />
                                        </svg>
                                        Like (0)
                                      </p> */}
                                      {session &&
                                        session?.id ===
                                          childComment?.user?.id && (
                                          <p
                                            className="mb-0"
                                            style={{
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleDeleteComment(
                                                childComment?.id
                                              )
                                            }
                                          >
                                            <svg
                                              width={17}
                                              height={18}
                                              viewBox="0 0 17 18"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M4.15031 14.6093L2.96182 6.29123H13.797L12.6086 14.6093C12.5624 14.932 12.4014 15.2273 12.1551 15.4409C11.9088 15.6545 11.5937 15.7721 11.2677 15.7721H5.49117C5.16515 15.7721 4.85006 15.6545 4.60375 15.4409C4.35744 15.2273 4.19644 14.932 4.15031 14.6093ZM14.4742 3.58243H11.0882V2.90523C11.0882 2.72562 11.0169 2.55337 10.8899 2.42637C10.7629 2.29938 10.5906 2.22803 10.411 2.22803H6.34783C6.16822 2.22803 5.99598 2.29938 5.86898 2.42637C5.74198 2.55337 5.67063 2.72562 5.67063 2.90523V3.58243H2.28462C2.10502 3.58243 1.93277 3.65378 1.80577 3.78078C1.67877 3.90778 1.60742 4.08003 1.60742 4.25963C1.60742 4.43924 1.67877 4.61148 1.80577 4.73848C1.93277 4.86548 2.10502 4.93683 2.28462 4.93683H14.4742C14.6538 4.93683 14.8261 4.86548 14.9531 4.73848C15.0801 4.61148 15.1514 4.43924 15.1514 4.25963C15.1514 4.08003 15.0801 3.90778 14.9531 3.78078C14.8261 3.65378 14.6538 3.58243 14.4742 3.58243Z"
                                                fill="#DC3545"
                                              />
                                            </svg>
                                            Delete
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      : null}
                  </div>{" "}
                </div>
              </div>
            ))
          : null}
      </section>
    </>
  );
}
