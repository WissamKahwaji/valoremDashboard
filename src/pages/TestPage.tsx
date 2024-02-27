import { Box, Button } from "@mui/material";
import React, { useState } from "react";

interface TestPageProps {}

const TestPage: React.FC<TestPageProps> = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleSubmit = async () => {
    if (selectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("imgs", selectedFiles[i]);
      }

      try {
        const response = await fetch(
          "http://localhost:5000/propertyInter/test",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          // Handle successful upload
          console.log("Images uploaded successfully!");
        } else {
          // Handle error
          console.error("Failed to upload images");
        }
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  return (
    <Box>
      <input
        type="file"
        name="imgs"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <Button onClick={handleSubmit}>Upload Images</Button>
    </Box>
  );
};

export default TestPage;
