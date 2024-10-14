import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProductItemData } from '../../../types/index';
import { Button } from 'react-bootstrap';
import { getToken } from '../../../utils/dataUtils';
import fetchApi from '../../../utils/fetchUtil';
import { toast } from 'react-toastify';

const ProductItem = (props: ProductItemData) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false); 

    const seeDetails = () => {
        if (props.expired) {
            toast.info('该商品已下架，无法查看！');
            return;
        }
        router.push(`/product/${props.productId}`);
    };

    const editProduct = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/editPublishedProduct/${props.productId}`); 
    };

    const deleteProduct = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const token = getToken();
        const data = await fetchApi(`/api/productRoute/deleteProduct`, {
            
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: {
                productId: props.productId,
            }
        }).then((response) => {
            if (response.ok) {
                toast.success(response.data.message);
            }
        })
        router.refresh(); 
    };

    return (
        <div
            onClick={seeDetails}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            style={{
                position: 'relative',
                cursor: 'pointer',
                textAlign: 'center',
                backgroundColor: '#fff',
                borderRadius: '5px',
                width: '250px',
                height: '300px',
                margin: '0 auto',
                border: isHovered ? '2px solid red' : '2px solid transparent', 
                transition: 'border-color 0.3s, box-shadow 0.3s', 
                boxSizing: 'border-box', 
            }}
        >
            <div>
                <Image
                    src={props.productFirstImg}
                    alt="productItem"
                    width={246}
                    height={248}
                    priority
                    style={{ borderRadius: '3px' }}
                />
                {props.canEdit&& !props.expired && (<Button
                    onClick={deleteProduct}
                    style={{
                        position: 'absolute', right: '0', top: '0'

                    }}>下架</Button>)}
                    {props.expired&&(
                        <span style={{position:'absolute',
                            top:'0',
                            right:'5px',
                            color:'red',
                        }}>已下架</span>
                    )}
            </div>

            <p style={{
                whiteSpace: 'nowrap',         
                overflow: 'hidden',           
                textOverflow: 'ellipsis',     
                margin: '0',
                color: '#000000',
            }}>
                <strong> {props.productTitle}</strong>
            </p>
            < span style={{ color: 'red', float: 'left', fontSize: '1.5rem', lineHeight: '1.5rem', }}>¥{props.productPrice}</span>
            <div style={{ display: 'inline-block', float: 'left' }}>
                {props.showSellQuantity || props.sellQuantity ? (<span style={{ fontSize: '0.7rem', float: 'left', lineHeight: '0.7rem', marginInlineStart: '1rem', color: 'black' }}>{props.sellQuantity}人购买</span>

                ) : ''}
                <span style={{ fontSize: '0.7rem', float: 'left', lineHeight: '0.7rem', marginInlineStart: '1rem', color: 'black' }}>{props.views}views</span>
            </div>
            {props.canEdit && (
                <span style={{ position: 'absolute', right: '0', bottom: '0', zIndex: '100' }}>
                    <Button size='sm'
                        onClick={editProduct}
                    >
                        编辑
                    </Button>
                </span>)}
        </div>
    );
};

export default ProductItem;