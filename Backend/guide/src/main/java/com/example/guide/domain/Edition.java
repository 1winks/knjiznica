package com.example.guide.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "`edition`", schema = "public")
public class Edition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long isbn;

    @Column(nullable = false)
    private Boolean available;

    @Column(nullable = true)
    private LocalDate borrowDate;

    @Column(nullable = true)
    private LocalDate returnDate;

    @JsonIgnore
    @OneToMany(mappedBy = "edition", cascade = CascadeType.ALL)
    private Set<BookEdition> bookEditions = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "edition", cascade = CascadeType.ALL)
    private Set<EditionOrder> editionOrders = new HashSet<>();
}
