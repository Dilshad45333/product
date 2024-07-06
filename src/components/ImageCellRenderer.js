import React, { useEffect, useState } from 'react';

const ImageCellRenderer = ({ value }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (value && value.data && Array.isArray(value.data)) {
      const fileBlob = new Blob([new Uint8Array(value.data)], { type: 'image/png' });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(fileBlob);
    }
  }, [value]);

  if (!imageUrl) {
    return <div>No Image</div>;
  }

  return (
    <img src={imageUrl} alt="" style={{ width: '50px', height: '50px' }} />
  );
};

export default ImageCellRenderer;
