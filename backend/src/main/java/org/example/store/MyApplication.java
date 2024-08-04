package org.example.store;

import org.example.store.services.EmployeeService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@SpringBootApplication(scanBasePackages = "org.example.store")
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext("org.example.store");
        EmployeeService employeeService = (EmployeeService) applicationContext.getBean("employeeService");
        System.out.println(employeeService.getEmployeeByLastName("Фролов"));
    }
}