import { Link } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"
import useDebounce from '../hooks/useDebounce';
import axios from 'axios'

function CarsMinMax() {
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [averagePrice, setAveragePrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [totalCars, setTotalCars] = useState(0);
	const [totalCost, setTotalCost] = useState(0);
	const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    function searchCars(title) {
        return axios.get('http://localhost:8080/carStore/v1/cars/search', { params: { title: title } });
    }

		function deleteCar(car) {
			fetch('http://localhost:8080/carStore/v1/cars/delete', {
				method: 'POST',
				body: JSON.stringify(car),
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
				searchCars(debouncedSearchTerm).then(results => {
					setCars(results.data);
					calculatePricesAndCounts(results.data);
				});
			} else {
				axios.get('http://localhost:8080/carStore/v1/cars')
				.then((data) => {
						setCars(data.data);
						calculatePricesAndCounts(data.data);
					})
				.catch((err) => {
						console.log(err.message);
					});
			}
		}, [debouncedSearchTerm]);


		const sortCars = (field, direction) => {
			let sortedCars= [...cars];
			sortedCars.sort((a, b) => {
				if (direction === "asc") {
					return a[field] > b[field]? 1 : -1;
				} else {
					return a[field] < b[field]? 1 : -1;
				}
			});
			setCars(sortedCars);
			setSortField(field);
			setSortDirection(direction);
		};

		const handleSortClick = (field) => {
			if (sortField === field && sortDirection === "asc") {
				sortCars(field, "desc");
			} else {
				sortCars(field, "asc");
			}
		};


    function calculatePricesAndCounts(carsData) {
        let totalPrice = 0;
        let minPrice = Number.MAX_SAFE_INTEGER;
        let maxPrice = 0;

        carsData.forEach(car => {
            totalPrice += car.price;
            minPrice = Math.min(minPrice, car.price);
            maxPrice = Math.max(maxPrice, car.price);
        });

        setAveragePrice(totalPrice / carsData.length || 0);
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);

        setTotalCars(carsData.length);
		setTotalCost(totalPrice);
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
									<th scope="col"> Image </th>
									<th scope="col" onClick={() => handleSortClick("title")} className={sortField === "title"? sortDirection : ""}>
										Название
										{sortField === "title" && sortDirection === "asc" && <span>&darr;</span>}
										{sortField === "title" && sortDirection === "desc" && <span>&uarr;</span>}
									</th>
									<th scope="col" onClick={() => handleSortClick("price")} className={sortField === "price"? sortDirection : ""}>
										Цена
										{sortField === "price" && sortDirection === "asc" && <span>&darr;</span>}
										{sortField === "price" && sortDirection === "desc" && <span>&uarr;</span>}
									</th>
									<th scope="col" onClick={() => handleSortClick("color")} className={sortField === "color"? sortDirection : ""}>
										Цвет
										{sortField === "color" && sortDirection === "asc" && <span>&darr;</span>}
										{sortField === "color" && sortDirection === "desc" && <span>&uarr;</span>}
									</th>
									<th scope="col" onClick={() => handleSortClick("power")} className={sortField === "power"? sortDirection : ""}>
										Мощность
										{sortField === "power" && sortDirection === "asc" && <span>&darr;</span>}
										{sortField === "power" && sortDirection === "desc" && <span>&uarr;</span>}
									</th>
								</tr>
							</thead>
                        <tbody>
                            {cars.map((car, index) => (
                                <tr key={car.id + car.title}>
                                    <th scope="row">{index + 1}</th>
                                    <td><img src={car.image} width="60px" height="60px" alt="car" /></td>
                                    <td>{car.title}</td>
									<td>{car.price}</td>
                                    <td>{car.color}</td>
                                    <td>{car.power}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="summary">
                        <p>Средняя цена: {averagePrice.toFixed(2)}</p>
                        <p>Мин цена: {minPrice}</p>
                        <p>Макс цена: {maxPrice}</p>
                        <p>Количество машин: {totalCars}</p>
						<p>Итоговая стоимость: {totalCost}</p>
                    </div>
                </main>
            </div>
        </>
    )
}

export default CarsMinMax
