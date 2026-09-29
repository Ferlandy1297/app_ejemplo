# Ferretería Express - Laboratorio BFF y Seguridad de Sesión

Proyecto base refactorizado para que el navegador se comunique únicamente con Next.js. Incluye:

- BFF mediante Route Handler catch-all en `/api/*`.
- Access token JWT de 1 minuto y refresh token de 24 horas.
- Renovación automática ante `401`, con pausa y reintento de la petición original.
- Cierre de sesión tras 15 segundos sin mouse, teclado, scroll o toque.
- Botón de demostración para producir la secuencia `401 -> refresh -> reintento 200`.

## Ejecución

Requisitos: Docker Desktop iniciado.

Crear la configuración local antes del primer arranque:

```bash
cp .env.example .env
```

En Windows CMD se puede usar `copy .env.example .env`. Después deben reemplazarse ambos marcadores del archivo `.env`; ese archivo queda ignorado por Git.

```bash
docker compose up --build
```

Abrir <http://localhost:3000>.

Las credenciales de demostración se comparten por separado y no se publican en el repositorio.

El contenedor backend solo está disponible dentro de la red de Docker. El navegador no llama al puerto `8080`; todas sus solicitudes utilizan `http://localhost:3000/api/...`.

## Guion para el video

1. Abrir DevTools, seleccionar Network y limpiar las solicitudes.
2. Iniciar sesión y seleccionar la petición `POST /api/auth/login` para mostrar que la URL es local.
3. En el panel, pulsar **Forzar 401 y probar refresh**. Network mostrará una consulta protegida con `401`, `POST /api/auth/refresh` con `200` y la consulta repetida con `200`.
4. Limpiar Network, dejar de usar mouse y teclado durante 15 segundos y mostrar el regreso automático al acceso con la sesión local eliminada.

## Política configurada

| Elemento | Duración |
| --- | ---: |
| Access token | 60 segundos |
| Refresh token | 24 horas |
| Inactividad frontend | 15 segundos |

Para producción deben usarse secretos externos robustos, HTTPS y cookies `HttpOnly` para los tokens. El almacenamiento local se conserva aquí para hacer visible y evaluable el flujo solicitado por el laboratorio.
