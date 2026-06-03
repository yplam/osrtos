---
title: AsyncUDP_Ethernet
summary: A fully asynchronous UDP library for ESP8266 boards using W5x00 or ENC28J60
  Ethernet controllers. It enables high-speed, multi-connection networking by leveraging
  the lwIP stack for non-blocking operations.
codeUrl: https://github.com/khoih-prog/AsyncUDP_Ethernet
siteUrl: https://github.com/khoih-prog/AsyncUDP_Ethernet
isShow: false
rtos: ''
libraries:
- lwip
topics:
- async
- async-udp
- broadcast
- enc28j60
- esp8266
- lwip
- multicast
- ntp
- ntp-client
- time
- time-server
- udp-broadcast
- udp-client
- udp-multicast
- udp-multicast-server
- udp-server
- unicast
- w5x00
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- asyncudp-esp32-sc-w6100
- asyncudp-esp32-ethernet
- asyncwebserver-ethernet
- asyncudp-teensy41
- asyncwebserver-esp32-w5500
- asyncwebserver-esp32-sc-enc
---

Networking on the ESP8266 is often synonymous with WiFi, but many industrial or stable IoT applications require the reliability of a wired Ethernet connection. The **AsyncUDP_Ethernet** library brings the power of asynchronous UDP communication to ESP8266 devices using external Ethernet controllers like the W5100, W5500, or ENC28J60.

### Why Asynchronous Networking Matters
Traditional synchronous networking libraries often require the developer to poll for new packets in a tight `loop()`. This can lead to bottlenecks, especially when handling multiple connections or time-sensitive tasks. AsyncUDP_Ethernet changes this paradigm by being event-driven. You are notified via a callback as soon as a packet is ready and parsed. This allows the MCU to handle other tasks or even manage multiple simultaneous connections without blocking the execution flow.

### Key Features
- **Multi-connection Support**: Handle more than one connection at the same time effortlessly.
- **Non-blocking Operations**: Send responses and immediately return to other tasks while the background process handles the transmission.
- **Versatile Communication**: Full support for Unicast, Broadcast, and Multicast environments.
- **High Performance**: By utilizing the underlying lwIP stack (lwIP_w5100, lwIP_w5500, or lwIP_enc28j60), the library achieves impressive speeds compared to standard synchronous alternatives.

### Supported Hardware
The library is specifically designed for ESP8266-based boards paired with common SPI Ethernet controllers:
- **W5100**
- **W5500**
- **ENC28J60**

It requires the ESP8266 Core 3.0.2+ and is compatible with the Arduino IDE and PlatformIO ecosystems.

### Getting Started
Setting up an asynchronous UDP client is straightforward. Instead of checking for data in your main loop, you define a packet handler that triggers automatically when data arrives.

```cpp
#include <AsyncUDP_Ethernet.h>

AsyncUDP udp;

void setup() {
  // ... Ethernet initialization code ...

  if (udp.connect(IPAddress(192, 168, 1, 100), 1234)) {
    udp.onPacket([](AsyncUDPPacket packet) {
      Serial.print("Data received: ");
      Serial.write(packet.data(), packet.length());
      // Reply to the sender directly from the packet object
      packet.printf("Got %u bytes", packet.length());
    });
  }
}

void loop() {
  // No need to poll for UDP packets here!
}
```

### Advanced Project Structure
One unique aspect of this library's architecture is its use of implementation headers to manage code size and compilation. To avoid `Multiple Definitions` linker errors in complex, multi-file projects, the library provides a specific pattern:
- Use `#include "AsyncUDP_Ethernet.hpp"` in header files or files included multiple times.
- Use `#include "AsyncUDP_Ethernet.h"` in exactly one `.ino` or `.cpp` file (usually the main application file) to instantiate the implementation.

### Conclusion
AsyncUDP_Ethernet is a vital tool for ESP8266 developers who need the stability of wired Ethernet without sacrificing the performance benefits of an asynchronous architecture. Whether you are building an NTP client, a sensor data logger, or a local discovery server, this library provides the necessary primitives to build robust, responsive network applications.
