<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Webhook;

class StripeWebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $secret = env('STRIPE_WEBHOOK_SECRET');

        try {
            $event = Webhook::constructEvent(
                $payload,
                $sigHeader,
                $secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        // Handle successful payment
        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;

            // Prevent duplicate entries
            $existing = Payment::where('stripe_payment_id', $session->payment_intent)->first();

            if (!$existing) {
                Payment::create([
                    'stripe_payment_id' => $session->payment_intent,
                    'email' => $session->customer_email,
                    'event_title' => $session->metadata->event_title ?? 'Unknown',
                    'amount' => $session->amount_total / 100, // convert from paisa to BDT
                ]);
            }

            Log::info('✅ Payment stored successfully for ' . $session->customer_email);
        }

        return response()->json(['status' => 'Webhook received']);
    }
}
