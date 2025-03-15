'use strict';

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/create-order',
            handler: 'payment.createOrder',
            config: {
                auth: false
            }
        }
    ]
};