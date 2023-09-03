import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Lobby from './Lobby';

test('renders Lobby component with input field and submit button', () => {
  const { getByPlaceholderText, getByText } = render(<Lobby />);

  const inputField = getByPlaceholderText('Enter your name');
  const submitButton = getByText('Join Game');

  expect(inputField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('updates player list on form submission', async () => {
  const { getByPlaceholderText, getByText, getByRole } = render(<Lobby />);

  const inputField = getByPlaceholderText('Enter your name');
  const submitButton = getByText('Join Game');
  const playerList = getByRole('list');

  // Type a player name in the input field
  fireEvent.change(inputField, { target: { value: 'John' } });

  // Submit the form
  fireEvent.click(submitButton);

  // Player name should be added to the player list
  const playerNameInList = getByText('John');
  expect(playerNameInList).toBeInTheDocument();

  // The player list should now contain one player
  expect(playerList.children.length).toBe(1);
});
