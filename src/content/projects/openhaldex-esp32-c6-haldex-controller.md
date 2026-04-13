---
title: OpenHaldex — ESP32-C6 Haldex Controller
summary: An open-source AWD controller for Volkswagen and Audi Group vehicles using
  Haldex Generation 1, 2, 4, and 5 differentials. Built on the ESP32-C6, it utilizes
  dual CAN interfaces to intercept and modify vehicle signals, enabling custom torque
  distribution, standalone operation, and wireless tuning via a web interface.
slug: openhaldex-esp32-c6-haldex-controller
codeUrl: https://github.com/Forbes-Automotive/OpenHaldex-C6
siteUrl: https://forbes-automotive.com
version: Releases
lastUpdated: '2026-04-12'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- lwip
topics:
- audi
- automotive
- automotive-controller
- awd
- canbus
- esp32
- esp32-c6
- haldex
- haldex-awd
- haldex-controller
- volkswagen
isShow: true
image: /202604/openhaldex-c6.webp
createdAt: '2026-04-12T09:33:21+00:00'
updatedAt: '2026-04-12T09:33:21+00:00'
---

OpenHaldex is a sophisticated open-source solution designed to unlock the full potential of the Haldex All-Wheel Drive (AWD) systems found in Volkswagen and Audi Group (VAG) vehicles. While factory Haldex controllers are often programmed for efficiency and safety, they can be restrictive for enthusiasts seeking more aggressive torque bias or specific handling characteristics. OpenHaldex acts as a bridge between the vehicle's chassis and the differential, allowing users to dictate exactly how much lock the system applies.

### Hardware and Architecture

The project has evolved from earlier iterations based on the Teensy platform to the modern **ESP32-C6**. This transition brings several advantages, most notably built-in Wi-Fi and Bluetooth capabilities, allowing for a completely wireless configuration experience. The hardware is designed for the harsh automotive environment, featuring a custom PCB with robust protection against ESD and transient voltages, a built-in fuse, and automotive-grade components.

At its core, the controller utilizes two **TWAI (CAN)** interfaces. This "man-in-the-middle" architecture allows the device to read messages from the vehicle's chassis CAN bus, modify them according to user-defined logic, and then broadcast the modified commands to the Haldex differential. This setup enables the controller to operate in several modes, ranging from a complete OEM passthrough to a fully standalone configuration for vehicle conversions where the original ECU signals might be missing.

### Advanced Control Modes

OpenHaldex provides a variety of preset modes to suit different driving conditions, each indicated by an on-board RGB LED:

*   **Stock:** Operates with factory-intended behavior.
*   **FWD:** Forces zero lock for improved fuel economy or dyno testing.
*   **75/25 & 60/40:** Provides fixed percentages of engagement for predictable traction.
*   **50/50:** Requests 100% lock for maximum traction in snow or off-road conditions.
*   **Expert Mode:** This is the most powerful feature for tuners. It allows the user to define a custom lock profile based on a 2D table of speed and throttle setpoints. By mapping engagement to specific driving parameters, users can eliminate the "reactivity" of the stock system and create a proactive AWD setup.

### The Web Interface and Learning Logic

One of the standout features of the C6-based controller is the integrated Web UI. By connecting to the device's Wi-Fi access point, users can adjust settings, switch modes, and view real-time diagnostics directly from a smartphone or laptop browser. This eliminates the need for specialized software or tethered cables.

Furthermore, the system includes a **Haldex Learning** routine. Rather than relying on simple approximations of lock percentage, the controller can cycle through available engagement values to learn the specific characteristics of the attached differential. This ensures that when a user requests a 50% lock, the controller provides exactly that, compensating for mechanical wear or variations between different Haldex generations.

### Integration and Expandability

Beyond basic torque control, the OpenHaldex-C6 hardware includes high-side drivers designed to manage brake and handbrake inputs, which is particularly critical for Generation 1 systems. These outputs can even be repurposed for auxiliary functions, such as controlling a dedicated oil cooler for the differential during track use. 

For developers and data enthusiasts, the project supports **SavvyCAN** via the GVRET protocol. By enabling Analyzer Mode, users can sniff CAN traffic across the bridge, making it easier to reverse-engineer additional vehicle features or debug communication issues on the bus. While this mode is active, the device defaults to OEM passthrough to ensure vehicle safety while the user monitors data.
