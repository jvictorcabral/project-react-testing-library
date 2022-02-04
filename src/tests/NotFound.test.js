import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img', { name: /Pikachu crying because/i });

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
