import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useProductStore } from '../store/product'; // Adjust the import path as necessary
import ToastMessage from '../Pages/ToastMessage'; // Adjust the import path as necessary
import './create_page.css'; // Adjust the import path as necessary

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [toastInfo, setToastInfo] = useState({
    show: false,
    title: '',
    message: '',
    bg: 'success', // or 'danger'
  });

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

  const {createProduct} = useProductStore();
  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    console.log("success", success, message);
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
    setNewProduct({name: '',price: '',image: '',});
  };

  return (
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <h1 className={`gradient-text text-center mb-4 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
        Create New Product
      </h1>

      <Card className={`p-4 shadow ${isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
        <Form>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className={isDarkMode ? 'bg-dark text-white border-0' : ''}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="float"
              placeholder="Enter price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className={isDarkMode ? 'bg-dark text-white border-0' : ''}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className={isDarkMode ? 'bg-dark text-white border-0' : ''}
            />
          </Form.Group>

          <Button variant={isDarkMode ? 'light' : 'primary'} onClick={handleAddProduct} className="w-100">
            Add Product
          </Button>
        </Form>
      </Card>

       {/* Show toast */}
        <ToastMessage
          show={toastInfo.show}
          onClose={() => setToastInfo((prev) => ({ ...prev, show: false }))}
          title={toastInfo.title}
          message={toastInfo.message}
          bg={toastInfo.bg}
        />
    </Container>
  );
};

export default CreatePage;
