const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Formats a "YYYY-MM-DD" string as e.g. "September 26, 2026" without a timezone-sensitive Date parse.
export default function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return `${MONTH_NAMES[month - 1]} ${day}, ${year}`;
}
