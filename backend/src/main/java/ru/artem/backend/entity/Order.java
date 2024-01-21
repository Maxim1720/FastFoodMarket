package ru.artem.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Table(name = "orders")
@Entity
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "count", nullable = false)
    private Integer count;

    @Column(name = "address", length = 150, nullable = false)
    private String address;

    @Column(name = "comment", length = 150)
    private String comment;

    @ManyToOne(targetEntity = Dish.class)
    private Dish dish;

    @OneToOne(targetEntity = Client.class, cascade = CascadeType.ALL)
    private Client client;
}
