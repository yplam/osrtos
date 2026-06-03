---
title: DoubleResetDetector_Generic
summary: A comprehensive Arduino library for detecting double reset events across
  a vast array of hardware architectures including AVR, SAMD, STM32, nRF52, and RP2040.
  It enables developers to trigger alternative startup modes, such as configuration
  portals or factory resets, by simply pressing the reset button twice within a configurable
  timeout.
codeUrl: https://github.com/khoih-prog/DoubleResetDetector_Generic
siteUrl: https://github.com/khoih-prog/DoubleResetDetector_Generic
isShow: false
rtos: mbed-os
libraries:
- littlefs
topics:
- double-reset
- double-reset-detector
- doubleresetdetector-generic-library
- flashstorage-samd
- flashstorage-stm32
- littlefs
- mbed
- mega2560
- multi-reset
- nano-rp2040-connect
- nrf52
- portenta
- portentah7
- raspberry-pi-pico
- rp2040
- sam-due
- samd
- stm32
- teensy
star: 3
version: v1.8.1
lastUpdated: '2022-12-05'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- multiresetdetector-generic-library
- esp-doubleresetdetector-library
- esp-multiresetdetector
- flexiblebutton
- onewireng
- ds323x-generic
---

In the world of embedded systems, providing a user-friendly way to enter a configuration mode—such as setting up WiFi credentials or MQTT parameters—can be a challenge, especially on devices with limited physical buttons. The **DoubleResetDetector_Generic** library offers an elegant solution to this problem by detecting when a user presses the reset button twice in quick succession.

### Why Use a Double Reset Detector?
Many modern IoT devices, like those based on the ESP8266 or ESP32, often use a 'Config Portal' to allow users to input network settings. However, triggering this portal usually requires a dedicated 'Config' button or a complex sequence of events. DoubleResetDetector_Generic simplifies this by using the existing reset button. If the device is reset twice within a specific window (defaulting to 10 seconds), the library sets a flag that the application can check during the next boot cycle to launch a configuration interface or clear stored data.

### Broad Hardware Compatibility
One of the standout features of this library is its 'Generic' nature. While original versions of similar libraries were locked to specific chips like the ESP8266, this implementation supports a massive range of hardware, including:
- **AVR & Teensy**: Using standard EEPROM.
- **SAMD21/SAMD51**: Supporting Arduino Zero, MKR series, and Nano 33 IoT via FlashStorage.
- **STM32**: Covering F/L/H/G/WB/MP1 series boards.
- **nRF52**: Supporting Adafruit Feather nRF52832/840 and Seeeduino Xiao nRF52840.
- **RP2040**: Supporting Raspberry Pi Pico and Nano RP2040 Connect via both Earle Philhower's core and the Arduino Mbed OS core.
- **Realtek RTL8720DN**: Using FlashStorage_RTL8720.
- **Portenta H7**: Utilizing LittleFS on the Mbed-based core.

### How It Works Under the Hood
The library functions by writing a specific 'flag' to a persistent storage area immediately upon boot. It then waits for a configurable timeout. If the device is reset again while that flag is still present, a double reset is detected. If the device continues to run past the timeout without being reset, the library clears the flag, signifying a successful 'normal' boot.

Depending on the hardware, the library intelligently selects the best storage backend. For example, it uses **LittleFS** on RP2040 and Portenta H7 boards, while falling back to EEPROM on classic AVR Mega boards or specialized FlashStorage libraries on SAMD and STM32 platforms.

### Getting Started
Integrating the library into an Arduino sketch is straightforward. Below is a minimal example of how to initialize the detector and check for the double-reset condition:

```cpp
#define DRD_TIMEOUT 10
#define DRD_ADDRESS 0

#include <DoubleResetDetector_Generic.h>

DoubleResetDetector* drd;

void setup() {
  Serial.begin(115200);
  drd = new DoubleResetDetector(DRD_TIMEOUT, DRD_ADDRESS);

  if (drd->detectDoubleReset()) {
    Serial.println("Double Reset Detected! Entering Config Mode...");
    // Launch your configuration portal here
  } else {
    Serial.println("Normal Boot");
  }
}

void loop() {
  // Call loop to stop the detector after the timeout
  drd->loop();
}
```

### Ecosystem and Integration
DoubleResetDetector_Generic has become a foundational component for many other high-level libraries. It is frequently used in conjunction with various 'WiFi Manager' libraries (like `WiFiManager_NINA_Lite` or `BlynkEthernet_WM`) to provide a seamless 'reset-to-configure' experience across different networking hardware. 

For developers working with the Portenta H7 or Nano 33 BLE, the library includes specific patches and notes for the Mbed-based cores, ensuring that LittleFS and other storage mechanisms work reliably even with the unique memory layouts of those advanced microcontrollers.
