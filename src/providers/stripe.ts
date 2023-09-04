import Stripe from "stripe";
import env from '../../endpoints.config';


const stripeSecretKey = env.stripeSecterKey || "none";
const stripe = new Stripe(stripeSecretKey,{
  apiVersion:'2023-08-16'
});

export default stripe;