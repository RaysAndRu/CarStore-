package org.example.store.controllers;

import jakarta.validation.Valid;
import org.example.store.model.Car;
import org.example.store.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/carStore/v1/cars")
public class CarController {
    @Autowired
    CarService carService;

    @PostMapping("/save")
    public ResponseEntity<Car>  saveCar(@Valid @RequestBody Car car){
            Car  saveCar = carService.saveCar(car);
            return   ResponseEntity.ok()
                    .header("X-СarStore-API-Version", "1.0")
                    .header("X-СarStore-API-Status", "Success")
                    .header("Content-Language", "en-US")
                    .header("X-RateLimit-Limit", "1000")
                    .header("Accept-Language", "en-US")
                    .header("Cache-Control", "no-cache")
                    .header("Access-Control-Allow-Origin", "http://localhost:5173")
                    .header("ETag", String.valueOf(System.identityHashCode(saveCar)))
                    .header("X-Content-Type-Options", "nosniff")
                    .header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
                    .contentType(MediaType.APPLICATION_JSON)
                    .contentLength(saveCar.toString().getBytes().length)
                    .body(saveCar);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Car> getCarById( @PathVariable String id){
        Car car = carService.getCarById(id)
                .orElse(new Car());
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "no-cache")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(car)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(car.toString().getBytes().length)
                .body(car);
    }



    @DeleteMapping("/delete")
    public ResponseEntity<String>  deleteCar(@Valid @RequestBody Car car){
        carService.deleteCar(car);
        String message = "Success delete " + car;
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "no-cache")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(message)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(message.toString().getBytes().length)
                .body(message);
    }

    @PutMapping("/update")
    public ResponseEntity<Car>  updateCar(@Valid @RequestBody Car car){
        Car  uupdateCar = carService.updateCar(car);
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "no-cache")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(uupdateCar)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(uupdateCar.toString().getBytes().length)
                .body(uupdateCar);
    }

    @GetMapping("/cars")
    public ResponseEntity<List<Car>>  getCars(){
            List<Car>  cars = carService.getAllCars();
            return   ResponseEntity.ok()
                   .header("X-СarStore-API-Version", "1.0")
                   .header("X-СarStore-API-Status", "Success")
                   .header("Content-Language", "en-US")
                   .header("X-RateLimit-Limit", "no-limit")
                   .header("Accept-Language", "en-US")
                   .header("Cache-Control", "no-cache")
                   .header("Access-Control-Allow-Origin", "http://localhost:5173")
                   .header("ETag", String.valueOf(System.identityHashCode(cars)))
                   .header("X-Content-Type-Options", "nosniff")
                   .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                   .contentType(MediaType.APPLICATION_JSON)
                   .contentLength(cars.toString().getBytes().length)
                   .body(cars);
    }

    @GetMapping("/search/{title}")
    public ResponseEntity<List<Car>>  getCarByTitle(@PathVariable String title){
        List<Car>  cars = carService.getCarByTitle(title);
        return   ResponseEntity.ok()
                   .header("X-СarStore-API-Version", "1.0")
                   .header("X-СarStore-API-Status", "Success")
                   .header("Content-Language", "en-US")
                   .header("X-RateLimit-Limit", "no-limit")
                   .header("Accept-Language", "en-US")
                   .header("Cache-Control", "no-cache")
                   .header("Access-Control-Allow-Origin", "http://localhost:5173")
                   .header("ETag", String.valueOf(System.identityHashCode(cars)))
                   .header("X-Content-Type-Options", "nosniff")
                   .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                   .contentType(MediaType.APPLICATION_JSON)
                   .contentLength(cars.toString().getBytes().length)
                   .body(cars);
    }

}
