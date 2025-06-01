import React from 'react';

// Com as informações da carta, você pode definir o filename a ser importado - 
// 			Acho que posso criar um arquivo só para essa logica de tradução de nome

const formaMap = { "Squiggle": '0', "Pill": '1', "Diamond": '2' };
const corMap = { "red": '0', "green": '1', "purple": '2' };
const numMap = { 1: '0', 2: '1', 3: '2' };
const preencMap = { "full": '0', "striped": '1', "empty": '2' };

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