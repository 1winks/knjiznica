package com.example.guide.authentication.repository;

import java.util.Optional;

import com.example.guide.authentication.models.ERole;
import com.example.guide.authentication.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
