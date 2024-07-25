import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/CarDetails.css'
import axios from 'axios';

function CarDetails() {
  const { id } = useParams(); // Получаем ID из URL
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/carStore/v1/cars/${id}`)
        .then(response => {
          setCar(response.data); // Обновляем состояние с полученными данными
        })
        .catch(error => {
          console.error("Ошибка при загрузке данных автомобиля:", error);
        });
    }
  }, [id]); // Повторяем запрос каждый раз, когда изменяется id

  if (!car) {
    return <div>Loading...</div>; // Отображаем загрузку, пока данные не будут получены
  }

  return (
    <div className='car-details' >
      <h2>{car.title}</h2>
      <img src={car.image} alt={car.title} style={{width: '100%', height: 'auto'}} />
      <p>Цвет: {car.color}</p>
      <p>Мощность: {car.power}</p>
      <p>Цена: {car.price}</p>
      {/* Дополнительные детали автомобиля */}
    </div>
  );
}

export default CarDetails;
