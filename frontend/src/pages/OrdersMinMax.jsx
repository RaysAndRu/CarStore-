import { Link } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"
import useDebounce from '../hooks/useDebounce';
import axios from 'axios'

function OrdersMinMax() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [averageCost, setAverageCost] = useState(0);
    const [minCost, setMinCost] = useState(0);
    const [maxCost, setMaxCost] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

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

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchOrders(debouncedSearchTerm).then(results => {
                setOrders(results.data);
                calculateCostsAndCounts(results.data);
            });
        } else {
            axios.get('http://localhost:8080/carStore/v1/orders')
           .then((data) => {
                    setOrders(data.data);
                    calculateCostsAndCounts(data.data);
                })
           .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [debouncedSearchTerm]);

    const sortOrders = (field, direction) => {
        let sortedOrders= [...orders];
        sortedOrders.sort((a, b) => {
            if (direction === "asc") {
                return a[field] > b[field]? 1 : -1;
            } else {
                return a[field] < b[field]? 1 : -1;
            }
        });
        setOrders(sortedOrders);
        setSortField(field);
        setSortDirection(direction);
    };

    const handleSortClick = (field) => {
        if (sortField === field && sortDirection === "asc") {
            sortOrders(field, "desc");
        } else {
            sortOrders(field, "asc");
        }
    };

    function calculateCostsAndCounts(ordersData) {
        let totalCost = 0;
        let minCost = Number.MAX_SAFE_INTEGER;
        let maxCost = 0;

        ordersData.forEach(order => {
            totalCost += parseInt(order.cost);
            minCost = Math.min(minCost, order.cost);
            maxCost = Math.max(maxCost, order.cost);
        });

        setAverageCost(totalCost / ordersData.length || 0);
        setMinCost(minCost);
        setMaxCost(maxCost);

        setTotalOrders(ordersData.length);
        setTotalCost(totalCost);
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
                        placeholder='Поиск'
                    />
                </div>
                    <table className="table">
						<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col" onClick={() => handleSortClick("surname")} 
										className={sortField === "surname"? sortDirection : ""}>
										Фамилия
										{sortField === "surname" && sortDirection === "asc" && <span>&darr;</span>}
										{sortField === "surname" && sortDirection === "desc" && <span>&uarr;</span>}
									</th>
									<th scope="col" onClick={() => handleSortClick("name")} 
										className={sortField === "name"? sortDirection : ""}>
										Имя
										{sortField === "name" && sortDirection === "asc" && <span>&darr;</span>}
										{sortField === "name" && sortDirection === "desc" && <span>&uarr;</span>}
									</th>
									<th scope="col" onClick={() => handleSortClick("phone")} 
										className={sortField === "phone"? sortDirection : ""}>
										Телефон
										{sortField === "phone" && sortDirection === "asc" && <span>&darr;</span>}
										{sortField === "phone" && sortDirection === "desc" && <span>&uarr;</span>}
									</th>
									<th scope="col" onClick={() => handleSortClick("date")} 
										className={sortField === "date"? sortDirection : ""}>
										Дата
										{sortField === "date" && sortDirection === "asc" && <span>&darr;</span>}
										{sortField === "date" && sortDirection === "desc" && <span>&uarr;</span>}
									</th>
									<th scope="col" onClick={() => handleSortClick("car")} 
										className={sortField === "car"? sortDirection : ""}>
										Автомобиль
										{sortField === "car" && sortDirection === "asc" && <span>&darr;</span>}
										{sortField === "car" && sortDirection === "desc" && <span>&uarr;</span>}
									</th>
									<th scope="col" onClick={() => handleSortClick("cost")} 
										className={sortField === "cost"? sortDirection : ""}>
										Цена
										{sortField === "cost" && sortDirection === "asc" && <span>&darr;</span>}
										{sortField === "cost" && sortDirection === "desc" && <span>&uarr;</span>}
									</th>
								</tr>
							</thead>

                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id + order.last_name}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{order.last_name}</td>
                                    <td>{order.name}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.date}</td>
                                    <td>{order.car}</td>
                                    <td>{order.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="summary">
                        <p>Средняя цена: {averageCost.toFixed(2)}</p>
                        <p>Минимальная цена: {minCost}</p>
                        <p>Максимальная цена: {maxCost}</p>
                        <p>Общее количество заказов: {totalOrders}</p>
						<p>Общая сумма: {totalCost}</p>
                    </div>
                </main>
            </div>
        </>
    )
}

export default OrdersMinMax
