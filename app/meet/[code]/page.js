"use client";

import { use } from "react";
import MeetRoom from "../MeetRoom";

export default function MeetByCode({ params }) {
  const { code } = use(params);
  return <MeetRoom initialJoinCode={code} />;
}
