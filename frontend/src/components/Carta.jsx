import React from 'react';
import PropTypes from 'prop-types';
import card from '../assets/img.svg';


const Carta = ({ cor, forma, num, preenc }) => {


	// Com as informações da carta, você pode definir o filename a ser importado - 
	// 			Acho que posso criar um arquivo só para essa logica de tradução de nome

	const corMap = { "vermelho": '0', "verde": '1', "roxo": '2' };
	const formaMap = { "tri": '0', "redo": '1', "oval": '2' };
	const numMap = { 1: '0', 2: '1', 3: '2' };
	const preencMap = { "cheio": '0', "listrado": '1', "vazio": '2' };

	const arquivo = `${corMap[cor]}${formaMap[forma]}${numMap[num]}${preencMap[preenc]}.svg`;

	console.log("Arquivo da carta:", arquivo);

	const cartaStyle = {
		// backgroundColor: cor,
		aspectRatio: '3/4',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '2px solid black',
		borderRadius: '8px',
		padding: '10px',
		boxSizing: 'border-box',
		width: '12%',
	};

	return (
		<img src={"../assets/" + arquivo} alt="carta" style={cartaStyle} />
	);
};

// Carta.propTypes = {
// 	numero: PropTypes.number.isRequired,
// 	cor: PropTypes.string.isRequired,
// 	preenchimento: PropTypes.oneOf(['cheio', 'vazio']).isRequired,
// 	formato: PropTypes.oneOf(['oval', 'retangular']).isRequired,
// };

export default Carta;