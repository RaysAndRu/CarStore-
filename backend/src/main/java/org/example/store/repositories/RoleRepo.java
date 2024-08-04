package org.example.store.repositories;

import org.example.store.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends MongoRepository<Role, String> {
    Optional<Role> findRoleByTitle(String title);
}
