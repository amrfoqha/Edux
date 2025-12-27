import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import {
  X,
  Upload,
  Image,
  FileText,
  Sparkles,
  Camera,
  FolderOpen,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { uploadResource } from "../API/ResouceAPI";

export default function FullFileUpload({
  setCancel,
  setForm,
  handleSubmit,
  validation,
}) {
  const [previews, setPreviews] = useState({});
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [file, setFile] = useState([]);

  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    const newFiles = Array.from(selectedFiles);
    console.log(newFiles);
    setFile((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => ({ ...prev, [file.name]: reader.result }));
        };
        reader.readAsDataURL(file);
        // setFile((prev) => [...prev, file]);
      }
    });

    // Simulate AI tag suggestions
    setTimeout(() => {
      setSuggestedTags([
        "Algorithm",
        "Data Structures",
        "CS101",
        "Lecture Notes",
      ]);
      setForm((prev) => ({ ...prev, tags: suggestedTags }));
    }, 500);
  };

  const removeFile = (fileName) => {
    setFile((prev) => prev.filter((file) => file.name !== fileName));
    setPreviews((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[fileName];
      return newPreviews;
    });
  };

  // Camera functions
  const startCamera = async (e) => {
    e.preventDefault();
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error(err);
      setShowCamera(false);
      alert("Camera access denied or unavailable");
    }
  };

  const captureImage = (e) => {
    e.preventDefault();
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const capturedFile = new File([blob], `captured-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          setForm((prev) => ({
            ...prev,
            files: [...prev.files, capturedFile],
          }));
          setPreviews((prev) => ({
            ...prev,
            [capturedFile.name]: canvas.toDataURL("image/jpeg"),
          }));
          stopCamera();
        }
      }, "image/jpeg");
    }
  };

  const stopCamera = (e) => {
    e.preventDefault();
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  };

  const uploadFilesToServer = async (e) => {
    e.preventDefault();
    if (file.length === 0) return;
    console.log("form.files", file);

    try {
      setUploading(true);

      const formData = new FormData();

      // append files
      file.forEach((file) => {
        formData.append("files", file);
      });

      const res = await uploadResource(formData);
      setForm((prev) => ({
        ...prev,
        files: [...prev.files, ...res.files.map((file) => file.path)],
      }));

      setPreviews({});
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6 mt-10">
      {/* Upload Buttons */}

      <div className="flex gap-4">
        <Button
          onClick={() => setUploadType("document")}
          className="flex-1 h-12"
        >
          <FileText className="mr-2" /> PDF/Document
        </Button>
        <Button onClick={() => setUploadType("image")} className="flex-1 h-12">
          <Image className="mr-2" /> Image
        </Button>
      </div>
      <div className="flex gap-4 ">
        {uploadType === "document" && (
          <Button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="flex-1 text-black bg-white hover:bg-yellow-300"
          >
            <FileText className="mr-2" /> Upload Document
          </Button>
        )}
        {uploadType === "image" && (
          <>
            <Button
              onClick={() => {
                imageInputRef.current?.click();
              }}
              className="flex-1 text-black bg-white hover:bg-yellow-300"
            >
              <Image className="mr-2" /> Upload Image
            </Button>
            <Button onClick={startCamera} className="flex-1">
              <Camera className="mr-2" /> Camera
            </Button>
          </>
        )}
      </div>

      {/* Hidden Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
      />
      <input
        ref={imageInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* Camera Preview */}
      {showCamera && (
        <div className="space-y-2">
          <video
            ref={videoRef}
            className="w-full rounded-lg shadow-lg"
            autoPlay
            playsInline
          />
          <div className="flex gap-2">
            <Button onClick={captureImage} className="flex-1">
              Capture
            </Button>
            <Button onClick={stopCamera} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="w-full" />

      {/* File Preview List */}
      <div className="space-y-2">
        {file.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded-lg"
          >
            <div className="flex items-center gap-4">
              {previews[file.name] ? (
                <img
                  src={previews[file.name]}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <FileText className="w-8 h-8 text-gray-500" />
              )}
              <span>{file.name}</span>
            </div>
            <Button variant="ghost" onClick={() => removeFile(file.name)}>
              <X />
            </Button>
          </div>
        ))}
      </div>

      {/* Suggested AI Tags */}
      {suggestedTags.length > 0 && (
        <div className="p-4 border rounded-lg flex flex-wrap gap-2">
          {suggestedTags.map((tag) => (
            <Badge
              key={tag}
              className="cursor-pointer"
              onClick={() => {
                setForm((prev) => ({
                  ...prev,
                  tags: [...prev.tags, tag],
                }));
              }}
            >
              <Sparkles className="w-4 h-4 mr-1" /> {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Upload Button */}

      <div className=" flex-col gap-4 items-center">
        <div className="flex gap-4">
          <Button
            onClick={uploadFilesToServer}
            disabled={file.length === 0 || uploading}
            className="w-full h-12 mt-4"
            variant="outline"
          >
            {uploading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="mr-2" /> Upload Files
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="h-12 mt-4"
            onClick={() => setCancel(false)}
          >
            Cancel
          </Button>
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={handleSubmit}
            className="h-12 mt-4"
            variant="outline"
            disabled={
              validation.title ||
              validation.description ||
              validation.department ||
              uploading
            }
          >
            Submit New Resource
          </Button>
        </div>
      </div>
    </div>
  );
}
