/* Jogo trio offline
	- Criando um baralho embaralhado
	- Dado um baralho, vamos preencher a mesa
	- Tiver 3 cartas selecionadas, vamos verificar se formam um trio
	-  Caso forme, vamos substituir as cartas, de acordo com o estado da mesa 
*/


import React, { useState } from "react";
// import Carta from "../components/Carta.jsx";
import { Grid, Box, Typography } from "@mui/material";

const N_MESA = 12;

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

	const [baralho, setBaralho] = useState(gerarBaralho().sort(() => Math.random() - 0.5));
	const [cartasMesa, setCartasMesa] = useState(baralho.slice(0, N_MESA));
	const [nTrio, setNTrio] = useState();
	const [selecionadas, setSelecionadas] = useState([]);


	useState(() => { 
		// Verificar se há trios na mesa
		let n_trios = check_mesa(true);
		while (n_trios == 0) {
			console.log("Não há trios válidos na mesa, reembaralhando...");
			n_trios = check_mesa(true);
			setBaralho(gerarBaralho().sort(() => Math.random() - 0.5));
			setCartasMesa(baralho.slice(0, N_MESA));
		}
		setNTrio(n_trios);
		console.log("Número de trios válidos na mesa: ", n_trios);

	}, [cartasMesa]);


	function check_mesa(return_qtd = false) {
		// Percorrer as cartas na mesa e verificar se há trios
		if( cartasMesa.length < 3) {
			console.log("Não há cartas suficientes na mesa para formar um trio.");
			return false;
		}

		let n_trios_validos = 0;
		for (let i = 0; i < cartasMesa.length; i++) {
			for (let j = i + 1; j < cartasMesa.length; j++) {
				for (let k = j + 1; k < cartasMesa.length; k++) {

					let trio = [cartasMesa[i], cartasMesa[j], cartasMesa[k]];
					if (check_trio(trio)) {
						console.log("Trio válido encontrado: ", trio);
						n_trios_validos++;
						if (return_qtd === false) {
							return true;
						}
					}
				}
			}
		}
		if (return_qtd) {
			return n_trios_validos;
		} else {
			return false;
		}
	}

	function handleSelecionarCarta(index) {

		let novaSelecao;
		const jaSelecionada = selecionadas.includes(index);

		if (jaSelecionada) {
			novaSelecao = selecionadas.filter(i => i !== index);
		} else {
			novaSelecao = selecionadas.length != 3 ? [...selecionadas, index] : [...selecionadas];
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
		// console.log("Verificando trio: ", cartas);
		for (let att of Object.keys(cartas[0])) {
			if (att === 'filename') continue; // Ignorar o atributo filename
			let aux = new Set(cartas.map(carta => carta[att]));
			// console.log(`Atributo: ${att}, Valores: ${Array.from(aux)}`);
			if (aux.size !== 1 && aux.size !== 3) {
				return false;
			}
		}
		return true;
	}

	


	return (

		<Box sx={{padding: 4}}>

			<Grid container spacing={1} justifyContent={"space-evenly"}>
				{cartasMesa.map((carta, index) => (


					<Grid key={index} onClick={() => handleSelecionarCarta(index)}>
						{/* <Carta cor={carta.cor} forma={carta.forma} num={carta.num} preenc={carta.preenc} selected={selecionadas.includes(index) ? true : false}/> */}
						{/* <Carta cor={carta.cor} forma={carta.forma} num={carta.num} preenc={carta.preenc} selected={1}/> */}

						<Box sx={{
							// width: '195px',
							height: '350px',
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
