package com.example.guide.repository;

import com.example.guide.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT e FROM Order e WHERE e.returnedDate IS NULL AND e.endDate < :date")
    List<Order> findLateOrders(@Param("date") LocalDate date);

    default List<Order> findLateOrders() {
        return findLateOrders(LocalDate.now());
    }
}
