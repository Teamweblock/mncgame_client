
import { useRTCClient, useLocalCameraTrack, useLocalMicrophoneTrack } from 'agora-rtc-react';

const appId = "2ed35a3d7f4e4706b876de17a0688871";
const token = "007eJxTYDihdfPv8dyrVR2ZIWeOSrooF+We0pqySeLUuQuWbPs3m2goMBilphibJhqnmKeZpJqYG5glWZibpaQamicamFlYWJgbNu3bmNYQyMjwmjOCiZEBAkF8ToayzJTU/OTEnBwGBgBCfSIC";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = () => useRTCClient(config);
export const useMicrophoneAndCameraTracks = () => {
  const [microphoneTrack] = useLocalMicrophoneTrack();
  const [cameraTrack] = useLocalCameraTrack();
  return [microphoneTrack, cameraTrack];
};
export const channelName = "videocall";
