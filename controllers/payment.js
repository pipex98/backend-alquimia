const { response } = require('express');
const stripe = require('stripe')( process.env.STRIPE_KEY )

const payment = async(req, res = response) => {

    const { tokenId, amount } = req.body

    stripe.charges.create(
        {
            source: tokenId,
            amount: amount,
            currency: 'usd'
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                console.log(stripeErr);
                res.status(500).json({
                    ok: false,
                    msg: 'Porfavor hable con el administrador'
                })
            } else {
                res.status(200).json({
                    ok: true,
                    stripeRes
                })
            }
        }
    )
}

module.exports = {
    payment
}