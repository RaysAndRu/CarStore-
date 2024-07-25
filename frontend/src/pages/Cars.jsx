import { Link } from 'react-router-dom';
import '../assets/css/Employees.css';
import Header from "./Header";
import { useEffect, useState } from "react";
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';

function Cars() {
    const [cars, setСars] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    function searchCar(title) {
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
            searchCar(debouncedSearchTerm).then(results => {
                setСars(results.data);
            });
        } else {
            axios.get('http://localhost:8080/carStore/v1/cars')
                .then((data) => {
                    setСars(data.data);
                }) 
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [debouncedSearchTerm]);

    return (
        <>
            <Header />
            <div className="container my-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="../main">
                        <button className='btn btn-secondary'>Вернуться назад</button>
                    </Link>
                    <Link to={"./minMax"}>
                        <div className='btn btn-primary btn-block mb-4 ms-3'>Отчеты по машинам</div>
                    </Link>
                    <Link to="./addCar">
                        <button className='btn btn-primary'>Добавить машину</button>
                    </Link>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search'
                    />
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {cars && cars.map((car, index) => (
                        <div key={car.id + car.name} className="col">
                            <div className="card h-100">
                                <img src={car.image} className="card-img-top" width="100%" height="200px" alt="car" />
                                <div className="card-body">
                                    <h5 className="card-title">{car.title}</h5>
                                    <p className="card-text">Цвет: {car.color}</p>
                                    <p className="card-text">Мощность: {car.power} л.с.</p>
                                    <p className="card-text">Цена: {car.price}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-between">
                                    <Link to={"detail/" + car.id}>
                                            <button className='btn btn-warning btn-sm'>Детали</button>
                                        </Link>
                                        <Link to={"update/" + car.id}>
                                            <button className='btn btn-warning btn-sm'>Изменить</button>
                                        </Link>
                                        <button
                                            onClick={() => deleteCar(car)}
                                            className='btn btn-danger btn-sm'
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Cars;