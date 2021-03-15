var stream;
var recorder;
var counter = 0;
var userUUID;
var startRecordingUTCtime;
import { uploadFile } from "./bucket";

export const requestVideo = () => {
    userUUID = createGuid();
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false,
        })
        .then((stm) => {
            stream = stm;
            startRecording();
        })
        .catch((e) => console.error(e));
};

export const startRecording = () => {
    startRecordingUTCtime = new Date().toISOString();
    recorder = new MediaRecorder(stream);
    recorder.start();
    setTimeout(() => {
        stopRecording();
    }, 15000);
};

export const stopRecording = () => {
    recorder.ondataavailable = (e) => {
        let fileName = userUUID + "/" + counter + ".webm";
        uploadFile(fileName, e.data);
        counter = counter + 1;
    };

    recorder.stop();
    startRecording();
};

export const createGuid = () => {
    let S4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    let guid = `${S4()}${S4()}${S4()}${S4()}-${S4()}${S4()}${S4()}${S4()}-${S4()}${S4()}${S4()}${S4()}-${S4()}${S4()}${S4()}${S4()}-${S4()}${S4()}${S4()}${S4()}-${S4()}${S4()}${S4()}${S4()}`;
    return guid.toLowerCase();
};
