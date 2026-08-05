import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function ImageCropperModal({ isOpen, onClose, imageFile, onSave, onChangePhoto }) {
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);

  useEffect(() => {
    if (imageFile) {
      setImgSrc(URL.createObjectURL(imageFile));
    }
  }, [imageFile]);

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  const handleSave = () => {
    if (!previewCanvasRef.current) return;
    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const objectUrl = URL.createObjectURL(blob);
      onSave(objectUrl);
    }, 'image/jpeg', 0.95);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl animate-slide-up relative flex flex-col md:flex-row overflow-hidden" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors z-10 bg-white shadow-sm">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left Side: Adjust Photo */}
        <div className="flex-1 p-8 md:border-r border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900">Adjust photo</h3>
          <p className="text-gray-500 mb-6 text-sm">Drag the box to adjust the position.</p>
          
          <div className="bg-black rounded-lg flex items-center justify-center overflow-hidden min-h-[300px] max-h-[500px]">
            {imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                  className="max-h-[500px] w-auto object-contain"
                />
              </ReactCrop>
            )}
          </div>

          <div className="mt-6 text-sm text-gray-500">
            In case you are not satisfied with photo - <button onClick={onChangePhoto} className="text-green-600 font-semibold hover:underline">Change photo</button>
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="w-full md:w-[400px] p-8 flex flex-col bg-gray-50/50">
          <h3 className="text-2xl font-bold text-gray-900">Preview</h3>
          <p className="text-gray-500 mb-10 text-sm">This is how your photo will look.</p>
          
          <div className="flex justify-center items-center flex-1 mb-10">
            <div className="w-48 h-48 rounded-full overflow-hidden border border-gray-200 shadow-md bg-white flex items-center justify-center">
              {completedCrop ? (
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <span className="text-gray-400">Preview</span>
              )}
            </div>
          </div>

          <div className="mt-auto flex justify-end pb-2">
            <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full shadow-md transition-transform hover:-translate-y-0.5 text-lg w-full md:w-auto">
              Save photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
