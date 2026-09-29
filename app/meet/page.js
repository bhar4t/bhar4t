"use client";

import React from "react";
import { useMutation, useQuery, useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";

const styles = {
  layer: {
    background: 'linear-gradient(328deg, rgba(0,0,0,1) 81%, rgba(0,77,93,1) 100%)',
    objectFit: 'contain',
  },
  video: {
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  localVideo: {
    height: 130,
    width: 'auto',
    borderRadius: '0px 0px 20px 20px',
  },
  container: { height: '100%', width: '100%', backgroundColor: 'gray', borderRadius: 20, position: 'relative' },
  pip: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    borderRadius: 20,
    overflow: 'hidden',
    cursor: 'move',
  },
  pipHeader: {
    textAlign: 'center',
    fontSize: 12,
    color: 'white',
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '20px 20px 0px 0px',
  },
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

export default function Meet() {
  const localVideo = React.useRef();
  const remoteVideo = React.useRef();
  const peerConnectionRef = React.useRef(null);
  const localStreamRef = React.useRef(null);
  const remoteStreamRef = React.useRef(null);
  const appliedCandidateIds = React.useRef(new Set());

  const [roomId, setRoomId] = React.useState(null);
  const [joinCode, setJoinCode] = React.useState(null);
  const [role, setRole] = React.useState(null); // "caller" | "callee"
  const [mediaReady, setMediaReady] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [mediaError, setMediaError] = React.useState(null);

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

  async function createRoom() {
    console.log("async function createRoom()", 0);
    setBusy(true);
    appliedCandidateIds.current = new Set();

    const { roomId: newRoomId, joinCode: newJoinCode } = await createRoomMutation({});
    console.log(newRoomId);
    setRole("caller");
    setRoomId(newRoomId);
    setJoinCode(newJoinCode);

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
      // Listening for remote ICE candidates above
    } else {
      alert("Room not found");
      setBusy(false);
    }
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

  async function hangUp(e) {
    console.log("async function hangup()", 0);
    localStreamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    localVideo.current.srcObject = null;
    remoteVideo.current.srcObject = null;

    // Delete room on hangup
    if (roomId) {
      await deleteRoomMutation({ roomId });
    }

    document.location.reload(true);
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

  React.useEffect(() => {
    dragElement(document.getElementById("mydiv"));

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // pip starts anchored via top/right; left+right both set with no drag
        // yet would over-constrain the box (it resizes instead of moving), so
        // pin down its current position as explicit top/left before dragging.
        elmnt.style.top = elmnt.offsetTop + "px";
        elmnt.style.left = elmnt.offsetLeft + "px";
        elmnt.style.right = "auto";
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  }, [])

  return (
    <>
      <div id='main' style={{ backgroundColor: 'rgb(24 80 97)', height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <div style={styles.container} >
          <div id="mydiv" style={styles.pip}>
            <div id="mydivheader" style={styles.pipHeader}>move</div>
            <video
              style={{ ...styles.localVideo, ...styles.layer }}
              ref={localVideo}
              id="localVideo"
              muted
              autoPlay
              playsInline
            ></video>
          </div>
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', objectFit: 'cover' }}>
            <video style={{ ...styles.video, ...styles.layer }} ref={remoteVideo} id="remoteVideo" autoPlay playsInline></video>
          </div>
        </div>
      </div>
      <div id="buttons" style={{
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: '100vw',
        background: 'rgba( 255, 255, 255, 0.05 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 2.0px )',
        WebkitBackdropFilter: 'blur( 2.0px )',
        borderRadius: '10px 10px 0px 0px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )'
      }}>
        <button id="createBtn" onClick={createRoom} disabled={!mediaReady || busy}>
          Create Meet
        </button>
        <button id="joinBtn" onClick={joinRoom} disabled={!mediaReady || busy}>
          Join Meet
        </button>
        <button id="hangupBtn" onClick={hangUp} disabled={!mediaReady}>
          Hangup
        </button>
        <div id="currentRoom">{joinCode ? `room code: ${joinCode}` : ""}</div>
      </div>
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
