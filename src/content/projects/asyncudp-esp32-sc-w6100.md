---
title: AsyncUDP_ESP32_SC_W6100
summary: A fully asynchronous UDP library for ESP32-S2/S3/C3 microcontrollers using
  the W6100 Ethernet controller and LwIP. It enables non-blocking network communication
  for unicast, broadcast, and multicast environments, allowing for high-speed multi-connection
  handling.
codeUrl: https://github.com/khoih-prog/AsyncUDP_ESP32_SC_W6100
isShow: false
rtos: freertos
libraries:
- lwip
topics:
- async
- async-udp
- broadcast
- esp32
- esp32-c3
- esp32-s2
- esp32-s3
- lwip
- lwip-ethernet
- lwip-w6100
- multicast
- ntp
- ntp-client
- time
- time-server
- udp-client
- udp-multicast
- udp-multicast-server
- udp-server
- w6100
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncudp-esp32-ethernet
- asyncudp-ethernet
- asyncudp-teensy41
- asyncudp-rp2040w
- asyncwebserver-esp32-sc-enc
- asyncwebserver-esp32-w5500
---

### Introduction to AsyncUDP_ESP32_SC_W6100

In the world of embedded systems, networking efficiency is often the bottleneck for high-performance applications. The **AsyncUDP_ESP32_SC_W6100** library is a specialized solution designed to bring fully asynchronous UDP capabilities to the ESP32-S2, S3, and C3 series of microcontrollers. By leveraging the W6100 Ethernet controller and the LwIP stack, this library provides a robust framework for handling network traffic without blocking the main execution loop.

This library is based on the well-regarded ESPAsyncUDP by Hristo Gochkov, modified specifically to support the W6100 hardware. It is particularly useful for developers working with the latest ESP32 variants who require reliable, high-speed Ethernet connectivity in multi-connection environments.

### Why Asynchronous Networking Matters

Traditional synchronous (blocking) network libraries require the processor to wait for a packet to arrive or for a transmission to complete. In contrast, an asynchronous approach allows the system to:
- **Handle multiple connections simultaneously**: The system can process other tasks while the network hardware manages data transfer in the background.
- **Improve Speed**: By removing the need for tight loops to check for incoming packets, the overall system responsiveness is significantly increased.
- **Event-Driven Architecture**: You are notified via callbacks only when a request is ready and parsed, making the code cleaner and more efficient.

### Supported Hardware and Connectivity

The library is tailored for the modern ESP32 ecosystem, specifically targeting:
- **ESP32-S3** (e.g., ESP32S3_DEV, ESP32_S3_BOX)
- **ESP32-S2** (e.g., Saola, AI-Thinker ESP-12K)
- **ESP32-C3** (e.g., ARDUINO_ESP32C3_DEV)

These boards interface with the **W6100 Ethernet chip**, which supports full-duplex 100Mbps communication. The library provides flexible pin mapping for SPI communication, allowing developers to define MOSI, MISO, SCK, CS, and INT pins based on their specific hardware layout.

### Getting Started: An Async UDP Client Example

Setting up an asynchronous UDP client is straightforward. Below is a snippet demonstrating how to connect to an NTP server and handle incoming packets asynchronously:

```cpp
#include <AsyncUDP_ESP32_SC_W6100.h>

AsyncUDP Udp;

void setup() {
  Serial.begin(115200);
  
  // Initialize Ethernet
  ETH.begin(MISO_GPIO, MOSI_GPIO, SCK_GPIO, CS_GPIO, INT_GPIO, SPI_CLOCK_MHZ, ETH_SPI_HOST);
  ESP32_W6100_waitForConnect();

  if (Udp.connect(IPAddress(208, 81, 1, 244), 123)) {
    Serial.println("UDP connected");

    Udp.onPacket([](AsyncUDPPacket packet) {
      Serial.print("Received packet from: ");
      Serial.println(packet.remoteIP());
      // Process packet data here
    });
  }
}

void loop() {
  // No need to check for packets here; callbacks handle it!
  delay(60000);
}
```

### Advanced Features and Troubleshooting

The library supports Unicast, Broadcast, and Multicast environments, making it versatile for everything from simple sensor reporting to complex discovery protocols. 

One common challenge in larger projects is the "Multiple Definitions" linker error. This library addresses this by providing a split header approach. Developers can include `AsyncUDP_ESP32_SC_W6100.hpp` in multiple files, while ensuring `AsyncUDP_ESP32_SC_W6100.h` is included only once in the main application file. This structure supports clean multi-file project organization without linker conflicts.

### Conclusion

For developers pushing the limits of the ESP32-S2/S3/C3 platforms with wired Ethernet, **AsyncUDP_ESP32_SC_W6100** offers a powerful, non-blocking alternative to standard UDP libraries. Whether you are building an NTP client, a high-speed data logger, or a multicast server, the asynchronous nature of this library ensures your application remains responsive and efficient.
