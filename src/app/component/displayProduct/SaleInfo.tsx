'use client';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import RedStar from '../redStar';
import { useDisplayProductContext } from '../../../context/DisplayProductContext';

const SaleInfo = () => {
    const { productPrice, setProductPrice, productNumber, setProductNumber } = useDisplayProductContext();

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(event.target.value); 
    };

    const handleProductNumberchange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductNumber(event.target.value); 
    };
    return (<div>
        <Container>
            <strong>销售信息</strong>
            <Row>
                {}
                <Col sm={2} className='pt-2'>价格(元)<RedStar /></Col>
                <Col sm={10}>
                    <InputGroup>
                        <Form.Control
                            placeholder=""
                            value={productPrice}
                            onChange={handlePriceChange}
                        />
                    </InputGroup>

                </Col>
                {}
            </Row>
            <Row className='mt-4'>
                <Col sm={2} className='pt-2'>库存(件)<RedStar /></Col>
                <Col sm={10}>
                    <InputGroup >
                        <Form.Control
                            
                            placeholder=""
                            value={productNumber}
                            onChange={handleProductNumberchange}
                        />
                    </InputGroup>
                </Col>
            </Row>
        </Container>


    </div>)
}
export default SaleInfo;