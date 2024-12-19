import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  type: "canvas",
  shape: "square",
  width: 500,
  height: 500,
  data: "https://asianlink.ai",
  margin: 10,
  qrOptions: {
    typeNumber: "0",
    mode: "Byte",
    errorCorrectionLevel: "Q",
  },
  imageOptions: {
    saveAsBlob: true,
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
  },
  dotsOptions: {
    type: "square",
    color: "#000000",
    roundSize: true,
  },
  backgroundOptions: {
    round: 0,
    color: "#ffffff",
    gradient: null,
  },
  image: "/qr.png",
  cornersSquareOptions: {
    type: "square",
    color: "#000000",
  },
  cornersDotOptions: {
    type: "square",
    color: "#000000",
  },
});

export default function App() {
  const [url, setUrl] = useState("https://asianlink.ai");
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);

  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };

  return (
    <div className="App flex flex-col bg-white">
      <div className="mt-[20px] flex justify-between w-full">
        <input value={url} onChange={onUrlChange} className="grow-1 mr-20" />
        <select onChange={onExtensionChange} value={fileExt}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        <button onClick={onDownloadClick}>Download</button>
      </div>
      <div ref={ref} />
      <div className="bg-blue-500 text-white p-4">
        This should have a blue background, white text, and padding.
      </div>
    </div>
  );
}
