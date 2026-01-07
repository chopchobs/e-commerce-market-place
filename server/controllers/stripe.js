const prisma = require("../config/prisma");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.Payment = async (req, res) => {
  try {
    // code
    // check user
    const cart = await prisma.cart.findFirst({
      where: { orderedById: req.user.id },
    });
    // validate cart
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }
    // calculate amount in THB with 7% VAT
    const amountTHB = Math.round(cart.cartTotal * 100 * 1.07);
    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // const stripeId = paymentIntent.id;
    // console.log("Stripe PaymentIntent ID:", stripeId);

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Payment Not Success!!" });
  }
};
