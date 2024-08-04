package org.example.store.controllers;


import jakarta.validation.Valid;
import org.example.store.model.Employee;
import org.example.store.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carStore/v1/employees")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;


    @PostMapping("/save")
    public ResponseEntity<Employee>  saveEmployee(@Valid @RequestBody Employee employee){
        Employee saveEmployee = employeeService.saveEmployee(employee);
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "max-age=1200, must-revalidate")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(saveEmployee)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(saveEmployee.toString().getBytes().length)
                .body(saveEmployee);
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id){
        Employee employee = employeeService.getEmployeeById(id)
                .orElse(new Employee());
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "max-age=1200, must-revalidate")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(employee)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(employee.toString().getBytes().length)
                .body(employee);
    }


    @DeleteMapping("/delete")
    public ResponseEntity<String>  deleteEmployee(@Valid @RequestBody Employee employee){
        employeeService.deleteEmployee(employee);
        String message = "Success delete " + employee;
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "max-age=1200, must-revalidate")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(message)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(message.toString().getBytes().length)
                .body(message);
    }

    @PutMapping("/update")
    public ResponseEntity<Employee>  updateEmployee(@Valid @RequestBody Employee employee){
        Employee updateEmployee = employeeService.updateEmployee(employee);
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "max-age=1200, must-revalidate")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(updateEmployee)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(updateEmployee.toString().getBytes().length)
                .body(updateEmployee);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>>  getEmployee(){
        List<Employee> employees = employeeService.getAllEmployees();
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "max-age=1200, must-revalidate")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(employees)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(employees.toString().getBytes().length)
                .body(employees);
    }

    @GetMapping("/search/{lastName}")
    public ResponseEntity<List<Employee>>  getEmployeeByLastName(@PathVariable String  lastName){
        List<Employee> employees = employeeService.getEmployeeByLastName(lastName);
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "max-age=1200, must-revalidate")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(employees)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(employees.toString().getBytes().length)
                .body(employees);
    }

}
