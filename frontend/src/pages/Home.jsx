import React, { useState } from 'react';
// import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Box, Button, Container, Stack, Typography, Avatar, Tooltip, Popover, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { getAvailableParties, login, token_name } from '../services/backend_utils';



export default function HomePage() {
	const navigate = useNavigate();

	// Fetch available parties when the component mounts
	// console.log(getAvailableParties());

	const [logged, setLogged] = useState(Boolean(localStorage.getItem(token_name)) || false);

	const [anchorEl, setAnchorEl] = useState(false);

	// Form state
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleAvatarClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const handleLogin = async () => {
		// Exemplo de login fake
		if (username && password) {

			// Chamar o serviço de autenticação pela API, se tudo certo, armazenar o token no localStorage
			let resp = await login(username, password);
			
			// Checar se a request é 200 e tem o token
			if (resp && resp?.status === 200 && resp?.token) {
				localStorage.setItem(token_name, resp.token);
				setLogged(true);
			} else {
				// TODO: Converter isso para um snackbar
				alert('Login falhou. Verifique suas credenciais.');
			}
		}
	};

	const handleLogout = () => {
		localStorage.removeItem(token_name);
		handleClose();
		setLogged(false);
	};



	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'linear-gradient(to bottom right, #bbdefb, #d1c4e9)',
				position: 'relative',
			}}
		>


			<Box sx={{position: 'absolute', top: 16, right: 16,}}>
				<Avatar
					sx={{ bgcolor: logged ? "green" : "red", width: 60, height: 60, cursor: 'pointer' }}
					onClick={handleAvatarClick}
				/>

				<Popover
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
				>
					<Box sx={{ p: 2, width: 150 }}>
						{logged ? (
							<Button variant="contained" color="error" fullWidth onClick={handleLogout}>
								Logout
							</Button>
						) : (
							<Stack spacing={1}>
								<TextField
									label="Usuário"
									size="small"
									fullWidth
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
								<TextField
									label="Senha"
									type="password"
									size="small"
									fullWidth
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<Button variant="contained" onClick={handleLogin}>
									Entrar
								</Button>
							</Stack>
						)}
					</Box>
				</Popover>
			</Box>


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
						TRIO
					</Typography>
					<Stack spacing={2} alignItems="center">
						
						<Tooltip title="Para acessar o modo online, é preciso utilizar um username único."						>
							<Button
								disabled={!logged}
								// disabled={!isLoggedIn}
								// onMouseEnter={() => {
								// 	if (isLoggedIn) {
								// 		alert('Para acessar o modo online, é preciso estar logado em uma conta.');
								// 	}
								// }}

								variant="contained"
								color="primary"
								size="large"
								onClick={() => navigate('/online')}
							>
								Jogar Online
							</Button>
						</Tooltip>


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
