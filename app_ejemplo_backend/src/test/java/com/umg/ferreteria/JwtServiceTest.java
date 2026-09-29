package com.umg.ferreteria;

import com.umg.ferreteria.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class JwtServiceTest {

    private JwtService jwtService;
    private UserDetails userDetails;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(
                jwtService,
                "secretKey",
                Base64.getEncoder().encodeToString(
                        "clave-exclusiva-para-pruebas-unitarias-no-productivas"
                                .getBytes(StandardCharsets.UTF_8)
                )
        );
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", 60_000L);
        ReflectionTestUtils.setField(jwtService, "refreshExpiration", 86_400_000L);
        userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("usuario-prueba");
        doReturn(Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")))
                .when(userDetails)
                .getAuthorities();
    }

    @Test
    void accessTokenIsAcceptedOnlyAsAccessToken() {
        String token = jwtService.generateToken(userDetails, new HashMap<>());

        assertTrue(jwtService.isTokenValid(token, userDetails));
        assertFalse(jwtService.isRefreshTokenValid(token, userDetails));
    }

    @Test
    void refreshTokenIsAcceptedOnlyAsRefreshToken() {
        String token = jwtService.generateRefreshToken(userDetails);

        assertTrue(jwtService.isRefreshTokenValid(token, userDetails));
        assertFalse(jwtService.isTokenValid(token, userDetails));
    }
}
