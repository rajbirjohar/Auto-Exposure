import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#9CA3AF",
  borderStyle: "dashed",
  color: "#9CA3AF",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

// Basically this code: https://react-dropzone.js.org/#section-previews
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 4,
  border: "1px solid #9CA3AF",
  marginBottom: 8,
  width: "auto",
  height: "auto",
  padding: 6,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export default function CustomDropzone({ onImageUpload }) {
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    onImageUpload(acceptedFiles);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    maxFiles: 1,
    accept: "image/jpeg, image/jpg, image/png",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      handleDrop(acceptedFiles);
    },
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <ul>
      {errors.map((e) => (
        <li key={e.code}>{e.message}</li>
      ))}
    </ul>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section>
      <Toaster />
      <div {...getRootProps({ style, className: "dropzone" })}>
        <input {...getInputProps()} />
        {/* <p>Drag image here, or click to select file</p> */}
        {!isDragActive && "Click here or drag an image"}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted"}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <p>{fileRejectionItems}</p>
    </section>
  );
}
