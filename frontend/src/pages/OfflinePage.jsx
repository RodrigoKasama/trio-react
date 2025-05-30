import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import CartaComp from "../components/Carta.jsx";

// Jogo trio offline
// Criando um baralho
// Embaralhando e Passando ao baralho
// Dado um baralho, vamos preencher a mesa
// Tiver 3 cartas selecionadas, vamos verificar se formam um trio
// Caso forme, vamos substituir as cartas,
// de acordo com o estado da mesa 


// TODO: Adaptar imagem para svg? (Identificar os arquivos com numeros de base 4 com 4 digitos)
// Ex:
//      COR      |   FORMA   |  QUANTIDADE  | PREENCHIMENTO  | 
// 0 => vermelho |  0 => 🔺  |   0 => Um    | 0 => completo  | 
// 1 => verde    |  1 => ⚫  |   1 => Dois  | 1 => listrado  | 
// 2 => roxo     |  2 => ⬛  |   2 => Três  | 2 => vazio     | 

// 0000.svg - vermelho 🔺 1 completo
// 0001.svg - vermelho 🔺 1 listrado
// 0002.svg - vermelho 🔺 1 vazio
// 0011.svg - vermelho 🔺 2 listrado



// Lógica das cartas (a partir do seu script original)
const formas = ["🔺", "⚫", "⬛"];
const cores = ["red", "green", "purple"];
const quantidades = [1, 2, 3];
const preenchimentos = ["completo", "listrado", "vazado"];
const N_MESA = 12;


function gerarBaralho() {
	const baralho = [];
	for (const forma of formas) {
		for (const cor of cores) {
			for (const quantidade of quantidades) {
				for (const preenchimento of preenchimentos) {
					baralho.push({ forma:forma, cor:cor, num:quantidade, preenc:preenchimento});
				}
			}
		}
	}
	return baralho;
}

export default function OfflinePage() {
	
	// const containerRef = useRef(null);
	// const baralhoRef = useRef([]);
	// const mesaRef = useRef([]);

	// useEffect(() => {
	// 	// let baralho = gerarBaralho().sort(() => Math.random() - 0.5);
	// 	// let mesa = baralho.splice(0, N_MESA);

	// 	// // Garante que haja trio válido
	// 	// while (!existeTrioValidoNaMesa(mesa)) {
	// 	// 	baralho = gerarBaralho().sort(() => Math.random() - 0.5);
	// 	// 	mesa = baralho.splice(0, N_MESA);
	// 	// }

	// 	// baralhoRef.current = baralho;
	// 	// mesaRef.current = mesa;
	// 	// renderizarMesa(mesa);
	// }, []);

	// function renderizarMesa(mesa) {
	// 	const mesaDiv = containerRef.current;
	// 	mesaDiv.innerHTML = "";
	// 	mesa.forEach((carta) => {
	// 		const el = carta.gerarElemento(() => { }); // clique vazio por enquanto
	// 		mesaDiv.appendChild(el);
	// 	});
	// }

	// function existeTrioValidoNaMesa(mesa) {
	// 	for (let i = 0; i < mesa.length - 2; i++) {
	// 		for (let j = i + 1; j < mesa.length - 1; j++) {
	// 			for (let k = j + 1; k < mesa.length; k++) {
	// 				const trio = [mesa[i], mesa[j], mesa[k]];
	// 				if (verificarTrio(trio)) return true;
	// 			}
	// 		}
	// 	}
	// 	return false;
	// }

	// function verificarTrio(cartas) {
	// 	const atributos = ["forma", "cor", "quantidade", "preenchimento"];
	// 	return atributos.every((attr) => {
	// 		const valores = cartas.map((c) => c[attr]);
	// 		const set = new Set(valores);
	// 		return set.size === 1 || set.size === 3;
	// 	});
	// }

	return (
		<div>
			{
				// Array.from({ length: N_MESA }).map((_, index) => (
				// <CartaComp
				// 	cor="verde"
				// 	forma="redo"
				// 	num={3}
				// 	preenc="cheio"
				// 	key={index} />
				// ))

				gerarBaralho().slice(0, N_MESA).map((carta, index) => (
					<CartaComp
						cor={carta.cor}
						forma={carta.forma}
						num={carta.quantidade}
						preenc={carta.preenchimento}
						key={index} />
				))

			}
			
		

		</div>
		
		// <Box
		// 	sx={{
		// 		height: "100vh",
		// 		display: "flex",
		// 		justifyContent: "center",
		// 		alignItems: "center",
		// 		bgcolor: "#f3e5f5",
		// 		p: 2,
		// 	}}
		// >
		// 	<Box
		// 		ref={containerRef}
		// 		id="mesa"
		// 		sx={{
		// 			width: "100%",
		// 			maxWidth: 1000,
		// 			display: "grid",
		// 			gap: 2,
		// 			gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
		// 			justifyItems: "center",
		// 			alignContent: "center",
		// 		}}
		// 	/>
		// </Box>
	);
}
