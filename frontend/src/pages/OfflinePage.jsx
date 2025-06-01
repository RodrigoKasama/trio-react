import React, {useState} from "react";
import CartaComp from "../components/Carta.jsx";
import { Grid, Box, Typography } from "@mui/material";

/* Jogo trio offline
	- Criando um baralho embaralhado
	- Dado um baralho, vamos preencher a mesa
	- Tiver 3 cartas selecionadas, vamos verificar se formam um trio
	-  Caso forme, vamos substituir as cartas, de acordo com o estado da mesa 
*/

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
	// Shuffle the deck

	const [baralho] = useState(gerarBaralho().sort(() => Math.random() - 0.5));
	const mesa = baralho.slice(0, N_MESA);


	return (

		<Box sx={{ padding: 4 }}>
			<Typography variant="h4" gutterBottom>
				Mesa de Cartas
			</Typography>

			<Grid container spacing={2}>
				{mesa.map((carta, index) => (
					<Grid item xs={12} sm={10} md={3} key={index}>
						<CartaComp
							cor={carta.cor}
							forma={carta.forma}
							num={carta.num}
							preenc={carta.preenc}
						/>
					</Grid>
				))}
			</Grid>
		</Box>

	);
}
