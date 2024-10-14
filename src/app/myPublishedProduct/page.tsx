'use client';
import { useCallback, useEffect, useState } from "react";
import LoadingComponent from "../component/shopping/LoadingComponent";
import { toast } from "react-toastify";
import { ProductItemData } from "../../types";
import { Container, Row, Col } from "react-bootstrap";
import PaginationComponent from "../component/PaginationComponent";
import ProductItem from "../component/shopping/ProductItem";
import fetchApi from "../../utils/fetchUtil";
import { getToken } from "../../utils/dataUtils";

const MyPublishedProduct = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [productData, setProductData] = useState<ProductItemData[] | null>([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const fetchProductsData = useCallback(async () => {
        try {
            const token = getToken();
            const data = await fetchApi(`/api/productRoute/myPublishedProduct/?&page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((data) => {
                    setProductData(data.data.renamedProducts); 
                    setTotalPages(data.data.totalPages);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    toast.error('Error fetching data');
                    setIsLoading(false);
                });
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data');
            setIsLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchProductsData();
    }, [fetchProductsData]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };



    if (isLoading || productData === null) {
        return <LoadingComponent />;
    }


    return (
        <div>
            {productData.length > 0 ? (<Container>
                <Row>
                    {productData.map((product) => (
                        <Col
                            xs={12}
                            sm={6}
                            md={6}
                            lg={4}
                            xl={3}
                            key={product.productId}
                            className="p-1"
                        >
                            <ProductItem
                                key={product.productId}
                                productId={product.productId}
                                productTitle={product.productTitle}
                                productPrice={product.productPrice}
                                productFirstImg={product.productFirstImg}
                                productNumber={product.productNumber}
                                sellQuantity={product.sellQuantity}
                                showSellQuantity={true}
                                canEdit={true}
                                views={product.views}
                                expired={product.expired}
                            />
                        </Col>
                    ))}
                </Row>
                <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Container>) : (<p>No products available</p>)


            }

        </div>
    )
}

export default MyPublishedProduct;