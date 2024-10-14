import { Spinner } from 'react-bootstrap';

const LoadingComponent = () => {
    return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" />
            <p>Loading...</p>
        </div>
    );
};

export default LoadingComponent;