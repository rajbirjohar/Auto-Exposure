import React, { useState, useEffect, useRef, useMemo, setState } from "react";
import { useDropzone } from 'react-dropzone'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};
  
const activeStyle = {
    borderColor: '#2196f3'
};
  
const acceptStyle = {
    borderColor: '#00e676'
};
  
const rejectStyle = {
    borderColor: '#ff1744'
};
  
// Basically this code: https://react-dropzone.js.org/#section-previews
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};
  
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 'auto',
    height: 'auto',
    padding: 4,
    boxSizing: 'border-box'
};
  
const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};
  
const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

export default function CustomDropzone() {
    const [files, setFiles] = useState([]);
    const {
        getRootProps, 
        getInputProps,
        isDragActive,
        isDragAccept, 
        isDragReject,
    } = useDropzone({
        maxFiles: 1,
        accept: 'image/jpeg, image/jpg, image/png',
        onDrop: acceptedFiles => {
            console.log(acceptedFiles);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
        // From Github issue
        // onDrop: (acceptedFiles, e) => {
        //     console.log(acceptedFiles);
        //     const target = e.target;
        //     useState({
        //         files: acceptedFiles,
        //         filesWereDropped: !target.files || target.files.length === 0
        //     });

        //     setFiles(acceptedFiles.map(file => Object.assign(file, {
        //         preview: URL.createObjectURL(file)
        //     })));
        // }
    });
    
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                src={file.preview}
                style={img}
                />
            </div>
        </div>
    ));
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section>
            <div {...getRootProps({style, className: "dropZone", refKey: 'divref' })}>
                <input {...getInputProps()} />
                {/* <p>Drag image here, or click to select file</p> */}
                {!isDragActive && 'Click here or drag an image'}
                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                {isDragReject && "File type not accepted"}
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}