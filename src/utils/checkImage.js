export function checkImage(image) {
  if (image === "NULL" || image === null || image === undefined || !image) {
    return "/images/no-image-available.png";
  }
  return image;
}
