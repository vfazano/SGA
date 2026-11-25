import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { apiFetch } from './api';
import Home from './Home';

jest.mock('./api', () => ({ apiFetch: jest.fn() }));

test('filters room rows by room name without requiring accents', async () => {
	apiFetch.mockImplementation((path) => {
		const data = path === '/api/ambientes'
			? [
				{ id: 1, codigo: 'LAB-01', nome: 'Laboratório de Química' },
				{ id: 2, codigo: 'SALA-02', nome: 'Sala de Informática' },
			]
			: [
				{ id: 10, ambienteId: 1, aulaDescricao: 'Química', horario: '07:00 - 08:50' },
				{ id: 20, ambienteId: 2, aulaDescricao: 'Informática', horario: '09:10 - 11:00' },
			];

		return Promise.resolve({
			ok: true,
			text: () => Promise.resolve(JSON.stringify(data)),
		});
	});

	render(<MemoryRouter><Home /></MemoryRouter>);

	await screen.findByText('LAB-01 · Laboratório de Química');
	await screen.findByText('SALA-02 · Sala de Informática');
	fireEvent.change(screen.getByRole('searchbox', { name: 'Pesquisar salas' }), { target: { value: 'laboratorio' } });

	await waitFor(() => {
		expect(screen.getByText('LAB-01 · Laboratório de Química')).toBeInTheDocument();
		expect(screen.queryByText('SALA-02 · Sala de Informática')).not.toBeInTheDocument();
	});
});

test('shows a message when the search has no matching room', async () => {
	apiFetch.mockImplementation((path) => {
		const data = path === '/api/ambientes'
			? [{ id: 1, codigo: 'LAB-01', nome: 'Laboratório de Química' }]
			: [{ id: 10, ambienteId: 1, aulaDescricao: 'Química', horario: '07:00 - 08:50' }];

		return Promise.resolve({
			ok: true,
			text: () => Promise.resolve(JSON.stringify(data)),
		});
	});

	render(<MemoryRouter><Home /></MemoryRouter>);
	await screen.findByText('LAB-01 · Laboratório de Química');
	fireEvent.change(screen.getByRole('searchbox', { name: 'Pesquisar salas' }), { target: { value: 'biblioteca' } });

	expect(await screen.findByText('Nenhuma sala encontrada para essa pesquisa.')).toBeInTheDocument();
});
