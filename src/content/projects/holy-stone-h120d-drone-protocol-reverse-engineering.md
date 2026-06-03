---
title: Holy Stone H120D Drone Protocol & Reverse Engineering
summary: A comprehensive reverse-engineering project providing protocol documentation
  and control tools for the Holy Stone H120D GPS drone. It features Python-based flight
  and video utilities and an Arduino-based autonomous controller, targeting the drone's
  internal RT-Thread RTOS and Fullhan Micro SoC.
slug: holy-stone-h120d-drone-protocol-reverse-engineering
codeUrl: https://github.com/zturner1/h120d-protocol
lastUpdated: '2026-03-23'
rtos: rt-thread
topics:
- arduino
- drone
- embedded
- h264
- holy-stone
- iot
- protocol
- reverse-engineering
- rt-thread
- rtos
- uav
- wifi
isShow: false
createdAt: '2026-05-11T07:33:30+00:00'
updatedAt: '2026-05-11T07:33:30+00:00'
relatedProjects:
- drone-stm32f1
- fpv-drone-stm32f411-flight-controller
- avem
- flight-controller-rev2
- droners
- arduino-dronecan
---

The Holy Stone H120D is a popular GPS-enabled drone, but like many consumer UAVs, its internal communication protocols are often undocumented and proprietary. This project changes that by providing the first public documentation of the H120D's WiFi protocol, derived from extensive reverse engineering of the stock Android application and live packet captures.

### Technical Architecture

One of the most significant discoveries in this project is the drone's underlying architecture. Unlike many other Holy Stone models that utilize a Linux/HiSilicon stack, the H120D is powered by a Fullhan Micro SoC (FH8620/FH8830 family) running RT-Thread 2.1.0, a real-time operating system. This hardware choice influences everything from how the video is streamed to how the system shell behaves.

The system operates across several distinct communication channels:
- **Command/Control (UDP 8080):** Handles handshakes, heartbeats, and flight commands.
- **Video Stream (TCP 8888):** Delivers H.264 video wrapped in custom 44-byte frame headers.
- **Camera Control (UDP 8088):** Manages photo and video recording via HiSi binary commands.
- **Telnet Shell (TCP 23):** Provides access to the RT-Thread 'finsh' shell, though it includes a unique security mechanism that triggers a MAC-level ban if accessed directly.

### Key Discoveries and Flight Logic

The reverse engineering process revealed several critical operational details. For instance, the drone implements a strict "GPS accuracy gate." It will refuse takeoff commands until the GPS status packet reports an accuracy of 3 meters or less. Interestingly, the research shows that the drone's physical remote control and the WiFi-based app use independent control paths that do not share state.

Furthermore, while the stock application contains native code for variable joystick control, the project discovered that the app never actually calls these functions. Instead, it sends hardcoded flags for maneuvers like takeoff and landing, suggesting that full variable axis control via WiFi—while possible—was an underutilized feature in the original software.

### Interacting with the Drone

The repository provides a standalone Python controller that requires no external dependencies. This allows for basic interaction with the drone in just a few lines of code, managing the essential handshake and heartbeat required to maintain a connection.

```python
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
DRONE = ("172.16.10.1", 8080)

# Query resolution
sock.sendto(b'\x0f', DRONE)
print(sock.recvfrom(256)) # Expected: "1080P"

# Version handshake
sock.sendto(b'\x28\x42\x47\x2c', DRONE)
print(sock.recvfrom(256)) # Expected: "V3.8.2"

# Heartbeat (required to stay connected)
local_ip = sock.getsockname()
sock.sendto(bytes([0x09, 172, 16, 130, 1]), DRONE)
```

For those looking for hardware-level control, the project includes an Arduino Nano 33 IoT sketch. This firmware manages the WiFi connection and UDP packet crafting necessary to execute autonomous flight operations, such as automated takeoff and landing sequences via a serial interface.

### Methodology

The documentation provided is the result of a multi-faceted research approach. This included decompiling the `hs_gps.apk` using JADX, performing ARM disassembly on native JNI libraries (`libLGDataUtils.so`), and capturing live traffic using `tcpdump` on rooted devices. The combination of static analysis and dynamic testing with ALFA network adapters has resulted in a highly accurate reference for the Heliway "Hy" protocol variant used by this drone family.
