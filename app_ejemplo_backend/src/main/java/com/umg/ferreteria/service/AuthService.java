package com.umg.ferreteria.service;

import com.umg.ferreteria.dto.request.LoginRequest;
import com.umg.ferreteria.dto.request.RefreshTokenRequest;
import com.umg.ferreteria.dto.response.AuthResponse;
import com.umg.ferreteria.dto.response.RefreshTokenResponse;
import com.umg.ferreteria.dto.response.UserResponse;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    RefreshTokenResponse refresh(RefreshTokenRequest request);
    UserResponse getCurrentUser(String email);
}
