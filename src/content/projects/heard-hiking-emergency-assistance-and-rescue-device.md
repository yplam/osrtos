---
title: HEARD — Hiking Emergency Assistance and Rescue Device
summary: HEARD is a mesh network system of ESP32-based devices designed to monitor
  hiking group safety in remote environments without cellular coverage. It utilizes
  LoRa for multi-hop communication and GPS for real-time location tracking against
  pre-loaded GPX routes, featuring a firmware-in-the-loop simulator for protocol validation.
slug: heard-hiking-emergency-assistance-and-rescue-device
codeUrl: https://github.com/luciobaiocchi/heard
siteUrl: https://luciobaiocchi.com/heard
version: enclosure-v0.1
lastUpdated: '2026-07-07'
licenses:
- Apache-2.0
image: /202607/heard_3.avif
rtos: freertos
topics:
- digital-twin
- embedded
- esp32
- freertos
- gps
- gps-tracking
- hiking
- iot
- lora
- maplibre
- mesh-networks
- offline-first
- open-source-hardware
- platformio
- pybind11
- safety
- search-and-rescue
- simulator
isShow: true
createdAt: '2026-07-19T00:29:06+00:00'
updatedAt: '2026-07-19T00:29:06+00:00'
---

In remote mountain areas, the lack of cellular coverage makes group safety a significant challenge. While existing tools like Personal Locator Beacons (PLBs) or satellite messengers are effective for calling for help after an accident, they do little to help a group stay together and prevent incidents before they occur. HEARD addresses this gap by creating a small mesh of ESP32 devices that allows a group leader to know exactly where everyone is and whether any member has strayed from the planned route, all without any external infrastructure.

### How it Works

Each hiker carries a device equipped with a GPS module and a LoRa radio. The planned route (GPX) is loaded onto every device, and an onboard algorithm continuously classifies the hiker’s status as either `IN_PATH` or `OUT_PATH` based on a configurable corridor, typically set to ±100 meters. 


The group leader uses a **Heard Core** device, which periodically polls the group over LoRa. To reach members who may be out of direct range, the system employs multi-hop relaying through other devices in the mesh. This is achieved via selective flooding with hop lists, ensuring that the leader receives updates even in challenging terrain. The entire system runs offline on the devices themselves—no phones, internet connection, or SIM cards are required.

### Device Variants and Protocol

The ecosystem consists of three primary device roles:
- **Heard Core**: Carried by the guide or group leader. It features an e-ink display for group status, an SOS button, and manages group coordination.
- **Heard Node**: Carried by adult hikers. These devices follow the route, answer polls, and act as relays for the mesh network.
- **Heard Pico**: A button-sized concept for beginners or children, designed to send distress signals and receive simple alerts.

The LoRa protocol utilizes three main message types to manage the mesh. `REQ` messages are broadcasts from the Core requesting positions. `WAIT` messages are sent by intermediate nodes to signal they are currently relaying a request, preventing the Core from timing out. Finally, `POS` messages return aggregated location data back to the Core.

### Simulator and Digital Twin

To ensure the reliability of the protocol, the project includes a full digital twin. The actual C++ firmware protocol code is compiled into a Python module using pybind11, allowing it to be driven tick-by-tick along real GPX tracks in a simulated environment. This simulator models a probabilistic LoRa channel, accounting for distance falloff and terrain-based signal obstruction using ITU-R P.526 knife-edge diffraction over real elevation data.

![Simulator replay demo showing 3D terrain and radio propagation](/202607/heard_0.avif)

Recorded simulation runs can be replayed in a browser-based 3D viewer using MapLibre GL JS. This allows developers to visualize radio transmissions, monitor delivery metrics, and observe the group connectivity matrix across actual 3D terrain.

### Hardware Architecture

The initial prototype is built around the ESP32 dual-core microcontroller running FreeRTOS. It integrates a u-blox NEO-6M GPS module for positioning, a LoRa transceiver for communication, and a 2.9-inch e-ink display for the Core device's user interface. Field tests have demonstrated a GPS accuracy of approximately 1 meter and a LoRa range of up to 3 km in open environments.

![Heard Core internals — ESP32, u-blox GPS, LoRa radio and 2.9-inch e-ink module](/202607/heard_4.avif)

For the next iteration, the project is moving toward an ARM-based STM32 architecture. The **PCB V1** design features the STMicroelectronics `STM32WLE5CCU6`, which integrates the MCU and LoRa transceiver into a single System-on-Chip. This is paired with a u-blox `MAX-M10M` GNSS module, featuring an integrated LNA and SAW filter for high-sensitivity positioning in a compact 40.97 mm × 38.13 mm footprint.

![3D view of the PCB with key components marked](/202607/heard_6.avif)

The board utilizes a 4-layer stackup optimized for 50Ω RF performance, with tightly modeled grounded coplanar waveguides for the high-frequency sections. This transition to a custom PCB and a more integrated SoC represents a move toward a more compact and power-efficient device suitable for rugged outdoor use.
