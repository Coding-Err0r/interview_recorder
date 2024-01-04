"use client";
import { useTimerStore } from "@/utils/store";
import Timer from "../Timer";
import { useRecordWebcam } from "react-record-webcam";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { User } from "lucide-react";
import Questions from "../Questions";

const SECRET_PASS = "xfosoft";

const Interview = () => {
  const id = useTimerStore((state) => state.id);
  const _start = useTimerStore((state) => state.start);
  const setStart = useTimerStore((state) => state.setStart);
  const setIsRunning = useTimerStore((state) => state.setIsRunning);
  const isRunning = useTimerStore((state) => state.isRunning);
  const setId = useTimerStore((state) => state.setId);
  const [recordingId, setRecordingId] = useState<any>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullname, setFullname] = useState<any>("");

  const [encrptedData, setEncrptedData] = useState(""); // Encrypted data
  const [decrptedData, setDecrptedData] = useState(""); // Decrypted data

  const time = new Date();
  time.setSeconds(time.getSeconds() + 30);

  const notify = () => toast(`Welcome ${fullname}`);
  // ================= Web Recorder Imports ==========================
  const OPTIONS: any = {
    fileName: String(fullname),
    mimeType: "video/x-matroska;codecs=avc1",
    fileType: "mp4",
    width: 1920,
    height: 1080,
    disableLogs: true,
  };
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
  // ================= Web Recorder Imports ==========================
  useEffect(() => {
    console.log(recordingId);
    if (isRunning === false && id.length > 5) {
      handleDownload();
    }
  }, [isRunning]);

  const handleDownload = () => {
    stopRecording(recordingId)
      .then(() =>
        setTimeout(() => {
          setIsComplete(true);
        }, 500)
      )
      .then(async () => await download(recordingId))
      .finally(async () =>
        toast.success("Interview was successfully recorded.")
      );
  };

  const handleSubmit = () => {
    setOpen(false);
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(fullname),
      SECRET_PASS
    ).toString();
    setEncrptedData(data);
    notify();
  };

  const decryptData = () => {
    const bytes = CryptoJS.AES.decrypt(fullname, SECRET_PASS);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setDecrptedData(data);
  };

  return (
    <div className="grid w-full h-full grid-cols-3 gap-4">
      <div className="flex flex-col items-center w-full h-full col-span-2 gap-6 py-6 text-gray-800 ">
        <div className="flex gap-2 text-2xl">
          <User />
          <p className="font-bold">User : </p>
          <h1> {fullname}</h1>
        </div>
        <div className="flex justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-bold">Select video input</h4>
            <select
              className="px-4 py-2 rounded-lg bg-cyan-500/20"
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
              className="px-4 py-2 rounded-lg bg-blue-500/20"
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

        <button onClick={start} className="p-4 bg-emerald-400 rounded-3xl">
          Open camera
        </button>

        <div className="w-full h-full p-12 ">
          {activeRecordings?.map((recording: any) => (
            <div
              className="flex flex-col items-center gap-2"
              key={recording.id}
            >
              <p className="text-2xl font-bold">
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
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <video
                  ref={recording.webcamRef}
                  loop
                  autoPlay
                  playsInline
                  className="w-full h-full"
                />
              </div>
              {_start === true ? <Timer expiryTimestamp={time} /> : null}
              <button
                className={`${
                  recording.status === "RECORDING"
                    ? "hidden"
                    : "bg-gray-300 p-2 rounded-md block w-fit"
                }`}
                disabled={
                  recording.status === "RECORDING" ||
                  recording.status === "PAUSED"
                }
                onClick={() => {
                  startRecording(recording.id);
                  setStart(true);
                  setIsRunning(true);
                  setRecordingId(recording.id);
                  setId(encrptedData);
                }}
              >
                <strong className="text-red-500">☉ </strong>
                Record
              </button>

              <div className="flex flex-col items-center justify-center w-full h-full gap-4 mt-4">
                <p className="text-2xl font-bold">
                  <strong className="text-blue-500">◉ </strong>Preview
                </p>
                <div className="w-full h-full overflow-hidden rounded-2xl">
                  <video ref={recording.previewRef} autoPlay loop playsInline />
                </div>
                <button
                  className="block p-2 text-white bg-red-500 rounded-md w-fit"
                  onClick={() => clearPreview(recordingId)}
                >
                  Clear Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-full gap-6 bg-slate-100">
        {/* {encrptedData.length > 5 && <Questions />} */}
        <Questions />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Please Enter Your Fullname</DialogTitle>
            <DialogDescription>
              <Input
                className="w-full my-4 border-2 border-gray-300"
                placeholder="Username"
                onChange={(e) => setFullname(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSubmit}>
                Enter Room
              </Button>
            </DialogClose>
          </DialogFooter>{" "}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Interview;
