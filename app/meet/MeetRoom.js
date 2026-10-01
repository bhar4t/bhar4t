"use client";

import React from "react";
import { useMutation, useQuery, useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  CreateMeetIcon,
  JoinMeetIcon,
  ShareIcon,
  MicIcon,
  MicOffIcon,
  CameraSwitchIcon,
  CameraIcon,
  CameraOffIcon,
  MoveIcon,
  FullscreenIcon,
  FullscreenExitIcon,
  HangupIcon,
  MoreIcon,
} from "../../components/Icons";

const styles = {
  layer: {
    objectFit: 'contain',
  },
  video: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  localVideo: {
    height: 130,
    width: 'auto',
    borderRadius: 10,
    background: 'black',
    touchAction: 'none',
  },
  container: { height: '100%', width: '100%', backgroundColor: 'gray', borderRadius: 20, position: 'relative' },
  pip: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    overflow: 'hidden',
    cursor: 'move',
  },
  pipVideoOffOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.6)',
    borderRadius: '0px 0px 20px 20px',
  },
  iconButton: {
    width: 56,
    height: 56,
    margin: '0 8px',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(255,255,255,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  iconButtonDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  iconButtonActive: {
    background: 'rgba(255,255,255,0.35)',
  },
  hangupButton: {
    background: '#e53935',
  },
  menuWrapper: {
    position: 'relative',
    display: 'inline-flex',
  },
  menuOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 15,
  },
  menu: {
    position: 'absolute',
    bottom: 70,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(30,30,30,0.95)',
    borderRadius: 12,
    padding: 8,
    minWidth: 190,
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 8,
    border: 'none',
    background: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    fontSize: 14,
    width: '100%',
    textAlign: 'left',
  },
  menuItemDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
}

function iconButtonStyle(disabled, extra) {
  return { ...styles.iconButton, ...(disabled ? styles.iconButtonDisabled : {}), ...extra };
}

// STUN alone can't traverse symmetric NAT/CGNAT (common on mobile networks) — fetch
// short-lived TURN relay credentials from Metered instead of embedding a static one.
async function getIceServers() {
  const apiUrl = process.env.NEXT_PUBLIC_TURN_CREDENTIALS_URL;
  const apiKey = process.env.NEXT_PUBLIC_TURN_API_KEY;
  if (!apiUrl || !apiKey) return [];

  try {
    const response = await fetch(`${apiUrl}?apiKey=${apiKey}`);
    if (!response.ok) throw new Error(`Metered credentials request failed: ${response.status}`);
    const iceServers = await response.json();
    return iceServers;
  } catch (err) {
    console.error("Failed to fetch TURN credentials:", err);
    return [];
  }
}

function buildRoomShareUrl(joinCode) {
  const base = process.env.NEXT_PUBLIC_MEET_BASE_URL || `${window.location.origin}/meet`;
  return `${base.replace(/\/$/, "")}/${joinCode}`;
}

// Swaps the address bar to /meet/{code} so it's copyable, without a real
// navigation (which would unmount this component and tear down the call).
function updateUrlForJoinCode(code) {
  const path = `/meet/${code}`;
  if (window.location.pathname !== path) {
    window.history.replaceState(null, "", path);
  }
}

export default function MeetRoom({ initialJoinCode } = {}) {
  const localVideo = React.useRef();
  const remoteVideo = React.useRef();
  const peerConnectionRef = React.useRef(null);
  const localStreamRef = React.useRef(null);
  const remoteStreamRef = React.useRef(null);
  const appliedCandidateIds = React.useRef(new Set());
  const autoJoinAttempted = React.useRef(false);
  const cleanedUpRef = React.useRef(false); // guards against double-releasing tracks/connection
  const roomIdRef = React.useRef(null); // mirrors roomId for the unmount-cleanup closure below
  const roomDeletedRef = React.useRef(false); // guards against double-deleting the signaling room

  const [roomId, setRoomId] = React.useState(null);
  const [joinCode, setJoinCode] = React.useState(null);
  const [role, setRole] = React.useState(null); // "caller" | "callee"
  const [mediaReady, setMediaReady] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [mediaError, setMediaError] = React.useState(null);
  const [muted, setMuted] = React.useState(false);
  const [videoOff, setVideoOff] = React.useState(false);
  const [facingMode, setFacingMode] = React.useState("user");
  const [switchingCamera, setSwitchingCamera] = React.useState(false);
  const [shareFeedback, setShareFeedback] = React.useState("");
  const [openMenu, setOpenMenu] = React.useState(null); // "start" | "more" | null
  const [remoteOrientation, setRemoteOrientation] = React.useState("landscape"); // "portrait" | "landscape"
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const convex = useConvex();
  const createRoomMutation = useMutation(api.rooms.createRoom);
  const setOfferMutation = useMutation(api.rooms.setOffer);
  const setAnswerMutation = useMutation(api.rooms.setAnswer);
  const addCallerCandidateMutation = useMutation(api.rooms.addCallerCandidate);
  const addCalleeCandidateMutation = useMutation(api.rooms.addCalleeCandidate);
  const deleteRoomMutation = useMutation(api.rooms.deleteRoom);

  const room = useQuery(api.rooms.getRoom, roomId ? { roomId } : "skip");
  // Caller watches the callee's candidates, callee watches the caller's candidates.
  const calleeCandidates = useQuery(
    api.rooms.listCalleeCandidates,
    roomId && role === "caller" ? { roomId } : "skip"
  );
  const callerCandidates = useQuery(
    api.rooms.listCallerCandidates,
    roomId && role === "callee" ? { roomId } : "skip"
  );

  React.useEffect(() => {
    openUserMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    roomIdRef.current = roomId;
  }, [roomId]);

  // Releases the camera/mic, peer connection and signaling room even if the user
  // leaves via the browser back/forward button or any other route change instead
  // of clicking Hang Up (which already does this explicitly before navigating).
  React.useEffect(() => {
    return () => {
      releaseCallResources();
      if (roomIdRef.current && !roomDeletedRef.current) {
        roomDeletedRef.current = true;
        deleteRoomMutation({ roomId: roomIdRef.current }).catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keeps the icon in sync when fullscreen is exited some other way (Esc key, browser UI).
  React.useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Deep link (/meet/{code}): join automatically once media permissions are granted.
  React.useEffect(() => {
    if (initialJoinCode && mediaReady && !roomId && !autoJoinAttempted.current) {
      autoJoinAttempted.current = true;
      setBusy(true);
      joinRoomById(initialJoinCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialJoinCode, mediaReady]);

  // Caller: apply the answer once the callee has set it on the room.
  React.useEffect(() => {
    const pc = peerConnectionRef.current;
    if (role === "caller" && pc && room?.answer && !pc.currentRemoteDescription) {
      console.log("Got remote description: ", room.answer);
      pc.setRemoteDescription(new RTCSessionDescription(room.answer));
    }
  }, [role, room]);

  React.useEffect(() => {
    applyRemoteCandidates(calleeCandidates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calleeCandidates]);

  React.useEffect(() => {
    applyRemoteCandidates(callerCandidates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callerCandidates]);

  function applyRemoteCandidates(candidates) {
    const pc = peerConnectionRef.current;
    if (!pc || !candidates) return;
    candidates.forEach((doc) => {
      if (!appliedCandidateIds.current.has(doc._id)) {
        appliedCandidateIds.current.add(doc._id);
        console.log(`Got new remote ICE candidate: ${JSON.stringify(doc.candidate)}`);
        pc.addIceCandidate(new RTCIceCandidate(doc.candidate));
      }
    });
  }

  function toggleMenu(name) {
    setOpenMenu((prev) => (prev === name ? null : name));
  }

  function selectStartOption(action) {
    setOpenMenu(null);
    if (action === "create") createRoom();
    else joinRoom();
  }

  function selectMoreOption(action) {
    setOpenMenu(null);
    if (action === "share" && joinCode) shareRoomLink();
    else if (action === "switchCamera" && mediaReady && !switchingCamera) switchCamera();
    else if (action === "fullscreen") toggleFullscreen();
  }

  // Fullscreens the whole page rather than just #main - the controls bar is a
  // sibling element, not a child, so it would be hidden if only #main went fullscreen.
  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Failed to toggle fullscreen:", err);
    }
  }

  async function createRoom() {
    console.log("async function createRoom()", 0);
    setBusy(true);
    appliedCandidateIds.current = new Set();

    const { roomId: newRoomId, joinCode: newJoinCode } = await createRoomMutation({});
    console.log(newRoomId);
    setRole("caller");
    setRoomId(newRoomId);
    setJoinCode(newJoinCode);
    updateUrlForJoinCode(newJoinCode);

    const iceServers = await getIceServers();
    console.log("Create PeerConnection with iceServers: ", iceServers);
    const pc = new RTCPeerConnection({ iceServers, iceCandidatePoolSize: 10 });
    peerConnectionRef.current = pc;

    registerPeerConnectionListeners(pc);

    localStreamRef.current.getTracks().forEach((track) => {
      pc.addTrack(track, localStreamRef.current);
    });

    // Code for collecting ICE candidates below
    pc.addEventListener("icecandidate", (event) => {
      if (!event.candidate) {
        console.log("Got final candidate!");
        return;
      }
      console.log("Got candidate: ", event.candidate);
      addCallerCandidateMutation({ roomId: newRoomId, candidate: event.candidate.toJSON() });
    });
    // Code for collecting ICE candidates above

    // Code for creating a room below
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    console.log("Created offer:", offer);

    await setOfferMutation({
      roomId: newRoomId,
      offer: { type: offer.type, sdp: offer.sdp },
    });
    console.log(`New room created with SDP offer. Room ID: ${newRoomId} - You are the caller!`);
    // Code for creating a room above

    pc.addEventListener("track", (event) => {
      console.log("Got remote track:", event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        console.log("Add a track to the remoteStream:", track);
        remoteStreamRef.current.addTrack(track);
      });
    });

    shareRoomLink(newJoinCode);
  }

  function joinRoom() {
    setBusy(true);
    const code = prompt("Please Enter Room Code", "");
    if (code) {
      joinRoomById(code);
    } else {
      setBusy(false);
    }
  }

  async function joinRoomById(code) {
    const existingRoom = await convex.query(api.rooms.getRoomByJoinCode, { joinCode: code });
    console.log("Got room:", !!existingRoom);

    if (existingRoom) {
      const id = existingRoom._id;
      appliedCandidateIds.current = new Set();

      const iceServers = await getIceServers();
      console.log("Create PeerConnection with iceServers: ", iceServers);
      const pc = new RTCPeerConnection({ iceServers, iceCandidatePoolSize: 10 });
      peerConnectionRef.current = pc;
      registerPeerConnectionListeners(pc);
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current);
      });

      // Code for collecting ICE candidates below
      pc.addEventListener("icecandidate", (event) => {
        if (!event.candidate) {
          console.log("Got final candidate!");
          return;
        }
        console.log("Got candidate: ", event.candidate);
        addCalleeCandidateMutation({ roomId: id, candidate: event.candidate.toJSON() });
      });
      // Code for collecting ICE candidates above

      pc.addEventListener("track", (event) => {
        console.log("Got remote track:", event.streams[0]);
        event.streams[0].getTracks().forEach((track) => {
          console.log("Add a track to the remoteStream:", track);
          remoteStreamRef.current.addTrack(track);
        });
      });

      // Code for creating SDP answer below
      const offer = existingRoom.offer;
      console.log("Got offer:", offer);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      console.log("Created answer:", answer);
      await pc.setLocalDescription(answer);

      await setAnswerMutation({
        roomId: id,
        answer: { type: answer.type, sdp: answer.sdp },
      });
      // Code for creating SDP answer above

      setRole("callee");
      setRoomId(id);
      setJoinCode(code);
      updateUrlForJoinCode(code);
      // Listening for remote ICE candidates above
    } else {
      alert("Room not found");
    }
    setBusy(false);
  }

  async function openUserMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideo.current.srcObject = stream;
      localStreamRef.current = stream;
      remoteStreamRef.current = new MediaStream();
      remoteVideo.current.srcObject = remoteStreamRef.current;
      console.log("Stream:", localVideo.current.srcObject);
      setMediaReady(true);
    } catch (err) {
      console.error("Failed to access camera/microphone:", err);
      setMediaError(
        err.name === "NotAllowedError"
          ? "Camera/microphone access was denied. Please allow permissions and reload the page."
          : "Could not access camera/microphone. Please check your device and browser settings."
      );
    }
  }

  function toggleMute() {
    const stream = localStreamRef.current;
    if (!stream) return;
    const nextMuted = !muted;
    stream.getAudioTracks().forEach((track) => {
      track.enabled = !nextMuted;
    });
    setMuted(nextMuted);
  }

  // Disabling (not stopping) the track keeps the call/audio alive and sends
  // black frames instead, so the peer sees "paused" video without a renegotiation.
  function toggleVideo() {
    const stream = localStreamRef.current;
    if (!stream) return;
    const nextVideoOff = !videoOff;
    stream.getVideoTracks().forEach((track) => {
      track.enabled = !nextVideoOff;
    });
    setVideoOff(nextVideoOff);
  }

  async function switchCamera() {
    if (!localStreamRef.current || switchingCamera) return;
    setSwitchingCamera(true);
    const nextFacingMode = facingMode === "user" ? "environment" : "user";

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: nextFacingMode } },
        audio: false,
      });
      const newVideoTrack = newStream.getVideoTracks()[0];
      const oldVideoTrack = localStreamRef.current.getVideoTracks()[0];
      // New tracks default to enabled - preserve the paused state across the swap.
      newVideoTrack.enabled = !videoOff;

      // Swap the outgoing track so the peer sees the new camera without renegotiating.
      const sender = peerConnectionRef.current
        ?.getSenders()
        .find((s) => s.track?.kind === "video");
      if (sender) {
        await sender.replaceTrack(newVideoTrack);
      }

      oldVideoTrack?.stop();
      localStreamRef.current.removeTrack(oldVideoTrack);
      localStreamRef.current.addTrack(newVideoTrack);
      localVideo.current.srcObject = localStreamRef.current;

      setFacingMode(nextFacingMode);
    } catch (err) {
      console.error("Failed to switch camera:", err);
      setMediaError("Could not switch camera. Your device may not have a front/back camera pair.");
    } finally {
      setSwitchingCamera(false);
    }
  }

  async function shareRoomLink(codeOverride) {
    const code = codeOverride || joinCode;
    if (!code) return;
    const shareUrl = buildRoomShareUrl(code);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareFeedback("Link copied!");
    } catch (err) {
      console.error("Failed to copy room link:", err);
      setShareFeedback("Could not copy link");
    }
    setTimeout(() => setShareFeedback(""), 2500);

    // Clipboard copy above always happens first; the native share sheet is a bonus
    // on devices that support it (mobile browsers), not a replacement for it.
    if (navigator.share) {
      try {
        await navigator.share({ title: "Join my meet", url: shareUrl });
      } catch (err) {
        console.log("Share sheet dismissed or unsupported:", err);
      }
    }
  }

  // Stops local/remote tracks, closes the peer connection and detaches the video
  // elements. Shared by hangUp() and the unmount-cleanup effect; guarded so it's
  // only ever applied once no matter which path triggers it.
  function releaseCallResources() {
    if (cleanedUpRef.current) return;
    cleanedUpRef.current = true;

    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;

    remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
    remoteStreamRef.current = null;

    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;

    if (localVideo.current) localVideo.current.srcObject = null;
    if (remoteVideo.current) remoteVideo.current.srcObject = null;
  }

  async function hangUp() {
    console.log("async function hangup()", 0);
    releaseCallResources();

    // Delete room on hangup
    if (roomId && !roomDeletedRef.current) {
      roomDeletedRef.current = true;
      await deleteRoomMutation({ roomId }).catch((err) => console.error("Failed to delete room:", err));
    }

    document.location.href = "/meet";
  }

  function registerPeerConnectionListeners(pc) {
    pc.addEventListener("icegatheringstatechange", () => {
      console.log(
        `ICE gathering state changed: ${pc.iceGatheringState}`
      );
    });

    pc.addEventListener("connectionstatechange", () => {
      console.log(`Connection state change: ${pc.connectionState}`);
    });

    pc.addEventListener("signalingstatechange", () => {
      console.log(`Signaling state change: ${pc.signalingState}`);
    });

    pc.addEventListener("iceconnectionstatechange", () => {
      console.log(
        `ICE connection state change: ${pc.iceConnectionState}`
      );
    });
  }

  // The remote <video>'s intrinsic videoWidth/videoHeight already reflect the
  // caller's real camera orientation (mobile browsers encode frames pre-rotated
  // to match device orientation), so there's no need to signal it separately -
  // just watch the standard "resize" event, which fires whenever those change
  // (initial metadata load, camera switch, or the remote user rotating their phone).
  React.useEffect(() => {
    const video = remoteVideo.current;
    if (!video) return;

    function handleResize() {
      if (!video.videoWidth || !video.videoHeight) return;
      setRemoteOrientation(video.videoHeight > video.videoWidth ? "portrait" : "landscape");
    }

    video.addEventListener("resize", handleResize);
    return () => video.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    dragElement(document.getElementById("mydiv"));

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      const header = document.getElementById(elmnt.id + "header") || elmnt;
      // The header starts the drag, but its sibling <video> covers most of the
      // PiP's area, so it needs the same handlers or drags starting on it are ignored.
      const video = elmnt.querySelector("video");
      [header, video].filter(Boolean).forEach((el) => {
        el.onmousedown = dragStart;
        el.ontouchstart = dragStart;
      });

      function getPoint(e) {
        const touch = e.touches && e.touches[0];
        return touch ? { x: touch.clientX, y: touch.clientY } : { x: e.clientX, y: e.clientY };
      }

      function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        // pip starts anchored via top/right; left+right both set with no drag
        // yet would over-constrain the box (it resizes instead of moving), so
        // pin down its current position as explicit top/left before dragging.
        elmnt.style.top = elmnt.offsetTop + "px";
        elmnt.style.left = elmnt.offsetLeft + "px";
        elmnt.style.right = "auto";
        // get the pointer position at startup:
        const point = getPoint(e);
        pos3 = point.x;
        pos4 = point.y;
        document.onmouseup = dragEnd;
        document.onmousemove = elementDrag;
        document.ontouchend = dragEnd;
        document.ontouchmove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new pointer position:
        const point = getPoint(e);
        pos1 = pos3 - point.x;
        pos2 = pos4 - point.y;
        pos3 = point.x;
        pos4 = point.y;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function dragEnd() {
        // stop moving when the mouse button/touch is released:
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
      }
    }
  }, [])

  return (
    <>
      <div id='main' style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <div style={styles.container} >
          <div id="mydiv" style={styles.pip}>
            <video
              style={{ ...styles.localVideo, ...styles.layer }}
              ref={localVideo}
              id="localVideo"
              muted
              autoPlay
              playsInline
            ></video>
            {videoOff && (
              <div style={styles.pipVideoOffOverlay}>
                <CameraOffIcon size={20} />
              </div>
            )}
          </div>
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'cover' }}>
            <video
              style={{
                ...styles.video,
                ...styles.layer,
                // Size to the caller's actual orientation instead of always filling
                // a fixed landscape box, so portrait callers aren't letterboxed.
                ...(remoteOrientation === "portrait"
                  ? { width: "auto", height: "100%" }
                  : { width: "100%", height: "auto" }),
              }}
              ref={remoteVideo}
              id="remoteVideo"
              autoPlay
              playsInline
            ></video>
          </div>
        </div>
      </div>
      {/* backdrop-filter on #buttons creates its own containing block for position:fixed
          descendants, so this overlay must live outside it to actually cover the whole screen */}
      {openMenu && (
        <div style={styles.menuOverlay} onClick={() => setOpenMenu(null)} />
      )}
      <div id="buttons" style={{
        position: 'absolute',
        bottom: 0,
        // Explicit z-index needed: backdropFilter makes this its own stacking context,
        // which must outrank the overlay's or the overlay would paint over the menu.
        zIndex: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: '100vw'
      }}>
        {/* Hidden (not just disabled) once a call is joined; reappears after hangup resets roomId */}
        {!roomId && (
          <div style={styles.menuWrapper}>
            {openMenu === "start" && (
              <div style={styles.menu} role="menu">
                <button type="button" style={styles.menuItem} onClick={() => selectStartOption("create")}>
                  <CreateMeetIcon size={20} /> Create Meet
                </button>
                <button type="button" style={styles.menuItem} onClick={() => selectStartOption("join")}>
                  <JoinMeetIcon size={20} /> Join Meet
                </button>
              </div>
            )}
            <button
              id="startBtn"
              onClick={() => toggleMenu("start")}
              disabled={!mediaReady || busy}
              style={iconButtonStyle(!mediaReady || busy)}
              aria-label="Create or join a meet"
              title="Create or join a meet"
            >
              <CreateMeetIcon />
            </button>
          </div>
        )}
        <button
          id="muteBtn"
          onClick={toggleMute}
          disabled={!mediaReady}
          style={iconButtonStyle(!mediaReady, muted ? styles.iconButtonActive : undefined)}
          aria-label={muted ? "Unmute" : "Mute"}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? <MicOffIcon /> : <MicIcon />}
        </button>
        <div style={styles.menuWrapper}>
          {openMenu === "more" && (
            <div style={styles.menu} role="menu">
              <button
                type="button"
                style={{ ...styles.menuItem, ...(!joinCode ? styles.menuItemDisabled : {}) }}
                disabled={!joinCode}
                aria-label="Share"
                onClick={() => selectMoreOption("share")}
              >
                <ShareIcon size={20} /> Share
              </button>
              <button
                type="button"
                style={{ ...styles.menuItem, ...(!mediaReady || switchingCamera ? styles.menuItemDisabled : {}) }}
                disabled={!mediaReady || switchingCamera}
                aria-label="Switch Camera"
                onClick={() => selectMoreOption("switchCamera")}
              >
                <CameraSwitchIcon size={20} /> Switch Camera
              </button>
              <button
                type="button"
                style={styles.menuItem}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                onClick={() => selectMoreOption("fullscreen")}
              >
                {isFullscreen ? <FullscreenExitIcon size={20} /> : <FullscreenIcon size={20} />}
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </button>
              <button
                type="button"
                style={{ ...styles.menuItem, ...(!mediaReady ? styles.menuItemDisabled : {}) }}
                disabled={!mediaReady}
                aria-label={videoOff ? "Turn camera on" : "Turn camera off"}
                onClick={toggleVideo}
              >
                {videoOff ? <CameraOffIcon size={20} /> : <CameraIcon size={20} />}
                {videoOff ? "Turn Camera On" : "Turn Camera Off"}
              </button>
            </div>
          )}
          <button
            id="moreBtn"
            onClick={() => toggleMenu("more")}
            disabled={!mediaReady}
            style={iconButtonStyle(!mediaReady)}
            aria-label="More options"
            title="More options"
          >
            <MoreIcon />
          </button>
        </div>
        <button
          id="hangupBtn"
          onClick={hangUp}
          disabled={!mediaReady}
          style={iconButtonStyle(!mediaReady, styles.hangupButton)}
          aria-label="Hang up"
          title="Hang up"
        >
          <HangupIcon />
        </button>
      </div>
      {shareFeedback && (
        <div style={{
          position: 'absolute',
          bottom: 110,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.75)',
          color: 'white',
          padding: '6px 14px',
          borderRadius: 8,
          fontSize: 13,
        }}>
          {shareFeedback}
        </div>
      )}
      {mediaError && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(178, 34, 34, 0.9)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: 8,
        }}>
          {mediaError}
        </div>
      )}
    </>
  );
}
