package org.example.store.repositories;


import org.example.store.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepo extends MongoRepository<Order, String> {
    @Query("{ lastName: {$regex: ?0, $options: 'i'} }")
    List<Order> findByLastName(String lastName);
}
