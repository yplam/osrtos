---
title: BadSTM
summary: BadSTM is an open-source BadUSB implementation for the STM32F103C8T6 (Blue
  Pill) microcontroller. It emulates a USB HID keyboard to execute automated Ducky
  Script payloads stored on an external SD card via the FatFs file system.
codeUrl: https://github.com/eclipse7/BadSTM
isShow: false
rtos: cmsis
libraries: []
topics:
- badusb
- ducky-payloads
- duckyscript
- fatfs
- hid
- sd-card
- stm32
- stm32f103c8
- usb-hid
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- wifiexe-esp32-s3-based-badusb
- stm32-usb-mass-storage-with-fatfs
- neoducky
- bluetooth-ducky-esp32-hid-injection-tool
- stm32-bootloader
- stm32-fatfs-and-freertos-integration
---

## Introduction to BadSTM

BadSTM is a specialized embedded project designed to transform the ubiquitous STM32F103C8T6 development board—commonly known as the "Blue Pill"—into a versatile BadUSB device. By leveraging the microcontroller's native USB hardware, BadSTM emulates a standard Human Interface Device (HID) keyboard. This allows it to inject keystrokes into a target computer at high speeds, facilitating automated system administration, security testing, or repetitive task automation.

Unlike many simple USB injectors that require hardcoding payloads into the firmware, BadSTM features integrated SD card support. This allows users to store, modify, and swap payloads easily without needing to reflash the microcontroller.

## Hardware Configuration

The project is designed to interface with a standard SPI SD card module. To set up the hardware, the SD card must be wired to the STM32F103C8T6 using the following pin configuration:

*   **A7** -> DI (MOSI)
*   **A6** -> DO (MISO)
*   **A5** -> SCLK (Clock)
*   **A4** -> CS (Chip Select)
*   **+3.3v** -> VDD
*   **GND** -> GND

## Ducky Script Compatibility

BadSTM is built to be compatible with "Ducky Script," the scripting language popularized by the Hak5 USB Rubber Ducky. This simple syntax allows users to write complex keyboard interaction sequences in plain text. To use a payload, you simply save your script as a file named `script.txt` on the root of the SD card.

An example of a simple payload that opens Notepad on Windows might look like this:

```text
DELAY 3000
GUI r
DELAY 500
STRING notepad.exe
ENTER
DELAY 1000
STRING Hello from BadSTM!
ENTER
```

## Technical Implementation

The project is built upon the STM32 HAL (Hardware Abstraction Layer) and utilizes several key middleware components:

*   **USB Device Library**: Specifically the HID class, which is configured to identify as a standard keyboard to the host OS.
*   **FatFs**: A generic FAT/exFAT file system module used to read the `script.txt` file from the SD card.
*   **Custom Parser**: The core logic in `usb_keyboard.c` parses the Ducky Script commands and translates them into USB HID reports (scancodes and modifiers).

The firmware handles the initialization of the SPI peripheral for the SD card, mounts the file system, and then enters a loop to process the script line-by-line, sending the corresponding keyboard reports over the USB bus.

## Getting Started

To deploy BadSTM, you will need an environment capable of compiling STM32 projects (the repository includes a CoIDE project file). Once the firmware is flashed to the STM32F103C8T6, the device becomes plug-and-play. As soon as it is connected to a host computer and detects an SD card with a valid `script.txt`, it will begin the injection sequence. This makes it an excellent tool for developers and security researchers looking for a low-cost, highly customizable hardware automation platform.
