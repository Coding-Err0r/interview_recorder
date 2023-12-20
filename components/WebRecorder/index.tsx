"use client";
import { useEffect, useState } from "react";
import { useRecordWebcam } from "react-record-webcam";

const OPTIONS: any = {
  fileName: "test-filename",
  mimeType: "video/x-matroska;codecs=avc1",
  fileType: "mp4",
  width: 1920,
  height: 1080,
  disableLogs: true,
};
const WebRecorder = () => {
  const {
    activeRecordings,
    cancelRecording,
    clearPreview,
    closeCamera,
    createRecording,
    devicesByType,
    devicesById,
    download,
    muteRecording,
    openCamera,
    pauseRecording,
    resumeRecording,
    startRecording,
    stopRecording,
    applyRecordingOptions,
  } = useRecordWebcam();

  const [videoDeviceId, setVideoDeviceId] = useState<string>("");
  const [audioDeviceId, setAudioDeviceId] = useState<string>("");

  const handleSelect = async (event: any) => {
    const { deviceid: deviceId } =
      event.target.options[event.target.selectedIndex].dataset;
    if (devicesById[deviceId].type === "videoinput") {
      setVideoDeviceId(deviceId);
    }
    if (devicesById[deviceId].type === "audioinput") {
      setAudioDeviceId(deviceId);
    }
  };

  const start = async () => {
    const recording = await createRecording(videoDeviceId, audioDeviceId);
    if (recording) {
      await openCamera(recording.id);
      applyRecordingOptions(recording.id, OPTIONS);
    }
  };

  return (
    <div className=" h-full w-full text-gray-800 flex flex-col items-center gap-6">
      <div className="flex gap-6 justify-center">
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-bold">Select video input</h4>
          <select
            className="bg-cyan-500/20 px-4 py-2 rounded-lg"
            onChange={handleSelect}
          >
            {devicesByType?.video?.map((device) => (
              <option key={device.deviceId} data-deviceid={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-bold">Select audio input</h4>
          <select
            className="bg-blue-500/20 px-4 py-2 rounded-lg"
            onChange={handleSelect}
          >
            {devicesByType?.audio?.map((device) => (
              <option key={device.deviceId} data-deviceid={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={start} className="bg-emerald-400 p-4 rounded-3xl">
        Open camera
      </button>

      <div className="w-2/3 h-full p-8 ">
        {activeRecordings?.map((recording: any) => (
          <div className="flex flex-col gap-2" key={recording.id}>
            <p className="font-bold text-2xl">
              <strong className="text-green-500">✦ </strong>Live
            </p>
            <div className="flex gap-6 ">
              <small>
                <strong className="text-green-500">Status : </strong>{" "}
                {recording.status}
              </small>
              <small>
                <strong className="text-red-500">Video : </strong>{" "}
                {recording.videoLabel}
              </small>
              <small>
                <strong className="text-blue-500">Audio : </strong>{" "}
                {recording.audioLabel}
              </small>
            </div>
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <video
                ref={recording.webcamRef}
                loop
                autoPlay
                playsInline
                className="w-full h-full"
              />
            </div>
            <div className="flex gap-4 justify-center">
              <button
                className={`${
                  recording.status === "RECORDING"
                    ? "hidden"
                    : "bg-gray-300 p-2 rounded-md block"
                }`}
                disabled={
                  recording.status === "RECORDING" ||
                  recording.status === "PAUSED"
                }
                onClick={() => startRecording(recording.id)}
              >
                <strong className="text-red-500">☉ </strong>
                Record
              </button>
              <button
                className="bg-gray-300 p-2 rounded-md"
                disabled={
                  recording.status !== "RECORDING" &&
                  recording.status !== "PAUSED"
                }
                onClick={() =>
                  recording.status === "PAUSED"
                    ? resumeRecording(recording.id)
                    : pauseRecording(recording.id)
                }
              >
                {recording.status === "PAUSED" ? (
                  <strong className="text-green-500">▶︎ </strong>
                ) : (
                  <strong className="text-orange-400">⌽ </strong>
                )}
                {recording.status === "PAUSED" ? "Resume" : "Pause"}
              </button>
              <button
                className={
                  recording.isMuted
                    ? "bg-gray-300 p-2 rounded-md"
                    : "text-gray-500 line-through bg-gray-300 p-2 rounded-md"
                }
                onClick={() => muteRecording(recording.id)}
              >
                Mute
              </button>
              <button
                className="bg-gray-300 p-2 rounded-md"
                disabled={recording.status !== "RECORDING"}
                onClick={() => stopRecording(recording.id)}
              >
                <strong className="text-yellow-400">◼ </strong>
                Stop
              </button>
              <button
                onClick={() => cancelRecording(recording.id)}
                className="bg-red-500 p-2 rounded-md text-white"
              >
                Cancel
              </button>
            </div>
            {recording.status === "STOPPED" && (
              <div className="w-full h-full flex flex-col gap-4 mt-4 justify-center">
                <p className="font-bold text-2xl">
                  <strong className="text-blue-500">◉ </strong>Preview
                </p>
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <video ref={recording.previewRef} autoPlay loop playsInline />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => download(recording.id)}
                    className="bg-cyan-500 p-2 rounded-md text-white"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => clearPreview(recording.id)}
                    className="bg-red-500 p-2 rounded-md text-white"
                  >
                    Clear preview
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebRecorder;
