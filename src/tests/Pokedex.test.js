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

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByText(/Average weight/i);

    expect(pokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const filterButton = screen.getAllByTestId('pokemon-type-button');
    const SEVEN = 7;
    expect(filterButton).toHaveLength(SEVEN);
  });

  it('deve existir um botão para cada tipo', () => {
    renderWithRouter(<App />);
    const pokemonTypes = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonTypes[0]).toHaveTextContent('Electric');
    expect(pokemonTypes[1]).toHaveTextContent('Fire');
    expect(pokemonTypes[2]).toHaveTextContent('Bug');
    expect(pokemonTypes[3]).toHaveTextContent('Poison');
    expect(pokemonTypes[4]).toHaveTextContent('Psychic');
    expect(pokemonTypes[5]).toHaveTextContent('Normal');
    expect(pokemonTypes[6]).toHaveTextContent('Dragon');
    expect(pokemonTypes[0]).toBeInTheDocument();
    userEvent.click(pokemonTypes[4]);

    const psychicPokemons = screen.getByText(/Alakazam/i);
    expect(psychicPokemons).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', {
      name: /All/i,
    });
    expect(resetButton).toBeInTheDocument();
  });

  it('A Pokedéx deve mostrar todos os Pokémons quando clicar no botão All', () => {
    renderWithRouter(<App />);

    const resetButton = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(resetButton);

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();

    expect(resetButton).toBeInTheDocument();
  });
});
