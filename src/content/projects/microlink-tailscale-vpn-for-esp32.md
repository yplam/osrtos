---
title: 'MicroLink: Tailscale VPN for ESP32'
summary: A production-ready Tailscale protocol implementation for ESP32 microcontrollers
  using the ESP-IDF framework. It enables secure VPN connectivity via WireGuard encryption,
  supporting NAT traversal through DERP and STUN.
slug: microlink-tailscale-vpn-for-esp32
codeUrl: https://github.com/CamM2325/microlink
star: 12
version: v1.0.0
lastUpdated: '2025-12-07'
rtos: freertos
libraries:
- lwip
topics:
- c
- derp
- embedded
- embedded-systems
- esp-idf
- esp32
- esp32-s3
- home-automation
- iot
- lwip
- mesh-network
- microcontroller
- nat-traversal
- networking
- peer-to-peer
- remote-access
- stun
- tailscale
- vpn
- wireguard
isShow: true
image: /202601/Atom_EchoS3R_01.webp
createdAt: '2026-01-31'
updatedAt: '2026-01-31'
relatedProjects:
- unabto-sdk
- esp8266-rtos-homekit-accessory
- esp32-usb-over-ip
- mqboard-micropython-mqtt-micro-framework
- cmsis-dap-over-tcp-for-esp32
- ghostesp
---

MicroLink brings the power of Tailscale's mesh VPN to the ESP32 ecosystem, allowing microcontrollers to participate directly in a secure "tailnet." This implementation is a production-ready ESP-IDF component that handles the complexities of the Tailscale protocol, including coordination, encryption, and NAT traversal.

### Full Tailscale Protocol Support

MicroLink implements the modern Tailscale stack (ts2021) specifically for resource-constrained environments. It utilizes WireGuard for its cryptographic foundation, employing ChaCha20-Poly1305 encryption to ensure data privacy and integrity. To handle the challenges of modern networking, it includes:

- **DISCO (Discovery Protocol):** For path discovery and maintaining direct peer-to-peer connections.
- **DERP (Designated Encrypted Relay for Packets):** Ensuring connectivity even when devices are behind restrictive NATs or firewalls.
- **STUN Support:** For public IP discovery and port mapping.

### Hardware and Performance

While MicroLink can run on standard ESP32 chips, it is highly optimized for the ESP32-S3. Due to the memory-intensive nature of parsing Tailscale MapResponses, the project strongly recommends hardware with PSRAM. The core logic requires approximately 100KB of SRAM, with additional buffers typically allocated in PSRAM to prevent memory exhaustion during heavy network activity. The implementation has been tested on various hardware including the Waveshare ESP32-S3-Touch-AMOLED and Seeed Studio XIAO ESP32S3 Sense.

### Seamless ESP-IDF Integration

As a native ESP-IDF component, MicroLink integrates directly into existing projects. It uses Kconfig for configuration, allowing developers to toggle features like DERP, DISCO, and STUN through the standard `menuconfig` interface. It relies on the `lwIP` stack for networking and `mbedTLS` for security, ensuring compatibility with the standard ESP-IDF networking environment.

### Getting Started

To use MicroLink, developers initialize the client with a Tailscale auth key and a device name. The library provides a state-machine-based API where `microlink_update` is called regularly to handle background tasks and protocol maintenance.

```c
#include "microlink.h"

void app_main(void) {
    // Initialize WiFi first...

    // Configure MicroLink
    microlink_config_t config;
    microlink_get_default_config(&config);
    config.auth_key = "tskey-auth-xxxxx";  // Your Tailscale auth key
    config.device_name = "esp32-device";

    // Initialize
    microlink_t *ml = microlink_init(&config);
    microlink_connect(ml);

    // Main loop
    while (1) {
        microlink_update(ml);

        if (microlink_is_connected(ml)) {
            char ip_str[16];
            ESP_LOGI(TAG, "Connected! VPN IP: %s",
                     microlink_vpn_ip_to_str(microlink_get_vpn_ip(ml), ip_str));
        }

        vTaskDelay(pdMS_TO_TICKS(100));
    }
}
```

### Use Cases

MicroLink is ideal for secure IoT deployments where devices need to communicate across different networks without complex firewall rules or port forwarding. Whether it is a remote sensor node or an industrial controller, MicroLink provides a secure, encrypted tunnel to the rest of your infrastructure. It supports standard Tailscale features like `tailscale ping`, allowing for easy diagnostics from any other device on the network.
