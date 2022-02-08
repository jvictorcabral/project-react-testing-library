import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('A página deve conter um texto <name> Details', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);

    const heading = screen.getByRole('heading', { name: /Pikachu details/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Não deve existir o link de navegação para os detalhes do Pokémon', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);

    expect(link).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);

    const heading = screen.getByRole('heading', { name: /Summary/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);

    const paragraph = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Na seção de detalhes deverá existir um h2', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);

    const heading = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);

    const mapsImg = screen.getAllByAltText('Pikachu location');

    expect(mapsImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapsImg[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Devem ser exibidos, o nome da localização do mapa em cada localização', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);

    const mapName1 = screen.getByText('Kanto Viridian Forest');
    const mapName2 = screen.getByText('Kanto Power Plant');
    expect(mapName1).toBeInTheDocument();
    expect(mapName2).toBeInTheDocument();
  });

  it('A página deve exibir um checkbox que permite favoritar o Pokémon;', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);

    const favorite = screen.getByRole('checkbox', { name: /favoritado/ });
    expect(favorite).toBeInTheDocument();
  });

  it('Cliques no checkbox devem adicionar e remover o Pokémon dos favoritos', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);

    const favorite = screen.getByRole('checkbox', { name: /favoritado/ });
    userEvent.click(favorite);
    expect(favorite).toBeChecked();
  });

  it('Cliques no checkbox devem adicionar e remover o Pokémon dos favoritos', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/ });
    userEvent.click(link);

    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();
  });
});
