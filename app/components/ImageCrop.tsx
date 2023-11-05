import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";

type ImageCropProps = {
  visible: boolean;
  image: string;
  onClose: () => void;
  onCrop: (image: File) => void;
};

export default function ImageCrop({
  visible,
  image,
  onClose,
  onCrop,
}: ImageCropProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    const { x, y, height, width } = croppedAreaPixels;
    const originalImage = new Image();
    originalImage.src = image;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    originalImage.onload = () => {
      ctx?.drawImage(originalImage, x, y, width, height, 0, 0, width, height);
      canvas.toBlob((blob) => onCrop(blob as File), "image/webp");
    };
  };

  if (!image) {
    return <></>;
  }

  return (
    <div className={`${!visible ? "hidden" : ""} h-[50vh] relative`}>
      <button
        onClick={onClose}
        className="hover:bg-gray-400 rounded-full z-10 absolute top-0 right-0"
      >
        <Cross2Icon width={20} height={20} />
      </button>
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={3 / 4}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
}
