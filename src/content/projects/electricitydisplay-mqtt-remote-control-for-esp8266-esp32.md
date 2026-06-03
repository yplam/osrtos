---
title: 'ElectricityDisplay: MQTT Remote Control for ESP8266/ESP32'
summary: This project demonstrates remote device control using MQTT on ESP8266 and
  ESP32 hardware via Mongoose OS. It provides a JSON-based interface for GPIO manipulation,
  button event reporting, and I2C bus communication, with built-in support for AWS
  IoT integration.
codeUrl: https://github.com/anyhotcountry/ElectricityDisplay
siteUrl: https://mongoose-os.com/
isShow: false
rtos: mongoose-os
libraries: []
topics:
- esp32
- esp8266
- mongoose-os
- mqtt
- oled-display-ssd1306
star: 0
lastUpdated: '2017-06-09'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- losant-mqtt-example-for-mongoose-os
- losant-mqtt-mongoose-os-example
- mbed-os-6-stm32-iot-ethernet-controller
- mongoose-os-samples-for-esp32
- mqtt-message-display-for-ssd1306
- mqtt-wake-on-lan-for-esp8266
---

## Remote Hardware Control with Mongoose OS and MQTT

The ElectricityDisplay project provides a streamlined example of how to implement remote device control using the MQTT protocol. Built on the Mongoose OS framework, this project is designed to run on popular low-cost microcontrollers like the ESP8266 and ESP32, making it an excellent starting point for IoT developers looking to bridge the gap between cloud messaging and physical hardware.

### How It Works

The core of the project revolves around an MQTT-based command system. By subscribing to specific topics, the device can receive instructions in JSON format and execute hardware-level operations. Conversely, it can publish status updates back to the cloud. 

The project supports three primary interaction patterns:

1.  **GPIO Control**: You can toggle the state of specific pins remotely. For example, sending a JSON payload like `{"gpio": {"pin": 2, "state": 0}}` sets the specified GPIO pin to the desired state.
2.  **Button Monitoring**: The firmware can be instructed to listen for button presses. When a press is detected on a configured GPIO pin, the device automatically publishes a "click" message to a response topic, allowing for real-time interaction feedback.
3.  **I2C Communication**: For more advanced hardware interfacing, the project allows writing raw byte streams to the I2C bus. This is particularly useful for controlling displays, sensors, or other peripherals without needing to rewrite the core firmware logic.

### Getting Started with Mongoose OS

Since this project utilizes Mongoose OS, the development workflow is highly efficient. Developers can use the `mgos` toolchain to build and flash the firmware. The repository includes specific configuration files for both ESP8266 (`mos_esp8266.yml`) and ESP32 (`mos_esp32.yml`).

To get the project running, the standard workflow involves building for your specific architecture and configuring WiFi:

```bash
mgos build --arch esp8266
mgos flash
mgos config-set wifi.sta.ssid=YOUR_SSID wifi.sta.pass=YOUR_PASSWORD
mgos console
```

Once connected to WiFi, the device defaults to a public MQTT broker (`broker.mqttdashboard.com`), allowing for immediate testing using web-based MQTT clients like HiveMQ. Users can publish to the `/request` topic and monitor the `/response` topic for device feedback.

### Advanced Integration: AWS IoT

Beyond simple MQTT brokers, the project is fully compatible with Amazon AWS IoT. By using the `mgos aws-iot-setup` command, users can onboard their devices into the AWS ecosystem, leveraging AWS's robust security policies and device shadow features. This makes it a viable template for professional-grade IoT applications where security and scalability are paramount.

### Configuration and Customization

One of the strengths of this implementation is its flexibility. While it comes with sensible defaults, almost every aspect—from the MQTT server address to hardware configurations—can be modified via configuration files or through the command line using `mgos config-set`. This allows for rapid prototyping and on-the-fly adjustments without constant code recompilation. Whether you are building a simple remote-controlled LED or a complex industrial monitoring system, the ElectricityDisplay project serves as a solid foundation for MQTT-enabled embedded development.
