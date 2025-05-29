import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";

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

class Carta {
	constructor(id, forma, cor, quantidade, preenchimento) {
		this.id = id;
		this.forma = forma;
		this.cor = cor;
		this.quantidade = quantidade;
		this.preenchimento = preenchimento;
	}

	// gerarElemento(onClick) {
	// 	const canvas = document.createElement("canvas");
	// 	canvas.className = "carta-canvas";
	// 	canvas.width = 100;
	// 	canvas.height = 140;
	// 	canvas.dataset.id = this.id;

	// 	canvas.addEventListener("click", () => onClick(this, canvas));
	// 	this.desenhar(canvas.getContext("2d"));

	// 	return canvas;
	// }

	// desenhar(ctx) {
	// 	ctx.clearRect(0, 0, 100, 140);
	// 	const yEspaco = 40;
	// 	const yInicio = (140 - (this.quantidade - 1) * yEspaco) / 2;
	// 	for (let i = 0; i < this.quantidade; i++) {
	// 		const y = yInicio + i * yEspaco;
	// 		this.desenharForma(ctx, 50, y);
	// 	}
	// }

	// desenharForma(ctx, x, y) {
	// 	ctx.save();
	// 	ctx.translate(x, y);
	// 	ctx.strokeStyle = this.cor;
	// 	ctx.fillStyle = this.cor;
	// 	ctx.beginPath();
	// 	if (this.forma === "🔺") {
	// 		ctx.moveTo(0, -10);
	// 		ctx.lineTo(10, 10);
	// 		ctx.lineTo(-10, 10);
	// 		ctx.closePath();
	// 	} else if (this.forma === "⚫") {
	// 		ctx.arc(0, 0, 10, 0, 2 * Math.PI);
	// 	} else if (this.forma === "⬛") {
	// 		ctx.rect(-10, -10, 20, 20);
	// 	}

	// 	if (this.preenchimento === "completo") {
	// 		ctx.fill();
	// 	} else if (this.preenchimento === "vazado") {
	// 		ctx.stroke();
	// 	} else if (this.preenchimento === "listrado") {
	// 		ctx.clip();
	// 		for (let i = -10; i <= 10; i += 4) {
	// 			ctx.beginPath();
	// 			ctx.moveTo(-10, i);
	// 			ctx.lineTo(10, i);
	// 			ctx.stroke();
	// 		}
	// 		ctx.beginPath();
	// 		if (this.forma === "🔺") {
	// 			ctx.moveTo(0, -10);
	// 			ctx.lineTo(10, 10);
	// 			ctx.lineTo(-10, 10);
	// 			ctx.closePath();
	// 		} else if (this.forma === "⚫") {
	// 			ctx.arc(0, 0, 10, 0, 2 * Math.PI);
	// 		} else if (this.forma === "⬛") {
	// 			ctx.rect(-10, -10, 20, 20);
	// 		}
	// 		ctx.stroke();
	// 	}
	// 	ctx.restore();
	// }
}

function gerarBaralho() {
	const baralho = [];
	let id = 0;
	for (const forma of formas) {
		for (const cor of cores) {
			for (const quantidade of quantidades) {
				for (const preenchimento of preenchimentos) {
					baralho.push(new Carta(id++, forma, cor, quantidade, preenchimento));
				}
			}
		}
	}
	return baralho;
}

export default function OfflinePage() {
	
	const containerRef = useRef(null);
	const baralhoRef = useRef([]);
	const mesaRef = useRef([]);

	useEffect(() => {
		let baralho = gerarBaralho().sort(() => Math.random() - 0.5);
		let mesa = baralho.splice(0, N_MESA);

		// Garante que haja trio válido
		while (!existeTrioValidoNaMesa(mesa)) {
			baralho = gerarBaralho().sort(() => Math.random() - 0.5);
			mesa = baralho.splice(0, N_MESA);
		}

		baralhoRef.current = baralho;
		mesaRef.current = mesa;
		renderizarMesa(mesa);
	}, []);

	function renderizarMesa(mesa) {
		const mesaDiv = containerRef.current;
		mesaDiv.innerHTML = "";
		mesa.forEach((carta) => {
			const el = carta.gerarElemento(() => { }); // clique vazio por enquanto
			mesaDiv.appendChild(el);
		});
	}

	function existeTrioValidoNaMesa(mesa) {
		for (let i = 0; i < mesa.length - 2; i++) {
			for (let j = i + 1; j < mesa.length - 1; j++) {
				for (let k = j + 1; k < mesa.length; k++) {
					const trio = [mesa[i], mesa[j], mesa[k]];
					if (verificarTrio(trio)) return true;
				}
			}
		}
		return false;
	}

	function verificarTrio(cartas) {
		const atributos = ["forma", "cor", "quantidade", "preenchimento"];
		return atributos.every((attr) => {
			const valores = cartas.map((c) => c[attr]);
			const set = new Set(valores);
			return set.size === 1 || set.size === 3;
		});
	}

	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				bgcolor: "#f3e5f5",
				p: 2,
			}}
		>
			<Box
				ref={containerRef}
				id="mesa"
				sx={{
					width: "100%",
					maxWidth: 1000,
					display: "grid",
					gap: 2,
					gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
					justifyItems: "center",
					alignContent: "center",
				}}
			/>
		</Box>
	);
}
