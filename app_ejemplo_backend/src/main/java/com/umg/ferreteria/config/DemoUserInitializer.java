package com.umg.ferreteria.config;

import com.umg.ferreteria.model.Role;
import com.umg.ferreteria.model.User;
import com.umg.ferreteria.repository.RoleRepository;
import com.umg.ferreteria.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DemoUserInitializer {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${demo.users.admin.email}")
    private String adminEmail;

    @Value("${demo.users.admin.password}")
    private String adminPassword;

    @Value("${demo.users.operator.email}")
    private String operatorEmail;

    @Value("${demo.users.operator.password}")
    private String operatorPassword;

    @Bean
    CommandLineRunner createDemoUsers() {
        return args -> {
            Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                    .orElseThrow(() -> new IllegalStateException("No existe el rol ROLE_ADMIN"));
            Role operatorRole = roleRepository.findByName("ROLE_VENTAS")
                    .orElseThrow(() -> new IllegalStateException("No existe el rol ROLE_VENTAS"));

            createIfMissing("u-demo-admin", "Administrador Demo", adminEmail, adminPassword, adminRole);
            createIfMissing("u-demo-operator", "Operador Demo", operatorEmail, operatorPassword, operatorRole);
        };
    }

    private void createIfMissing(
            String id,
            String fullName,
            String email,
            String rawPassword,
            Role role
    ) {
        String normalizedEmail = email.trim().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            return;
        }

        User user = User.builder()
                .id(id)
                .fullName(fullName)
                .email(normalizedEmail)
                .password(passwordEncoder.encode(rawPassword))
                .isActive(true)
                .roles(Set.of(role))
                .build();
        userRepository.save(user);
    }
}
