// Com as informações da carta, você pode definir o filename a ser importado -

// Identificar os arquivos baseado em numeros de base 4 com 4 digitos
// Ex:
//      COR      |      FORMA     |  QUANTIDADE  | PREENCHIMENTO  | 
// 0 => Vermelho |  0 => Squiggle |   0 => Um    | 0 => Cheio     |
// 1 => Verde    |  1 => Pill     |   1 => Dois  | 1 => Listrado  | 
// 2 => Roxo     |  2 => Diamond  |   2 => Três  | 2 => Vazio     | 

import React from 'react';

// Separar em um aquivo a parte o valor das propriedades?
const formaMap = { "Squiggle": '0', "Pill": '1', "Diamond": '2' };
const corMap = { "Red": '0', "Green": '1', "Purple": '2' };
const numMap = { 1: '0', 2: '1', 3: '2' };
const preencMap = { "Full": '0', "Striped": '1', "Empty": '2' };

const Carta = ({ cor, forma, num, preenc }) => {
	
	const arquivo = corMap[cor] + formaMap[forma] + preencMap[preenc] + numMap[num] + ".svg";

	const cartaStyle = {
		// aspectRatio: '3/4',
		display: 'flex',
		// justifyContent: 'center',
		// alignItems: 'center',
		// border: '2px solid black',
		// borderRadius: '8px',
		// padding: '10px',
		// boxSizing: 'border-box',
		width: '150px',
	};


	return (
		<img src={`/public/${arquivo}`} alt="carta" style={cartaStyle} />
	);
};

export default Carta;