package ru.artem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import ru.artem.backend.entity.Dish;

@CrossOrigin(originPatterns = "*")
public interface DishRepository extends JpaRepository<Dish, Long> {

}