package ru.artem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import ru.artem.backend.entity.Client;


//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(originPatterns = "*")
public interface ClientRepository extends JpaRepository<Client, Long> {

}