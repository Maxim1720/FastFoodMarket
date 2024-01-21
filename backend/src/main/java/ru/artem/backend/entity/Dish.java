package ru.artem.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.util.Set;

@Entity(name = "dish")
@Table(name = "dishes")
@Getter
@Setter
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Lob
    @Column(name = "image")
    @JdbcTypeCode(SqlTypes.BLOB)
    private byte[] image;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "composition", length = 150, nullable = false)
    private String composition;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @OneToMany(targetEntity = Order.class, cascade = CascadeType.ALL, mappedBy = "dish")
    private Set<Order> orders;
}
