import Image from 'next/image';
import styles from './myOrdersItemStyle.module.scss';
import { HistoryOrderItemData } from '../../../types';
import { useRouter } from 'next/navigation';
import { getTimeStr } from '../../../utils/timeUtils';
const MyOrdersItem = (props:  HistoryOrderItemData ) => {
    const router = useRouter();

    const seeDetails = () => {
        router.push(`/product/${props.productId}`);
    };
    return (
        <div className={styles.wrapCon}>
            <div className={styles.content}>
                <div className={styles.chart}>
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
                        <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                            {props.productTitle}
                        </p>
                        <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                        Date: {getTimeStr(props.createdAt, false, false, false)}
                        </p>
                    </div>
                    <div style={{ position: 'absolute', bottom: '5px', width: '100%' }}>
                        <span style={{ color: 'red' }}>
                            ¥{props.productPrice}
                        </span>
                        <span style={{ position: 'absolute', right: '63%' }}>
                            x{props.quantity}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrdersItem;