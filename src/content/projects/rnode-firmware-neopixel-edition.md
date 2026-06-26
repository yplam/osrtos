---
title: RNode Firmware — NeoPixel Edition
summary: This project is a specialized fork of the RNode Firmware Community Edition
  (CE) that introduces NeoPixel status indicators for ESP32-based hardware, specifically
  the LilyGO LoRa32 v2.1. It serves as a software-defined LoRa modem for the Reticulum
  network stack, providing visual feedback for boot sequences and data transmission
  using the ESP32's underlying FreeRTOS-based Arduino core and SPIFFS for asset management.
slug: rnode-firmware-neopixel-edition
codeUrl: https://github.com/buildwithparallel/reticulum-rnodes
siteUrl: https://reticulum.network
version: v1.75-neopixel
lastUpdated: '2026-03-05'
licenses:
- GPL-3.0
image: /202606/reticulum-rnodes_0.avif
rtos: freertos
libraries:
- spiffs
topics:
- decentralized
- encrypted-communications
- esp32
- lora
- mesh-networking
- off-grid
- open-source
- reticulum
- rnode
isShow: true
createdAt: '2026-06-25T23:49:55+00:00'
updatedAt: '2026-06-25T23:49:55+00:00'
relatedProjects:
- esp32-mesh-control
- ropixon-at-lora-dongle
- esp32-32x32-rgb-matrix-controller
- esp32-reticulum-network-stack-gateway-node
- meshtnc
- rainnow-core
---

### Visual Status for Reticulum Nodes

This project is a fork of the RNode Firmware CE (Community Edition), specifically modified to add NeoPixel status indicator support for ESP32-based boards. While the original firmware is a robust solution for creating software-defined LoRa modems, this version focuses on providing at-a-glance visual feedback. The NeoPixel LED lights up during the boot process and triggers on every data transfer (RX/TX), allowing users to confirm that their node is alive and actively relaying traffic in the Reticulum network.


### The Boot Sequence

When an RNode running this firmware powers on, the NeoPixel serves as a primary health indicator. It lights up in a steady purple color while the firmware initializes. Simultaneously, the onboard OLED display cycles through hardware initialization, device checks, and version information. This multi-layered feedback ensures the user knows exactly when the device has transitioned from a boot state to an operational state.

Once the internal checks pass, the device enters a ready state. The NeoPixel remains lit for a default duration of 60 seconds before turning off to conserve power. However, any subsequent radio activity—whether receiving or transmitting data—will re-trigger the LED, providing a real-time heartbeat for the network node.

### Technical Enhancements and GPIO Fixes

While the upstream firmware included NeoPixel support for certain NRF52-based boards, this fork extends that capability to ESP32-based hardware. A significant technical contribution of this fork is the correction of a common wiring pitfall. Original build guides often suggested using GPIO 12 for the NeoPixel data line. However, GPIO 12 is a "strapping pin" on the ESP32 that controls the internal flash voltage regulator during the reset cycle. If a NeoPixel pulls this pin high during boot, it can cause the board to fail or behave erratically.

To resolve this, the firmware defaults to **GPIO 13**, which provides reliable operation without interfering with the boot strapping process. This fork also introduces a timed activity indicator logic, allowing the LED to stay lit for a configurable duration after an event rather than just a momentary flicker.

| Event | Default Color | Default Duration |
|-------|--------------|-----------------|
| Boot  | Purple (128, 0, 128) | 60 seconds |
| RX (receive) | White (255, 255, 255) | 30 seconds |
| TX (transmit) | Blue (0, 0, 255) | 30 seconds |

### Customization and Configuration

Users can easily customize the behavior of the NeoPixel by overriding default parameters at compile time. This includes adjusting the RGB values for different states and modifying the timeout durations. This is particularly useful for users who want to distinguish between multiple nodes in a local area or reduce light pollution for stealthier installations.

```cpp
// Example of custom timeout and color configuration
#define NP_BOOT_TIMEOUT_MS 60000
#define NP_RX_TIMEOUT_MS   30000
#define NP_TX_TIMEOUT_MS   30000

#define NP_BOOT_R 128
#define NP_BOOT_G 0
#define NP_BOOT_B 128
```

### Deployment and Hardware Compatibility

The firmware is primarily tested on the **LilyGO LoRa32 v2.1**, a popular choice for handheld RNode builds. The project provides a streamlined build system using `arduino-cli` and a comprehensive `Makefile` that handles board-specific cores and dependencies. For users who prefer not to compile from source, pre-built binaries are provided for the LoRa32 v2.1, which can be flashed using standard ESP32 tools. 

Beyond the firmware itself, the project supports the RNode Bootstrap Console, which is stored in a separate SPIFFS partition. This allows the device to serve a basic configuration and diagnostic interface even when not connected to a full Reticulum host, making it a versatile tool for field deployments.
