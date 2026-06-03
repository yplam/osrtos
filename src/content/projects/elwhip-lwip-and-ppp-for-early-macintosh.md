---
title: 'ElWhip: lwIP and PPP for Early Macintosh'
summary: A port of the lwIP network stack and PPP over serial protocol for vintage
  Macintosh computers. It enables networking capabilities and web serving on hardware
  as limited as the Macintosh 128K and SE running System 7.1.
slug: elwhip-lwip-and-ppp-for-early-macintosh
codeUrl: https://github.com/ep00ch/lwip-contrib-mac
star: 6
version: '0.071'
lastUpdated: '2020-04-14'
rtos: ''
libraries:
- lwip
topics:
- lwip
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- lwip-for-linux
- lwip-for-esp8266
- lwip-ptp-precision-time-protocol-for-lwip
- lwip-kcp-integration
- lwip-contrib-unix-port
- d21ecm-usb-cdc-ecm-for-samd21
---

## Overview

ElWhip is a specialized port of the lwIP (lightweight IP) network stack designed specifically for early Macintosh computers. By implementing PPP (Point-to-Point Protocol) over a serial connection, ElWhip allows vintage hardware—some with as little as 128K of RAM—to participate in modern TCP/IP networks. The project demonstrates the versatility of the lwIP stack, bringing functional networking to systems that predated the widespread adoption of the internet.

## Hardware and OS Compatibility

The project has been successfully tested on several classic Macintosh configurations, including the Macintosh SE running System 7.1 and virtualized Macintosh 128K environments with 64K ROMs. Due to the extreme memory limitations of the original 128K Macintosh, certain features, such as gracefully closing a PPP session upon quitting, are restricted, though the core networking functionality remains operational.

## Networking via PPP

ElWhip operates by establishing a serial link between the Macintosh modem port and a modern computer (such as a Mac running OS X or a Linux machine) acting as a PPP server. This setup allows the vintage Mac to negotiate an IP address and route traffic through the host machine's internet connection. 

### Host Configuration

To connect an ElWhip-enabled Macintosh to the internet, the host machine must be configured to handle the PPP incoming connection. This typically involves setting up `pppd` with specific options:

- **Baud Rate**: ElWhip defaults to 19200 baud.
- **Asyncmap**: Set to 0 for transparent data handling.
- **IP Allocation**: The host assigns a specific IP to the Macintosh (e.g., 192.168.11.130) and provides DNS information.
- **IP Forwarding**: The host must have IP forwarding enabled to allow the Macintosh to reach the wider LAN or Internet.

## Integrated Web Server

Beyond basic connectivity, ElWhip includes a functional web server. This allows users to host simple HTML files directly from their vintage Macintosh. The server is designed for efficiency, requiring only that files have a standard extension (like `.html`) to be served. Unlike many modern web servers, it does not require manual HTTP header injection at the top of the HTML files, as the stack handles the protocol overhead.

## Technical Implementation

ElWhip leverages the lwIP stack, originally developed by Adam Dunkels at the Swedish Institute of Computer Science. lwIP is widely used in the embedded world for its small footprint and full TCP/IP capabilities. By marrying this stack with PPP code derived from Carnegie Mellon University and Marc Boucher, ElWhip creates a bridge between the 68k Macintosh architecture and modern networking standards.

When the application is launched, it enters a negotiation phase. Users can monitor the PPP phase progress; once it reaches phase 7, the connection is established, IP information is exchanged, and the web server initializes. This provides a fascinating look at how modular networking stacks can breathe new life into legacy hardware.
