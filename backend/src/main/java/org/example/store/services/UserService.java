package org.example.store.services;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.store.model.User;
import org.example.store.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class UserService {
    @Autowired
    UserRepo userRepo;

    public User saveUser(User user) {
        return userRepo.save(user);
    }

    public Optional<User> getUserById(String id) {
      return userRepo.findById(id);
    }

    public void deleteUser(User user) {
         userRepo.delete(user);
    }

    public User updateUser(User user) {
        return userRepo.save(user);
    }


    public Optional<User> getUserByLogin(String login) {
        return userRepo.findByLogin(login);
    }

}
