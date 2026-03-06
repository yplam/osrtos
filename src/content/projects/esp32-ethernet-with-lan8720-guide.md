---
title: ESP32 Ethernet with LAN8720 Guide
summary: A comprehensive guide and driver implementation for connecting the LAN8720
  Ethernet PHY to an ESP32 using the ESP-IDF framework. It focuses on using the internal
  ESP32 PLL to generate the 50MHz reference clock, effectively avoiding common hardware
  conflicts with GPIO0 during the boot process.
slug: esp32-ethernet-with-lan8720-guide
codeUrl: https://github.com/Zelmoghazy/esp32-ethernet-lan8720
star: 43
lastUpdated: '2024-06-17'
rtos: freertos
libraries:
- lwip
topics:
- dev-kit-v1
- esp-idf
- esp32
- ethernet
- lan8720
- mac
- phy
isShow: true
image: /202603/lam8720.webp
createdAt: '2026-03-06'
updatedAt: '2026-03-06'
---

## Overview

Integrating Ethernet into ESP32 projects provides a level of reliability and speed that Wi-Fi often cannot match. This project provides a detailed guide and a minimal driver implementation for using the LAN8720 Physical Layer (PHY) transceiver with the ESP32. The LAN8720 is a popular choice for embedded Ethernet due to its low cost and native support within the Espressif IoT Development Framework (ESP-IDF).

While the ESP32 includes an internal Media Access Controller (MAC), it requires an external PHY to handle the physical signaling, magnetics, and RJ45 connection. This project specifically addresses the hardware challenges associated with the Reduced Media-Independent Interface (RMII) and reference clock generation.

## Solving the GPIO0 Clock Conflict

A common hurdle when using the LAN8720 with the ESP32 is the 50MHz reference clock requirement. Traditionally, many designs use an external oscillator on the PHY board to provide this clock. However, on the ESP32, the reference clock input is typically tied to GPIO0. Since GPIO0 is a strapping pin that determines the boot mode (serial bootloader vs. flash), having a 50MHz signal active during reset can prevent the ESP32 from booting correctly.

This project implements an elegant workaround: instead of using the external oscillator on the LAN8720 board, it utilizes the ESP32's internal high-precision PLL to generate the 50MHz reference clock. By outputting this clock on GPIO17 (an inverted 50MHz APLL clock), the design avoids the GPIO0 conflict entirely. This approach is particularly useful for developers using standard development kits like the DevKit-V1, where GPIO0 might not be easily accessible or where hardware modifications to the strapping pins are undesirable.

## Hardware Implementation

The project details the necessary wiring for the RMII interface. Because the RMII signals are fixed in the ESP32 hardware for the EMAC peripheral, the following connections are mandatory:

- **TX_EN**: GPIO21
- **TX0/TX1**: GPIO19 / GPIO22
- **RX0/RX1**: GPIO25 / GPIO26
- **CRS_DV**: GPIO27
- **REFCLK**: GPIO17 (Output from ESP32)

To use the internal clock, the external oscillator on the LAN8720 board must be disabled. The guide suggests a hardware modification where the oscillator's enable pin is tied to ground, ensuring it does not interfere with the ESP32-generated clock signal.

## Software Configuration

The provided software implementation is a minimal driver extracted from ESP-IDF examples, tailored for the LAN8720. It includes support for both DHCP and static IP configurations. The code demonstrates how to initialize the MAC and PHY instances, configure the RMII interface to use the internal clock, and attach the driver to the TCP/IP stack (esp-netif).

```c
eth_esp32_emac_config_t esp32_emac_config = {
    .smi_mdc_gpio_num  = ETH_MDC_GPIO,                       
    .smi_mdio_gpio_num = ETH_MDIO_GPIO,                      
    .interface = EMAC_DATA_INTERFACE_RMII,        
    .clock_config = {
        .rmii = {
            .clock_mode = EMAC_CLK_OUT,             // Output clk from ESP32
            .clock_gpio = EMAC_CLK_OUT_180_GPIO     // Choose GPIO17   
        }                                         
    },                                            
    .dma_burst_len = ETH_DMA_BURST_LEN_32 
};
```

## Performance and Reliability

Despite using long jumper wires in the test setup, the project reports stable performance. Testing included Round Trip Time (RTT) measurements for latency and throughput testing via `iperf`. The results indicate that the internal PLL method is a robust alternative to external oscillators, providing a stable link for 10/100 Mbps Ethernet communication.
