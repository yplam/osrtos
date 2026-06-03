---
title: AsyncUDP_ESP32_Ethernet
summary: A fully asynchronous UDP library for ESP32-based boards using LwIP with W5500,
  W6100, or ENC28J60 Ethernet controllers. It provides a non-blocking interface for
  Unicast, Broadcast, and Multicast networking, significantly improving performance
  over standard synchronous implementations.
codeUrl: https://github.com/khoih-prog/AsyncUDP_ESP32_Ethernet
siteUrl: https://github.com/khoih-prog/AsyncUDP_ESP32_Ethernet
isShow: false
rtos: freertos
libraries:
- lwip
topics:
- async
- broadcast
- enc28j60
- esp32
- lwip
- lwip-enc28j60
- lwip-ethernet
- lwip-w5500
- lwip-w6100
- ntp
- ntp-client
- time
- time-server
- udp-client
- udp-multicast
- udp-multicast-server
- udp-server
- w5500
- w6100
- udp-unicast
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncudp-esp32-sc-w6100
- asyncudp-ethernet
- asyncudp-teensy41
- asyncudp-rp2040w
- asyncwebserver-esp32-w5500
- asyncwebserver-esp32-sc-enc
---

In the world of embedded systems, networking performance can often become a bottleneck, especially when dealing with synchronous protocols that block the main execution loop. The **AsyncUDP_ESP32_Ethernet** library addresses this challenge by providing a fully asynchronous UDP implementation for ESP32, ESP32-S2, ESP32-S3, and ESP32-C3 microcontrollers using external Ethernet controllers like the W5500, W6100, and ENC28J60.

### Why Asynchronous Networking Matters
Traditional UDP libraries often require the developer to check for incoming packets in a tight `loop()`. This synchronous approach can lead to dropped packets or sluggish system response if the MCU is busy with other tasks. By contrast, an asynchronous architecture allows the system to handle multiple connections simultaneously. You are notified via callbacks only when a request is ready and parsed. This means the server can continue handling other connections in the background while the hardware takes care of sending or receiving data, leading to what the author describes as "OMG speed."

### Hardware and Compatibility
This library is specifically designed for the ESP32 ecosystem paired with LwIP-supported Ethernet shields. It supports a variety of popular hardware configurations:
- **W5500 & W6100**: High-speed controllers supporting 100Mbps full-duplex communication.
- **ENC28J60**: A common, cost-effective 10Mbps full-duplex controller.

The library is built upon the foundations of Hristo Gochkov's `AsyncUDP` but is tailored to work seamlessly with Ethernet rather than just WiFi. It integrates with the `WebServer_ESP32_W5500`, `WebServer_ESP32_W6100`, and `WebServer_ESP32_ENC` libraries to provide a complete networking stack.

### Getting Started
Setting up the library involves defining your hardware configuration and then attaching event handlers to the UDP object. Below is a simplified example of how to initialize an Async UDP client:

```cpp
#include <AsyncUDP_ESP32_Ethernet.h>

AsyncUDP udp;

void setup() {
  Serial.begin(115200);
  // Ethernet initialization code here...

  if(udp.listen(1234)) {
    Serial.println("UDP Listening on port 1234");
    udp.onPacket([](AsyncUDPPacket packet) {
      Serial.print("UDP Packet Type: ");
      Serial.println(packet.isBroadcast() ? "Broadcast" : packet.isMulticast() ? "Multicast" : "Unicast");
      Serial.print("From: ");
      Serial.print(packet.remoteIP());
      Serial.print(":");
      Serial.println(packet.remotePort());
      Serial.printf("Data length: %u
", packet.length());
      
      // Reply to the sender
      packet.printf("Got %u bytes of data", packet.length());
    });
  }
}
```

### Advanced Usage and Best Practices
One unique aspect of this library is its handling of the "Multiple Definitions" linker error, a common issue in Arduino development when including the same library across multiple files in a project. The author provides a specific strategy: use `AsyncUDP_ESP32_Ethernet.hpp` for general includes and reserve `AsyncUDP_ESP32_Ethernet.h` for the main `.ino` or setup file. This ensures that the implementation code is only compiled once, preventing linker conflicts in complex, multi-file projects.

### Conclusion
Whether you are building an NTP client, a multicast server, or a high-speed data logger, `AsyncUDP_ESP32_Ethernet` offers the tools necessary to implement robust, non-blocking network communication on the ESP32. By offloading the packet management to an asynchronous background process, developers can focus on their application logic without worrying about the intricacies of the network stack timing.
