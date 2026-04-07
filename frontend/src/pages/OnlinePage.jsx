import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Button, TextField, Grid, Stack, CircularProgress } from '@mui/material';
import { getAvailableParties } from '../services/backend_utils';
const API_URL = 'http://localhost:8000';

export default function SessionListPage() {
	const [parties, setParties] = useState([]);

	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	const fetchParties = useCallback(async () => {
		try {
			const response = await getAvailableParties();
			setParties(response);
		} catch (error) {
			console.error('Erro ao buscar sessões:', error);
		}
	}, []);

	useEffect(() => {
		fetchParties();
	}, [fetchParties]);

	const createSession = async () => {
		setLoading(true);
		try {
			const res = await axios.post(`${API_URL}/sessions/create`);
			alert(`Sessão criada: ${res.data.code}`);
			await fetchParties();
		} catch (err) {
			console.error('Erro ao criar sessão:', err);
			alert('Erro ao criar sessão');
		} finally {
			setLoading(false);
		}
	};

	const joinPrivateSession = async () => {
		if (!code.trim()) return;
		try {
			const res = await axios.post(`${API_URL}/sessions/join`, { code });
			alert(`Entrou na sessão: ${res.data.code}`);
		} catch (err) {
			console.error('Erro ao entrar na sessão:', err);
			alert('Código inválido ou erro ao entrar');
		}
	};

	return (
		<Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
			<Typography variant="h4" gutterBottom>
				Sessões Abertas
			</Typography>

			<Stack spacing={2} mb={4} width={"60%"}>
				{parties.length === 0 ? (
					<Typography color="text.secondary">Nenhuma sessão disponível.</Typography>
				) : (
					Object.entries(parties).map((party) => (
						<Card key={party[0]} variant="outlined">
							<CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<Typography variant="body1">
									🔹 <strong>{party[1].party_name}</strong>
								</Typography>
								<Typography variant="body2" color="text.secondary">
									👥 {party[1].players}/{party[1].max_members}
								</Typography>
							</CardContent>
						</Card>
					))
				)}
			</Stack>

			<Typography variant="h5" gutterBottom>
				Criar ou Entrar em Sessão
			</Typography>

			<Card variant="outlined">
				<CardContent>
					<Stack spacing={2}>
						<Grid container spacing={2} alignItems="center">
							<Grid size={{ xs: 8 }}>
								<TextField
									fullWidth
									label="Código da Sessão"
									value={code}
									onChange={(e) => setCode(e.target.value)}
									variant="outlined"
								/>
							</Grid>
							<Grid size={{ xs: 4 }} >
								<Button
									fullWidth
									variant="contained"
									color="success"
									onClick={joinPrivateSession}
								>
									Entrar
								</Button>
							</Grid>
						</Grid>

						<Button
							variant="contained"
							color="primary"
							onClick={createSession}
							disabled={loading}
						>
							{loading ? <CircularProgress size={24} color="inherit" /> : 'Criar Nova Sessão'}
						</Button>
					</Stack>
				</CardContent>
			</Card>
		</Box>
	);
}
