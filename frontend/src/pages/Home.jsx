// src/pages/HomePage.jsx
import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'linear-gradient(to bottom right, #bbdefb, #d1c4e9)',
			}}
		>
			<Container maxWidth="sm">
				<Box sx={{
					textAlign: 'center',
					p: 4,
					bgcolor: 'white',
					borderRadius: 4,
					boxShadow: 3,
				}}
				>
					<Typography variant="h2" component="h1" gutterBottom>
						TRIO
					</Typography>
					<Stack spacing={2} alignItems="center">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => navigate('/online')}
						>
							Jogar Online
						</Button>

						<Button
							variant="contained"
							color="success"
							size="large"
							onClick={() => navigate('/offline')}
						>
							Jogar Offline
						</Button>
						<Button
							variant="contained"
							color="inherit"
							size="large"
							onClick={() => navigate('/como-jogar')}
						>
							Como Jogar
						</Button>
					</Stack>
				</Box>
			</Container>
		</Box>
	);
}
