package org.example.store.repositories;

import org.example.store.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
   Optional<User> findByLogin(String login);
   Optional<User> findByPassword(String password);
   boolean  existsById(String id);
   boolean  existsByLogin(String login);
}
