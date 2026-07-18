---
title: Network Provisioning for Zephyr RTOS
summary: A Zephyr RTOS port of Espressif's network provisioning protocol, enabling
  secure Wi-Fi or Thread configuration over BLE, SoftAP, or device console. It integrates
  with Zephyr's native subsystems like wifi_credentials and net_mgmt while maintaining
  compatibility with official Espressif provisioning mobile apps.
slug: network-provisioning-for-zephyr-rtos
codeUrl: https://github.com/beriberikix/network-provisioning-zephyr
siteUrl: https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/provisioning/provisioning.html
version: v0.5.1
lastUpdated: '2026-06-18'
licenses:
- Apache-2.0
rtos: zephyr
libraries:
- nanopb
- open-thread
topics:
- ble
- bluetooth
- esp-idf
- esp32
- iot
- networking
- provisioning
- wi-fi
- zephyr-rtos
isShow: false
createdAt: '2026-07-15T05:11:03+00:00'
updatedAt: '2026-07-15T05:11:03+00:00'
---

## Seamless Network Onboarding for Zephyr Devices

One of the most challenging aspects of deploying IoT devices is the "out-of-box experience"—specifically, how a user provides Wi-Fi credentials or network keys to a headless device. While Espressif's ESP-IDF has long offered a robust provisioning framework, Zephyr RTOS developers often had to build custom solutions. This project bridges that gap by providing a native Zephyr port of the Espressif network provisioning protocol.

By implementing the same protocomm wire protocol used by ESP-IDF, this library allows Zephyr-based devices to work out-of-the-box with the official Espressif BLE and SoftAP provisioning apps for Android and iOS. This means developers can leverage a mature, battle-tested mobile ecosystem without writing a single line of custom mobile code.

## Architecture and Transport Flexibility

The project is designed with a transport-agnostic architecture. At its core, a manager drives a state machine that handles lifecycle events, while a transport scheme layer manages the physical communication. This modularity allows the same provisioning logic to work across several different mediums:

*   **Bluetooth LE (GATT):** Each protocol endpoint is exposed as a GATT characteristic. The system uses the Characteristic User Description descriptor to map names to characteristics, allowing mobile apps to discover services dynamically.
*   **SoftAP (HTTP):** The device hosts a temporary access point and a lightweight HTTP server. Provisioning data is exchanged via POST requests to specific URIs like `/prov-config` or `/proto-ver`.
*   **Console (Shell):** For debugging or wired provisioning, a shell command allows developers to manually feed hex-encoded requests into the protocol engine.

Under the hood, the project maps ESP-IDF building blocks to their Zephyr equivalents. For example, where ESP-IDF uses `protobuf-c`, this port uses `nanopb`. Where the original uses `esp_wifi`, this project utilizes Zephyr’s `net_mgmt` API and the `wifi_credentials` subsystem to persist data in NVS via the settings backend.

## Security and Protocol Surface

Security is a first-class citizen in this implementation. It supports Security Scheme 0 (plaintext) for development and Security Scheme 1 for production. Scheme 1 employs a sophisticated handshake involving Curve25519 key exchange, AES-256-CTR encryption, and SHA-256 for proof-of-possession. These cryptographic operations are handled via Zephyr's PSA Crypto API, ensuring that sensitive keys are managed securely.

The protocol supports various endpoints for versioning, session management, Wi-Fi scanning, and configuration. A particularly useful feature is the ability for the device to perform a Wi-Fi scan and report results back to the mobile app, allowing the user to select their network from a list rather than typing an SSID manually.

## Integration and Usage

Integrating the manager into a Zephyr application is straightforward. The API provides a high-level interface to initialize the manager, start the provisioning process, and handle lifecycle events through callbacks.

```c
#include <network_provisioning/network_prov_mgr.h>
#include <network_provisioning/scheme_ble.h>

// Initialize with BLE transport
struct network_prov_mgr_config config = {
    .scheme = &network_prov_scheme_ble,
    .wifi_conn_attempts = 3,
    .app_event_cb = my_callback,
};

network_prov_mgr_init(config);

// Start provisioning with Security 1 and a Proof-of-Possession
network_prov_mgr_start_provisioning(NETWORK_PROV_SECURITY_1, "pop1234", "PROV_DEVICE", NULL);

// Wait for connection or handle via events
network_prov_mgr_wait();
```

## Robust Testing and Simulation

To ensure reliability across different hardware targets, the repository includes an extensive testing suite. This includes unit tests for the protocol core and integration tests that run on `native_sim`. One of the standout features is the inclusion of BabbleSim end-to-end tests, which simulate the entire BLE radio interaction headlessly. This allows for automated CI testing of the full provisioning flow—including success and failure scenarios—without needing physical hardware on every commit.

Whether you are building a consumer product that needs a polished mobile setup experience or an industrial sensor requiring secure field configuration, this project provides a standardized, interoperable path for network provisioning on Zephyr RTOS.
