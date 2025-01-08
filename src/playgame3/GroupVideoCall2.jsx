import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len) {
  let result = "";
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars?.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function GroupVideoCall2() {
  const location = useLocation();
  const params = getUrlParams(location.search);
  const roomID = params.get("roomID") || randomID(5);

  const cfoId = params.get("cfoId"); // Get CFO ID from URL parameters

  const members = [
    { name: "Member1", id: randomID(5) },
    { name: "Member2", id: randomID(5) },
    { name: "Member3", id: randomID(5) },
  ];

  useEffect(() => {
    const myMeeting = async (element) => {
      // generate Kit Token
      const appID = 403888583;
      const serverSecret = "fe9cc5a6395c29785021cec635e661ca";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5),
        randomID(5)
      );

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Generate tokens for members
      const memberLinks = members.map((member) => ({
        name: member.name,
        url:
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?roomID=" +
          roomID +
          "&memberID=" +
          member.id,
      }));

      // Define the CFO shared link
      const cfoSharedLink = {
        name: "CFO Meeting Link",
        url:
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?roomID=" +
          roomID +
          "&cfoId=" +
          cfoId,
      };

      // Define an additional shared link
      const additionalSharedLink = {
        name: "Additional Meeting Link",
        url:
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?roomID=" +
          roomID +
          "&date=" +
          new Date().toISOString().slice(0, 10),
      };

      zp.joinRoom({
        container: element,
        sharedLinks: [cfoSharedLink, ...memberLinks, additionalSharedLink],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
    };

    const container = document.querySelector(".myCallContainer");
    if (container) {
      myMeeting(container);
    }
  }, [roomID, cfoId, members]);

  return (
    <div
      className="myCallContainer"
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
