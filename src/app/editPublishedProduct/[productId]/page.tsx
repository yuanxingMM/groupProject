'use client';

import { v4 as uuidv4 } from 'uuid';
import style from './editPublishedProductStyle.module.scss';
import { useParams } from 'next/navigation'; 
import { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import BaseInfo from '../../component/displayProduct/BaseInfo';
import DisplayProductDescribe from '../../component/displayProduct/DisplayProductDescribe';
import SaleInfo from '../../component/displayProduct/SaleInfo';
import LoadingComponent from '../../component/shopping/LoadingComponent';

import fetchApi from '../../../utils/fetchUtil';
import { useRouter } from 'next/navigation';
import { getToken, getUserId } from '../../../utils/dataUtils';
import { isValidPrice, isPureNonZeroNumber } from '../../../utils/inputUtils';
import { useDisplayProductContext, DisplayProductProvider } from '../../../context/DisplayProductContext';
import { ShoppingPageProvider } from '../../../context/ShoppingPageContext';
const EditDisplayProductContent = () => {
    const { productId } = useParams(); 
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const {
        mainImages,
        productTitle,
        productPrice,
        productNumber,
        productDescribe,
        selectedCategoryId,
        setProductTitle,
        setProductPrice,
        setProductNumber,
        setProductDescribe,
        setMainImages,
        setSelectedCategoryId,
    } = useDisplayProductContext();

    const [isLoading, setIsLoading] = useState(true);

    
    const fetchProductData = useCallback(async () => {
        try {
            let userId = getUserId();
            const extraUrl: string = userId ? `?userId=${userId}` : ``;
            const data = await fetchApi(`/api/productRoute/detail/${productId}${extraUrl}`,{
                method:'POST',
            });
            const product = data.data;

            
            setProductTitle(product.productTitle);
            setProductPrice(product.productPrice);
            setProductNumber(product.productNumber);
            setProductDescribe(product.description);
            setMainImages(product.mainImages);
            setSelectedCategoryId(product.categoryId);

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching product data:', error);
            toast.error('Error fetching product data');
            setIsLoading(false);
        }
    }, [productId, setMainImages, setProductDescribe, setProductNumber, setProductPrice, setProductTitle, setSelectedCategoryId]);

    useEffect(() => {
        fetchProductData();
    }, [fetchProductData]);

    
    const checkInput = (): boolean => {
        if (!mainImages
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
        mainImages.forEach((file: any) => {
            if (file) {
                if (file.name) {
                    const uniqueFileName = `${uuidv4()}_${file.name}`;
                    const newFile = new File([file], uniqueFileName, { type: file.type });
                    formData.append('mainImages', newFile);
                } else {
                    formData.append('oldMainImages', file);
                }
            }
        });

        formData.append('productTitle', productTitle);
        formData.append('productPrice', productPrice.toString());
        formData.append('productNumber', productNumber.toString());
        formData.append('productDescribe', productDescribe);
        formData.append('categoryId', selectedCategoryId);

        try {
            setIsLoading(true);
            const token = getToken();
            const response = await fetch(`${apiUrl}/api/productRoute/update/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                method: 'PUT',  
                body: formData,
            });

            if (response.ok) {
                setIsLoading(false);
                toast.success('Product updated successfully');
                router.push(`/product/${productId}`);
            } else {
                toast.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product', error);
            toast.error('Error updating product');
        }
    };

    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <div style={{ backgroundColor: '#fff', color: '#000000' }}>
            {}
            {}
            {/* <Container>
                <Row>
                    <Col>
                        <div style={{ margin: '20px 0' }}>
                            <DropdownMenu />
                        </div>
                    </Col>
                </Row>
            </Container> */}
            <BaseInfo />
            <SaleInfo />
            <DisplayProductDescribe />

            <Container style={{ height: '100px' }}>
                <Row>
                    <Col sm={2}></Col>
                    <Col sm={10}>
                        <div style={{ height: '60px', minWidth: "200px", margin: '10px 20px' }}>
                            <Button onClick={submitProduct} className={style.button}>Save Changes</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const EditDisplayProduct = () => {
    return (
        <DisplayProductProvider>
            <ShoppingPageProvider>
                <EditDisplayProductContent />
            </ShoppingPageProvider>
        </DisplayProductProvider>
    );
};

export default EditDisplayProduct;