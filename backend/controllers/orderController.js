import axios from "axios";
import orderModel from "../models/orderModel.js";

// Helper to get M-Pesa Access Token
const getMpesaToken = async () => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
            headers: { Authorization: `Basic ${auth}` }
        });
        return response.data.access_token;
    } catch (error) {
        console.error("Token Error:", error);
    }
};

// Main M-Pesa Push Function
const placeOrderMpesa = async (req, res) => {
    try {
        const { userId, address, items, amount, phone } = req.body;
        const token = await getMpesaToken();
        const date = new Date();
        const timestamp = date.getFullYear() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2);

        const shortCode = process.env.MPESA_SHORTCODE; // Your Till/Paybill
        const passkey = process.env.MPESA_PASSKEY;
        const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');

        // Formatting phone to 254XXXXXXXXX
        const formattedPhone = phone.startsWith('0') ? '254' + phone.substring(1) : phone;

        const stkData = {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline", // or CustomerBuyGoodsOnline
            Amount: amount,
            PartyA: formattedPhone,
            PartyB: shortCode,
            PhoneNumber: formattedPhone,
            CallBackURL: "https://your-domain.com/api/order/mpesa-callback", 
            AccountReference: "SokoMkononi",
            TransactionDesc: "Payment for Groceries"
        };

        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/query",
            stkData,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.ResponseCode === "0") {
            const newOrder = new orderModel({
                userId,
                items,
                address,
                amount,
                paymentMethod: 'M-Pesa',
                payment: false,
                date: Date.now(),
                mpesaId: response.data.CheckoutRequestID // Save this for the callback!
            });

            await newOrder.save();
            res.json({ success: true, message: "STK Push Sent. Please enter your PIN." });
        } else {
            res.json({ success: false, message: "Failed to initiate STK Push." });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Callback Function
const mpesaCallback = async (req, res) => {
    try {
        const { Body } = req.body;

        // ResultCode 0 means the transaction was successful
        if (Body.stkCallback.ResultCode === 0) {
            const checkoutRequestID = Body.stkCallback.CheckoutRequestID;
            
            // Find the order with this ID and mark it as paid
            await orderModel.findOneAndUpdate(
                { mpesaId: checkoutRequestID }, 
                { payment: true, status: 'Order Placed' }
            );

            console.log("Payment Successful for ID:", checkoutRequestID);
        } else {
            console.log("Payment Failed or Cancelled by User");
        }

        res.json("Success"); // Safaricom expects a simple response to acknowledge receipt
    } catch (error) {
        console.error("Callback Error:", error);
        res.status(500).json("Internal Server Error");
    }
};

export { placeOrderMpesa, mpesaCallback };