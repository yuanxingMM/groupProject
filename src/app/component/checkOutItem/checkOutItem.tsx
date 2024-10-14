import Image from 'next/image';
import { CartItem } from '../../../types';
import styles from './checkoutItemStyle.module.scss';
import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../../context/CartContext';
import { addToCart, decreaseFromCart, removeFromCart } from '../../../context/cartReducer';

const CheckOutItem = (props: CartItem) => {
    const router = useRouter();
    const { state, dispatch } = useCart();  
    const { currentPage } = state;
    const [isDisabled, setIsDisabled] = useState(false);
    const [quantity, setQuantity] = useState(props.quantity);

    useEffect(() => {
        setQuantity(props.quantity); 
    }, [props.quantity]);

    const handleAddToCart = debounce(async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDisabled(true);
        addToCart(props.productId, currentPage, dispatch);
        setIsDisabled(false);
    }, 200);

    const handleDecreaseQuantity = debounce(async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDisabled(true);
        decreaseFromCart(props.productId, currentPage, dispatch);
        setIsDisabled(false);
    }, 200);

    const handleRemoveFromCart = debounce(async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDisabled(true);
        removeFromCart(props.productId, props.quantity, currentPage, dispatch);
        setIsDisabled(false);
    }, 200);

    const seeDetails = () => {
        router.push(`/product/${props.productId}`);
    };

    return (
        <div className={styles.wrapCon}>
            <div className={styles.content}>
                <div className={styles.chart}>
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                            position: 'absolute',
                            top: '42%',
                            left: '1%',
                            cursor: 'pointer',
                        }}
                        title="Delete this product"
                        onClick={handleRemoveFromCart}
                    />
                    <Image
                        className={styles.img}
                        src={props.mainImages[0]}
                        alt={props.productTitle}
                        width={100}
                        height={100}
                        style={{ cursor: 'pointer' }}
                        onClick={seeDetails}
                    />
                </div>
                <div className={styles.chart}>
                    <div style={{ position: 'absolute', top: '5px', maxWidth: '38%' }}>
                        <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {props.productTitle}
                        </p>
                    </div>
                    <div style={{ position: 'absolute', bottom: '5px', width: '100%' }}>
                        <span style={{ color: 'red' }}>¥{props.productPrice}</span>
                        <span style={{ position: 'absolute', right: '63%' }}>
                            <FontAwesomeIcon
                                icon={faMinusCircle}
                                style={{
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                }}
                                title="Decrease"
                                onClick={handleDecreaseQuantity}
                            />
                            {quantity}
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                                style={{
                                    marginLeft: '5px',
                                    cursor: 'pointer',
                                }}
                                title="Add"
                                onClick={handleAddToCart}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutItem;