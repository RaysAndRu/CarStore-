import { Link } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"
import useDebounce from '../hooks/useDebounce';
import axios from 'axios'


function Employees() {
	const [employees, setEmployees] = useState();
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	function searchEmployees(lastName) {
		return axios.get('http://localhost:8080/carStore/v1/employees/search', { params: { lastName: lastName } });
	}

	function deleteEmployee(employee) {
		fetch('http://localhost:8080/carStore/v1/employees/delete', {
			method: 'POST',
			body: JSON.stringify(employee),
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
				searchEmployees(debouncedSearchTerm).then(results => {
					setEmployees(results.data);
				});
			} else {
				axios('http://localhost:8080/carStore/v1/employees')
					.then((data) => {
						setEmployees(data.data);
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
						<div className='btn btn-primary btn-block mb-4'>Вернуться назад</div>
					</Link>
					<Link to={"./addEmployee"}>
						<div className='btn btn-primary btn-block mb-4 ms-3'>Добавить сотрудника</div>
					</Link>
					<Link to={"./minmax"}>
						<div className='btn btn-primary btn-block mb-4 ms-3'>Отчет по сотрудникам</div>
					</Link>
					<div className='elements-search'>
						<input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search' />
					</div>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Фамилия</th>
								<th scope="col">Имя</th>
								<th scope="col">Отчество</th>
								<th scope="col">Должность</th>
								<th scope="col">Зарплата</th>
							</tr>
						</thead>
						<tbody>
							{employees && employees.map((employee, index) => (
								<tr key={employee.id + employee.last_name}>
									<th scope="row">{index + 1}</th>
									<td>{employee.last_name}</td>
									<td>{employee.first_name}</td>
									<td>{employee.patronymic}</td>
									<td>{employee.position}</td>
									<td>{employee.salary}</td>
									<td>
										<Link to={"update/" + employee.id}>
											<button className='btn btn-primary btn-block'>Изменить</button>
										</Link>
										<button onClick={() => deleteEmployee(employee)} className='btn btn-primary btn-block ms-3'>Удалить</button>
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

export default Employees
