import { Link, useNavigate, useParams } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"

function UpdateEmployee() {
	const [employee, setEmployee] = useState({});
	const [last_name, setLast_name] = useState("");
	const [first_name, setFirst_name] = useState("");
	const [patronymic, setPatronymic] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState(0);
	const navigate = useNavigate();
	const { id } = useParams();

	function addEmployee() {
		if (last_name && first_name && patronymic && position && salary) {
			fetch('http://localhost:8080/carStore/v1/employees/add', {
				method: 'POST',
				body: JSON.stringify({
					"id": id,
					"last_name": last_name,
					"first_name": first_name,
					"patronymic": patronymic,
					"position": position,
					"salary": salary
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then(() => {
					navigate("/success"); // Используем navigate для перенаправления
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}

	useEffect(() => {
		fetch('http://localhost:8080/carStore/v1/employees/' + id)
			.then((res) => res.json())
			.then((data) => {
				setEmployee(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [])

	useEffect(() => {
		if (employee) {
			setLast_name(employee.last_name);
			setFirst_name(employee.first_name);
			setPatronymic(employee.patronymic); // Исправлено на правильное поле
			setPosition(employee.position);
			setSalary(employee.salary);
		}
	}, [employee])

	return (
		<>
			<Header />
			<div className="page">
				<main className="page-elements">
					<Link to="../">
						<div className='btn btn-primary btn-block mb-4'>Назад</div>
					</Link>
					<form>
						<div className="form-group mt-4">
							<label htmlFor="last_name">Фамилия</label>
							<input value={last_name} onChange={(e) => { setLast_name(e.target.value) }} type="text" className="form-control" id="last_name" aria-describedby="emailHelp" placeholder="фамилия" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="first_name">Имя</label>
							<input value={first_name} onChange={(e) => { setFirst_name(e.target.value) }} type="text" className="form-control" id="first_name" placeholder="имя" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="patronymic">Отчество</label>
							<input value={patronymic} onChange={(e) => { setPatronymic(e.target.value) }} type="text" className="form-control" id="patronymic" aria-describedby="emailHelp" placeholder="отчество" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="position">Должность</label>
							<input value={position} onChange={(e) => { setPosition(e.target.value) }} type="text" className="form-control" id="position" placeholder="должность" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="salary">Зарплата</label>
							<input value={salary} onChange={(e) => { setSalary(e.target.value) }} type="number" className="form-control" id="salary" placeholder="зарплата" />
						</div>
						<Link onClick={() => addEmployee()} className="btn btn-primary mt-4">Добавить</Link>
					</form>
				</main>
			</div>
		</>
	)
}

export default UpdateEmployee
