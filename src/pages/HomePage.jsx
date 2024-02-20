
import SavedProgress from "../components/SavedProgess";
import FavouriteForm from "../components/FavouriteForm";
import { Container, Row, Col } from 'react-bootstrap';

export default function HomePage() {

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} className="my-3">
                        <SavedProgress />
                    </Col>
                    <Col xs={12} md={6} className="my-3">
                        <FavouriteForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}