import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login';
import App from './App';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";

import MainPage from './pages/MainPage';
import Employees from './pages/Employees';

import Success from './pages/Success';
import AddEmployee from './pages/AddEmployee';
import AddCar from './pages/AddCar';
import AddOrder from './pages/AddOrder';
import UpdateEmployee from './pages/UpdateEmployee';
import UpdateCar from './pages/UpdateCars';
import UpdateOrder from './pages/UpdateOrder';
import ErrorPage from './pages/Error';
import EmployeesMinMax from './pages/EmployeesMinMax';
import OrdersMinMax from './pages/OrdersMinMax';
import CarsMinMax from './pages/CarsMinMax';
import Cars from './pages/Cars';
import Orders from './pages/Orders';
import CarDetails from './pages/CarDetails'

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Login />
			},
			{
				path: "main/",
				element: <MainPage />
			},
			{
				path: "employees/",
				children: [
					{
						index: true,
						element: <Employees />
					},
					{
						path: "addEmployee/",
						element: <AddEmployee />
					},
					{
						path: "update/:id",
						element: <UpdateEmployee />
					},
					{
						path: "minmax/",
						element: <EmployeesMinMax />
					}
				]
			},
			{
				path: "cars/",
				children: [
					{
						index: true,
						element: <Cars />
					},
					{
						path: "addCar/",
						element: <AddCar />
					},
					{
						path: "update/:id",
						element: <UpdateCar />
					},
					{
						path: "minMax",
						element: <CarsMinMax />
					},
					{
						path: "detail/:id",
						element: <CarDetails />
					},

				]
			},
			{
				path: "orders/",
				children: [
					{
						index: true,
						element: <Orders/>
					},
					{
						path: "addOrder/",
						element: <AddOrder />
					},
					{
						path: "update/:id",
						element: <UpdateOrder />
					},
					{
						path: "minmax/",
						element: <OrdersMinMax />
					}
				]
			},
			{
				path: "success/",
				element: <Success />
			}
			,
			{
				path: "error/",
				element: <ErrorPage />
			}
		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
