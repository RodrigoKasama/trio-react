/* Jogo trio offline
	- Criando um baralho embaralhado
	- Dado um baralho, vamos preencher a mesa
	- Tiver 3 cartas selecionadas, vamos verificar se formam um trio
	-  Caso forme, vamos substituir as cartas, de acordo com o estado da mesa 
*/


import React, { useState } from "react";
import Carta from "../components/Carta.jsx";
import { Grid, Box, Typography } from "@mui/material";

const formas = ["Squiggle", "Pill", "Diamond"];
const cores = ["Red", "Green", "Purple"];
const quantidades = [1, 2, 3];
const preenchimentos = ["Full", "Striped", "Empty"];

const N_MESA = 12;


function gerarBaralho() {
	const baralho = [];
	for (const forma of formas) {
		for (const cor of cores) {
			for (const quantidade of quantidades) {
				for (const preenchimento of preenchimentos) {
					baralho.push({ forma: forma, cor: cor, num: quantidade, preenc: preenchimento });
				}
			}
		}
	}
	return baralho;
}


export default function OfflinePage() {

	const [baralho, setBaralho] = useState(gerarBaralho().sort(() => Math.random() - 0.5));
	const [cartasMesa, setCartasMesa] = useState(baralho.slice(0, N_MESA));
	const [selecionadas, setSelecionadas] = useState([]);


	function handleSelecionarCarta(index) {

		let novaSelecao;
		const jaSelecionada = selecionadas.includes(index);

		if (!jaSelecionada) {
			novaSelecao = selecionadas.length != 3 ? [...selecionadas, index] : [...selecionadas];
		} else {
			novaSelecao = selecionadas.filter(i => i !== index);
		}

		setSelecionadas(novaSelecao);

		if (novaSelecao.length === 3) {
			const cartasSelecionadas = novaSelecao.map(i => cartasMesa[i]);
			let is_trio = check_trio(cartasSelecionadas);

			let msg = "Trio " + (is_trio ? "formado!" : "não formado!");
			console.log(msg);
		}
	}


	function check_trio(cartas) {
		for (let att of Object.keys(cartas[0])) {
			let aux = new Set(cartas.map(carta => carta[att]));
			if (aux.size !== 1 && aux.size !== 3) {
				return false;
			}
		}
		return true;
	}

	return (

		<Box sx={{ padding: 4 }}>
			<Typography variant="h4" gutterBottom>
				Mesa de Cartas
			</Typography>

			<Grid container spacing={2}>
				{cartasMesa.map((carta, index) => (
					<Grid key={index} sx={{ border: selecionadas.includes(index) ? '2px solid red' : 'none'}}
						onClick={() => handleSelecionarCarta(index) }>
						<Carta cor={carta.cor} forma={carta.forma} num={carta.num} preenc={carta.preenc} />
					</Grid>
				))}
			</Grid>
		</Box>

	);
}
