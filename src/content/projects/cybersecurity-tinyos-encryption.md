---
title: Cybersecurity TinyOS Encryption
summary: A demonstration project for TinyOS that explores wireless sensor network
  security through encrypted and unencrypted login implementations. It includes a
  man-in-the-middle attack simulation to illustrate how malicious hosts can hijack
  connections and intercept plain-text credentials.
codeUrl: https://github.com/cgreen18/Cybersecurity-TinyOS-Encryption
isShow: false
rtos: tinyos
libraries: []
topics:
- cybersecurity
- encryption
- man-in-the-middle-attack
- tinyos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rpl-network-authentication-simulation
- crypto-implementations-example-for-contiki-os
- tinyosids
- deautherx
- wifi-nightmare
- building-wireless-sensor-networks-with-openthread
---

### Securing Wireless Sensor Networks with TinyOS

Wireless Sensor Networks (WSNs) are often deployed in environments where physical security is difficult to maintain, making them prime targets for various cyberattacks. The **Cybersecurity TinyOS Encryption** project serves as a practical demonstration of these vulnerabilities and their mitigations. Developed as a final project for a Fundamentals of Cybersecurity course, this repository provides a hands-on look at how passwords and sensitive data can be protected—or exposed—within a TinyOS-based environment.

### Project Overview and Scenarios

The repository is organized into three primary scenarios that illustrate the progression from a vulnerable system to a secured one, and finally, how an attacker might attempt to subvert those systems.

*   **Unencrypted Login**: This directory contains the baseline implementation where a client transmits a password to a host in plain text. In this scenario, any device within radio range can potentially intercept the sensitive data.
*   **Encrypted Login**: This version introduces encryption mechanisms to protect the transmission. By encrypting the login credentials, the project demonstrates how to ensure confidentiality even if the packets are captured by an unauthorized party.
*   **Man-in-the-Middle (MITM)**: Perhaps the most interesting part of the project, this folder contains code for a malicious host designed to hijack the connection. It demonstrates the technical process of intercepting communications and extracting plain-text passwords from unencrypted streams.

### Technical Architecture

The project is built using **TinyOS**, a popular open-source operating system designed for low-power wireless devices. The applications are written in **nesC**, a component-based, event-driven programming language. 

The architecture follows the standard TinyOS pattern of separating configuration from implementation. For example, in the `Encrypted_Login/client` directory, you will find:
- `ClientAppC.nc`: The configuration file that wires components together.
- `ClientC.nc`: The implementation file containing the application logic.
- `ClientC.h`: Header files defining message structures.

The project utilizes the Active Message (AM) stack for communication, as evidenced by components like `AMReceiverWC.nc` and `AMReceiverWP.nc`. These components handle the radio stack's complexities, allowing the developer to focus on the security logic.

### Target Hardware and Build System

Based on the repository's build artifacts, the project targets the **Iris Mote** platform. The build process is managed via standard TinyOS Makefiles. To compile the project for an Iris mote, a user would typically navigate to the specific scenario directory and run:

```bash
make iris
```

This generates the necessary binary files (such as `main.ihex` and `main.srec`) found in the `build/iris` directory, which can then be flashed onto the hardware.

### Acknowledgements

This project was developed with guidance from Dr. Vejarano at Loyola Marymount University (LMU), drawing on laboratory examples from his Wireless Sensor Networks course. While the documentation is minimal due to the constraints of a final project timeline, the code serves as a clear educational resource for those looking to understand the intersection of embedded systems and cybersecurity.
