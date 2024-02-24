import { useState, useRef } from "react";
import "./style.css";
import { Box } from "@mui/material";
import { useField } from "formik";

const ImageDragDropField = ({
  name,
  oldImg,
  label,
}: {
  name: string;
  label: string;
  oldImg?: string;
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [field, meta, helper] = useField({ name });

  const inputRef = useRef<HTMLInputElement>(null!);

  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const imgSrc = URL.createObjectURL(e.dataTransfer.files[0]);
      setImgSrc(imgSrc);
      helper.setValue(e.dataTransfer.files[0]);
    }
  };
  // triggers when file is selected with click
  const handleChange = function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let imgSrc = URL.createObjectURL(e.target.files[0]);
      setImgSrc(imgSrc);
      helper.setValue(e.target.files[0]);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = (e: any) => {
    e.preventDefault();
    inputRef.current.click();
  };
  console.log(oldImg);
  return (
    <>
      <Box className="form-file-upload" onDragEnter={handleDrag}>
        <label
          id={`label-${name}`}
          htmlFor={name}
          className={dragActive ? "drag-active label-file" : "label-file"}
          style={{
            overflow: "hidden",
            borderColor: meta.error ? "red" : "secondary",
          }}
        >
          <img
            src={
              imgSrc
                ? imgSrc
                : field.value
                ? URL.createObjectURL(field.value)
                : oldImg
            }
            alt="upload"
            style={{ width: "100%", maxWidth: "8rem" }}
          />

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
          className="input-file"
          accept="image/*"
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
    </>
  );
};

export default ImageDragDropField;
