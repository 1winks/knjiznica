package com.example.guide.domain;

import com.example.guide.authentication.models.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "`reader`", schema = "public")
public class Reader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String address;

    @Column(nullable = true)
    private String phoneNumber;

    @Column(nullable = true)
    private LocalDate membershipFeeExpiry = null;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "reader", cascade = CascadeType.ALL)
    private Set<OrderReader> orderReaders = new HashSet<>();

}
