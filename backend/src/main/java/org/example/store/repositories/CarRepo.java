package org.example.store.repositories;

import org.example.store.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepo extends MongoRepository<Car, String> {
    @Query("{ title: {$regex: ?0, $options: 'i'} }")
    List<Car> findByTitle(String title);
}
