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

const generateUniqueLink = (finalURL, campaignId) => {
  console.log();
  return `${import.meta.env.VITE_REACT_APP_BASE_URL}/?finalURL=${finalURL}&campaignID=${campaignId}`;
};
export default function App() {
  const [url, setUrl] = useState("https://asianlink.ai/redirect/download");
  const [fileExt, setFileExt] = useState("png");
  const [shape, setShape] = useState("square");
  const [dotType, setDotType] = useState("square");
  const [dotColor, setDotColor] = useState("#000000");
  const [cornerDotType, setCornerDotType] = useState("square");
  const [cornerDotColor, setCornerDotColor] = useState("#000000");
  const [campaignId, setCampaignId] = useState(1);
  const [finalURL, setFinalURL] = useState(
    "https://asianlink.ai/redirect/download",
  );

  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);
  useEffect(() => {
    setUrl(generateUniqueLink(finalURL, campaignId));
  }, [finalURL, campaignId]);
  useEffect(() => {
    qrCode.update({
      data: url,
      shape: shape,
      dotsOptions: {
        type: dotType,
        color: dotColor,
        roundSize: true,
      },
      cornersDotOptions: {
        type: cornerDotType,
        color: cornerDotColor,
      },
    });
  }, [url, shape, dotType, dotColor, cornerDotType, cornerDotColor]);

  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onShapeChange = (event) => {
    setShape(event.target.value);
  };

  const onDotTypeChange = (event) => {
    setDotType(event.target.value);
  };

  const onDotColorChange = (event) => {
    setDotColor(event.target.value);
  };

  const onCornerDotTypeChange = (event) => {
    setCornerDotType(event.target.value);
  };

  const onCornerDotColorChange = (event) => {
    setCornerDotColor(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };

  const onCampaignIdChange = (event) => {
    setCampaignId(event.target.value);
  };

  const onFinalURLChange = (event) => {
    setFinalURL(event.target.value);
  };

  return (
    <div className="App flex flex-col">
      <div ref={ref} />
      <div className="mt-[20px] flex justify-between w-full">
        <div className="flex flex-col">
          <div className="flex">
            <label>Final URL: </label>
            <input
              value={finalURL}
              onChange={onFinalURLChange}
              className="grow-1 mr-20"
            />
          </div>
          <div className="flex">
            <label>Campaign: </label>
            <input
              value={campaignId}
              onChange={onCampaignIdChange}
              className="grow-1 mr-20"
            />
          </div>
        </div>
        <select onChange={onExtensionChange} value={fileExt}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="webp">WEBP</option>
        </select>
        <button onClick={onDownloadClick}>Download</button>
      </div>

      <div className="mt-4">
        <label>Shape: </label>
        <select value={shape} onChange={onShapeChange}>
          <option value="square">Square</option>
          <option value="circle">Circle</option>
        </select>
      </div>

      <div className="mt-4">
        <label>Dot Type: </label>
        <select value={dotType} onChange={onDotTypeChange}>
          <option value="square">Square</option>
          <option value="dot">Dot</option>
        </select>
      </div>

      <div className="mt-4">
        <label>Dot Color: </label>
        <input type="color" value={dotColor} onChange={onDotColorChange} />
      </div>

      <div className="mt-4">
        <label>Corner Dot Type: </label>
        <select value={cornerDotType} onChange={onCornerDotTypeChange}>
          <option value="square">Square</option>
          <option value="dot">Dot</option>
        </select>
      </div>

      <div className="mt-4">
        <label>Corner Dot Color: </label>
        <input
          type="color"
          value={cornerDotColor}
          onChange={onCornerDotColorChange}
        />
      </div>
    </div>
  );
}
