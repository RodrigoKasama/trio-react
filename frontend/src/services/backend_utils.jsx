// services/party.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const token_name = "trio_token"

function getAuthHeader() {
	const token = localStorage.getItem(token_name);
	return { Authorization: `Bearer ${token}` };
}

// Get avaliable parties
export async function getAvailableParties() {
	try {
		// Show avaliable open parties to join
		const response = await axios.get(`${API_URL}/parties`, {
			// headers: getAuthHeader(),
		});

		if (response.status !== 200) { 
			console.error('Failed to fetch available parties:', response.statusText);
			return [];
		} else {
			return response.data.avaliable_parties;
		}

	
		
	} catch (error) {
		console.error('Error fetching available parties:', error);
		return [];
		
	}
}


export async function login(user, pass) {
	try {
		const response = await axios.post(`${API_URL}/login`,
			{ username: user, password: pass, },
			{ headers: { 'Content-Type': 'application/json', }, }
		);

		return {
			status: 200,
			message: 'Login successful',
			token: response.data.access_token
		}
		
	} catch (error) {
		if (error.response) {
			return {
				status: error.response.status,
				message: error.response.data?.message || 'Login failed',
				token: null
			};
		}
		return {
			status: 0,
			message: error.message || 'Unknown error',
			token: null
		};
	}
}



// Enter in a specific party (Join Party)
export async function getParty(partyId, pass) {
	return axios.get(`${API_URL}/party/${partyId}`, {
		headers: {
			...getAuthHeader(),
			'Party-Password': pass || '',
		},
	});

}
// Create a private party
export async function createPrivateParty() {
	return axios.post(`${API_URL}/new_party`, null, {
		headers: getAuthHeader(),
	});

}


// Edit party information and specs






export async function createParty(partyId) {
	return axios.post(`${API_URL}/create_party/${partyId}`, null, {
		headers: getAuthHeader(),
	});
}

export async function joinParty(partyId) {
	return axios.post(`${API_URL}/join_party/${partyId}`, null, {
		headers: getAuthHeader(),
	});
}

export async function getPartyMembers(partyId) {
	const response = await axios.get(`${API_URL}/party_members/${partyId}`, {
		headers: getAuthHeader(),
	});
	return response.data.members;
}
