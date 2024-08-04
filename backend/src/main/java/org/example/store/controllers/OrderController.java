package org.example.store.controllers;



import jakarta.validation.Valid;
import org.example.store.model.Order;
import org.example.store.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/carStore/v1/orders")
public class OrderController {
    @Autowired
    OrderService orderService;

    @PostMapping("/save")
    public ResponseEntity<Order>  saveOrder(@Valid @RequestBody Order order){
        Order saveOrder =  orderService.saveOrder(order);
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "no-cache")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(saveOrder)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(saveOrder.toString().getBytes().length)
                .body(saveOrder);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Order> getOrderById( @PathVariable String id){
        Order order =  orderService.getOrderById(id)
                .orElse(new Order());
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "no-cache")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(order)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(order.toString().getBytes().length)
                .body(order);
    }



    @DeleteMapping("/delete")
    public ResponseEntity<String>  deleteOrder(@Valid @RequestBody Order order){
        orderService.deleteOrder(order);
        String message = "Success delete " + order;
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "mno-cache")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(message)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(message.toString().getBytes().length)
                .body(message);
    }

    @PutMapping("/update")
    public ResponseEntity<Order>  updateOrder(@Valid @RequestBody Order order){
        Order saveOrder =  orderService.updateOrder(order);
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "no-cache")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(saveOrder)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(saveOrder.toString().getBytes().length)
                .body(saveOrder);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>>  getOrders(){
        List<Order> orders =  orderService.getAllOrders();
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "mno-cache")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(orders)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(orders.toString().getBytes().length)
                .body(orders);
    }


    @GetMapping("/search/{lastName}")
    public ResponseEntity<List<Order>>  getOrderByLastName(@PathVariable String lastName){
        List<Order> orders =  orderService.getOrderByLastName(lastName);
        return   ResponseEntity.ok()
                .header("X-СarStore-API-Version", "1.0")
                .header("X-СarStore-API-Status", "Success")
                .header("Content-Language", "en-US")
                .header("X-RateLimit-Limit", "no-limit")
                .header("Accept-Language", "en-US")
                .header("Cache-Control", "no-cache")
                .header("Access-Control-Allow-Origin", "http://localhost:5173")
                .header("ETag", String.valueOf(System.identityHashCode(orders)))
                .header("X-Content-Type-Options", "nosniff")
                .header("Strict-Transport-Security", "max-age=31536000; includeSubdomains")
                .contentType(MediaType.APPLICATION_JSON)
                .contentLength(orders.toString().getBytes().length)
                .body(orders);
    }
}
