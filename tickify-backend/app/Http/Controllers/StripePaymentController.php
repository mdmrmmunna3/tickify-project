<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;
use App\Models\Payment;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Auth;
class StripePaymentController extends Controller
{


    public function createCheckoutSession(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'price' => 'required|numeric|min:1',
            'image_path' => 'nullable|string',
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'bdt',
                        'product_data' => ['name' => $request->title],
                        'unit_amount' => intval($request->price * 100),
                    ],
                    'quantity' => 1,
                ]
            ],
            'mode' => 'payment',
            'customer_email' => $user->email,
            'metadata' => [
                'event_title' => $request->title,
                'image_path' => $request->image_path ?? '',
                'purchase_id' => $request->purchase_id,
            ],
            'success_url' => env('APP_URL') . '/payment-success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => env('APP_URL') . '/payment-cancel',
        ]);

        return response()->json(['url' => $session->url]);
    }

    // payment success 

    public function paymentSuccess(Request $request)
    {
        $sessionId = $request->query('session_id');

        if (!$sessionId) {
            return response()->json(['error' => 'Session ID missing'], 400);
        }

        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        try {
            $session = Session::retrieve($sessionId);

            if ($session->payment_status !== 'paid') {
                return response()->json(['error' => 'Payment not completed'], 400);
            }

            // Check if payment already exists
            $existingPayment = Payment::where('stripe_payment_id', $session->payment_intent)->first();

            if ($existingPayment) {
                return response()->json([
                    'message' => 'Payment already recorded',
                    'amount' => $existingPayment->amount,
                    'payment_id' => $existingPayment->id,
                ]);
            }

            // Create new payment record
            $payment = Payment::create([
                'stripe_payment_id' => $session->payment_intent,
                'email' => $session->customer_email,
                'event_title' => $session->metadata->event_title ?? 'Unknown Event',
                'amount' => $session->amount_total / 100,
                'image_path' => $session->metadata->image_path ?? null,
            ]);

            if (!empty($session->metadata->purchase_id)) {
                $purchase = Purchase::find($session->metadata->purchase_id);
                if ($purchase && !$purchase->is_paid) {
                    $purchase->is_paid = true;
                    $purchase->save();
                }
            }

            return response()->json([
                'message' => 'Payment saved successfully',
                'amount' => $payment->amount,
                'payment_id' => $payment->id,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error: ' . $e->getMessage()], 500);
        }
    }


    // get all payment data 

    public function getUserPayments()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $payments = Payment::where('email', $user->email)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['payments' => $payments]);
    }

    public function getAllPayments()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $payments = Payment::orderBy('created_at', 'desc')->get();

        return response()->json(['payments' => $payments]);
    }

    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json(['message' => 'Payment deleted successfully']);
    }

}
