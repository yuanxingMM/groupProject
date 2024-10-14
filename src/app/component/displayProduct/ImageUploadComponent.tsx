'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDisplayProductContext } from '../../../context/DisplayProductContext';

const ImageUploadComponent = ({ index }: { index: number }) => {
  const { mainImages, setMainImages } = useDisplayProductContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  
  useEffect(() => {
    const currentImage = mainImages[index];
    if (currentImage && currentImage instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); 
      };
      reader.readAsDataURL(currentImage); 
    } else {
      
      setImagePreview(currentImage as unknown as string);
    }
  }, [mainImages, index]); 

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string); 
        };
        reader.readAsDataURL(file);

        
        setMainImages((prevFiles) => {
            const updatedFiles = [...prevFiles];
            updatedFiles[index] = file; 
            return updatedFiles;
        });
    } else {
        
        setMainImages((prevFiles) => prevFiles);
    }
};

  return (
    <div style={styles.uploadContainer}>
      {!imagePreview ? (
        <div style={styles.iconContainer}>
          <FontAwesomeIcon icon={faCamera} style={styles.icon} />
          <div style={styles.uploadText}>上传图片</div>
        </div>
      ) : (
        <Image
          src={imagePreview}
          width={96}
          height={96}
          alt="uploaded" style={styles.imagePreview} />
      )}
      <input
        type="file"
        accept="image/*"
        style={styles.fileInput}
        onChange={handleImageUpload}
      />
    </div>
  );
};

const styles = {
  uploadContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100px',
    height: '100px',
    border: '2px dashed #ccc',
    borderRadius: '10px',
    cursor: 'pointer',
    position: 'relative' as 'relative',
    overflow: 'hidden',
    textAlign: 'center' as 'center',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '32px',
    marginBottom: '8px',
  },
  uploadText: {
    color: '#999',
    fontSize: '14px',
  },
  fileInput: {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as 'cover',
  },
};

export default ImageUploadComponent;