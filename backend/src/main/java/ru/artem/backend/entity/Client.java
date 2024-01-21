package ru.artem.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "clients")
@Entity
@Getter
@Setter
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "firstname", length = 50)
    private String firstname;

    @Column(name = "lastname", length = 100)
    private String lastname;

    @Column(name = "phone", length = 20)
    private String phone;
}
