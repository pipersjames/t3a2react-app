import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavouriteForm from '../components/FavouriteForm';
import { BrowserRouter as Router } from 'react-router-dom';

describe('FavouriteForm', () => {
  test('renders correctly with provided favourite', () => {
    const favourite = {
      fav: 'TestForm'
    };

    const { getByText } = render(
      <Router>
        <FavouriteForm fav={favourite.fav} />
      </Router>
    );

    const cardTitle = getByText(favourite.fav);
    const link = getByText(`Click here to fill out the ${favourite.fav} Form:`);

    expect(cardTitle).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  test('navigates to correct URL when clicked', () => {
    const favourite = {
      fav: 'TestForm'
    };

    const { getByText } = render(
      <Router>
        <FavouriteForm fav={favourite.fav} />
      </Router>
    );

    const link = getByText(`Click here to fill out the ${favourite.fav} Form:`);
    fireEvent.click(link);

    // You might need to adjust this expectation based on your routing setup
    expect(window.location.pathname).toBe(`/forms/${favourite.fav}`);
  });
});
