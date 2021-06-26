import axios from "axios";
import api from "../utils/api"

export const LOGIN_URL = api + 'login';
export const REGISTER_URL = api + 'usuario';
export const FORGOT_PASSWORD = api + 'reqresetpassword';
export const RESET_PASSWORD = api + 'resetpassword';

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(
	email,
	fullname,
	telefono,
	tipo,
	username,
	password,
	compania,
	categoria,
	direccion,
) {
	console.log(
		email,
		fullname,
		tipo,
		password
	)
	return axios.post(REGISTER_URL, {
			email,
			fullname,
			telefono,
			username,
			tipo,
			password,
			compania,
			categoria,
			direccion
		});
	}

export function forgotPassword(email) {
  return axios.post(FORGOT_PASSWORD + `/${email}`);
}

export function resetPassword(email, password) {
	return axios.put(RESET_PASSWORD + `/${email}`, {password})
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
