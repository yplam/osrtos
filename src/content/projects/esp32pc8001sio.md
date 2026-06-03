---
title: Esp32PC8001SIO
summary: A hardware and software bridge for the NEC PC-8001 vintage computer that
  utilizes an ESP32 to provide modern connectivity. It enables SNTP time synchronization,
  environmental monitoring via BME280, and file transfers from FTP servers or internal
  SPIFFS storage using the XMODEM protocol.
codeUrl: https://github.com/bellTanTan/Esp32PC8001SIO
isShow: false
rtos: ''
libraries:
- spiffs
topics:
- arduino
- esp32
- esp32-wroom-32
- nec
- pc-8001
- rs-232c
- spiffs
- ttl
star: 5
version: v1.0.3
lastUpdated: '2023-04-16'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- bbmonitor
- esp32-ble-uart-mx
- esphome-modbus-tcp-to-rtu-bridge
- esp32-uart-bridge
- pellet-stove-aws-iot-bridge-for-esp32
- elekstube-ips-custom-firmware
---

The **Esp32PC8001SIO** project is a fascinating bridge between the late 1970s and modern IoT technology. Designed for the NEC PC-8001, one of Japan's most iconic early personal computers, this project provides a hardware and software solution to expand the machine's capabilities using an ESP32 microcontroller. By plugging into the PC-8001's SIO (Serial I/O) DIP16 socket, the ESP32 acts as a powerful co-processor, bringing SNTP time synchronization, environmental sensing, and modern file management to a 40-year-old system.

### Hardware Architecture
The project consists of two primary hardware components: an SIO "geta" (adapter) and a 2764 ROM adapter. The SIO adapter houses the ESP32-WROOM-32 and a BME280 sensor, interfacing with the PC-8001's serial port. Because the PC-8001 operates at 5V and the ESP32 at 3.3V, the design incorporates level shifters (MOSFET-based) and a 74LS04 inverter to ensure signal integrity. 

To handle the software side on the PC-8001, a custom 8KB ROM (using a 2764 EPROM) is installed in the machine's expansion socket. This ROM contains the Z80 assembly code required to interpret new "extended commands" and handle the XMODEM protocol for data transfers.

### Modern Features for a Vintage Machine
Once installed, the Esp32PC8001SIO transforms the user experience of the PC-8001:
- **SNTP Time Sync**: Automatically sets the PC-8001's internal clock using network time.
- **Environmental Monitoring**: Using the onboard BME280, users can query temperature, humidity, and atmospheric pressure directly from the BASIC prompt.
- **FTP & SPIFFS Integration**: The ESP32 connects to a local WiFi network, allowing the PC-8001 to list and download files from a remote FTP server or the ESP32's internal SPIFFS storage.
- **High-Speed Loading**: While traditional cassette loading (CMT) is notoriously slow, this system supports 4800bps (PC-8001) or 9600bps (PC-8001mkII), using XMODEM for reliable binary transfers.

### Technical Implementation
The software stack is split between the ESP32 (written in C++ for the Arduino framework) and the PC-8001 (written in Z80 Assembly). The ESP32 manages the WiFi stack, FTP client, and sensor polling, while the Z80 code provides the user interface and low-level serial communication. 

One interesting technical detail is the use of the XMODEM SUM protocol (128-byte blocks) for transferring `.cmt` files. The system is intelligent enough to recognize whether a file is a BASIC program or machine code and will load it into the appropriate memory address automatically.

### Getting Started
To use the project, developers need to configure their WiFi and FTP credentials in `const.h` and apply a small patch to the `ESP32_FTPClient` library to ensure correct file listing behavior. 

```cpp
// Example configuration in const.h
const char * ssid     = "your_ssid";
const char * password = "your_password";
const char * ftpServer = "192.168.1.240";
```

On the PC-8001 side, the new functionality is accessed via the `cmd` (or `mat` on mkII) prefix. For example:
- `cmd sntp`: Sync the clock.
- `cmd bme`: Display sensor data.
- `cmd ftplist`: List files on the FTP server.
- `cmd ftpget,001`: Download the second file in the list.

### Community and Safety
The author emphasizes that this is a hobbyist project involving vintage hardware. Users are cautioned to check voltages carefully, as the SIO socket provides +12V and -12V rails that can easily damage modern components if shorted. Despite the risks, for those looking to breathe new life into a classic NEC machine, the Esp32PC8001SIO offers a robust and highly functional upgrade path.
