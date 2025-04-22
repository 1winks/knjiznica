package com.example.guide.authentication.controllers;

import java.util.*;
import java.util.stream.Collectors;

import com.example.guide.authentication.models.ERole;
import com.example.guide.authentication.models.Role;
import com.example.guide.authentication.models.User;
import com.example.guide.authentication.payload.request.LoginRequest;
import com.example.guide.authentication.payload.request.SignupRequest;
import com.example.guide.authentication.payload.response.JwtResponse;
import com.example.guide.authentication.payload.response.MessageResponse;
import com.example.guide.authentication.payload.response.UserRoleResponse;
import com.example.guide.authentication.repository.RoleRepository;
import com.example.guide.authentication.repository.UserRepository;
import com.example.guide.authentication.security.jwt.JwtUtils;
import com.example.guide.authentication.security.services.UserDetailsImpl;
import com.example.guide.controller.responses.UserAdderException;
import com.example.guide.controller.responses.UserDeleteException;
import com.example.guide.domain.Reader;
import com.example.guide.repository.ReaderRepository;
import com.example.guide.service.OrderReaderService;
import com.example.guide.service.ReaderService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  ReaderRepository readerRepository;

  @Autowired
  OrderReaderService orderReaderService;

  @Autowired
  ReaderService readerService;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt,
                         userDetails.getId(), 
                         userDetails.getUsername(), 
                         userDetails.getEmail(), 
                         roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      throw new UserAdderException("Username already in use!");
    }
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      throw new UserAdderException("Email already in use!");
    }

    User user = new User(signUpRequest.getUsername(),
               signUpRequest.getEmail(),
               encoder.encode(signUpRequest.getPassword()));
    Set<Role> roles = new HashSet<>();
    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    roles.add(userRole);
    user.setRoles(roles);

    Reader reader = new Reader();
    user.setReader(reader);
    userRepository.save(user);
    readerRepository.save(reader);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("/admin/signup")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> registerAnyUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      throw new UserAdderException("Username already in use!");
    }
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      throw new UserAdderException("Email already in use!");
    }

    User user = new User(signUpRequest.getUsername(),
            signUpRequest.getEmail(),
            encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();
    if (strRoles == null) {
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        user.setRoles(roles);
        Reader reader = new Reader();
        user.setReader(reader);
        userRepository.save(user);
        readerRepository.save(reader);
    } else {
        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        strRoles.forEach(role -> {
            if (role.equals("mod")) {
                roles.add(modRole);
            } else {
                roles.add(userRole);
            }
        });
        if (roles.contains(modRole)) {
          user.setRoles(Set.of(modRole));
          userRepository.save(user);
        } else {
          user.setRoles(Set.of(userRole));
          Reader reader = new Reader();
          user.setReader(reader);
          userRepository.save(user);
          readerRepository.save(reader);
        }
    }
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @GetMapping("/profile")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Map<String, String>> getUserProfile() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();

    String role = userDetails.getAuthorities().stream()
            .findFirst()
            .map(GrantedAuthority::getAuthority)
            .orElse("ROLE_USER");
    Map<String, String> response = new HashMap<>();
    response.put("role", role);

    return ResponseEntity.ok(response);
  }

  @GetMapping("/userroles")
  @PreAuthorize("hasRole('ADMIN')")
  public List<UserRoleResponse> getUserRoles() {
    List<UserRoleResponse> responseList = new ArrayList<>();
    List<User> users = userRepository.findAll();
    for (User user : users) {
      UserRoleResponse response = new UserRoleResponse();
      response.setUsername(user.getUsername());
      response.setId(user.getId());
      List<Role> roles = new ArrayList<>(user.getRoles());
      String role = String.valueOf(roles.get(0).getName());
      response.setRole(role);
      if (!Objects.equals(role, "ROLE_ADMIN")) {
        responseList.add(response);
      }
    }
    return responseList;
  }

  @DeleteMapping("/delete/{userId}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
    if (!userRepository.existsById(userId)) {
      return ResponseEntity.notFound().build();
    }
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Error: User is not found."));
    List<Role> roles = new ArrayList<>(user.getRoles());
    String role = String.valueOf(roles.get(0).getName());
    if (Objects.equals(role, "ROLE_ADMIN")) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN)
              .body(new MessageResponse("Error: Admin users cannot be deleted."));
    }
    if (Objects.equals(role, "ROLE_USER")) {
        if (orderReaderService.existsByUser(user)) {
          throw new UserDeleteException("Can't delete a user with an existing order history!" +
                  "\nInform moderators if you wish to do so!");
        } else {
          readerService.deleteReader(user);
        }
    }
    userRepository.deleteById(userId);
    return ResponseEntity.ok(new MessageResponse("User deleted successfully!"));
  }
}
