---
title: OpenThread nRF52840 Firmware Builder
summary: An automated build system for generating OpenThread firmware images for the
  nRF52840 platform. It produces UART and USB-enabled binaries for Full Thread Device
  (FTD) and Radio Co-Processor (RCP) configurations, specifically optimized for Home
  Assistant and OpenThread Border Router integrations.
slug: openthread-nrf52840-firmware-builder
codeUrl: https://github.com/ArthFink/nrf52840-OpenThread
siteUrl: https://openthread.io/
star: 29
version: release-2026-01
lastUpdated: '2025-12-09'
rtos: ''
libraries:
- open-thread
topics:
- homeassistant
- nrf52840
- openthread
- openthread-border-router
isShow: false
createdAt: '2026-02-09'
updatedAt: '2026-02-09'
relatedProjects:
- openthread-rtos
- seeed-home-assistant-discovery
- shelly-to-haa-firmware-converter
- nrf-connect-sdk-build-docker-environment
- esp32-p4-home-assistant-display
- cloudhome-firmware
---

## Overview

The OpenThread nRF52840 Firmware Builder is a specialized repository designed to automate the compilation and distribution of the latest OpenThread firmware for Nordic Semiconductor's nRF52840 SoC. By leveraging GitHub Actions, the project ensures that users always have access to up-to-date binaries without needing to maintain a local toolchain. This is particularly useful for developers and smart home enthusiasts working with Thread networking, as it provides ready-to-flash images for common hardware like the nRF52840 Dongle.

## Firmware Variants and Use Cases

The project generates several distinct versions of the firmware to support different hardware configurations and networking roles:

- **UART Version (`ot-cli-ftd-UART.hex`)**: Designed for standard serial communication, typically used with development kits where a dedicated UART interface is available.
- **USB Version (`ot-cli-ftd-USB.hex`)**: Optimized for the nRF52840 Dongle, allowing the device to act as a Full Thread Device (FTD) via its native USB interface.
- **USB Radio Co-Processor (`ot-rcp-USB.hex`)**: A critical component for building a Thread Border Router. In this mode, the nRF52840 handles the 802.15.4 radio layer while the higher-level networking stack runs on a host processor, such as a Raspberry Pi.

## Integration with Home Assistant

A primary focus of this project is its seamless integration with the Home Assistant ecosystem. By flashing the RCP firmware to an nRF52840 dongle, users can create a powerful OpenThread Border Router (OTBR) within Home Assistant. This setup enables the management of Matter-over-Thread devices and standard Thread mesh networks directly from the Home Assistant dashboard.

The provided documentation includes a detailed guide for configuring the OpenThread Border Router add-on, setting up the Thread integration, and syncing credentials with mobile devices via the Home Assistant Companion App. This makes it an essential resource for users looking to build a local, private Matter-compatible smart home.

## Technical Implementation

The repository utilizes the `ot-nrf528xx` platform abstraction layer as a submodule, which provides the necessary drivers and hardware-specific code to run OpenThread on Nordic's silicon. The build process targets the ARM Cortex-M4 architecture of the nRF52840, ensuring that hardware-accelerated cryptography and radio features are fully utilized for secure and efficient networking.

## Flashing and Deployment

For ease of use, the project supports multiple flashing methods. Users can utilize the graphical **nRF Connect for Desktop** Programmer tool, which is ideal for those who prefer a visual interface when working with the nRF52840 Dongle's bootloader. Alternatively, the **nrfjprog** command-line utility is supported for power users and automated workflows. The documentation highlights specific flags like `--sectorerase` to ensure that the device's bootloader remains intact during the flashing process, preventing accidental bricking of the hardware.
