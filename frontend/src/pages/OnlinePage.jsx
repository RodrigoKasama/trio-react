import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://backend:8000'; // ajuste conforme necessário

export default function SessionListPage() {
	const [sessions, setSessions] = useState([]);
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchSessions();
	}, []);

	async function fetchSessions() {
		try {
			const res = await axios.get(`${API_URL}/sessions/public`);
			setSessions(res.data.sessions || []);
		} catch (err) {
			console.error('Erro ao buscar sessões:', err);
		}
	}

	async function createSession() {
		setLoading(true);
		try {
			const res = await axios.post(`${API_URL}/sessions/create`);
			// redirecionar ou atualizar lista
			alert(`Sessão criada: ${res.data.code}`);
			fetchSessions();
		} catch (err) {
			alert('Erro ao criar sessão');
		} finally {
			setLoading(false);
		}
	}

	async function joinPrivateSession() {
		if (!code.trim()) return;
		try {
			const res = await axios.post(`${API_URL}/sessions/join`, { code });
			alert(`Entrou na sessão: ${res.data.code}`);
			// redirecionar para a sala?
		} catch (err) {
			alert('Código inválido ou erro ao entrar');
		}
	}

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Sessões Abertas</h1>
			<div className="bg-white rounded shadow p-4 mb-6 space-y-2">
				{sessions.length === 0 ? (
					<p className="text-gray-500">Nenhuma sessão disponível.</p>
				) : (
					sessions.map((s, i) => (
						<div key={i} className="border p-2 rounded flex justify-between items-center">
							<div>🔹 <strong>{s.name || s.code}</strong></div>
							<div className="text-sm text-gray-500">👥 {s.players}/4</div>
						</div>
					))
				)}
			</div>

			<h2 className="text-xl font-semibold mb-2">Criar ou entrar em uma sessão</h2>
			<div className="bg-white rounded shadow p-4 space-y-4">
				<button 
					onClick={createSession} 
					disabled={loading}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					{loading ? 'Criando...' : 'Criar nova sessão'}
				</button>

				<div className="flex items-center space-x-2">
					<input 
						type="text" 
						placeholder="Código da sessão" 
						value={code} 
						onChange={(e) => setCode(e.target.value)}
						className="border p-2 rounded flex-1"
					/>
					<button 
						onClick={joinPrivateSession}
						className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
					>
						Entrar
					</button>
				</div>
			</div>
		</div>
	);
}
