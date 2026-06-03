---
title: 'BMS: Integrated Battery Management System'
summary: A Zephyr RTOS-based battery management system for 4-series Li-ion packs using
  the TI BQ76920 AFE and Nordic nRF51822. It features programmable protection, cell
  balancing, and wireless monitoring via Bluetooth Low Energy.
codeUrl: https://github.com/scttnlsn/bms
isShow: false
rtos: zephyr
libraries: []
topics:
- arm
- battery
- battery-management-system
- bq76920
- cortex-m
- zephyr
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- ltc68xx-battery-monitoring-library-for-mongoose-os
- esphome-tesla-ble
- bq35100-mbed-library
- patient-monitoring-system-using-96boards
- multiple-jk-bms-modbus-rs485-integration
- chrz-watch-firmware
---

Managing lithium-ion battery packs requires precision, safety, and constant monitoring. The **BMS** project by Scott Nelson is a comprehensive, open-source battery management system designed specifically for 4-series (4S) Li-ion packs. Built around the Texas Instruments BQ76920 analog front-end and the Nordic nRF51822 ARM Cortex-M controller, this project provides a robust foundation for building smart battery packs with wireless connectivity.

### Core Capabilities

The system is designed to handle the critical tasks of battery maintenance and safety. Key features include:

*   **Programmable Protection**: Users can define thresholds for over-voltage (OVP) and under-voltage (UVP) for each individual cell.
*   **Safety Monitoring**: Includes programmable short-circuit detection (SCD) and over-current detection (OCD).
*   **Cell Balancing**: Automatic cell balancing ensures that all cells in the 4S pack maintain a uniform charge level, extending the life of the battery.
*   **State-of-Charge Tracking**: By utilizing a shunt resistor for current measurement and implementing coulomb counting, the system provides accurate state-of-charge (SoC) data.
*   **BLE Connectivity**: Real-time status, including cell voltages and current draw, is broadcast over Bluetooth Low Energy.

### Hardware Architecture

The project includes full hardware design files in the `hardware` directory, created with KiCad. The hardware stack consists of:

*   **TI BQ76920**: The analog front-end (AFE) that handles the high-voltage side, cell voltage measurement, and current sensing.
*   **Nordic nRF51822**: A Bluetooth-enabled ARM Cortex-M0 MCU that acts as the host controller, running the logic and managing the BLE stack.
*   **Power Management**: Integrated FETs for enabling or disabling the charge and discharge paths based on safety conditions.

### Firmware and RTOS

The host controller firmware is built on the **Zephyr RTOS**, a scalable and secure real-time operating system for resource-constrained devices. The firmware communicates with the BQ76920 via I2C, handling error states and managing the logic for cell balancing and protection. 

One of the strengths of using Zephyr in this project is the ease of configuration. Using Kconfig, developers can easily adjust parameters like voltage thresholds and pin assignments. For example, the OVP and UVP settings are configurable via `menuconfig`:

```kconfig
config BMS_OVP_ENABLE
       int
       prompt "OVP enable"
       default 3550
       help
         The minimum cell voltage (specified in mV) at which over-voltage protection is enabled
```

### BLE Protocol

The BMS exposes a specific BLE peripheral for wireless monitoring. This allows developers to build mobile apps or dashboards to track battery health without physical connections. All status data is packed into a single characteristic:

*   **Peripheral UUID**: `8D9D7800-5B61-412A-AB71-5C7E0E559086`
*   **Characteristic UUID**: `8D9D7801-5B61-412A-AB71-5C7E0E559086`

The value structure is efficiently packed (MSB to LSB) containing the status byte, four 2-byte cell voltage values (mV), a 2-byte signed current value (mA), a 4-byte signed charge-used value (mAs), and a single byte for state-of-charge percentage.

### Getting Started

To build the project, you will need the GNU ARM Embedded Toolchain, OpenOCD, and the Zephyr RTOS environment. The project uses a standard Makefile to wrap Zephyr's build system:

```bash
git clone --recursive https://github.com/scttnlsn/bms
cd bms
./setup.sh
make
make flash
```

For those looking to customize the behavior, `make menuconfig` provides a user-friendly interface to override default GPIO pins for the boot, alert, and blinker functions, as well as the safety timing delays for over-current and short-circuit events.
