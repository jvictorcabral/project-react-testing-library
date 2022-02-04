import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstP = screen.getByText(/This application simulates a Pokédex,/i);
    const secondP = screen.getByText(/One can filter Pokémons by type,/i);

    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
