import { useState, useRef } from "react";
import { Box } from "@mui/material";
import { useField } from "formik";

const MultipleImageDragDropField = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);
  const [field, meta, helper] = useField({ name });

  const inputRef = useRef<HTMLInputElement>(null!);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const newImgSrcs = Array.from(files).map(file =>
        URL.createObjectURL(file)
      );
      setImgSrcs(newImgSrcs);
      helper.setValue(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImgSrcs = Array.from(files).map(file =>
        URL.createObjectURL(file)
      );
      setImgSrcs(newImgSrcs);
      helper.setValue(files);
    }
  };

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current.click();
  };

  return (
    <Box className="form-file-upload" onDragEnter={handleDrag}>
      <label
        htmlFor={name}
        className={dragActive ? "drag-active label-file" : "label-file"}
        style={{
          overflow: "hidden",
          borderColor: meta.error ? "red" : "secondary",
        }}
      >
        {imgSrcs.length > 0 ? (
          imgSrcs.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt="upload"
              style={{ width: "100%", maxWidth: "8rem", marginRight: "1rem" }}
            />
          ))
        ) : (
          <p>No images selected</p>
        )}

        <div>
          <p>{label}</p>
          <button className="upload-button" onClick={onButtonClick}>
            Drag and drop or Upload
          </button>
        </div>
      </label>

      <input
        ref={inputRef}
        type="file"
        id={name}
        name={name}
        className="input-file"
        accept="image/*"
        multiple
        onChange={handleChange}
      />

      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </Box>
  );
};

export default MultipleImageDragDropField;
