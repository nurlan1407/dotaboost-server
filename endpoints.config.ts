export default{
    port: process.env.PORT,
    dbUsername: process.env.DBUSERNAME,
    dbUrl: process.env.DB_URL,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    paypalSecretKey: process.env.PAYPAL_SECRET_KEY,
    paypalClientId: process.env.PAYPAL_CLIENT_ID
}