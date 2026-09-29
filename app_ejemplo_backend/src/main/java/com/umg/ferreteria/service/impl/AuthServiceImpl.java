package com.umg.ferreteria.service.impl;

import com.umg.ferreteria.dto.request.LoginRequest;
import com.umg.ferreteria.dto.request.RefreshTokenRequest;
import com.umg.ferreteria.dto.response.AuthResponse;
import com.umg.ferreteria.dto.response.RefreshTokenResponse;
import com.umg.ferreteria.dto.response.UserResponse;
import com.umg.ferreteria.exception.InvalidRefreshTokenException;
import com.umg.ferreteria.exception.ResourceNotFoundException;
import com.umg.ferreteria.mapper.UserMapper;
import com.umg.ferreteria.model.Role;
import com.umg.ferreteria.model.User;
import com.umg.ferreteria.repository.UserRepository;
import com.umg.ferreteria.security.JwtService;
import com.umg.ferreteria.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        // Autenticar credenciales con Spring Security AuthenticationManager
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, request.getPassword())
        );

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: " + email));

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("userId", user.getId());
        extraClaims.put("fullName", user.getFullName());

        String jwtToken = jwtService.generateToken(userDetails, extraClaims);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return AuthResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtService.getJwtExpiration())
                .refreshExpiresIn(jwtService.getRefreshExpiration())
                .user(userMapper.toResponse(user))
                .roles(roles)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public RefreshTokenResponse refresh(RefreshTokenRequest request) {
        try {
            String currentRefreshToken = request.getRefreshToken();
            String email = jwtService.extractUsername(currentRefreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            if (!jwtService.isRefreshTokenValid(currentRefreshToken, userDetails)) {
                throw new InvalidRefreshTokenException("Refresh token inválido o expirado");
            }

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new InvalidRefreshTokenException("Usuario no disponible"));

            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("userId", user.getId());
            extraClaims.put("fullName", user.getFullName());

            return RefreshTokenResponse.builder()
                    .token(jwtService.generateToken(userDetails, extraClaims))
                    .refreshToken(jwtService.generateRefreshToken(userDetails))
                    .tokenType("Bearer")
                    .expiresIn(jwtService.getJwtExpiration())
                    .refreshExpiresIn(jwtService.getRefreshExpiration())
                    .build();
        } catch (InvalidRefreshTokenException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InvalidRefreshTokenException("Refresh token inválido o expirado");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con email: " + email));
        return userMapper.toResponse(user);
    }
}
