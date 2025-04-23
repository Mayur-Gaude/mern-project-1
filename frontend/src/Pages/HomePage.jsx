import React, { useEffect,useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard'; // Already converted to Bootstrap
import { Link } from 'react-router-dom';
import ToastMessage from '../Pages/ToastMessage';

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();
	const [toastInfo, setToastInfo] = useState({ show: false, title: '', message: '', bg: 'success' });




	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
  	console.log("products", products);

	return (
		<Container className="py-5">
			<h2 className="text-center fw-bold text-primary mb-4">Current Products 🚀</h2>

			<Row className="g-4">
				{products.length > 0 ? (
					products.map((product) => (
						<Col key={product._id} xs={12} md={6} lg={4}>
							{/* <ProductCard product={product}  /> */}
							<ProductCard product={product} showToast={setToastInfo} />
						</Col>
					))
				) : (
					<Col>
						<Alert variant="info" className="text-center">
							<strong>No products found 😢</strong>
							<br />
							<Link to="/create" className="text-decoration-underline text-primary">
								Create a product
							</Link>
						</Alert>
					</Col>
				)}
			</Row>
			<ToastMessage {...toastInfo} onClose={() => setToastInfo({ ...toastInfo, show: false })} />
		</Container>
	);
};

export default HomePage;
