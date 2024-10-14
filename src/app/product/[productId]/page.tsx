'use client';
import { useRouter } from 'next/navigation';
import LoadingComponent from '../../component/shopping/LoadingComponent';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { MoreProductItemData } from '../../../types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'next/image';
import styles from './product.module.scss';  
import RichTextComponent from '../../component/RichTextComponent/RichTextComponent';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import fetchApi from '../../../utils/fetchUtil';
import { Button } from 'react-bootstrap';
import { getToken } from '../../../utils/dataUtils';

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState<MoreProductItemData | null>(null);
  const [largeImageSrc, setLargeImageSrc] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);  
  const [images, setImages] = useState<string[]>([]);

  const handleMouseOver = (index: number) => {
    setLargeImageSrc(images[index]);
    setSelectedIndex(index);
  };

  const handleClick = (index: number) => {
    setLargeImageSrc(images[index]);
    setSelectedIndex(index);
  };

  const fetchProductsData = useCallback(async () => {
    if (params.productId) {
      try {
        const data = await fetchApi(`/api/productRoute/detail/${params.productId}`);
        setImages(data.data.mainImages);
        setProductData(data.data);
        setLargeImageSrc(data.data.mainImages[0]);  
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching category data:', error);
        toast.error('Error fetching category data');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [params.productId]);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  const addToCart = async () => {
    const token = getToken();
    const data = await fetchApi(`/api/purchaseRoute/addToCart`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: {
          productId: productData.productId,
          quantity: 1,
        }
      }
    ).then((response) => {
      if (response.ok) { toast.success(response.data.message); }
    })
      .catch((error) => {
        console.error('Error add to cart:', error);
        toast.error('Error add to cart');
      });
  }

  const buy = async () => {
    await addToCart();
    router.push('/checkOut');
  }

  if (isLoading || productData === null) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.con}>
      <br></br>
      <Container>
        <Row>
          <Col>
            <div className={styles.container}>
              <div className={styles.left}>
                <div className={styles.imageContainer}>
                  {images.map((src, index) => (
                    <Image
                      key={index}
                      src={src}
                      width={100}
                      height={100}
                      alt={`Thumbnail ${index + 1}`}
                      className={`${styles.thumbnailImage} ${selectedIndex === index ? styles.selected : ''}`}
                      onMouseOver={() => handleMouseOver(index)}
                      onClick={() => handleClick(index)}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.right}>
                {largeImageSrc && (
                  <Zoom>
                    <Image
                      src={largeImageSrc}
                      className={styles.largeImage}
                      width={800}
                      height={800}
                      alt={productData.productTitle}
                      priority />
                  </Zoom>
                )}
              </div>
            </div>
          </Col>
          <Col style={{ position: 'relative' }}>
            <div style={{ height: '90%' }}>

              <strong>{productData.productTitle}</strong>
              <div>¥{productData.productPrice}</div>
            </div>

            <div style={{ position: 'relative', bottom: '0px', height: '10%' }}>
              <Button onClick={addToCart}>Add</Button>
              <Button onClick={buy}>Buy</Button>
            </div>

          </Col>
        </Row>
      </Container>
      <div style={{ margin: '20px auto' }}>
        <strong>图文详情</strong>
        <hr />
        <RichTextComponent description={productData.description} />

      </div>
    </div>
  );
};

export default ProductPage;