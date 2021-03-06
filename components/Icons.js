import React from "react";

const DayNight = ({ nightMode }) => (
  <svg
    height="32px"
    width="32px"
    fill={nightMode ? "white" : "black"}
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