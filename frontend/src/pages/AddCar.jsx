import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"


function AddCar() {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [color, setColor] = useState("");
	const [power, setPower] = useState("");
	const [price, setPrice] = useState("");
	const navigate = useNavigate();

	function addCar() {
		if (title && color && power && price && image ) {
			fetch('http://localhost:8080/carStore/v1/cars/add', {
				method: 'POST',
				body: JSON.stringify({
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
							<label htmlFor="image">Фото</label>
							<input name='image'  value={image} onChange={(e) => { setImage(e.target.value) }} type="text" className="form-control" id="title"  placeholder="фото" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="title">Название</label>
							<input name='title'  value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" className="form-control" id="title"  placeholder="название" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="color">Цвет</label>
							<input name='color' value={color} onChange={(e) => { setColor(e.target.value) }} type="text" className="form-control" id="color" placeholder="цвет" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="power">Мощность</label>
							<input name='power' value={power} onChange={(e) => { setPower(e.target.value) }} type="text" className="form-control" id="power"  placeholder="мощность" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="price">Цена</label>
							<input name='price' value={price} onChange={(e) => { setPrice(e.target.value) }} type="text" className="form-control" id="price" placeholder="цена" />
						</div>
						<Link onClick={() => addCar()} className="btn btn-primary mt-4">Добавить</Link>
					</form>
				</main>
			</div>
		</>
	)
}

export default AddCar
