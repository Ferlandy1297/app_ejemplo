package com.umg.ferreteria.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientUpdateRequest {

    @NotBlank(message = "El nombre completo o razón social es obligatorio")
    @Size(max = 150, message = "El nombre no puede exceder 150 caracteres")
    private String fullName;

    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "El formato de correo electrónico no es válido")
    @Size(max = 150, message = "El correo no puede exceder 150 caracteres")
    private String email;

    @NotBlank(message = "El teléfono es obligatorio")
    @Size(max = 50, message = "El teléfono no puede exceder 50 caracteres")
    private String phone;

    @NotBlank(message = "La dirección es obligatoria")
    @Size(max = 255, message = "La dirección no puede exceder 255 caracteres")
    private String address;

    @NotBlank(message = "El NIT es obligatorio")
    @Size(max = 50, message = "El NIT no puede exceder 50 caracteres")
    private String nit;

    @NotNull(message = "El estado activo es obligatorio")
    private Boolean isActive;
}
