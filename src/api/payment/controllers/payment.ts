'use strict'

import { threadId } from "worker_threads";

const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    options: { timeout: 5000 } // Timeout para evitar bloqueos
});

// TEORIAS
// -p;eticiomnes
// -callstack/multi hiolo multi threadId

// PRACTIOCA

// -como hago peticiones al back (URL,METODO,BODYS,HEADERS)




module.exports = {
  createOrder: async (ctx) => {
    try {
      console.log("sadasdasdasdasdasdasdasdasdasd",ctx.request.body) // LO QUE STA RECIBIENDO EL BACK
      const { productId, productName, quantity, unit_price } = ctx.request.body;

      const preference = new Preference(client);
      console.log('ssss', quantity)
      const response = await preference.create({
        body: {
          items: [
            {
              id: productId,
              title: productName,
              quantity: Number(quantity),
              unit_price: Number(unit_price),
              currency_id: "COP",// Asegúrate de usar el código correcto
              total_amount: Number
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
      // RESPONDIENDO EL BACK
      console.log('aaaaaa',response)
      ctx.send(response); // ¡Este envío de respuesta faltaba!
      
    } catch (error) {
      console.error("Error en createOrder:", error);
      ctx.status = 500;
      ctx.send({ error: "Error al crear la preferencia" });
    }
  }
};
