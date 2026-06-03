---
title: TinyOS Cooja Simulator Application
summary: A TinyOS application designed for wireless sensor network simulation in the
  Cooja environment. It demonstrates data broadcasting between three motes, utilizing
  timers and radio interfaces to synchronize LED states based on received counter
  values and sender IDs.
slug: tinyos-cooja-simulator-application
codeUrl: https://github.com/SaeidRezaei90/TinyOS_App_Simulate_With_Cooja
star: 0
lastUpdated: '2021-04-27'
rtos: tinyos
topics:
- cooja
- cooja-simulator
- iot
- iot-application
- motes
- sensors
- tinyos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- contiki-simple-traffic-light
- tinyos-social-distancing-application
- cooja-using-contiki
- networked-embedded-systems-nes-project
- rbo-protocol-simulation-for-tinyos
- home-automation-simulation-using-contiki-os
---

The TinyOS Cooja Simulator project provides a practical implementation of a wireless sensor network (WSN) application designed to run within the Cooja simulation environment. This application demonstrates the fundamental concepts of TinyOS development, including component-based architecture, event-driven programming, and radio communication between multiple motes.

### Core Functionality
The application coordinates three distinct sensor motes that interact through broadcast messages. Each mote maintains a counter and periodically broadcasts its sensor ID and current counter value to its neighbors. Upon receiving a message, a mote processes the data and toggles its onboard LEDs according to the specific sender's ID and the received counter value. This creates a visual representation of network activity where the LED states of one mote are directly influenced by the transmissions of others.

### Component Architecture
The project follows the standard nesC (network-embedded systems C) structure required by TinyOS, utilizing three primary files:
- **RadioCountToLeds.h**: This header file defines the message structure used for radio communication. It encapsulates the `SenderId` and the `counter` into a single packet format.
- **RadioCountToLedsAppC.nc**: This is the configuration file that "wires" the various components together. It connects the functional logic to the underlying TinyOS abstractions for timers, LEDs, and the radio stack.
- **RadioCountToLedsC.nc**: The module file containing the actual implementation logic. It handles the lifecycle of the application, from booting the system to managing radio events.

### Technical Implementation
The application logic is divided into several logical sections that manage the hardware and network stack:

1.  **Initialization**: The `Boot.booted` event triggers the start of the Active Message (AM) control component. This ensures the radio hardware is ready before any communication is attempted.
2.  **Radio Management**: Once the radio is successfully started via `AMControl.start()`, the application initializes three separate timers, each configured with different millisecond intervals to prevent constant packet collisions and simulate varied sensor behavior.
3.  **Data Transmission**: When a timer fires, the mote increments its counter and prepares a packet. It uses the `AMSend.send()` interface with the `AM_BROADCAST_ADDR` to push the data out to all reachable nodes in the vicinity.
4.  **Data Reception**: The `Receive.receive()` event handles incoming packets. The mote extracts the sender ID and counter to decide which LED to toggle, providing immediate visual feedback of the communication.

### Simulation with Cooja
While TinyOS is designed for real hardware like the MicaZ or TelosB, this project specifically targets the Cooja Simulator. Cooja allows developers to visualize the network topology and the state of the motes in real-time. In this simulation, the LEDs are mapped to specific colors to identify which mote is communicating:
- **Green LED**: Related to Mote 2.
- **Red LED**: Related to Mote 1.
- **Blue LED**: Related to Mote 3.

This setup provides an excellent educational tool for understanding how broadcast domains work and how distributed state can be synchronized across a wireless network using the TinyOS framework.
