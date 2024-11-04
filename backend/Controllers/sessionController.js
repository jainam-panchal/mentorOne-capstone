import User from '../models/UserSchema.js';
import Mentor from '../models/MentorSchema.js';
import Session from '../models/SessionSchema.js';
import Stripe from 'stripe';

export const getCheckoutSession = async (req, res) => {
  try {
    // Get currently booked mentor
    const mentor = await Mentor.findById(req.params.mentorId);
    const user = await User.findById(req.userId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get('host')}/mentors/${mentor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.mentorId,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: mentor.sessionPrice * 100,
            product_data: {
              name: mentor.name,
              description: mentor.bio,
              images: [mentor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    const newSession = new Session({
      mentor: mentor._id,
      user: user._id,
      sessionPrice: mentor.sessionPrice,
      session: session.id,  
    });

    await newSession.save();

    res.status(200).json({ success: true, message: 'Successfully Paid', session });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Error creating checkout session' });
  }
};