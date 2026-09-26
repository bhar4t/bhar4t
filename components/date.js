import formatDate from "../utils/formatDate";

export default function Date({ dateString }) {
  return <time dateTime={dateString}>{formatDate(dateString)}</time>;
}
