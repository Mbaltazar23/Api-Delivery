const mercadopago = require("mercadopago")
const Order = require("../models/order");
const OrderHasProducts = require("../models/order_has_products");

mercadopago.configure({sandbox: true, access_token: 'TEST-4345948724789304-061301-03ec356bb8a7809a0f52fbadb30cec53-138199846'})

module.exports = {
    async createPayment(req, res) {
        let payment = req.body

        console.log("PAYMENT: " + JSON.stringify(payment, null, 3));
        const payment_data = {
            token: payment.token,
            issuer_id: payment.issuer_id,
            payment_method_id: payment.payment_method_id,
            transaction_amount: payment.transaction_amount,
            installments: parseInt(payment.installments),
            payer: {
                email: payment.payer.email,
                identification: {
                    type: payment.payer.identification.type,
                    number: payment.payer.identification.number
                }
            }
        }

        const data = await mercadopago.payment.create(payment_data).catch((err) => {
            console.log("ERROR de MERCADO PAGO: ", err);
            return res.status(501).json({success: false, message: "Error al crear el pago", error: err})
        })

        if (data !== undefined && data !== null) {
            console.log("LOS DATOS DEL CLIENTE SON CORRECTOS", data.response);

            const order = payment.order

            Order.create(order, async (err, id) => {
                if (err) {
                    return res.status(501).json({success: false, message: "Hubo un error con el registro de la orden", error: err});
                }

                for (const product of order.products) {
                    await OrderHasProducts.create(id, product.id, product.quantity, (err, id_data) => {
                        if (err) {
                            return res.status(501).json({success: false, message: "Hubo un error con la operacion de los productos en la orden", error: err});
                        }
                    });
                }

                return res.status(201).json({
                    success: true, message: "La orden se creo correctamente", data: data.response, // El ID del nuevo usuario
                });
            });
        } else {
            return res.status(501).json({success: false, message: "Error con algun dato en la peticion"})
        }
    }
}
