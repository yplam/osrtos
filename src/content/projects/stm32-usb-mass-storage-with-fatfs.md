---
title: STM32 USB Mass Storage with FatFS
summary: A firmware project for the STM32F765 microcontroller that implements a USB
  Mass Storage Class (MSC) device. It leverages the STM32 USB Device Library to interface
  with a host computer as a storage peripheral, with the goal of integrating the FatFS
  file system for on-device file management.
slug: stm32-usb-mass-storage-with-fatfs
codeUrl: https://github.com/David-Croose/STM32_USB_FATFS
star: 1
lastUpdated: '2019-06-21'
rtos: cmsis
topics:
- fatfs
- sdcard
- stm32
- usb
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- raspberry-pi-pico-littlefs-usb-flash-memory-interface
- stm32-fatfs-and-freertos-integration
- practice-project-for-stm32f746g-discovery
- stm32-fatfs-on-sd-card-using-freertos
- stm32f407vg-freertos-fatfs-sdio-sd-card-demo
- stm32h5-classic-core-middleware-coremw-mcu-firmware-package
---

The STM32_USB_FATFS project is a technical exploration into implementing USB peripherals on high-performance microcontrollers. Specifically, it targets the STM32F765, a member of the ARM Cortex-M7 family, to create a USB Mass Storage Class (MSC) device. This allows the microcontroller to act as a standard USB flash drive when connected to a host computer.

### Technical Foundation

The project is built upon the STM32Cube ecosystem, utilizing the Hardware Abstraction Layer (HAL) and the STM32 USB Device Library. The configuration is managed via STM32CubeMX, as evidenced by the `usb_2.ioc` configuration file. This setup handles the complex clock tree requirements necessary for stable USB operation, specifically generating the precise 48MHz clock required for the USB FS (Full Speed) peripheral while running the CPU at high frequencies.

### USB Mass Storage Class (MSC)

The core functionality revolves around the USB MSC middleware. This class allows the STM32 to communicate with a host using the Bulk-Only Transport (BOT) protocol and SCSI transparent command set. The implementation includes several key components:

- **usbd_storage_if.c**: This is the critical interface layer where the developer links the USB logical unit operations—such as Read, Write, and Get Capacity—to the actual storage medium.
- **usbd_msc.c**: The library-level handling of the MSC protocol state machine and data transport.
- **usbd_desc.c**: Defines the USB descriptors that identify the device to the host operating system.

### Storage and FatFS Integration

A primary objective of this repository is the integration of FatFS, a generic FAT/exFAT file system module. By combining USB MSC with FatFS, the project enables the STM32 to manage files locally on a storage medium (such as an SD card or internal Flash) while simultaneously allowing a PC to access that same data over USB. This dual-access pattern is highly valuable for data loggers, configuration managers, and embedded systems that require easy, driver-less data retrieval.

### Development Environment

The project is structured for the Keil MDK-ARM IDE, a standard toolchain for professional STM32 development. It includes a `keilkill.bat` script, which is a common utility in the STM32 community for cleaning up intermediate build files like `.obj`, `.lst`, and `.dep` to keep the repository clean. The use of STM32CubeMX ensures that the project can be easily migrated or updated as the underlying firmware package evolves.

### Hardware Specifications

Based on the configuration files, the project is tailored for the STM32F765IIKx in a UFBGA176 package. It utilizes an external 25MHz crystal (HSE) to drive the system clock (SYSCLK) up to 180MHz. This high-performance headroom ensures that the MCU can handle both the USB protocol overhead and file system operations without significant latency.
