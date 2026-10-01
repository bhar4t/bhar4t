import React from "react";

const DayNight = ({ nightMode }) => (
  <svg
    height="32px"
    width="32px"
    fill={nightMode ? "#ffffff" : '#000000'}
    viewBox="-12 0 480 480"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m114.34375 117.65625c3.140625 3.03125 8.128906 2.988281 11.214844-.097656 3.085937-3.085938 3.128906-8.074219.097656-11.214844l-48-48c-3.140625-3.03125-8.128906-2.988281-11.214844.097656-3.085937 3.085938-3.128906 8.074219-.097656 11.214844zm0 0" />
    <path d="m72 248c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8h-64c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8zm0 0" />
    <path d="m114.34375 362.34375-48 48c-2.078125 2.007812-2.914062 4.984375-2.179688 7.78125.730469 2.796875 2.914063 4.980469 5.710938 5.710938 2.796875.734374 5.773438-.101563 7.78125-2.179688l48-48c3.03125-3.140625 2.988281-8.128906-.097656-11.214844-3.085938-3.085937-8.074219-3.128906-11.214844-.097656zm0 0" />
    <path d="m232 374.976562v-269.953124c-68.429688 8.074218-119.988281 66.074218-119.988281 134.976562s51.558593 126.902344 119.988281 134.976562zm0 0" />
    <path d="m432 306.59375c-12.027344 4.140625-24.6875 6.15625-37.40625 5.957031-61.351562-.703125-110.558594-50.929687-110-112.277343.410156-38.417969 19.6875-74.175782 51.558594-95.632813-6.542969-.519531-13.128906-.640625-19.296875-.640625-24.351563.007812-48.210938 6.863281-68.855469 19.777344v232.445312c30.652344 19.175782 67.902344 24.726563 102.8125 15.316406 34.910156-9.414062 64.324219-32.933593 81.1875-64.914062zm0 0" />
    <path d="m455.398438 178.222656-17.773438-2.71875c-2.636719-.402344-4.898438-2.089844-6.03125-4.503906l-7.59375-16.167969-7.59375 16.167969c-1.132812 2.414062-3.394531 4.101562-6.03125 4.503906l-17.773438 2.71875 13.125 13.457032c1.773438 1.816406 2.578126 4.367187 2.167969 6.871093l-3.015625 18.480469 15.257813-8.429688c2.40625-1.328124 5.320312-1.328124 7.726562 0l15.257813 8.429688-3.015625-18.480469c-.410157-2.503906.394531-5.054687 2.167969-6.871093zm0 0" />
    <path d="m240 480c4.417969 0 8-3.582031 8-8v-80c-5.34375-.007812-10.683594-.292969-16-.855469v80.855469c0 4.417969 3.582031 8 8 8zm0 0" />
    <path d="m248 8c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v80.855469c5.316406-.5625 10.65625-.847657 16-.855469zm0 0" />
  </svg>
);

export { DayNight };

// Shared outline style for the /meet call controls so every icon reads as one set.
const strokeProps = (color, strokeWidth) => ({
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

const CreateMeetIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, 2)}>
    <rect x="3" y="6" width="12" height="12" rx="2" />
    <polygon points="17 9 21 6.5 21 17.5 17 15" />
  </svg>
);

const JoinMeetIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, 2)}>
    <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
    <polyline points="13 8 17 12 13 16" />
    <line x1="17" y1="12" x2="7" y2="12" />
  </svg>
);

const ShareIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, 2)}>
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <line x1="8.2" y1="10.7" x2="15.8" y2="6.3" />
    <line x1="8.2" y1="13.3" x2="15.8" y2="17.7" />
  </svg>
);

const MicIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, 2)}>
    <rect x="9" y="2" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="8" y1="22" x2="16" y2="22" />
  </svg>
);

const MicOffIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, 2)}>
    <rect x="9" y="2" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="8" y1="22" x2="16" y2="22" />
    <line x1="3" y1="3" x2="21" y2="21" />
  </svg>
);

const CameraSwitchIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, 2)}>
    <rect x="2" y="7" width="15" height="11" rx="2" />
    <circle cx="9.5" cy="12.5" r="3" />
    <path d="M18 8a4 4 0 0 0-4-4" />
    <polyline points="14 1 14 4 17 4" />
    <path d="M20 13a4 4 0 0 1-4 4" />
    <polyline points="20 10 20 13 17 13" />
  </svg>
);

const CameraIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, 2)}>
    <rect x="2" y="6" width="14" height="12" rx="2" />
    <polygon points="22 8 16 12 22 16" />
  </svg>
);

const CameraOffIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, 2)}>
    <rect x="2" y="6" width="14" height="12" rx="2" />
    <polygon points="22 8 16 12 22 16" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const MoveIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...strokeProps(color, 2)}>
    <polyline points="5 9 2 12 5 15" />
    <polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" />
    <polyline points="19 9 22 12 19 15" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

const HangupIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
      transform="rotate(135 12 12)"
    />
  </svg>
);

const MoreIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <circle cx="5" cy="12" r="2.2" />
    <circle cx="12" cy="12" r="2.2" />
    <circle cx="19" cy="12" r="2.2" />
  </svg>
);

export {
  CreateMeetIcon,
  JoinMeetIcon,
  ShareIcon,
  MicIcon,
  MicOffIcon,
  CameraSwitchIcon,
  CameraIcon,
  CameraOffIcon,
  MoveIcon,
  HangupIcon,
  MoreIcon,
};


