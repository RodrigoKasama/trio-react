import React from "react";
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
//      COR      |      FORMA     |  QUANTIDADE  | PREENCHIMENTO  | 
// 0 => vermelho |  0 => Squiggle |   0 => Um    | 0 => completo  | 
// 1 => verde    |  1 => Pill     |   1 => Dois  | 1 => listrado  | 
// 2 => roxo     |  2 => Diamond  |   2 => Três  | 2 => vazio     | 


// Lógica das cartas (a partir do seu script original)
const formas = ["Squiggle", "Pill", "Diamond"];
const cores = ["red", "green", "purple"];
const quantidades = [1, 2, 3];
const preenchimentos = ["full", "striped", "empty"];
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
	let baralho = gerarBaralho();
	// Embaralhar o baralho
	baralho = baralho.sort(() => Math.random() - 0.5);

	return (
		<div>
			{
				baralho.slice(0, N_MESA).map((carta, index) => (
					<CartaComp
						cor={carta.cor}
						forma={carta.forma}
						num={carta.num}
						preenc={carta.preenc}
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
