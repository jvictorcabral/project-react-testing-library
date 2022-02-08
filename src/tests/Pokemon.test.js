import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';


describe('Teste o componente <Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');

    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    
    const pokemonType = screen.getByTestId('pokemon-type');

    expect(pokemonType).toHaveTextContent('Electric');
  });

  it('O peso correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonWeight).toHaveTextContent('Average weight:');
    expect(pokemonWeight).toHaveTextContent('kg');
  });

  it('A imagem correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonImage = screen.getByRole('img', { name: 'Pikachu sprite' });

    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });

    expect(link).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link)

    const { location: { pathname } } = history

    expect(pathname).toBe('/pokemons/25')
  })

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link)

    const favorite = screen.getByRole('checkbox', { name: /favoritado/ });
    userEvent.click(favorite);

    const favoriteAlt = screen.getByAltText('Pikachu is marked as favorite')

    expect(favoriteAlt).toHaveAttribute('src', '/star-icon.svg')
  })
});
