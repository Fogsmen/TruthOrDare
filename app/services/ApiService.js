const API_URL = 'https://second-test.btcrade.io/backend.php';

export const login = async(email, password) => {
	return fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ action: 'login', email, password })
	});
};

export const register = async(email, name, password) => {
	return fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ action: 'register', email, name, password })
	});
};

export const loadDares = async(email) => {
	return fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ action: 'get_dares', email: email })
	});
};

export const updateDare = async(id, content, shot) => {
	return fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ action: 'update_dare', id, content, shot })
	});
};

export const deleteDare = async(id) => {
	return fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ action: 'delete_dare', id })
	});
};

export const createDare = async(email, content, shot) => {
	return fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ action: 'create_dare', email, content, shot })
	});
};
