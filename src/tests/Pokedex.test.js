import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();

    const pikachuImg = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pikachuImg).toBeInTheDocument();
    userEvent.click(nextButton);

    const charmanderImg = screen.getByRole('img', { name: 'Charmander sprite' });
    expect(charmanderImg).toBeInTheDocument();
    userEvent.click(nextButton);

    const caterpieImg = screen.getByRole('img', { name: 'Caterpie sprite' });
    expect(caterpieImg).toBeInTheDocument();
    userEvent.click(nextButton);
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByText(/Average weight/i);

    expect(pokemon).toHaveLength(1);
  });

  it('O primeiro Pokémon deve ser mostrado, se estiver no último da lista', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    const pikachuImg = screen.getByAltText(/pikachu sprite/i);
    expect(pikachuImg).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const filterButton = screen.getAllByTestId('pokemon-type-button');
    const SEVEN = 7;
    expect(filterButton).toHaveLength(SEVEN);
  });

  it('Quando selecionado um tipo, deve circular somente pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    const fireType = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireType);

    const firePokemons = screen.getAllByText(/fire/i);
    expect(firePokemons).toHaveLength(2);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', {
      name: /All/i,
    });
    expect(resetButton).toBeInTheDocument();
  });
});
