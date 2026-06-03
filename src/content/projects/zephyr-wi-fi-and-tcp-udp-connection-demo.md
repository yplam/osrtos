---
title: Zephyr Wi-Fi and TCP/UDP Connection Demo
summary: A Zephyr RTOS application providing a console-based utility for Wi-Fi connectivity
  and network testing. It features an interactive shell for managing Wi-Fi credentials
  and performing TCP/UDP data transfers, specifically optimized for the STM32L4+ Discovery
  kit IoT.
slug: zephyr-wi-fi-and-tcp-udp-connection-demo
codeUrl: https://github.com/jptcarreira/zephyr-demo-wifi
star: 4
lastUpdated: '2021-01-01'
rtos: zephyr
topics:
- b-l4s5i-iot01a
- c
- firm
- iot
- macromix
- stm32
- zephyr
- zephyr-rtos
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- zephyr-wifi-example
- mbed-os-wifi-sample-with-esp8266
- mender-ota-example-for-stm32l4-and-zephyr-rtos
- eclipse-threadx-iot-devkit-starter-application
- zephyr-webusb-sample-for-stm32
- mbed-os-lorawan-tinyshell-application
---

The Zephyr Demo Wi-Fi project provides a practical utility for developers working with networked embedded systems. Built on the Zephyr RTOS, this application serves as both a demonstration of Wi-Fi capabilities and a functional tool for testing TCP and UDP connectivity directly from a serial console.

While Zephyr provides robust networking samples, this project extends the standard Wi-Fi demo by adding interactive console commands. This allows developers to verify network paths, test server responses, and debug socket connections without recompiling code for every test case. It effectively acts as a lightweight, embedded version of the `netcat` utility.

### Interactive Network Testing

The core of the project is its console interface, which implements a simplified version of the `nc` (netcat) utility. Once the device is connected to a Wi-Fi network, users can initiate TCP or UDP connections to remote IP addresses and ports. 

After a successful connection, the application maintains an open socket, allowing the user to send and receive data through the console in real-time. This is particularly useful for verifying that a device can communicate with a cloud backend or a local server before implementing the final application logic.

### Key Console Commands

The application adds specific commands to the Zephyr shell to facilitate network operations:

- **Wi-Fi connect**: Allows users to pass an SSID and PSK to join a wireless network.
- **nc tcp**: Opens a TCP connection to a specified IP address and port.
- **nc udp**: Opens a UDP socket for data exchange.

Once a socket is active, users can type messages to be sent over the wire. The connection remains open until the user issues a `CTRL+D` command to disconnect, returning the system to the standard command prompt.

### Hardware and Compatibility

The project was developed and tested using the **STM32L4+ Discovery kit IoT (B-L4S5I-IOT01A)** from ST Microelectronics. This board is a popular choice for IoT prototyping due to its integrated Wi-Fi module and extensive sensor suite.

Although tested on the STM32L4+, the application is designed with Zephyr's hardware abstraction in mind. It can theoretically run on any board supported by Zephyr that features an IP-connected interface (such as Ethernet or GPRS), provided the network interface is correctly labeled (e.g., `wifi0` for Wi-Fi autoconnect features).

### Technical Implementation

The project leverages the Zephyr networking stack and the shell subsystem. By integrating these, it provides a user-friendly way to interact with the underlying BSD socket layer. This makes it an excellent educational resource for understanding how Zephyr handles network interfaces and socket I/O.

To build and flash the project, users follow the standard Zephyr workflow:

```bash
# Build for the STM32L4+ Discovery kit
west build -b b_l4s5i_iot01a zephyr-demo-wifi

# Flash to the board
west flash
```

Once running, the device provides an interactive shell that simplifies the initial stages of IoT development and network troubleshooting.
