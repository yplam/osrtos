---
title: CoAP-EAP with EAP-NOOB in Contiki
summary: This project provides an implementation of the EAP-NOOB (Nimble Out-of-Band)
  authentication method and CoAP-EAP protocol for secure bootstrapping of IoT devices.
  Built on the Contiki-NG RTOS, it enables secure association of appliances with user
  accounts using out-of-band communication channels.
codeUrl: https://github.com/eduingles/coap-eap-noob
isShow: false
rtos: contiki-ng
libraries: []
topics:
- coap-eap
- contiki
- contiki-ng
- contiki-os
- eap-noob
- lo-coap-eap
- zolertia-firefly
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rpl-network-authentication-simulation
- 6lbr-on-telecontrolli-devices-x-ip4t-x-ip5
- libedhoc
- zephyr-coaps-client-with-tinydtls
- esp8266-rtos-homekit-accessory
- sleepy-nodes
---

The **CoAP-EAP with EAP-NOOB** project is a specialized implementation designed to solve one of the most challenging problems in the Internet of Things: secure bootstrapping. When a new IoT device (or "appliance") is taken out of the box, it needs a secure way to be authenticated and associated with a user's account without pre-shared keys or complex manual configuration. This project implements the **EAP-NOOB (Nimble Out-of-Band)** authentication method, as specified in the IETF drafts, specifically tailored for the **Contiki-NG** operating system.

### The Architecture of Secure Bootstrapping

This implementation is part of a larger ecosystem required to facilitate secure device onboarding. The architecture typically involves four distinct components:

1.  **Contiki Client**: The firmware running on the IoT device itself, containing the EAP-NOOB peer implementation.
2.  **CoAP-EAP Controller**: Acts as a proxy between the IoT device and the authentication server.
3.  **EAP-NOOB Server (hostapd)**: The AAA (Authentication, Authorization, and Accounting) server that handles the server-side logic of the EAP method.
4.  **NodeJS Webserver**: A front-end for users to manage their accounts and track the bootstrapping process of their appliances.

By using CoAP (Constrained Application Protocol) as the transport for EAP packets, the system remains lightweight enough for resource-constrained microcontrollers while maintaining robust security standards.

### Technical Implementation Details

The project includes a variety of cryptographic and utility modules necessary for the EAP-NOOB exchange. Key source files include implementations for **AES**, **Base64** encoding, **SHA256** calculations, and **Elliptic Curve Cryptography (ECC)** for public key and shared secret management. 

One interesting aspect of this implementation is the use of Out-of-Band (OOB) signaling. The project includes modules like `oob_led.c` and `oob_led_bitseq.c`, which suggest the use of visual indicators (like LEDs) to transmit or confirm OOB information, a common pattern in EAP-NOOB for verifying the identity of a device physically present near the user.

### Hardware Support and Requirements

The project is primarily tested on the **Zolertia Firefly** (based on the CC2538). Due to the cryptographic overhead of EAP-NOOB, the implementation is memory-intensive. Users are required to manually increase the stack size in the Contiki-NG CPU startup files to accommodate the requirements. Specifically, the stack size in `startup-gcc.c` for the CC2538 must be increased from 256 to 512 (providing 4 Kilobytes of stack) to ensure stable operation during the handshake.

### Getting Started

To use this project, it is typically added as a submodule within a Contiki-NG environment. The build system uses standard Makefiles, with specific flags available for debugging and configuration. For example, to compile for the Zolertia Firefly with a specific PANID, one would use:

```bash
make udp-client.upload TARGET=zoul BOARD=firefly MOTES=/dev/ttyUSB1 MAKE_ALTERNATIVE_PANID=1 WERROR=0 login
```

Once running, the device can initiate a "Reconnect Exchange" either automatically when a timeout expires or manually via a button press on the client mote. This flexibility allows developers to test different bootstrapping scenarios, from fully automated onboarding to user-triggered re-authentication.

### Debugging and Monitoring

The implementation provides granular debugging through the `DEBUG_NOOB` flag. When enabled, it provides detailed logs of the EAP-NOOB state machine transitions, cryptographic operations, and message exchanges, which is essential for troubleshooting complex authentication flows in a constrained wireless environment.
