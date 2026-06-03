---
title: AirGradient Pro Rust Firmware
summary: A high-performance Rust-based firmware for the AirGradient Pro air quality
  monitor, utilizing the RTIC framework on an STM32F411. It features a custom bootloader
  with FOTA support, Ethernet connectivity via smoltcp, and integration with InfluxDB.
codeUrl: https://github.com/jonlamb-gh/air-gradient-pro-rs
isShow: false
rtos: rtic
libraries: []
topics:
- no-std
- rtic
- gas-index
- nox-representation
- voc-representation
- environment-monitoring
- air-gradient
- bootloader
- firmware
- rust
- smoltcp
- fota
- emulation
- renode
- renode-run
- robot-framework
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- rust-ir-thermometer-firmware
- pomia-rs
- stm32h743zi-rust-playground
- rust-for-arduino-portenta-h7
- stm32f429-rtic-and-smoltcp-example-application
- sensilo-ble-sensor-node
---

The AirGradient Pro is a well-regarded open-source air quality monitoring kit, but for developers seeking the memory safety and concurrency benefits of Rust, the `air-gradient-pro-rs` project provides a powerful alternative. This project moves away from the traditional Arduino/ESP8266 ecosystem, opting instead for an STM32F411 "Black Pill" microcontroller and a sophisticated software stack built on the Real-Time Interrupt-driven Concurrency (RTIC) framework.

### Hardware Evolution
One of the most significant changes in this implementation is the hardware modification. By replacing the standard Wemos D1 Mini with an STM32F411, the project gains more processing power and GPIO flexibility. A key addition is the ENC28J60 Ethernet board, providing a stable wired connection for users who prefer to avoid Wi-Fi for their environmental sensors. The system continues to support the full suite of AirGradient Pro sensors, including the Senseair S8 LP (CO2), PMS5003 (Particulates), and Sensirion's SHT31 and SGP41 for temperature, humidity, and gas sensing.

### Robust Software Architecture
The firmware is designed with reliability in mind. It utilizes a custom bootloader that supports Firmware Over-The-Air (FOTA) updates with a failover rollback mechanism. This ensures that if a firmware update is interrupted or contains a critical bug, the device can safely revert to a previous working version. The networking stack is powered by `smoltcp`, supporting both a lightweight broadcast protocol for data logging and a dedicated device protocol for control and updates.

### Key Features
- **RTIC Framework**: Efficient, priority-based multitasking for sensor reading and network handling.
- **FOTA Updates**: Secure and reliable remote updates using a custom linker and CPIO-based image format.
- **Ethernet Support**: Native wired networking via the ENC28J60 controller.
- **Comprehensive CLI**: A Rust-based host tool for managing devices, performing updates, and relaying data to InfluxDB.
- **Renode Integration**: Full system emulation support, allowing for testing and development without physical hardware.

### Integration and Monitoring
Data from the device can be viewed locally on its SH1106 OLED display or sent across the network. The included `air-gradient-cli` tool makes it easy to integrate the monitor into existing home automation setups. It can act as a relay, receiving UDP broadcasts from the device and pushing them into an InfluxDB instance for visualization in tools like Grafana.

### Getting Started
For those ready to flash their hardware, the project uses modern Rust embedded tooling. You can build and flash the bootloader and firmware using `cargo-embed` or `probe-rs`. The project also provides a `build.rs` script that handles build-time configuration for network settings like IP and MAC addresses via environment variables.

```bash
# Building and flashing the firmware
cd firmware/
cargo embed --release
```

Whether you are looking for a more reliable air quality monitor or a robust example of a complex Rust-based RTOS project, `air-gradient-pro-rs` offers a professional-grade foundation for environmental sensing.
