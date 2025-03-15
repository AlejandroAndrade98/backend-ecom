export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    // En producción, configura APP_KEYS en Render con una lista de claves separadas por comas.
    // Ejemplo en Render: APP_KEYS=clave1,clave2,clave3,clave4
    keys: env.array('APP_KEYS', ['clave1', 'clave2', 'clave3', 'clave4']),
  },
});