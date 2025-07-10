import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Button, TextField, Grid, Stack, CircularProgress} from '@mui/material';

const API_URL = 'http://backend:8000'; // ajuste conforme sua API

export default function SessionListPage() {
	const [sessions, setSessions] = useState([]);
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	// useEffect(() => {
	// 	fetchSessions();
	// }, []);


	
	const fetchSessions = async () => {
		try {
			const res = await axios.get(`${API_URL}/sessions/public`);
			setSessions(res.data.sessions || []);
		} catch (err) {
			console.error('Erro ao buscar sessões:', err);
		}
	};

	const createSession = async () => {
		setLoading(true);
		try {
			const res = await axios.post(`${API_URL}/sessions/create`);
			alert(`Sessão criada: ${res.data.code}`);
			fetchSessions();
		} catch (err) {
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
			alert('Código inválido ou erro ao entrar');
		}
	};

	return (
		<Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
			<Typography variant="h4" gutterBottom>
				Sessões Abertas
			</Typography>

			<Stack spacing={2} mb={4}>
				{sessions.length === 0 ? (
					<Typography color="text.secondary">Nenhuma sessão disponível.</Typography>
				) : (
					sessions.map((s, index) => (
						<Card key={index} variant="outlined">
							<CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
								<Typography variant="body1">
									🔹 <strong>{s.name || s.code}</strong>
								</Typography>
								<Typography variant="body2" color="text.secondary">
									👥 {s.players}/4
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
						<Button 
							variant="contained" 
							color="primary" 
							onClick={createSession}
							disabled={loading}
						>
							{loading ? <CircularProgress size={24} color="inherit" /> : 'Criar Nova Sessão'}
						</Button>

						<Grid container spacing={2} alignItems="center">
							<Grid size={{ xs: 8} }>
								<TextField 
									fullWidth 
									label="Código da Sessão" 
									value={code} 
									onChange={(e) => setCode(e.target.value)} 
									variant="outlined"
								/>
							</Grid>
							<Grid size={{ xs: 4} } >
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
					</Stack>
				</CardContent>
			</Card>
		</Box>
	);
}
