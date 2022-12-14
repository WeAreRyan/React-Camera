import "./Camera.css";
import { useRef, useEffect, useState } from "react";

export default function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1920, height: 1080 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16/9)
    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  }

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');
    setHasPhoto(false);
    ctx.clearRect(0, 0, photo.width, photo.height)
  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <>
      <h1> Camera Component</h1>
      <div className="cameracomp">
        <div className="camera">
          <video className="videofeed" ref={videoRef}></video>
          <button className="camerabtn" onClick={takePhoto}>CAPTURE!</button>
        </div>

        <div className={"result " + (hasPhoto ? "hasPhoto" : "")}>
          <canvas className="picture" ref={photoRef}></canvas>
          <button className="camerabtn" onClick={closePhoto}>CLOSE!</button>
        </div>
      </div>
    </>
  );
}
