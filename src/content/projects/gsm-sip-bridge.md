---
title: GSM-SIP Bridge
summary: A Rust-based application that bridges cellular calls from GSM, VoWiFi, and
  VoLTE paths to SIP extensions or PBX systems. It supports multi-module Quectel EC20
  setups, features self-healing capabilities, and integrates SMS forwarding to Discord
  and SQLite.
slug: gsm-sip-bridge
codeUrl: https://github.com/selvakn/gsm-sip-bridge
version: v8.10.0
lastUpdated: '2026-08-12'
licenses:
- GPL-3.0
rtos: ''
libraries:
- sqlite
topics:
- asterisk
- ec20
- epdg
- gsm
- gsm-gateway
- ims
- pjsip
- quectel
- sip
- sip-trunk
- telephony
- voip
- volte
- vowifi
isShow: false
createdAt: '2026-08-12T13:59:15+00:00'
updatedAt: '2026-08-12T13:59:15+00:00'
relatedProjects:
- sms-server
- mbed-cellular-boilerplate
- sistema-de-apertura-de-port-n-con-m-dulo-gsm
- quectel-gsm-lte-modem-driver
- pocket-dial
- obd2-to-mqtt-for-home-assistant
---

The GSM-SIP Bridge is a sophisticated middleware solution designed to interface cellular audio and signaling with modern VoIP systems. Written in Rust for performance and memory safety, it allows users to route incoming cellular calls to a SIP extension, effectively turning physical SIM cards into manageable SIP trunks. Whether the carrier delivers the call over traditional circuit-switched networks, VoWiFi (Wi-Fi Calling), or VoLTE, this bridge handles the translation to SIP and RTP seamlessly.

### Multi-Path Call Delivery

One of the most powerful aspects of this project is its flexibility in how it handles cellular traffic. It supports three distinct paths for call delivery:

*   **Circuit-Switched (CS):** The bridge auto-answers calls on Quectel EC20 modules and bridges the audio to a SIP destination. 
*   **VoWiFi:** It can answer calls delivered over a carrier's Wi-Fi Calling infrastructure. This involves establishing an IKEv2/IPsec ePDG tunnel using strongSwan and performing IMS-AKA registration. This path supports wideband audio (AMR-WB to G.722) and can even run without a modem if a physical PC/SC card reader is used to access the SIM.
*   **Host-side VoLTE:** Instead of delegating to a modem's internal voice stack, the bridge can perform its own IMS registration and call signaling over the LTE data path. This brings codec handling, jitter buffering, and media control fully under the bridge's software control.

### Architecture and Integration

The bridge is designed to fit into various telephony architectures. By default, it registers to a PBX (like Asterisk or FreePBX) as a trunk. Inbound mobile calls are invited to the PBX, which then decides the final destination based on the caller's number, which is passed through via headers like `P-Asserted-Identity`.

For smaller deployments without a dedicated PBX, the bridge includes a built-in SIP server mode. In this configuration, IP phones or softphones register directly to the bridge. When a cellular call arrives, the bridge rings the registered device directly. 

### SMS Management and Observability

Beyond voice calls, the bridge serves as an SMS gateway. All incoming messages are persisted to a local SQLite database. To ensure users never miss a message or a critical event, the system can post rich-embed notifications to Discord webhooks. These alerts cover not just SMS, but also operational status updates such as modem failures, SIM issues, or registration losses.

For operators, the project provides robust observability tools. It includes a Prometheus metrics endpoint and a pre-provisioned Grafana dashboard to monitor call logs, durations, and system health. 

### Hardware and Deployment

The project targets Linux (amd64 and arm64) and is optimized for Quectel EC20 USB modems. It handles hardware dynamically, auto-detecting connected modules and assigning them stable, IMEI-keyed slots that persist across restarts. The system is designed for high availability, featuring self-healing mechanisms that detect USB disconnects or network loss and recover each line independently with exponential backoff.

Deployment is streamlined via Docker Compose, which packages the bridge alongside Prometheus, Grafana, and a web-based SQLite browser for easy management of the call and message history.
