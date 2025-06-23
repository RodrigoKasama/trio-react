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
	// Show avaliable open parties to join
	const response = await axios.get(`${API_URL}/parties`, {
		headers: getAuthHeader(),
	});
	return response.data.parties;
}


export async function login(payload) { 
	return axios.post(`${API_URL}/login`, payload, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
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
