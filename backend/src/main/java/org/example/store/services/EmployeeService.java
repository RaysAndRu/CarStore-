package org.example.store.services;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.store.model.Employee;
import org.example.store.repositories.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeService {
    @Autowired
    EmployeeRepo employeeRepo;

    public Employee   saveEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public Optional<Employee> getEmployeeById(String id) {
        return employeeRepo.findById(id);
    }

    public void deleteEmployee(Employee employee) {
        employeeRepo.delete(employee);
    }

    public List <Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    public Employee updateEmployee(Employee employee) {
        return employeeRepo.save(employee);
    }

    public List<Employee> getEmployeeByLastName(String lastName) {
        return employeeRepo.findByLastName(lastName);
    }
}
