import style from "./shoppingStyle.module.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import RightItems from "../component/shopping/RightItems";
import HotItemsContainer from "../component/shopping/dealsItems/HotItemsContainer";
import DropdownMenu from "../component/displayProduct/DropDownMeu";
import { DisplayProductProvider } from "../../context/DisplayProductContext";
import { ShoppingPageProvider } from "../../context/ShoppingPageContext";
const Shopping = () => {
  return (
    <ShoppingPageProvider>
      <DisplayProductProvider>
        <div className={style.wrapCon}>
          <HotItemsContainer />

          <Container>

            <div style={{ margin: '20px 0 20px 0' }}>
              <DropdownMenu props={'shopping'} />
            </div>
            <Row>
              <Col>
                <RightItems showMyHistory={false} />
              </Col>
            </Row>
          </Container>
        </div>
      </DisplayProductProvider>
    </ShoppingPageProvider>
  );
};
export default Shopping;
