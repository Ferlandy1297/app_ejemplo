package com.umg.ferreteria.mapper;

import com.umg.ferreteria.dto.response.UserResponse;
import com.umg.ferreteria.model.Role;
import com.umg.ferreteria.model.User;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        if (user == null) return null;
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .isActive(user.getIsActive())
                .roles(user.getRoles().stream()
                        .map(Role::getName)
                        .collect(Collectors.toList()))
                .build();
    }
}
