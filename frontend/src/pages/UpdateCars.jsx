import { Link, useNavigate, useParams } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"


function UpdateCar() {
	const [car, setCar] = useState("");
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [color, setColor] = useState("");
	const [power, setPower] = useState("");
	const [price, setPrice] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

	function addCar() {
		if (title && color && power && price && image) {
			fetch('http://localhost:8080/carStore/v1/cars/add', {
				method: 'POST',
				body: JSON.stringify({
					"id": id,
					"title": title,
					"image": image,
					"color": color,
					"power": power,
					"price": price,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then(() => {
					window.location.replace("../../success");
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}

	useEffect(() => {
		fetch('http://localhost:8080/carStore/v1/cars/' + id)
			.then((res) => res.json())
			.then((data) => {
				setCar(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [])
	useEffect(() => {
		setTitle(car.title);
		setColor(car.color);
		setPower(car.power);
		setPrice(car.price);
		setImage(car.image);
	}, [car])

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
								<label htmlFor="image">Фото</label>
								<input value={image} onChange={(e) => { setImage(e.target.value) }} type="text" className="form-control" id="image" aria-describedby="emailHelp" placeholder="фото" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="title">Название</label>
							<input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="название" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="color">Цвет</label>
							<input value={color} onChange={(e) => { setColor(e.target.value) }} type="text" className="form-control" id="authors" placeholder="цвет" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="power">Мощность</label>
							<input value={power} onChange={(e) => { setPower(e.target.value) }} type="text" className="form-control" id="power" aria-describedby="emailHelp" placeholder="мощность" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="price">Цена</label>
							<input value={price} onChange={(e) => { setPrice(e.target.value) }} type="text" className="form-control" id="price" placeholder="цена" />
						</div>
						<button onClick={() => addCar()} className="btn btn-primary mt-4">Добавить</button>
					</form>
				</main>
			</div>
		</>
	)
}

export default UpdateCar
