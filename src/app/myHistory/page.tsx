'use client';
import style from './myHistoryStyle.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import RightItems from "../component/shopping/RightItems";
import { DisplayProductProvider } from '../../context/DisplayProductContext';
import { ShoppingPageProvider } from '../../context/ShoppingPageContext';

const MyHistory = () => {
    return (
        <ShoppingPageProvider>
            <DisplayProductProvider>
                <div className={style.wrapCon}>
                    <Container>
                        <Row>
                            <Col>
                                <RightItems showMyHistory={true} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </DisplayProductProvider>
        </ShoppingPageProvider>
    );
};
export default MyHistory;
