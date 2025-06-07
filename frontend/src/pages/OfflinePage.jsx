/* Jogo trio offline
	- Criando um baralho embaralhado
	- Dado um baralho, vamos preencher a mesa
	- Tiver 3 cartas selecionadas, vamos verificar se formam um trio
	-  Caso forme, vamos substituir as cartas, de acordo com o estado da mesa 
*/


import React, { useEffect, useState, useRef } from "react";
// import Carta from "../components/Carta.jsx";
import { Grid, Box, Typography } from "@mui/material";



const formaMap = { "Squiggle": '0', "Pill": '1', "Diamond": '2' };
const corMap = { "Red": '0', "Green": '1', "Purple": '2' };
const numMap = { 1: '0', 2: '1', 3: '2' };
const preencMap = { "Full": '0', "Striped": '1', "Empty": '2' };

function gerarBaralho() {
	const baralho = [];
	for (const forma of Object.keys(formaMap)) {
		for (const cor of Object.keys(corMap)) {
			for (const quantidade of Object.keys(numMap)) {
				for (const preenchimento of Object.keys(preencMap)) {
					baralho.push({
						cor: cor,
						forma: forma,
						preenc: preenchimento,
						num: quantidade,
						// Codigo do arquivo SVG
						filename: corMap[cor] + formaMap[forma] + preencMap[preenchimento] + numMap[quantidade]
					});
				}
			}
		}
	}
	return baralho;
}

export default function OfflinePage() {

	const [nCartas, setNCartas] = useState(12);
	// const [baralho, setBaralho] = useState(gerarBaralho());
	const [baralho, setBaralho] = useState(gerarBaralho().sort(() => Math.random() - 0.5));
	const [cartasMesa, setCartasMesa] = useState([]);
	const [selecionadas, setSelecionadas] = useState([]);
	const [nTrio, setNTrio] = useState(0);

	const jaPreencheu = useRef(false);

	// A cada alteração do valor de baralho exibir o estado do baralho
	// useEffect(() => {
	// 	console.log("Trios na mesa: ", nTrio);
	// }, [nTrio]);

	// Primeira renderização, preencher a mesa com as primeiras cartas do baralho
	useEffect(() => {
		if (!jaPreencheu.current) {
		let cartasIniciais = baralho.slice(0, nCartas);
		let novoBaralho = baralho.slice(nCartas);

		setBaralho(novoBaralho);
		setCartasMesa(cartasIniciais);
			jaPreencheu.current = true;
		}

	}, []);

	// Rotina baseada em cartasMesa, verificar se há trios válidos. Caso não tenha vou redefinir o baralho e preencher a mesa novamente
	useEffect(() => {
		if (cartasMesa.length > 0) {
			// Verificar se há trios na mesa
			let n_trios = check_mesa(cartasMesa);
			setNTrio(n_trios);

			if (baralho.length === 0 && n_trios === null) {
				console.log("Baralho vazio e não há trios válidos na mesa. Fim de jogo.");
				return;
			}
			if (n_trios === 0) {

				let newBaralho, cartasIniciais, novoBaralho;
				do {
					console.log("Não há trios válidos na mesa, reembaralhando...");
					newBaralho = gerarBaralho().sort(() => Math.random() - 0.5);
					cartasIniciais = newBaralho.slice(0, nCartas);
					novoBaralho = newBaralho.slice(nCartas);
					n_trios = check_mesa(cartasIniciais);
				}
				while (n_trios == 0);


				setNTrio(n_trios);
				setBaralho(novoBaralho);
				setCartasMesa(cartasIniciais);
			}
			console.log("Número de trios válidos na mesa: ", n_trios);
		}
		if (baralho.length === 0 && cartasMesa.length === 0) {
			console.log("Baralho vazio e mesa vazia. Fim de jogo.");
		}
	}, [cartasMesa])

	/**
	 * 
	 * @param {*} mesa 
	 * @param {*} return_qtd 
	 * @returns Number of valid trios in game or null if there are not enough cards
	 */
	function check_mesa(mesa) {
		// Percorrer as cartas na mesa e verificar se há trios
		if (mesa.length < 3) {
			return null;
		}

		let n_trios_validos = 0;
		for (let i = 0; i < mesa.length; i++) {
			for (let j = i + 1; j < mesa.length; j++) {
				for (let k = j + 1; k < mesa.length; k++) {
					let trio = [mesa[i], mesa[j], mesa[k]];
					if (check_trio(trio)) {
						// console.log("Trio válido encontrado: ", trio);
						n_trios_validos++;
					}
				}
			}
		}
		return n_trios_validos;
	}

	function check_trio(cartas) {
		for (let att of Object.keys(cartas[0])) {
			if (att === 'filename') continue;
			let aux = new Set(cartas.map(carta => carta[att]));
			if (aux.size !== 1 && aux.size !== 3) {
				return false;
			}
		}
		return true;
	}


	function handleSelecionarCarta(index) {

		let novaSelecao = [];
		const jaSelecionada = selecionadas.includes(index);

		if (jaSelecionada) {
			novaSelecao = selecionadas.filter(i => i !== index);
		} else {
			novaSelecao = selecionadas.length != 3 ? [...selecionadas, index] : [...selecionadas];
		}
		novaSelecao = novaSelecao.sort();

		setSelecionadas(novaSelecao);

		if (novaSelecao.length === 3) {
			const cartasSelecionadas = novaSelecao.map(i => cartasMesa[i]);
			let is_trio = check_trio(cartasSelecionadas);

			if (is_trio) {

				let newMesa = [...cartasMesa];
				let newCards = baralho.slice(0, novaSelecao.length)
				let newBaralho = baralho.slice(novaSelecao.length);

				// Substitui a carta selecionada da mesa e por uma nova do baralho
				for (const index of novaSelecao) {
					newMesa[index] = newCards.shift();
				}
				newMesa = newMesa.filter(carta => carta !== undefined);

				let n_trios = check_mesa(newMesa);

				if (n_trios == 0) {
					console.log("Com a substituição do trio, não há mais trios válidos na mesa. Fim do Jogo.");
					// 	setNCartas(nCartas + 1);
					// 	setCartasMesa(baralho.slice(0, nCartas));
				}
				else {
					setCartasMesa(newMesa);
					setBaralho(newBaralho);
				}
			}
			setSelecionadas([]);
		}
	}

	return (

		<Box sx={{ padding: 4 }}>

			<Box 
				sx={{
					marginBottom: 2,
					padding: 2,
					border: '2px solid #1976d2',
					borderRadius: '8px',
					backgroundColor: '#e3f2fd',
					textAlign: 'center',
					boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
				}}
			>
				<Typography 
					variant="h6" 
					sx={{ color: '#1976d2', fontWeight: 'bold' }}
				>
					Trio(s) Existente(s): {nTrio}
				</Typography>
			</Box>

			<Grid container spacing={1} justifyContent={"space-evenly"}>
				{cartasMesa.map((carta, index) => (


					<Grid key={index} onClick={() => handleSelecionarCarta(index)}>
						{/* <Carta cor={carta.cor} forma={carta.forma} num={carta.num} preenc={carta.preenc} selected={selecionadas.includes(index) ? true : false}/> */}
						{/* <Carta cor={carta.cor} forma={carta.forma} num={carta.num} preenc={carta.preenc} selected={1}/> */}

						<Box sx={{
							width: '210px',
							height: '320px',
							border: selecionadas.includes(index) ? '3px solid red' : '3px solid gray',
							borderRadius: '15px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							// aspectRatio: '3/4',
						}}>
							<img src={carta.filename + `.svg`} alt={`${carta.num} ${carta.forma} ${carta.preenc} ${carta.cor}`} />
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>

	);
}
