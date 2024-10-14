import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import RedStar from '../redStar';
import ImageUploadComponent from './ImageUploadComponent';
import { useDisplayProductContext } from '../../../context/DisplayProductContext';

const BaseInfo = () => {
  const { productTitle, setProductTitle } = useDisplayProductContext();
  
  const handleProductTitlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductTitle(event.target.value); 
  };

  return (
    <div>
      <Container>
        <strong>基础信息</strong>
        <Row>
          <Col sm={2}>1:1主图<RedStar /></Col>
          <Col sm={10}>
            图片要求：比例为1:1，大小3M内；至多可上传5张
            <Container fluid>
              <Row className="g-3">
                {[0, 1, 2, 3, 4].map(index => (
                  <Col key={index} xs={6} sm={4} md={3} lg={2}>
                    <ImageUploadComponent index={index} />
                  </Col>
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col className='pt-2' sm={2}>宝贝标题<RedStar /></Col>
          <Col sm={10}>
            <InputGroup>
              <Form.Control
                placeholder=""
                value={productTitle}  
                onChange={handleProductTitlechange}  
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BaseInfo;