package org.example.controller;

import com.mongodb.client.result.DeleteResult;
import org.example.model.*;
import org.example.configuration.MongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carStore/v1")
public class MainController {
    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    MongoService mongoService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String name, @RequestParam String password) {
        mongoTemplate = mongoService.mongoTemplate(name, password);
        return ResponseEntity.ok("Аунтефикация прошла успешно");
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> employees() {
        List<Employee> list = mongoTemplate.findAll(Employee.class);
        return ResponseEntity.ok(list);
    }



    @GetMapping("/employees/search")
    public ResponseEntity<List<Employee>> employeeByLastName(@RequestParam("lastName") String lastName) {
        System.out.println(lastName);
        BasicQuery query = new BasicQuery(String.format("{ last_name: {$regex: '%s', $options: 'i'} }", lastName));
        List<Employee> list = mongoTemplate.find(query, Employee.class);
        System.out.println(list);
        return ResponseEntity.ok(list);
    }

//    @GetMapping("/employees/salary")
//    public ResponseEntity<Employee> employeeSalary() {
//        GroupOperation sumTotalCityPop = group("state", "city")
//                .sum("pop").as("cityPop");
//        GroupOperation averageStatePop = group("_id.state")
//                .avg("cityPop").as("avgCityPop");
//        SortOperation sortByAvgPopAsc = sort(Sort.by(Sort.Direction.ASC, "avgCityPop"));
//        LimitOperation limitToOnlyFirstDoc = limit(1);
//        ProjectionOperation projectToMatchModel = project()
//                .andExpression("_id").as("state")
//                .andExpression("avgCityPop").as("statePop");
//
//        Aggregation aggregation = newAggregation(
//                sumTotalCityPop, averageStatePop, sortByAvgPopAsc,
//                limitToOnlyFirstDoc, projectToMatchModel);
//
//        AggregationResults<Employee> result = mongoTemplate
//                .aggregate(aggregation, "employees", Employee.class);
//        Employee smallestState = result.getUniqueMappedResult();
//        return ResponseEntity.ok(smallestState);
//    }

    @GetMapping("/employees/salary")
    public ResponseEntity<Employee> employeeSalary(MongoTemplate mongoTemplate) {
        // Create an aggregation pipeline
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.sort(Sort.by(Sort.Direction.DESC, "salary")),
                Aggregation.limit(1)
        );

        // Execute the aggregation
        AggregationResults<Employee> result = mongoTemplate.aggregate(aggregation, "employees", Employee.class);

        // Retrieve the single result
        Employee employeeWithLowestSalary = result.getUniqueMappedResult();

        if (employeeWithLowestSalary!= null) {
            return ResponseEntity.ok(employeeWithLowestSalary);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> employeeById(@PathVariable  String id) {
        Employee list = mongoTemplate.findById(id, Employee.class);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/employees/add")
    public ResponseEntity<String> saveEmployee(@RequestBody Employee employee) {
        mongoTemplate.save(employee);
        return ResponseEntity.ok("Обновлен успешно");
    }
    @PostMapping("/employees/delete")
    public ResponseEntity<String> deleteEmployee(@RequestBody Employee employee) {
        mongoTemplate.remove(employee);
        return ResponseEntity.ok("Удалено");
    }

    @GetMapping("/cars")
    public ResponseEntity<List<Car>> books() {
        List<Car> list = mongoTemplate.findAll(Car.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/cars/search")
    public ResponseEntity<List<Car>> booksByTitle(@RequestParam("title") String title) {
        BasicQuery query = new BasicQuery(String.format("{ title: {$regex: '%s', $options: 'i'} }", title));
        List<Car> list = mongoTemplate.find(query, Car.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/cars/{id}")
    public ResponseEntity<Car> bookById(@PathVariable String id) {
        Car list = mongoTemplate.findById(id, Car.class);
        return ResponseEntity.ok(list);
    }


    @PostMapping("/cars/add")
    public ResponseEntity<String> addBook(@RequestBody Car car) {
        mongoTemplate.save(car);
        return ResponseEntity.ok("Добавлено");
    }


    @PostMapping("/cars/delete")
    public ResponseEntity<String> deleteBook(@RequestBody Car car) {
        System.out.println(car);
        DeleteResult deleteResult =  mongoTemplate.remove(car);
        System.out.println(deleteResult.getDeletedCount());
        return ResponseEntity.ok("Удалено");
    }



    @GetMapping("/orders")
    public ResponseEntity<List<Order>> entries() {
        List<Order> list = mongoTemplate.findAll(Order.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/orders/search")
    public ResponseEntity<List<Order>> entryByLastName(@RequestParam("lastName") String lastName) {
        BasicQuery query = new BasicQuery(String.format("{ last_name: {$regex: '%s', $options: 'i'} }", lastName));
        List<Order> list = mongoTemplate.find(query, Order.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> entryById(@PathVariable  String id) {
        Order list = mongoTemplate.findById(id, Order.class);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/orders/add")
    public ResponseEntity<String> addEntry(@RequestBody Order entry) {
        mongoTemplate.save(entry);
        return ResponseEntity.ok("Добавлено");
    }
    @PostMapping("/orders/delete")
    public ResponseEntity<String> deleteEntry(@RequestBody Order entry) {
        System.out.println(entry);
        DeleteResult deleteResult =  mongoTemplate.remove(entry);
        System.out.println(deleteResult.getDeletedCount());
        return ResponseEntity.ok("Удалено");
    }
}
