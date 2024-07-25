import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"


function AddOrder() {
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [date, setDate] = useState("");
	const [car, setCar] = useState("");
	const [cost, setCost] = useState("");
	const navigate = useNavigate();

	function addOrder() {
		if (name && lastName && phone && date && car && cost) {
			fetch('http://localhost:8080/carStore/v1/orders/add', {
				method: 'POST',
				body: JSON.stringify({
					"name": name,
					"last_name": lastName,
					"phone": phone,
					"date": date,
					"car": car,
					"cost": cost
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then((data) => {
					if (data.status == 200) {
						window.location.replace("../../success");
					}
					else {
						window.location.replace("../../error");
					}
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}

	return (
		<>
			<Header />
			<div className="page">
				<main className="page-elements">
					<Link to={"../"}>
						<div className='btn btn-primary btn-block mb-4'>Вернуться назад</div>
					</Link>
					<form>
						<div className="form-group mt-4">
							<label htmlFor="surname">Фамилия</label>
							<input value={lastName} onChange={(e) => { setLastName(e.target.value) }} type="text" className="form-control" id="surname" aria-describedby="emailHelp" placeholder="фамилия" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="name">Имя</label>
							<input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" id="name" placeholder="имя" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="phone">Телефон</label>
							<input value={phone} onChange={(e) => { setPhone(e.target.value) }} type="text" className="form-control" id="phone" aria-describedby="emailHelp" placeholder="телефон" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="date">Дата заказа</label>
							<input value={date} onChange={(e) => { setDate(e.target.value) }} type="text" className="form-control" id="date" placeholder="дата заказа" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="car">Машина</label>
							<input value={car} onChange={(e) => { setCar(e.target.value) }} type="text" className="form-control" id="car" aria-describedby="emailHelp" placeholder="машина" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="cost">Стоимость</label>
							<input value={cost} onChange={(e) => { setCost(e.target.value) }} type="text" className="form-control" id="cost" aria-describedby="emailHelp" placeholder="стоимость" />
						</div>
						<Link onClick={() => addOrder()} className="btn btn-primary mt-4">Добавить</Link>
					</form>
				</main>
			</div>
		</>
	)
}

export default AddOrder
