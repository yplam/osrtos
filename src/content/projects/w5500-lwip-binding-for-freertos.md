---
title: W5500 LwIP Binding for FreeRTOS
summary: A driver and binding layer for the WIZnet W5500 Ethernet controller using
  LwIP and FreeRTOS. It operates the W5500 in MAC RAW mode and is specifically tested
  on STM32 platforms, providing a bridge between the hardware and the LwIP TCP/IP
  stack.
slug: w5500-lwip-binding-for-freertos
codeUrl: https://github.com/PeterBorisenko/w5500-lwip-freertos
star: 28
lastUpdated: '2023-10-03'
rtos: freertos
libraries:
- lwip
topics:
- c
- embedded
- freertos
- lwip
- tcpip
- w5500
- wizchip
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32h745-ethernet-with-lwip-and-freertos
- lwip-tcp-ip-stack-on-stm32-microcontroller
- wiznet-freertos-sdk-for-raspberry-pi-pico-ethernet
- wiznetinterface-library
- udp-echo-server-for-stm32f407-and-enc28j60
- rtems-lwip-stm32-integration
---

The W5500 LwIP Binding project provides a crucial bridge for embedded developers looking to integrate the WIZnet W5500 Ethernet controller with the popular LwIP (Lightweight IP) TCP/IP stack. Specifically designed for environments running FreeRTOS, this implementation allows the W5500 to operate in MAC RAW mode, effectively turning the hardware chip into a standard network interface for the LwIP stack.

### Hardware and Software Integration

The project is primarily tested on the STM32 platform, though the architecture is designed to be portable to other microcontrollers. By using the W5500 in MAC RAW mode, the chip's internal TCP/IP stack is bypassed in favor of LwIP's more flexible and feature-rich implementation. This is particularly useful for developers who need advanced networking features not natively supported by the W5500 hardware or who wish to maintain a consistent software stack across different hardware interfaces.

One notable technical decision in this binding is that hardware address filtering is switched off. This configuration is essential if the device is intended to be used as part of a network bridge, allowing the software stack to handle packet filtering and forwarding logic.

### Efficient Interrupt Handling

To maintain high performance and low CPU overhead, the binding utilizes interrupts specifically for the RECV (receive) signal. This ensures that the system only processes incoming data when it is actually available, rather than wasting cycles polling the SPI interface. Other status changes or transmit completions are handled within the driver logic, keeping the interrupt service routine (ISR) lean and responsive.

### Implementation Workflow

Integrating this binding into an existing project involves a few key steps:

1.  **LwIP Patching**: The project includes specific port files for FreeRTOS located in the `external_libs` directory. These must be integrated into the local LwIP source tree to ensure proper task synchronization and memory management.
2.  **Low-Level Initialization**: Developers must implement the platform-specific code for SPI communication, GPIO management (for Chip Select and Reset pins), NVIC configuration, and clock setup. These are typically housed in `device/wizchip/wizchip_port.c`.
3.  **Interrupt Configuration**: An example interrupt handler is provided in `app/interrupts.c`. This needs to be adapted to the specific GPIO and external interrupt (EXTI) lines used by the target hardware.
4.  **System Startup**: Finally, the `lwipInit()` function is called within the main application task to bring up the network interface.

### Use Cases

This binding is ideal for industrial automation, IoT gateways, and embedded systems where reliable Ethernet connectivity is required. By combining the robust W5500 hardware with the industry-standard LwIP stack and FreeRTOS, developers can build sophisticated networked devices capable of handling multiple concurrent connections, DHCP, DNS, and other standard internet protocols.
