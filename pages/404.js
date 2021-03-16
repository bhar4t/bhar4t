import Link from 'next/link';
import utilStyles from "../styles/utils.module.css";

export default function Custom404() {
  const { errContainer, errImg, errText } = utilStyles;
    return <>
      <div className={errContainer}>
            <img className={errImg} src="/images/404.gif" alt="404.gif"></img>
            <h2 className={errText}>404 | This Page Could Not Be Found.</h2>
            <Link href="/"><a>Back to Home</a></Link>
      </div>
    </>
  }