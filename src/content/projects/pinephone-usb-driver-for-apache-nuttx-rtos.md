---
title: PinePhone USB Driver for Apache NuttX RTOS
summary: A specialized USB EHCI driver port for Apache NuttX RTOS targeting the PinePhone's
  Allwinner A64 SoC. It provides the necessary logic for USB host initialization,
  PHY management, and LTE modem integration on ARM64 hardware.
slug: pinephone-usb-driver-for-apache-nuttx-rtos
codeUrl: https://github.com/lupyuen/pinephone-nuttx-usb
siteUrl: https://lupyuen.github.io/articles/usb3
star: 4
lastUpdated: '2023-04-23'
rtos: nuttx
libraries:
- lvgl
topics:
- allwinner-a64
- ehci
- nuttx
- pinephone
- usb
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- apache-nuttx-rtos-for-pinephone
- hynitron-cst816s-touch-controller-driver-for-apache-nuttx
- apache-nuttx-rtos-for-pine64-star64
- bl602-gpio-expander-for-apache-nuttx
- unicorn-emulator-for-apache-nuttx-on-avaota-a1-arm64-sbc
- stm32-m-nuttx-custom-board-mod
---

The PinePhone USB Driver project focuses on bringing robust USB Host support to the Apache NuttX RTOS on the PinePhone, which is powered by the Allwinner A64 SoC. This effort involves porting the existing NXP i.MX RT EHCI (Enhanced Host Controller Interface) driver from the NuttX mainline to the A64 architecture, specifically addressing the nuances of 64-bit memory alignment and the unique hardware layout of the PinePhone.

## Hardware Architecture and USB Ports

The Allwinner A64 SoC features two distinct USB ports. Port USB0 is typically used for external connectivity and supports On-The-Go (OTG) functionality, while Port USB1 is internally connected to the PinePhone's Quectel EG25-G 4G LTE modem. This driver primarily targets Port USB1 to enable communication with the modem via the EHCI stack, which is essential for cellular connectivity in an RTOS environment.

## Technical Implementation and 64-bit Porting

One of the significant hurdles in porting the driver from 32-bit platforms (like the i.MX RT) to the 64-bit A64 was memory alignment. The EHCI specification requires specific data structures, such as Queue Heads (QH), to be aligned to 32-byte boundaries. On 64-bit systems, pointers increase in size, which can shift structure offsets and break alignment assertions. The project addresses this by padding the `a64_qh_s` structure from 72 bytes to 96 bytes, ensuring it remains compatible with the hardware's DMA requirements and fixing assertion failures during the boot process.

## Power and Clock Management

Initializing the USB controller on the A64 requires precise control over the Clock Control Unit (CCU). The driver implements routines to enable the USB PHY clocks, bus clocks for EHCI and OHCI, and deassert the corresponding reset signals. Furthermore, for the internal LTE modem to function, the driver coordinates with the PinePhone's Power Management Integrated Circuit (PMIC) and GPIO pins to sequence the power-on process. This includes supplying 3.3V via the DCDC1 regulator, toggling the Power Key (PWRKEY), and monitoring the modem's status pins to ensure the serial and USB interfaces are ready for enumeration.

## Integration with NuttX

The driver is designed to be integrated into the NuttX build system as a submodule within the `arch/arm64/src/a64` directory. It leverages the standard NuttX USB Host stack, allowing standard USB class drivers—such as CDC/ACM for the modem or Hub support for external peripherals—to operate on top of the A64-specific hardware abstraction layer. Configuration is handled via `menuconfig`, where users can enable USB Host support, EHCI peripheral selection, and low-priority kernel worker threads.

## Key Components

- **a64_ehci.c**: The core EHCI operational logic, handling queue management, transfer descriptors, and the asynchronous schedule.
- **a64_usbhost.c**: High-level initialization, clock gating, and reset management for the USB subsystem.
- **a64_usbotg.h**: Detailed register definitions for the Allwinner A64 USB OTG and EHCI controllers based on the hardware user manual.

This project serves as a critical bridge for developers looking to build fully functional mobile OS environments on the PinePhone using NuttX, providing the underlying connectivity required for both internal modem communication and external peripheral support.
