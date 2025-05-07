import Comments from "./comments";

export default function CommentWrapper({ comments, post_id, session }) {
  return <Comments {...{ comments, post_id, session }} />;
}
