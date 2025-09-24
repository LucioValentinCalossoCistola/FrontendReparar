Instrucciones rápidas:
1) Copiá la estructura de carpetas.
2) Reemplazá las variables de firebase en src/services/firebase.js.
3) Reemplazá API_URL en src/api/api.js por la URL de tu backend Django.
4) Instalar dependencias: npm install
5) Iniciar: expo start
Notas importantes antes de probarlo:

Abrí src/services/firebase.js y reemplazá las claves de Firebase por las tuyas (API key, projectId, etc.). El chat usa Firestore; asegurate de habilitar Firestore en tu proyecto Firebase.

En src/api/api.js reemplazá API_URL por la URL del backend (si probás en emulador Android y el backend corre en tu máquina local, usá http://10.0.2.2:8000/api).

Las rutas de la API asumidas (por ejemplo /trabajos/, /postulaciones/, /trabajador/me/, /contratador/me/, /profesiones/, /zonas/, /calificacion_trabajador/, /calificacion_contratador/) deben existir tal cual en tu backend; si no, adaptá esos endpoints.

Para probar en Expo: descomprimí y ejecutá npm install y luego expo start.
