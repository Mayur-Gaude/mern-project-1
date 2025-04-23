import React, { useState,useEffect } from 'react';
import { Card, Button, Modal, Form, Row, Col, Image, ToastContainer, Toast, } from 'react-bootstrap';
import { useProductStore } from '../store/product';
import ToastMessage from '../Pages/ToastMessage'; // Adjust the import path as necessary

const ProductCard = ({ product ,showToast}) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const [showModal, setShowModal] = useState(false);
	// const [toast, setToast] = useState({ show: false, message: '', variant: '' });
	  const [toastInfo, setToastInfo] = useState({
		show: false,
		title: '',
		message: '',
		bg: 'success', // or 'danger'
	  });

	const { deleteProduct, updateProduct } = useProductStore();

	const [isDarkMode, setIsDarkMode] = useState(false);

	// Detect dark mode by checking if body has 'bg-dark' class
	  useEffect(() => {
		const observer = new MutationObserver(() => {
		  setIsDarkMode(document.body.classList.contains('bg-dark'));
		});
	
		observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
	
		// Initial check
		setIsDarkMode(document.body.classList.contains('bg-dark'));
	
		return () => observer.disconnect();
	  }, []);

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		// setToast({ show: true, message, variant: success ? 'success' : 'danger' });
		if(!success) {
			showToast({
				show: true,
				title: 'Error',
				message: 'Product deleted successfully!',
				bg: 'danger',
			  });
		  }else{
			showToast({
				show: true,
				title: 'Success',
				message: 'Product deleted successfully!',
				bg: 'success',
			  });
		  }
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		setShowModal(false);
		// setToast({ show: true, message: success ? 'Product updated successfully' : message, variant: success ? 'success' : 'danger' });
		if(!success) {
			setToastInfo({
			  show: true,
			  title: 'Error',
			  message: message,
			  bg: 'danger',
			});
		  }else{
			setToastInfo({
			  show: true,
			  title: 'Success',
			  message: message,
			  bg: 'success',
			});
		  }
	};

	return (
		<>
			<Card className="shadow-sm h-100">
				<Image src={product.image} alt={product.name} fluid style={{ height: '250px', objectFit: 'cover' }} />

				<Card.Body className={`${isDarkMode ? 'bg-dark text-white border-0' : 'bg-white text-dark border-0'}`}>
					<Card.Title>{product.name}</Card.Title>
					<Card.Text>
						<strong>${product.price}</strong>
					</Card.Text>

					<Row className="gx-2">
						<Col>
							<Button variant="primary" onClick={() => setShowModal(true)} className="w-100">
								Edit
							</Button>
						</Col>
						<Col>
							<Button variant="danger" onClick={() => handleDeleteProduct(product._id)} className="w-100">
								Delete
							</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>

			{/* Modal for Updating Product */}
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Update Product</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Product Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter product name"
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Image URL</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image URL"
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Cancel
					</Button>
					<Button variant="primary" onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Toast Notification */}
			{/* <ToastContainer position="top-bottom" className="p-3">
				<Toast
					bg={toast.variant}
					onClose={() => setToast({ ...toast, show: false })}
					show={toast.show}
					delay={3000}
					autohide
				>
					<Toast.Body className="text-white">{toast.message}</Toast.Body>
				</Toast>
			</ToastContainer> */}
			<ToastMessage
				show={toastInfo.show}
				onClose={() => setToastInfo((prev) => ({ ...prev, show: false }))}
				title={toastInfo.title}
				message={toastInfo.message}
				bg={toastInfo.bg}
			/>
		</>
	);
};

export default ProductCard;
