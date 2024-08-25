package com.example.guide.authentication.repository;

import com.example.guide.authentication.models.ERole;
import com.example.guide.authentication.models.Role;
import com.example.guide.authentication.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class StartupDataInitializer {

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        if (roleRepository.count() == 0) {
            Role adminRole = new Role(ERole.ROLE_ADMIN);
            Role moderRole = new Role(ERole.ROLE_MODERATOR);
            Role userRole = new Role(ERole.ROLE_USER);
            roleRepository.save(adminRole);
            roleRepository.save(moderRole);
            roleRepository.save(userRole);

            User adminUser = new User("admin",
                    "admin@gmail.com",encoder.encode("adminPass"));
            adminUser.setRoles(new HashSet<>(Set.of(adminRole)));
            User modUser = new User("moderator",
                    "moder@gmail.com",encoder.encode("modPass"));
            modUser.setRoles(new HashSet<>(Set.of(moderRole)));
            User userUser = new User("user",
                    "user@gmail.com",encoder.encode("userPass"));
            userUser.setRoles(new HashSet<>(Set.of(userRole)));
            userRepository.save(adminUser);
            userRepository.save(modUser);
            userRepository.save(userUser);
        }
    }
}
