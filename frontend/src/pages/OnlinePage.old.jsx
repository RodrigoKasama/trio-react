import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';


export default function HomePage() {
	
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
					bgcolor: 'white',
					p: 4,
					borderRadius: 4,
					boxShadow: 3,
				}}
				>
					<Typography variant="h2" component="h1" gutterBottom>
						Lobby
					</Typography>
					<Stack spacing={2} alignItems="center">
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
							<Typography variant="body1" gutterBottom>
								Código:
							</Typography>
							<input
								type="text"
								style={{
									width: '50%',
									padding: '10px',
									borderRadius: '4px',
									border: '1px solid #ccc',
									fontSize: '16px',
								}}
								placeholder="Código da sessão"
							/>
							<Button
								variant="contained"
								color="success"
								size="large"
								sx={{ width: "20%", paddingBottom: "5px", paddingTop: "5px" }}
							>
								Buscar
							</Button>
						</Box>
						<Box>
							<div>
								<Typography variant="body1" gutterBottom>
									ou
								</Typography>
							</div>
						</Box>
						<Button
							variant="contained"
							color="primary"
							size="large"
						>Criar Sessão
						</Button>
					</Stack>
				</Box>
			</Container >
		</Box >
	);
}
