const Order = require("../models/order");
const OrderHasProducts = require("../models/order_has_products");
const Stripe = require("stripe")
const stripe = new Stripe('sk_test_51NJ26aKkJAUIe2sl6VYCSVHjhY9bGEP9NH1TGfsVKqnf8cys2ksj3VMiBsNoZE2Vfsqr4pTBbc1X9otF5o187rTC00Df52iuqv')

module.exports = {
    async createPayment(req, res) {
        const data = req.body
        const order = data.order;


        try {
            const payment = await stripe.paymentIntents.create({
                amount: data.amount,
                currency: 'CLP',
                description: 'ECOMMERCE APP REACT NATIVE DELIVERY APP',
                payment_method: data.id,
                confirm: true
            })
            console.log("PAYMENT: ", payment);

            if (payment !== null && payment !== undefined) {
                if (payment.status === 'succeeded') {
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
                            success: true, message: "Transaccion exitosa, La orden se creo correctamente", data: `${id}`, // El ID de la nueva orden
                        });
                    });
                } else {
                    return res.status(200).json({success: false, message: "No se pudo efectuar la transaccion"});
                }
            } else {
                return res.status(200).json({success: false, message: "No se pudo efectuar la transaccion"});
            }
        } catch (err) {
            console.log("ERROR STRIPE : " + err);
            return res.status(501).json({success: false, message: "Hubo un error en la transaccion", error: err});
        }
    }
}
