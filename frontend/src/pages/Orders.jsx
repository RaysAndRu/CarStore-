import { Link } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"
import useDebounce from '../hooks/useDebounce';
import axios from 'axios'

function Orders() {
	const [orders, setOrders] = useState();
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	function searchOrders(lastName) {
		return axios.get('http://localhost:8080/carStore/v1/orders/search', { params: { lastName: lastName } });
	}

	function deleteOrder(order) {
		fetch('http://localhost:8080/carStore/v1/orders/delete', {
			method: 'POST',
			body: JSON.stringify(order),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err.message);
			});
	}

	useEffect(
		() => {
			if (debouncedSearchTerm) {
				searchOrders(debouncedSearchTerm).then(results => {
					setOrders(results.data);
				});
			} else {
				axios('http://localhost:8080/carStore/v1/orders')
					.then((data) => {
						setOrders(data.data);
					})
					.catch((err) => {
						console.log(err.message);
					});
			}
		},
		[debouncedSearchTerm]
	);

	return (
		<>
			<Header />
			<div className="page">
				<main className="page-elements">
					<Link to={"../main"}>
						<div className='btn btn-primary btn-block mb-4'>Вернуться</div>
					</Link>
					<Link to={"./addOrder"}>
						<div className='btn btn-primary btn-block mb-4 ms-3'>Добавить заказ</div>
					</Link>
					<Link to={"./minMax"}>
						<div className='btn btn-primary btn-block mb-4 ms-3'>Отчет о заказах</div>
					</Link>
					<div className='elements-search'>
						<input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Поиск' />
					</div>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Фамилия</th>
								<th scope="col">Имя</th>
								<th scope="col">Телефон</th>
								<th scope="col">Дата</th>
								<th scope="col">Машина</th>
								<th scope="col">Стоимость</th>
							</tr>
						</thead>
						<tbody>
							{orders && orders.map((order, index) => (
								<tr key={order.id + order.last_name}>
									<th scope="row">{index + 1}</th>
									<td>{order.last_name}</td>
									<td>{order.name}</td>
									<td>{order.phone}</td>
									<td>{order.date}</td>
									<td>{order.car}</td>
									<td>{order.cost}</td>
									<td>
										<Link to={"update/" + order.id}>
											<button className='btn btn-primary btn-block'>Изменить</button>
										</Link>
										<button onClick={() => deleteOrder(order)} className='btn btn-primary btn-block ms-3'>Удалить</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</main>
			</div>
		</>
	)
}

export default Orders;
