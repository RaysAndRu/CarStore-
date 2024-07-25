import { useState } from 'react'
import '../assets/css/MainPage.css'
import { Link, redirect, useNavigate } from 'react-router-dom';
import Header from './Header';


function MainPage() {

	return (
		<>
			<Header />
			<div className="page">
				<main className="page-main">
					<Link to={"/cars"}>
						<div>Машины</div>
					</Link>
					<Link to={"/employees"}>
						<div>Сотрудники</div>
					</Link>
					<Link to={"/orders"}>
						<div>Заказы</div>
					</Link>
				</main>
			</div>
		</>
	)
}

export default MainPage
