import React from 'react';
import { Container } from 'react-bootstrap'; 

const Layout = ({ children }) => {
  return (
    <div>
      <Container fluid className="mt-5"> {/* Use a responsive container */}
        {children}
      </Container>
    </div>
  );
};

export default Layout;
