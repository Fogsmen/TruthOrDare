const API_URL = 'https://second-test.btcrade.io/backend.php';

export const login = async(email, password) => {
	return fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: JSON.stringify({ action: 'login', email, password })
	});
};

export const register = async(email, name, password) => {
	return fetch(`${API_URL}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: JSON.stringify({ action: 'register', email, name, password })
	});
};
