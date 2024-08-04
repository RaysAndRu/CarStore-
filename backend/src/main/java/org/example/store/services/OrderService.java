package org.example.store.services;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.example.store.model.Order;
import org.example.store.repositories.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class OrderService {
    @Autowired
    OrderRepo orderRepo;

    public Order saveOrder(Order order) {
       return   orderRepo.save(order);
    }
    public Optional<Order> getOrderById(String id) {
        return orderRepo.findById(id);
    }
    public void deleteOrder(Order order) {
        orderRepo.delete(order);
    }
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order  updateOrder(Order order){
        return    orderRepo.save(order);
    }
    public List<Order> getOrderByLastName(String lastName){
        return orderRepo.findByLastName(lastName);
    }


}
