import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const handleLogin = () => {
		if (email && password) {
			fetch('http://localhost:3001/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			})
				.then(response => response.json())
				.then(data => {
					console.log('Success:', data);
					if (data.token) {
						localStorage.setItem('token', data.token);
						// Aquí también podrías actualizar el estado de tu aplicación o redirigir al usuario a otra página
					}
				})
				.catch((error) => {
					console.error('Error:', error);
					// Manejo de errores (mostrar un mensaje de error, etc.)
				});
		} else {
			console.error('Please enter both email and password');
			// Podrías mostrar un mensaje de error en la interfaz de usuario aquí
		}
	};

	const handleRegister = () => {
		if (email && password) {
			fetch('http://localhost:3001/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, isAdmin }),
			})
				.then(response => response.json())
				.then(data => {
					console.log('Success:', data);
					if (data.token) {
						localStorage.setItem('token', data.token);
						// Aquí podrías, por ejemplo, notificar al usuario de que el registro fue exitoso y redirigirlo a la página de inicio de sesión
					}
				})
				.catch((error) => {
					console.error('Error:', error);
					// Manejo de errores (mostrar un mensaje de error, etc.)
				});
		} else {
			console.error('Please enter both email and password');
			// Podrías mostrar un mensaje de error en la interfaz de usuario aquí
		}
	};


	return (
		<div className="text-center mt-5">
			<h1>Ingreso administradores</h1>
			<p>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					style={{ width: "200px", textAlign: "center" }}
				/>
			</p>
			<p>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					style={{ width: "200px", textAlign: "center" }}
				/>
			</p>
			<p>
				<label>
					<input
						type="checkbox"
						checked={isAdmin}
						onChange={e => setIsAdmin(e.target.checked)}
					/>
					Register as Admin
				</label>
			</p>
			<p>
				<button onClick={handleLogin}>Login</button>
				<button onClick={handleRegister}>Register</button>
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
