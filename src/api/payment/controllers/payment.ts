'use strict';

const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configuración (verifica según la versión de la SDK)
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    options: { timeout: 5000 }
});

module.exports = {
  createOrder: async (ctx) => {
    try {
      console.log("Datos recibidos:", ctx.request.body);
      const { productId, productName, quantity, unit_price } = ctx.request.body;

      // Si tienes totalPrice, podrías usarlo aquí
      // const { totalPrice } = ctx.request.body;

      const preference = new Preference(client);

      const response = await preference.create({
        body: {
          items: [
            {
              id: productId,
              title: productName,
              quantity: Number(quantity),
              unit_price: Number(unit_price),
              currency_id: "COP"  // Asegúrate de que sea el código correcto para tu moneda
              // Elimina o reemplaza total_amount según corresponda:
              // total_amount: totalPrice
            }
          ],
          back_urls: {
            success: `${process.env.FRONTEND_URL}/success`,
            failure: `${process.env.FRONTEND_URL}/failure`,
            pending: `${process.env.FRONTEND_URL}/pending`
          },
          auto_return: "approved",
        }
      });

      console.log("Respuesta de MercadoPago:", response);
      ctx.send(response);
      
    } catch (error) {
      console.error("Error en createOrder:", error);
      ctx.status = 500;
      ctx.send({ error: "Error al crear la preferencia" });
    }
  }
};
