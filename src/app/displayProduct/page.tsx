'use client';
import dynamic from 'next/dynamic';

const DropdownMenu = dynamic(() => import('../component/displayProduct/DropDownMeu'), { ssr: false });
const BaseInfo = dynamic(() => import('../component/displayProduct/BaseInfo'), { ssr: false });
const SaleInfo = dynamic(() => import('../component/displayProduct/SaleInfo'), { ssr: false });
const DisplayProductDescribe = dynamic(() => import('../component/displayProduct/DisplayProductDescribe'), { ssr: false });

import { useRouter } from 'next/navigation';
import { Button, Col, Container, Row } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import style from './displayProductStyle.module.scss';
import { getToken } from "../../utils/dataUtils";
import { isValidPrice, isPureNonZeroNumber } from '../../utils/inputUtils';
import { DisplayProductProvider, useDisplayProductContext } from '../../context/DisplayProductContext';
import { ShoppingPageProvider } from '../../context/ShoppingPageContext';
import { toast } from 'react-toastify';
import LoadingComponent from '../component/shopping/LoadingComponent';
import { useState } from 'react';
const DisplayProductContent = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const {
        mainImages,
        productTitle,
        productPrice,
        productNumber,
        productDescribe,
        selectedCategoryId,
        isIllegal,
    } = useDisplayProductContext();

    const base64ToFile = (base64Image: string): File => {
        const base64String = base64Image.split(',')[1];
        const byteString = atob(base64String);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([intArray], { type: 'image/jpeg' });
        return new File([blob], 'image.jpeg', { type: 'image/jpeg' });
    };

    const [isLoading, setIsLoading] = useState(false);



    const transform = async (content: string): Promise<string> => {
        try {
            let updatedContent = content;
            const base64Regex = /<img[^>]+src="data:image\/[^">]+base64,[^">]+"[^>]*>/g;
            const base64Matches = content.match(base64Regex) || [];

            for (const match of base64Matches) {
                const base64String = match.match(/src="([^"]+)"/)?.[1] || '';
                const file = base64ToFile(base64String);

                const formData = new FormData();
                formData.append('file', file, file.name);
                const response = await axios.post(`${apiUrl}/api/uploadFile`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const fileUrl = response.data.fileUrl;
                updatedContent = updatedContent.replace(base64String, fileUrl);
            }

            return updatedContent;
        } catch (error) {
            console.error('Error transforming content', error);
            throw new Error('Failed to transform content');
        }
    };

    
    const checkInput = (): boolean => {
        if (!isIllegal
            || !mainImages
            || !productTitle
            || !productPrice
            || !productNumber
            || !selectedCategoryId) {
            toast.warn('输入信息不完整！');
            return false;
        }
        if (!isValidPrice(productPrice)) {
            toast.warn('输入价格格式有误！');
            return false;
        }
        if (!isPureNonZeroNumber(productNumber)) {
            toast.warn('输入商品数量有误！');
            return false;
        }
        return true;
    }


    const submitProduct = async () => {
        if (!checkInput()) {
            return;
        }
        const formData = new FormData();

        mainImages.forEach((file) => {
            if (file && file.name) {
                const uniqueFileName = `${uuidv4()}_${file.name}`;
                const newFile = new File([file], uniqueFileName, { type: file.type });
                formData.append('mainImages', newFile);
            } else {
                console.warn('Invalid file detected in mainImages:', file);
            }
        });

        formData.append('productTitle', productTitle);
        formData.append('productPrice', productPrice.toString());
        formData.append('productNumber', productNumber.toString());
        const updateProductDescribe = await transform(productDescribe);
        formData.append('productDescribe', updateProductDescribe);
        formData.append('categoryId', selectedCategoryId || '');

        try {
            setIsLoading(true);
            const token = getToken();
            const response = await fetch(`${apiUrl}/api/productRoute/add`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                method: 'POST',
                body: formData,
            });
            setIsLoading(false);
            if (response.ok) {
                toast.success('Product submitted successfully');
                router.push('/myPublishedProduct');
            } else {
                alert('Failed to submit product');
            }
        } catch (error) {
            console.error('Error submitting product', error);
            alert('Error submitting product');
        }
    };

    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <div style={{ backgroundColor: '#fff', color: '#000000' }}>
            <Container>
                <Row>
                    <Col>
                        <div style={{ margin: '20px 0' }}>
                            <DropdownMenu />
                        </div>
                    </Col>
                </Row>
            </Container>

            <BaseInfo />
            <SaleInfo />
            <DisplayProductDescribe />
            <Container style={{ height: '100px' }}>
                <Row>
                    <Col sm={2}> </Col>
                    <Col sm={10}>
                        <div style={{ height: '60px', minWidth: "200px", margin: '10px 20px' }}>
                            <Button onClick={submitProduct} className={style.button}>Publish</Button>
                        </div>

                    </Col>
                </Row>
            </Container>
            <div>
            </div>
        </div>
    );
};

const DisplayProduct = () => {
    return (
        <DisplayProductProvider>
            <ShoppingPageProvider>
                <DisplayProductContent />
            </ShoppingPageProvider>
        </DisplayProductProvider>
    );
};

export default DisplayProduct;