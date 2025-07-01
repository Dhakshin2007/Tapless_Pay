# 🚀 BLEPay – Tapless UPI Payment Prototype

BLEPay is a **gesture-activated UPI payment simulation system** that uses **BLE Beacons** to detect nearby merchants and simulate voice-based UPI payment flows. Built as a proof-of-concept for futuristic, hands-free, and accessible fintech experiences.

🌐 **Live Demo**: [https://blepay.vercel.app](https://blepay.vercel.app)

---

## ✨ Features

- 📱 **Triple-tap gesture** to activate payment flow
- 📡 **BLE beacon detection** to identify nearby merchants
- 🗣️ **Voice-assisted interaction** for selecting merchants and confirming payments ( Upcoming )
- 🧠 Designed for **accessibility**, **IoT integration**, and **next-gen UPI**
- ⚙️ Built using **React + Vite + TypeScript**
- 🌍 Deployed on **Vercel**

---

## 📦 Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Deployment**: Vercel
- **BLE**: Web Bluetooth API
- **Voice**: Web Speech API (SpeechRecognition, SpeechSynthesis)
- **Gesture Activation**: Simulated triple-tap trigger

---

## 🧪 Test BLE Feature (Using Mobile)

To simulate merchant beacons and test detection:

1. Install [`nRF Connect for Mobile`](https://play.google.com/store/apps/details?id=no.nordicsemi.android.mcp)
2. Open the app and go to **Advertiser**
3. Tap **Create New Advertisement**
4. Set a **custom local name** (e.g. "Merchant_A")
5. Leave other settings default and tap **Start Advertising**
6. Visit [https://blepay.vercel.app](https://blepay.vercel.app) on another BLE-enabled device to detect the beacon

---

## 🧠 Why This Project?

This was built to explore:
- UPI without QR codes or NFC
- Voice-first UX for **visually impaired** or **hands-free** users ( Under Development )
- BLE-based proximity payment models in public spaces
- Touchless and secure payment activation with simple gestures

---

## ⚠️ Disclaimer

> This is a **prototype only**. It does not handle real payments or connect to actual UPI systems.  
> No sensitive data is collected or transmitted. It is meant for UI/UX demonstration and research purposes.

---

## 🤝 Looking For

- Collaborators in fintech, BLE, and embedded systems
- Teams who want to build a full-scale app from this prototype
- Mentors in UPI / NFC / BLE security architecture

---

## 👤 Author

**Dhakshin Kotha**  
Student innovator & developer | [LinkedIn](https://www.linkedin.com/in/dhakshinkotha) 
📧 Email: kothadhakshin123@gmail.com

---

## 📄 License

This project is open-source for educational, non-commercial use. Contact for extended collaboration or licensing.
