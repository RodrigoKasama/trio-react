// Com as informações da carta, você pode definir o filename a ser importado -

// Identificar os arquivos baseado em numeros de base 4 com 4 digitos
// Ex:
//      COR      |      FORMA     |  QUANTIDADE  | PREENCHIMENTO  | 
// 0 => Vermelho |  0 => Squiggle |   0 => Um    | 0 => Cheio     |
// 1 => Verde    |  1 => Pill     |   1 => Dois  | 1 => Listrado  | 
// 2 => Roxo     |  2 => Diamond  |   2 => Três  | 2 => Vazio     | 

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// Separar em um aquivo a parte o valor das propriedades?
const formaMap = { "Squiggle": '0', "Pill": '1', "Diamond": '2' };
const corMap = { "Red": '0', "Green": '1', "Purple": '2' };
const numMap = { 1: '0', 2: '1', 3: '2' };
const preencMap = { "Full": '0', "Striped": '1', "Empty": '2' };

const Carta = ({ cor, forma, num, preenc, click_fn, selected }) => {
	const arquivo = `${corMap[cor]}${formaMap[forma]}${preencMap[preenc]}${numMap[num]}.svg`;

	return (
		<Box
			component="button"
			type="button"
			onClick={click_fn}
			aria-label={`${num} ${forma} ${cor} ${preenc}`}
			sx={{
				border: selected ? '2px solid red' : '2px solid gray',
				borderRadius: '25px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				aspectRatio: '3/4',
				backgroundColor: 'transparent',
				padding: 0,
				cursor: 'pointer',
			}}
		>
			<img src={`/${arquivo}`} alt={`${num} ${forma} ${cor} ${preenc}`} />
		</Box>
	);
};

Carta.propTypes = {
	cor: PropTypes.string.isRequired,
	forma: PropTypes.string.isRequired,
	num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	preenc: PropTypes.string.isRequired,
	click_fn: PropTypes.func.isRequired,
	selected: PropTypes.bool.isRequired,
};

export default Carta;