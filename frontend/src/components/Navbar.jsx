import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlusSquare } from 'react-icons/fa';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import './Navbar.css';

const AppNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleColorMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
  };

  return (
	<Navbar expand="lg" className="navbar-custom">
	<Container>
		<Navbar.Brand as={Link} to="/" className="gradient-text fw-bold text-uppercase fs-4 text-center">
		Product Store 🛒
		</Navbar.Brand>
		<Nav className="ms-auto d-flex align-items-center gap-2">
           <Button as={Link} to="/create" variant="outline-primary">
             <FaPlusSquare />
           </Button>
           <Button onClick={toggleColorMode} variant="outline-secondary">
             {darkMode ? <LuSun /> : <IoMoon />}
           </Button>
         </Nav>
	</Container>
	</Navbar>
  );
};

export default AppNavbar;
