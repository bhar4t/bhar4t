import "../styles/global.css";
import MouseContextProvider from "../context/mouse-context";
import { ThemeProvider, THEME_BOOT_SCRIPT } from "../context/theme-context";
import DotRing from "../components/DotRing/DotRing";
import RegisterServiceWorker from "../components/RegisterServiceWorker";

const APP_NAME = "Webkoof.in";
const APP_DESCRIPTION = "Code with BHARAT SAHU | BHAR4T";

const APPLE_ICON_SIZES = ["57x57", "60x60", "72x72", "76x76", "114x114", "120x120", "144x144", "152x152", "180x180"];
const FAVICON_SIZES = ["16x16", "32x32", "96x96"];

// Replaces the static <head> tags previously rendered by pages/_document.js
export const metadata = {
  applicationName: APP_NAME,
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
      ...FAVICON_SIZES.map((size) => ({ url: `/images/favicon-${size}.png`, sizes: size, type: "image/png" })),
    ],
    apple: APPLE_ICON_SIZES.map((size) => ({ url: `/images/apple-icon-${size}.png`, sizes: size })),
    shortcut: "/images/favicon.ico",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#d3bf00",
    "msapplication-TileImage": "/images/ms-icon-144x144.png",
    "fb:app_id": "2572611269617452",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  themeColor: "#d3bf00",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Local fonts */}
        <link rel="preload" href="/fonts/Sacramento/Sacramento-Regular.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Inter/static/Inter-Thin.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Inter/static/Inter-Light.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Inter/static/Inter-Regular.ttf" as="font" crossOrigin="" />
        {/* Applies the persisted theme before paint to avoid a flash */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <MouseContextProvider>
            <DotRing />
            {children}
          </MouseContextProvider>
        </ThemeProvider>
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
