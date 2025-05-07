export function formatDate(isoString) {
  const date = new Date(isoString);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
export function timeAgo(date) {
  const now = new Date();
  const inputDate = new Date(date);

  const diffInMs = now - inputDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 24) {
    if (diffInMinutes < 1) {
      return "just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }
  } else {
    const hours = inputDate.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = inputDate.getMinutes().toString().padStart(2, "0"); // Ensure 2-digit minutes
    const amPm = inputDate.getHours() >= 12 ? "PM" : "AM";

    return `${hours}:${minutes} ${amPm}`;
  }
}
