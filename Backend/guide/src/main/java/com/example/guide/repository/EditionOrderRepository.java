package com.example.guide.repository;

import com.example.guide.domain.Edition;
import com.example.guide.domain.EditionOrder;
import com.example.guide.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EditionOrderRepository extends JpaRepository<EditionOrder, Long> {
    List<EditionOrder> findAllByOrder(Order order);

    List<EditionOrder> findAllByEdition(Edition edition);
}
