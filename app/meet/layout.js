import { buildPageMetadata } from "../../lib/seo";
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata = buildPageMetadata({
  title: "Meet",
  description: "Peer-to-peer WebRTC video calls, signaled over Convex.",
  canonical: "meet",
});

export default function MeetLayout({ children }) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
