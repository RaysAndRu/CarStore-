package org.example.store.repositories;

import org.example.store.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepo extends MongoRepository<Employee, String> {
    @Query("{ lastName: { $regex: ?0, $options: 'i' } }")
    List<Employee> findByLastName(String lastName);
}
