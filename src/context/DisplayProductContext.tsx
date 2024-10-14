'use client';
import React, { createContext, useContext, useState } from 'react';

export type DisplayProductContextType = {
  content: string;
  mainImages:any;
  
  productTitle: string;
  productPrice: string;
  productNumber: string;
  productDescribe: string;
  describeImageFiles: File[];
  selectedCategoryId: string | null;
  isIllegal: boolean;
  setContent: (content: string) => void;
  setMainImages: (files: (prevFiles: any) => any) => void;
  
  setProductTitle: (productTitle: string) => void;
  setProductPrice: (productPrice: string) => void;
  setProductNumber: (productNumber: string) => void;
  setProductDescribe: (productDescribe: string) => void;
  setDescribeImageFiles: (files: File[]) => void;
  setSelectedCategoryId: (id: string | null) => void;
  setIsIllegal: (flag: boolean) => void
};

const DisplayProductContext = createContext<DisplayProductContextType | undefined>(undefined);

export const DisplayProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState('');
  const [mainImages, setMainImages] = useState<any[]>([]);
  
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productNumber, setProductNumber] = useState('');
  const [productDescribe, setProductDescribe] = useState('');
  const [describeImageFiles, setDescribeImageFiles] = useState<File[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isIllegal, setIsIllegal] = useState<boolean | null>(null);

  return (
    <DisplayProductContext.Provider
      value={{
        content,
        mainImages,
        productTitle,
        productPrice,
        productNumber,
        productDescribe,
        describeImageFiles,
        selectedCategoryId,
        isIllegal,
        setContent,
        setMainImages,
        setProductTitle,
        setProductPrice,
        setProductNumber,
        setProductDescribe,
        setDescribeImageFiles,
        setSelectedCategoryId,
        setIsIllegal,
      }}
    >
      {children}
    </DisplayProductContext.Provider>
  );
};

export const useDisplayProductContext = () => {
  const context = useContext(DisplayProductContext);
  if (context === undefined) {
    throw new Error('useDisplayProductContext must be used within a DisplayProductProvider');
  }
  return context;
};