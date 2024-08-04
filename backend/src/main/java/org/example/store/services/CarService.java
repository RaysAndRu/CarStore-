package org.example.store.services;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.store.model.Car;
import org.example.store.repositories.CarRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class CarService {
    @Autowired
    CarRepo carRepo;

    public Car saveCar(Car car) {
       return   carRepo.save(car);
    }


    public Optional<Car> getCarById(String id) {
        return carRepo.findById(id);
    }

    public void deleteCar(Car car) {
         carRepo.delete(car);
    }


    public List<Car> getAllCars() {
        return carRepo.findAll();
    }

    public Car  updateCar(Car car){
       return   carRepo.save(car);
    }

    public List<Car> getCarByTitle(String title){
        return carRepo.findByTitle(title);
    }

}
