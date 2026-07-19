---
title: ESP-Hosted Open
summary: A specialized fork of Espressif's ESP-Hosted-MCU that unlocks low-level radio
  capabilities typically hidden by stock firmware, including 802.11p, CSI sensing,
  and FTM ranging. It operates as a wireless co-processor firmware for ESP32 chips,
  communicating with host MCUs over SDIO using FreeRTOS, lwIP, and NimBLE.
slug: esp-hosted-open
codeUrl: https://github.com/DatanoiseTV/esp-hosted-open
lastUpdated: '2026-05-03'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- lwip
- nimble
- open-thread
topics:
- 802-11p
- 802-15-4
- csi
- esp-hosted
- esp-idf
- esp-now
- esp32
- esp32-c5
- esp32-c6
- esp32-p4
- ftm
- its-g5
- monitor-mode
- research
- sdio
- thread
- v2x
- wifi
- wifi6
- zigbee
isShow: false
createdAt: '2026-07-08T00:11:07+00:00'
updatedAt: '2026-07-08T00:11:07+00:00'
relatedProjects:
- esp32-bus-expander
- esp32-bit-pirate
- beamstalker
- rnode-firmware-neopixel-edition
- esp32-bus-pirate
- ghost-esp
---

## Unlocking the Full Potential of Espressif Silicon

Standard wireless co-processor solutions often prioritize stability and regulatory compliance by abstracting the radio hardware behind high-level APIs. While this is ideal for standard Wi-Fi station or access point functionality, it creates a barrier for researchers and developers who need to work closer to the PHY layer. **ESP-Hosted Open** is a patched fork of the official `esp-hosted-mcu` repository designed to tear down those barriers, letting a host MCU drive every radio feature of an Espressif co-processor—including the parts the stock firmware deliberately hides.

By leveraging undocumented internals and direct calls into the `libphy.a` binary blobs, this project enables advanced wireless applications like 5.9 GHz V2X communication, monitor-mode sensing, and Fine Timing Measurement (FTM) ranging. It transforms an ESP32-C5 or C6 into a versatile RF front-end for powerful hosts like the ESP32-P4.

## Architecture and Implementation

The project maintains a clean separation from the upstream Espressif codebase by keeping the original `esp-hosted-mcu` untouched in a vendor directory. The magic happens through two primary additions:

1.  **Slave-side Overlay (`phy_rpc_overlay`):** A component that runs on the co-processor, providing a bridge to low-level PHY functions like `phy_11p_set`, `phy_force_rx_gain`, and `phy_disable_cca`.
2.  **Host-side Stub Library (`esp_hosted_open`):** A library for the host MCU that implements 46 request RPCs and 8 asynchronous event channels over the standard ESP-Hosted peer-data transport.

This architecture ensures that as Espressif updates the underlying transport layer, the "Open" patches can be rebased with minimal friction. Communication typically occurs over a 4-bit SDIO interface at 50 MHz, providing the throughput necessary for high-bandwidth tasks like CSI (Channel State Information) dumping.

## Expanded Wireless Capabilities

ESP-Hosted Open aims to expose every transmission and reception mode the silicon can physically handle. This includes:

*   **802.11p OCB:** Enables ITS-G5 / V2X communication on 5.9 GHz channels, a feature usually restricted in standard Wi-Fi stacks.
*   **CSI Sensing:** Captures per-frame CSI buffers, enabling advanced sensing applications like gesture recognition, presence detection, or even breathing monitoring.
*   **802.11mc FTM:** Provides a single-call initiator API that returns millisecond-resolution distance estimates between devices.
*   **ESP-NOW:** Full lifecycle management for peer-to-peer communication without the overhead of a traditional Wi-Fi association.
*   **802.15.4 / Thread / Zigbee:** On supported chips like the C6 and H2, the project exposes raw TX/RX events and channel control for low-power mesh networking.

To handle the diversity of the ESP32 chip family, the project includes a runtime capability discovery mechanism. By calling `esp_hosted_open_get_caps()`, the host can determine exactly which RPCs the slave firmware supports, allowing the same host code to scale across different hardware targets.

## Getting Started with the API

Integrating ESP-Hosted Open into a project involves initializing the upstream link followed by the custom RPC handlers. Once established, the API provides granular control over the radio state:

```c
#include "esp_hosted.h"
#include "esp_hosted_open.h"

// Initialize the transport and RPC layers
esp_hosted_init();
esp_hosted_open_init();

// Example: Configure a C5 for ITS-G5 (802.11p) communication
esp_hosted_open_set_country_permissive();
esp_hosted_open_set_phy_11p(true);
esp_hosted_open_set_channel(180);
esp_hosted_open_set_agc_max_gain(255);

// Example: Initiate FTM ranging
esp_hosted_open_register_ftm_cb(on_ftm_report, NULL);
esp_hosted_open_ftm_initiate(ap_mac, 16, 2, 6);
```

## Research and Regulatory Considerations

It is important to note that ESP-Hosted Open is an experimental tool intended for research and laboratory use. Because it allows for disabling carrier sense (CCA), overriding regulatory databases, and tuning to restricted frequencies, the responsibility for RF compliance rests entirely with the user. The developers recommend using shielded enclosures or fully-cabled setups with attenuators when testing these low-level PHY features to avoid interfering with public wireless infrastructure.
