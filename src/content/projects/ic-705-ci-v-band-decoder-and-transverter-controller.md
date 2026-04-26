---
title: IC-705 CI-V Band Decoder and Transverter Controller
summary: An advanced embedded controller for the Icom IC-705 that decodes CI-V band
  data via Bluetooth or USB to manage external transverters and power amplifiers.
  Built for the M5Stack ecosystem using FreeRTOS, it provides automated frequency
  translation, PTT breakout, and seamless integration with PC-based logging and digital
  mode software.
slug: ic-705-ci-v-band-decoder-and-transverter-controller
codeUrl: https://github.com/K7MDL2/IC-705-BLE-Serial-Example
lastUpdated: '2026-04-26'
image: /202604/IC-705-BLE-Serial-Example_3.avif
rtos: freertos
topics:
- 1296mhz
- 222mhz
- '705'
- 903mhz
- arduino
- ble
- ble-serial
- esp32-s3
- esp32-usb-host
- ic-705
- ic-905
- icom-ic-705
- m5atoms3
- m5stack
- m5stack-cores3
- m5stack-cores3-se
- m5stampc3u
- m5stamps3
- transverter
- usb-host
isShow: true
createdAt: '2026-04-26T05:28:18+00:00'
updatedAt: '2026-04-26T05:28:18+00:00'
---

### Enhancing the IC-705 for Microwave Operation

The IC-705 is a versatile portable rig, but its native coverage lacks several key VHF/UHF and microwave bands. This project bridges that gap by providing a complete CI-V band decoder and transverter controller. By leveraging M5Stack hardware, the system connects to the IC-705 via Bluetooth Classic, BLE, or USB Host to manage a three-band transverter box (supporting 222, 902/3, and 1296 MHz). The goal is to create a seamless, compact mobile solution for all bands from HF through 1296 MHz, optimized for rover use in truck cabs and campers.


### Seamless PC Integration and Passthru Mode

A core objective of this transverter controller is to simplify the interface with PC applications like WSJT-X or N3FJP AC Log. In "PC Passthru Mode," the M5Stack acts as a middleman. You connect the PC to the M5Stack's USB port; the logging software sees a multiband rig and requires no special transverter configuration. The controller handles the frequency translation in real-time, substituting the radio's IF data with the transverter's RF data. This allows the PC to see microwave frequencies natively, even though the IC-705 only knows it is transmitting on an IF like 28 MHz or 144 MHz.

### Hardware Architecture and Construction

The project features a modular hardware design. While the primary controller is typically an M5Stack Core2 or Core3, the transverter box itself often embeds an M5StampC3U to handle local I/O. The construction utilizes high-performance components, including UR3LM transverter boards and various power amplifier modules. Recent updates have focused on integrating 28V DC-DC converters to power 50W amplifiers for the 902 MHz and 1296 MHz bands.

![Top View Front of the 3-Band Transverter Box](/202604/IC-705-BLE-Serial-Example_12.avif)

To manage the complex switching requirements, the system uses MCP23017 I2C port expanders and ULN2803A octal drivers. This allows for precise control over power relays, T/R switches, and antenna routing. For example, the controller can actuate specific relays for a 1296 MHz 2W amp only during transmission, ensuring thermal stability in high-ambient environments like a vehicle cab.

### Intelligent Software Features

The firmware, developed for the ESP32 platform, leverages FreeRTOS to manage concurrent tasks such as CI-V polling, UI updates, and I/O monitoring. One of the most useful software features is the automatic saving and restoration of band-specific parameters. When you switch bands, the controller saves settings for RF power, split mode, preamp status, and attenuator levels. When returning to a previous band, these settings are restored, ensuring the radio returns to a "normal" state after transverter use.

![M5Stack UI showing frequency, grid square, and status icons](/202604/IC-705-BLE-Serial-Example_17.avif)

The user interface provides critical real-time data, including the translated RF frequency, PTT status, and calculated 8-digit Maidenhead grid squares based on the radio's GPS data. On smaller devices like the M5AtomS3, the screen doubles as a button to cycle through transverter bands.

### Connectivity and RFI Mitigation

The system supports four primary connection methods to the IC-705: Bluetooth Classic, BLE, USB Host, and WiFi. BLE is particularly useful for the CoreS3, while older models rely on BT Classic. For environments where wireless reliability is a concern, the USB Host mode offers a direct wired connection.

Field testing during VHF contests has led to significant improvements in RFI (Radio Frequency Interference) mitigation. The project documentation highlights the importance of using ferrites on PTT and control cables, as well as moving high-speed scanning tasks (like PTT monitoring) to dedicated CPU GPIO pins to reduce I2C bus noise. These refinements ensure that the high-gain transverters and sensitive IF rig operate cleanly even in the presence of nearby high-power RF sources.
