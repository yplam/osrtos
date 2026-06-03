---
title: Remote Flash and Test for BL602/BL604 NuttX
summary: A collection of scripts and tools for automated flashing and testing of Apache
  NuttX RTOS on RISC-V BL602 and BL604 hardware. It supports remote testing via a
  Linux SBC, automated LoRaWAN stack verification, and RISC-V crash analysis.
slug: remote-flash-and-test-for-bl602-bl604-nuttx
codeUrl: https://github.com/lupyuen/remote-bl602
siteUrl: https://lupyuen.github.io/articles/auto
star: 4
lastUpdated: '2024-06-21'
rtos: nuttx
libraries:
- lvgl
topics:
- bl602
- bl604
- github-actions
- gpio
- linux
- nuttx
- pinecone
- riscv32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rust-test-app-for-apache-nuttx-os
- apache-nuttx-rtos-on-64-bit-risc-v
- lora-test-app-for-semtech-sx1262-and-apache-nuttx
- lorawan-test-app-for-apache-nuttx
- pinedio-stack-bl604-on-apache-nuttx-rtos
- apache-nuttx-rtos-for-pine64-star64
---

## Automated Hardware Testing for Apache NuttX

Testing RTOS builds on real hardware is often a manual, time-consuming process. The Remote BL602 project provides a framework for automagically flashing and testing Apache NuttX on RISC-V microcontrollers like the BL602 and BL604. By utilizing a Linux Single-Board Computer (SBC) as a bridge, developers can trigger hardware tests remotely, verify peripheral drivers, and perform deep crash analysis without physical access to the device.

## Core Functionality and Hardware Support

The project is designed to work with the PineCone BL602 and the PineDio Stack BL604. The SBC (such as a Raspberry Pi) connects to the target microcontroller via GPIOs for flashing mode and reset control, and via USB for UART communication. This setup allows the automation scripts to toggle the hardware into flashing mode, upload the latest NuttX binary using `blflash`, and then reboot into normal mode to monitor the output.

One of the primary use cases for this repository is the validation of the LoRaWAN stack. By running the `lorawan_test` command after booting, the script verifies that critical peripherals—including GPIO, SPI, ADC, Timers, and the internal temperature sensor—are functioning correctly with the latest daily build of NuttX.

## Key Features

- **Automated CI/CD Integration**: Works in tandem with GitHub Actions to pull daily upstream, release, or downstream builds of NuttX for immediate hardware verification.
- **Crash Analysis**: If the BL602 crashes, the script automatically performs a crash analysis. It parses the RISC-V stack trace and provides a disassembly of the relevant addresses, helping developers pinpoint the exact location of the failure in the source code.
- **PineDio Stack Validation**: Includes specific support for the PineDio Stack BL604, testing the ST7789 display driver and the CST816S touch panel using the LVGL library.
- **Remote Execution**: Supports running tests over SSH, allowing a centralized build server to trigger tests on hardware clusters located elsewhere.

## Technical Implementation

The automation logic is primarily contained within Shell and Expect scripts. The `test.sh` script handles the main flow: downloading the binary, toggling GPIOs for flashing, and executing the flash utility. For interactive sessions or monitoring, the scripts use the `script` command to capture terminal output for logging and subsequent upload to GitHub Release Notes via the GitHub CLI.

For display testing on the PineDio Stack, the project utilizes the LVGL library to render a test screen. The script waits for a touch event from the I2C touch panel to confirm that the display and input drivers are correctly integrated with the NuttX frame buffer and I2C subsystems.

## Getting Started

To use the system, the SBC must be configured with the necessary permissions for GPIO and UART access. The project relies on `blflash` for the flashing process and `ntpdate` to ensure logs are accurately timestamped. A typical test run involves cloning the repository and executing the test script while capturing the output:

```bash
# Run the script for Auto Flash and Test
# Capture the Test Log in /tmp/release.log
script -c remote-bl602/scripts/test.sh /tmp/release.log

# Optional: Upload the Test Log to GitHub Release Notes
remote-bl602/scripts/upload.sh
```

This project serves as a robust template for developers looking to implement hardware-in-the-loop (HIL) testing for NuttX or other embedded operating systems on RISC-V platforms.
