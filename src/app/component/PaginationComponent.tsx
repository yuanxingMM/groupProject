"use client";
import Pagination from 'react-bootstrap/Pagination';
import { Container } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }: any) => {
    const handleSelect = (page: number) => {
        if (page !== currentPage && page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPaginationItems = () => {
        const items = [];

        const lowerLimit = Math.max(2, currentPage - 2);
        const upperLimit = Math.min(totalPages - 1, currentPage + 2);

        items.push(
            <Pagination.Item key={1} active={currentPage === 1} onClick={() => handleSelect(1)}>
                1
            </Pagination.Item>
        );

        if (lowerLimit > 2) {
            items.push(<Pagination.Ellipsis key="ellipsis-start" />);
        }

        for (let i = lowerLimit; i <= upperLimit; i++) {
            items.push(
                <Pagination.Item key={i} active={i === currentPage} onClick={() => handleSelect(i)}>
                    {i}
                </Pagination.Item>
            );
        }

        if (upperLimit < totalPages - 1) {
            items.push(<Pagination.Ellipsis key="ellipsis-end" />);
        }

        if (totalPages > 1) {
            items.push(
                <Pagination.Item key={totalPages} active={currentPage === totalPages} onClick={() => handleSelect(totalPages)}>
                    {totalPages}
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        <div>
            <Container className="d-flex justify-content-center mt-3">
                <Pagination>
                    <Pagination.First onClick={() => handleSelect(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handleSelect(currentPage - 1)} disabled={currentPage === 1} />

                    {renderPaginationItems()}

                    <Pagination.Next onClick={() => handleSelect(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handleSelect(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </Container>
        </div>
    );
};

export default PaginationComponent;