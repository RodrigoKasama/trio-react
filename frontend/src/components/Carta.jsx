// Com as informações da carta, você pode definir o filename a ser importado -

// Identificar os arquivos baseado em numeros de base 4 com 4 digitos
// Ex:
//      COR      |      FORMA     |  QUANTIDADE  | PREENCHIMENTO  | 
// 0 => Vermelho |  0 => Squiggle |   0 => Um    | 0 => Cheio     |
// 1 => Verde    |  1 => Pill     |   1 => Dois  | 1 => Listrado  | 
// 2 => Roxo     |  2 => Diamond  |   2 => Três  | 2 => Vazio     | 

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

// Separar em um aquivo a parte o valor das propriedades?
const formaMap = { "Squiggle": '0', "Pill": '1', "Diamond": '2' };
const corMap = { "Red": '0', "Green": '1', "Purple": '2' };
const numMap = { 1: '0', 2: '1', 3: '2' };
const preencMap = { "Full": '0', "Striped": '1', "Empty": '2' };

const Carta = ({ cor, forma, num, preenc, click_fn, selected }) => {

	const arquivo = corMap[cor] + formaMap[forma] + preencMap[preenc] + numMap[num] + ".svg";

	const cartaStyle = {
		// aspectRatio: '3/4',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// width: '150px',
		border: '1px solid gray',
		borderRadius: '25px',
	};


	// Recriar renderização da carta
	// Envolver a imagem em um div com estilo
	// Icone SVG menor e no meio da carta

	return (
		// Borda da carta
		<Box sx={{
			border: selected ? '2px solid red' : '2px solid gray',
			borderRadius: '25px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			aspectRatio: '3/4',
		}}>
			<img src={`/0000.svg`} alt={`${num} ${forma} ${cor} ${preenc}`} onClick={click_fn} />

		</Box>

		// <div style={cartaStyle} >
		// 	{/* Conteudo da carta */}
		// </div>
	);
};

export default Carta;