package com.umg.ferreteria.controller;

import com.umg.ferreteria.dto.request.LoginRequest;
import com.umg.ferreteria.dto.request.RefreshTokenRequest;
import com.umg.ferreteria.dto.response.ApiResponse;
import com.umg.ferreteria.dto.response.AuthResponse;
import com.umg.ferreteria.dto.response.RefreshTokenResponse;
import com.umg.ferreteria.dto.response.UserResponse;
import com.umg.ferreteria.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticación", description = "Endpoints para inicio de sesión y obtención de token JWT")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Iniciar sesión", description = "Autentica credenciales y genera un token JWT con los roles del usuario")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok("Inicio de sesión exitoso", response));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Renovar token", description = "Genera un access token nuevo mediante un refresh token válido")
    public ResponseEntity<ApiResponse<RefreshTokenResponse>> refresh(
            @Valid @RequestBody RefreshTokenRequest request
    ) {
        RefreshTokenResponse response = authService.refresh(request);
        return ResponseEntity.ok(ApiResponse.ok("Token renovado exitosamente", response));
    }

    @GetMapping("/me")
    @Operation(summary = "Usuario actual", description = "Obtiene los datos del usuario autenticado mediante el token Bearer")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        UserResponse response = authService.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok("Datos del usuario actual", response));
    }
}
