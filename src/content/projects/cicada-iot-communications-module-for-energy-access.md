---
title: Cicada - IoT Communications Module for Energy Access
summary: Cicada is a platform-agnostic C++ library providing drivers for 2G, 3G, 4G,
  and Wi-Fi modems, designed specifically for energy access IoT devices. It features
  a built-in task scheduler and MQTT support, enabling bi-directional cloud connectivity
  on platforms ranging from STM32 and Mbed to Linux.
codeUrl: https://github.com/EnAccess/Cicada-FW
siteUrl: https://okrasolar.github.io/Cicada/doc/
isShow: false
rtos: mbed-os
libraries: []
topics:
- embedded
- esp8266
- freertos
- gprs
- gsm-modem
- iot
- mbed
- mqtt
- sim7600
- sim800
- wifi
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- quectel-gsm-lte-modem-driver
- avnet-wnc14a2a-cellular-driver
- ppp-device-for-rt-thread
- bc28-mqtt-package-for-rt-thread
- anjay-zephyr
- spirit-motor-driver-library
---

Cicada is a robust IoT communications library designed to bridge the gap between embedded hardware and cloud services. Developed by EnAccess and Okra Solar, it focuses on providing a production-ready path for bi-directional communication in energy access projects. Whether you are working with 2G, 3G, 4G, or Wi-Fi, Cicada abstracts the complexities of modem AT commands and network state management into a clean, portable C++ interface.

### A Platform-Agnostic Approach
One of Cicada's strongest features is its portability. While many communication libraries are tightly coupled to a specific RTOS or vendor SDK, Cicada is designed to be platform-agnostic. It provides native support for:
- **STM32F1** (Bare metal/HAL)
- **Mbed OS**
- **Unix-like systems** (Linux and macOS) via termios
- **FreeRTOS** (via generic task wrappers)

This flexibility allows developers to prototype logic on a PC using the Linux serial drivers and then deploy the exact same communication logic to a resource-constrained microcontroller.

### Supported Hardware and Modems
Cicada includes specialized drivers for several widely used communication modules, handling the nuances of their respective AT command sets:
- **Cellular:** Simcom SIM7x00 (3G/4G) and SIM800 (2G)
- **Wi-Fi:** Espressif ESP8266/ESP32 modules running AT Firmware V1.7 or V2.1
- **LoRaWAN:** RAKwireless RUI3 modules

Beyond software, the project is associated with open-source hardware designs, such as the Cicada Wifi and Cicada Cellular PCBAs, which are optimized for use with this library.

### Architecture and Task Scheduling
At its core, Cicada utilizes a non-blocking architecture. It includes a simple cooperative `Scheduler` and `Task` system that manages the state machines of the communication devices. This ensures that the modem can dial up, maintain a connection, and handle incoming data without stalling the rest of the application. For developers who prefer a synchronous flow, the library also provides a `BlockingCommDevice` wrapper, making it compatible with standard blocking libraries like Paho MQTT.

### Getting Started
Setting up a connection is remarkably concise. The following example demonstrates how to initialize an STM32 UART, dial a cellular modem, and publish an MQTT message:

```cpp
int main(int argc, char* argv[])
{
    System_Config();
    Stm32Uart serial(UART4, GPIOC);
    Sim7x00CommDevice commDev(serial);

    Task* taskList[] = {&commDev, NULL};
    Scheduler s(&eTickFunction, taskList);

    BlockingCommDevice bld(commDev, eTickFunction, yieldFunction, &s);
    MQTT::Client<BlockingCommDevice, MQTTCountdown> client(bld);

    commDev.setApn("internet");
    commDev.setHostPort("test.mosquitto.org", 1883);
    commDev.connect();
    
    while (!commDev.isConnected()) {
        yieldFunction(&s);
    }

    MQTTPacket_connectData data = MQTTPacket_connectData_initializer;
    data.MQTTVersion = 3;
    data.clientID.cstring = (char*)"enaccess";
    client.connect(data);

    MQTT::Message message;
    message.payload = (void*)"Hello World!";
    message.payloadlen = 13;
    client.publish("enaccess/test", message);
}
```

### Build System and Testing
Cicada uses the **Meson** build system combined with **Ninja**, providing a modern and fast build experience. It places a high priority on code quality, utilizing **CppUTest** for unit testing. This ensures that the core circular buffers, AT command parsers, and state machines are verified before they ever reach the hardware.
