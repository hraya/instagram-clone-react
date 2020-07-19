import React, { useState } from "react";
import { Button } from "@material-ui/core";

const ImageUpload = () => {
  const [caption, setCaption] = useState("");

  const handleChange = () => {};

  const handleUpload = () => {};

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={event => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />

      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
