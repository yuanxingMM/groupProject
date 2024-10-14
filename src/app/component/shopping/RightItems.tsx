'use client';
import { useCallback, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import LoadingComponent from "./LoadingComponent";
import { toast } from "react-toastify";
import { ProductItemData } from "../../../types";
import { Col, Container, Row } from "react-bootstrap";
import PaginationComponent from "../PaginationComponent";
import fetchApi from "../../../utils/fetchUtil";
import { getToken } from "../../../utils/dataUtils";
import { useShoppingPageContext } from "../../../context/ShoppingPageContext";

const RightItems = ({ showMyHistory }: { showMyHistory: boolean }) => {
    const { selectedCategoryId } = useShoppingPageContext();
    const [isLoading, setIsLoading] = useState(true);
    const [productData, setProductData] = useState<ProductItemData[] | null>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProductsData = useCallback(async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const addUrl: string = selectedCategoryId ? selectedCategoryId : `allProducts`;
            const token = getToken();
            let url: string = '';

            if (showMyHistory) {
                url = `/api/productRoute/myHistory/`;
            } else {
                url = `/api/productRoute/${addUrl}`;
            }

            const routerPath: string = `${url}?page=${currentPage}`;

            const data = await fetchApi(`${routerPath}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            setProductData(data.data.renamedProducts);
            setTotalPages(data.data.totalPages);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching category data:', error);
            toast.error('Error fetching category data');
            setIsLoading(false);
        }
    }, [selectedCategoryId, currentPage, showMyHistory]);

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
                                views={product.views}
                                sellQuantity={product.sellQuantity}
                                expired={product.expired}
                            />
                        </Col>
                    ))}
                </Row>
                <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Container>) : (<p>No products available</p>)


            }

        </div>
    );
}

export default RightItems;