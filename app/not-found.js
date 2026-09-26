import Image from "next/image";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";

// noindex: 404s should never be indexed/ranked as real content
export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const { errContainer, errImg, errText } = utilStyles;
  return (
    <div className={errContainer}>
      <Image
        className={errImg}
        src="/images/404.gif"
        alt="Confused developer illustration for a page that could not be found"
        width={360}
        height={204}
        unoptimized
      />
      <h1 className={errText}>404 | This Page Could Not Be Found.</h1>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
