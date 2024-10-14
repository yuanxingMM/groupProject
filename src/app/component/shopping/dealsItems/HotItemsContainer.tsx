'use client';
import React, { useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';
import { toast } from 'react-toastify';
import Slider from "react-slick";
import ProductItem from '../ProductItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fetchApi from '../../../../utils/fetchUtil';


const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        right: '20px',
        zIndex: 1,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        left: '0px',
        zIndex: 1,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
    </div>
  );
};

const HotItemsContainer = () => {
  const [isLoading, setIsloading] = useState(true);
  const [Data, setData] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const fetchData = async () => {
    try {
      const res = await fetchApi(`/api/purchaseRoute/mostHot`)
        .then((data) => {
          setData(data.data.hotProduct)
          setIsloading(false);
        });
    } catch (error) {
      console.error('Error fetching buy data:', error);
      toast.error('Error fetching buy data');
      setIsloading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  if (isLoading) {
    return (<LoadingComponent />)
  }
  return (
    <div>
      <Slider {...settings}>
        {Data.map((product) => (
          <div key={product.productId}>
            <ProductItem
              key={product.productId}
              productId={product.productId}
              productTitle={product.productTitle}
              productPrice={product.productPrice}
              productFirstImg={product.productFirstImg}
              productNumber={product.productNumber}
              sellQuantity={product.sellQuantity}
              views={product.views}
              expired={product.expired}
            />
          </div>
        ))}
      </Slider>
    </div>);
};

export default HotItemsContainer;