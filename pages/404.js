import Link from 'next/link';

export default function Custom404() {
    return <>
        <div style={{ padding: 20, userSelect: 'none', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ height: '50%', width: 'auto', objectFit: 'contain' }} src="./images/404.gif" alt="404.gif"></img>
            <h2 style={{ textAlign: 'center' }}>404 | This Page Could Not Be Found.</h2>
            <Link href="/"><a>Back to Home</a></Link>
      </div>
    </>
  }