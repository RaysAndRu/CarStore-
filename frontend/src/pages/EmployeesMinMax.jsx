import { Link } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"
import useDebounce from '../hooks/useDebounce';
import axios from 'axios'

function EmployeesMinMax() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [averageSalary, setAverageSalary] = useState(0);
    const [minSalary, setMinSalary] = useState(0);
    const [maxSalary, setMaxSalary] = useState(0);
    const [positionsCount, setPositionCount] = useState({});
    const [totalEmployees, setTotalEmployees] = useState(0);
	const [totalSalary, setTotalSalary] = useState(0);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

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

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchEmployees(debouncedSearchTerm).then(results => {
                setEmployees(results.data);
                calculateSalariesAndPositions(results.data);
            });
        } else {
            axios.get('http://localhost:8080/carStore/v1/employees')
               .then((data) => {
                    setEmployees(data.data);
                    calculateSalariesAndPositions(data.data);
                })
               .catch((err) => {
                    console.log(err.message);
                });
        }
		
    }, [debouncedSearchTerm]);

	 // Получение начальных данных о сотрудниках
	 useEffect(() => {
        axios.get('http://localhost:8080/carStore/v1/employees')
         .then((data) => {
                setEmployees(data.data);
                calculateSalariesAndPositions(data.data);
            })
         .catch((err) => {
                console.log(err.message);
            });
    }, []);

    

   

	const sortEmployees = (field, direction) => {
        let sortedEmployees = [...employees];
        sortedEmployees.sort((a, b) => {
            if (direction === "asc") {
                return a[field] > b[field]? 1 : -1;
            } else {
                return a[field] < b[field]? 1 : -1;
            }
        });
        setEmployees(sortedEmployees);
        setSortField(field);
        setSortDirection(direction);
    };

	const handleSortClick = (field) => {
        if (sortField === field && sortDirection === "asc") {
            sortEmployees(field, "desc");
        } else {
            sortEmployees(field, "asc");
        }
    };


    function calculateSalariesAndPositions(employeesData) {
        let totalSalary = 0;
        let minSalary = Number.MAX_SAFE_INTEGER;
        let maxSalary = 0;

        employeesData.forEach(employee => {
            totalSalary += employee.salary;
            minSalary = Math.min(minSalary, employee.salary);
            maxSalary = Math.max(maxSalary, employee.salary);
        });

        setAverageSalary(totalSalary / employeesData.length || 0);
        setMinSalary(minSalary);
        setMaxSalary(maxSalary);
		setTotalSalary(totalSalary);

        const positions = {};
        employeesData.forEach(employee => {
            if (!positions[employee.position]) {
                positions[employee.position] = 1;
            } else {
                positions[employee.position]++;
            }
        });

        setPositionCount(positions);
        setTotalEmployees(employeesData.length);
    }

	
	return (
		<>
			<div className="page">
				<main className="page-elements">
				<div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search'
                    />
                </div>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col" onClick={() => handleSortClick("lastName")} 
									 className={sortField === "lastName"? sortDirection : ""}>
									Фамилия
									{sortField === "lastName" && sortDirection === "asc" && <span>&darr;</span>}
									{sortField === "lastName" && sortDirection === "desc" && <span>&uarr;</span>}
								</th>
								<th scope="col" onClick={() => handleSortClick("firstName")} 
									 className={sortField === "firstName"? sortDirection : ""}>
									Имя
									{sortField === "firstName" && sortDirection === "asc" && <span>&darr;</span>}
									{sortField === "firstName" && sortDirection === "desc" && <span>&uarr;</span>}
								</th>
								<th scope="col" onClick={() => handleSortClick("patronymic")} 
									 className={sortField === "patronymic"? sortDirection : ""}>
									Отчество
									{sortField === "patronymic" && sortDirection === "asc" && <span>&darr;</span>}
									{sortField === "patronymic" && sortDirection === "desc" && <span>&uarr;</span>}
								</th>
								<th scope="col" onClick={() => handleSortClick("position")} 
									 className={sortField === "position"? sortDirection : ""}>
									Должность
									{sortField === "position" && sortDirection === "asc" && <span>&darr;</span>}
									{sortField === "position" && sortDirection === "desc" && <span>&uarr;</span>}
								</th>
								<th scope="col" onClick={() => handleSortClick("salary")} 
									 className={sortField === "salary"? sortDirection : ""}>
									Зарплата
									{sortField === "salary" && sortDirection === "asc" && <span>&darr;</span>}
									{sortField === "salary" && sortDirection === "desc" && <span>&uarr;</span>}
								</th>
							</tr>
						</thead>
						<tbody>
							{employees.map((employee, index) => (
								<tr key={employee.id + employee.last_name}>
									<th scope="row">{index + 1}</th>
									<td>{employee.last_name}</td>
									<td>{employee.first_name}</td>
									<td>{employee.patronymic}</td>
									<td>{employee.position}</td>
									<td>{employee.salary}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="summary">
						<p>Средняя зарплата: {averageSalary.toFixed(2)}</p>
						<p>Минимальная зарплата: {minSalary}</p>
						<p>Максимальная зарплата: {maxSalary}</p>
						<ul>
							{Object.entries(positionsCount).map(([position, count], index) => (
								<li key={index}>{`${position}: ${count}`}</li>
							))}
						</ul>
						<p>Количество сотрудников: {totalEmployees}</p>
						<p>Итоговая зарплата: {totalSalary}</p>
					</div>
				</main>
			</div>
		</>
	)
}

export default EmployeesMinMax