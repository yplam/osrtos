---
title: ESP32 Network Scanner
summary: An energy-efficient network discovery tool for the ESP32 that utilizes ARP
  (Address Resolution Protocol) to identify devices on a LAN. Built using ESP-IDF
  and lwIP, it provides a real-time web interface to monitor device connectivity,
  bypassing the limitations of traditional ICMP ping scans.
slug: esp32-network-scanner
codeUrl: https://github.com/liquidCS/ESP32-NetworkScanner
lastUpdated: '2025-10-11'
image: /202606/ESP32-NetworkScanner_0.avif
rtos: freertos
libraries:
- lwip
topics:
- arp-scanner
- esp32
- esp32-idf
isShow: true
createdAt: '2026-06-04T00:45:46+00:00'
updatedAt: '2026-06-04T00:45:46+00:00'
relatedProjects:
- esp32-usb-over-ip
- esp-scope
- esp32-ascom-alpaca-implementation
- i2c-scanner-for-m5cardputer
- esp-can-analyzer
- wifi-remote-display-adv
---

Identifying devices on a network is a common task for IoT management, but traditional ICMP-based "ping" scans often fall short. Many modern computers and IoT devices are configured to ignore ping requests for security reasons or to save power. The ESP32 Network Scanner takes a different approach by leveraging the Address Resolution Protocol (ARP) to map out a Local Area Network (LAN). Since ARP is a fundamental part of how Ethernet and Wi-Fi networks function—mapping IP addresses to physical MAC addresses—devices generally cannot ignore these requests if they want to communicate on the network.

### Why ARP Scanning?

The primary motivation for this project was to create a robust, 24/7 network monitor that doesn't miss "stealthy" devices. By using ARP, the scanner can detect virtually any active device on the subnet. The project is designed to be energy-efficient, making the ESP32 an ideal candidate for a low-power, always-on appliance that provides a constant overview of network health without the overhead of a full desktop or server.

### Technical Implementation with ESP-IDF

The project is built using the Espressif IoT Development Framework (ESP-IDF) and runs on top of FreeRTOS. A significant technical challenge addressed in this implementation is the abstraction layer provided by modern ESP-IDF versions. While recent versions use `esp-netif` to handle networking, the low-level ARP functions are part of the underlying lwIP stack.

To bridge this gap, the scanner utilizes `esp_netif_get_netif_impl()` to access the raw netif structure. This allows the application to call `etharp_request()` directly to broadcast ARP packets to a specific destination. After a packet is sent, the system waits for a response and then checks the local ARP table using the `etharp_find_addr()` function. If a device has replied, its MAC address is retrieved from the table and the device is marked as online. This method is highly effective because it relies on the networking stack's own internal bookkeeping.

### Web Interface and Monitoring

The scanner includes a built-in web server that provides a visual dashboard of the network state. The interface uses a simple color-coding system to communicate device status at a glance:

- **Green**: The device is currently online and responding to ARP requests.
- **Yellow**: The device was previously detected but is currently unresponsive (offline).
- **Red**: No device has ever been detected at that specific IP address.

This state-based tracking allows users to see not just who is currently on the network, but also which devices have recently disconnected, making it a useful tool for basic network security or home automation monitoring. Additionally, the project includes functionality to display device vendors alongside their corresponding MAC addresses, helping users identify unknown hardware.

### Scalability and Performance

The scanning speed is currently influenced by the size of the ARP table on the ESP32. Because the project relies on the stack's native ability to track addresses, it manages memory efficiently. The firmware is designed to be extensible, with future updates aimed at supporting various subnet masks and further optimizing the scanning cycle to handle larger networks more rapidly. For developers looking to build their own network tools, this project serves as a practical example of how to reach beneath the standard ESP-IDF abstractions to utilize the full power of the lwIP stack.
