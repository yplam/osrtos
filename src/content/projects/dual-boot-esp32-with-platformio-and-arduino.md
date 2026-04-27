---
title: Dual-Boot ESP32 with PlatformIO and Arduino
summary: This project demonstrates a streamlined method for implementing dual-boot
  functionality on an ESP32 using PlatformIO and the Arduino framework. By utilizing
  custom partition tables and the ESP-IDF OTA API, it allows users to store multiple
  applications on a single device and switch between them using a physical GPIO pin.
slug: dual-boot-esp32-with-platformio-and-arduino
codeUrl: https://github.com/ValerioSpagnoli/dual-boot-ESP32-PlatformIO-Arduino
lastUpdated: '2024-07-12'
licenses:
- Apache-2.0
rtos: freertos
topics:
- arduino
- dual-boot
- esp32
- esp32-arduino
- esp32-wroom
- espressif32
- platformio
- platformio-arduino
isShow: false
createdAt: '2026-04-27T08:41:04+00:00'
updatedAt: '2026-04-27T08:41:04+00:00'
---

Managing multiple firmware applications on a single microcontroller can significantly enhance the versatility of embedded systems. Whether for A/B testing, providing a failsafe recovery mode, or creating a multi-purpose device, the ability to switch between different codebases without re-flashing is a powerful capability. This project provides a clear, minimal implementation of a dual-boot setup on the ESP32 platform, leveraging the PlatformIO ecosystem and the Arduino framework.

## The Core Mechanism: Partition Tables

At the heart of the dual-boot system is the ESP32 partition table. In a standard setup, the flash memory usually contains a single factory application. To support multiple boots, this project defines a custom `partitions.csv` file. This configuration divides the flash memory into specific segments, including two distinct OTA (Over-The-Air) app slots: `ota_0` and `ota_1`. 

Each partition is assigned a specific offset and size. For instance, in this implementation, both applications are allocated 1MB of space. The layout ensures that the bootloader knows exactly where each application starts, allowing the system to jump to the designated memory address upon restart.

```
# Name,   Type, SubType, Offset,  Size, Flags
nvs,      data, nvs,     0x9000,  20k,
otadata,  data, ota,     0xe000,  8k,
ota_0,    app,  ota_0,   0x10000, 1M,
ota_1,    app,  ota_1,   0x110000,1M,
coredump, data, coredump,,64k,
```

## Environment Management in PlatformIO

The project utilizes the `platformio.ini` configuration file to manage the build process for both partitions. By defining separate environments (`env:ota_0` and `env:ota_1`), the developer can specify different upload offsets and build flags for each version of the firmware. This approach allows for high code reusability; the same source file can behave differently depending on which partition it is compiled for, thanks to preprocessor macros like `OTA_0` and `OTA_1`.

Alternatively, for projects requiring entirely different functionalities, PlatformIO's `build_src_filter` can be used to include or exclude specific files for each environment, making it easy to deploy two completely different apps to the same chip.

## Switching Logic and Implementation

The transition between applications is handled via a physical interface—a GPIO pin. The code monitors the state of a designated `SWITCH_PARTITION_PIN`. When the pin state matches the target condition (e.g., being pulled to Ground), the firmware interacts with the ESP32's OTA partition manager. 

Using the `<esp_ota_ops.h>` library, the application finds the target partition and sets it as the boot partition. Once the bootloader is updated with this new instruction, a system restart is triggered, and the ESP32 boots into the alternative application. 

### Code Example: Partition Switching

```cpp
if (digitalRead(SWITCH_PARTITION_PIN) == SWITCH_PIN_STATE) {
    const esp_partition_t *partition = esp_partition_find_first(ESP_PARTITION_TYPE_APP, PARTITION_TYPE, NULL);
    if (partition != nullptr){
        esp_err_t ret = esp_ota_set_boot_partition(partition);
        if (ret != ESP_OK) Serial.printf("Failed to set boot partition");
        else {
            Serial.println("Boot partition set, restarting");
            esp_restart();
        }
    }
    else Serial.println("Failed to find the application partition");
}
```

## Practical Application

This setup is particularly useful for developers who need to toggle between a stable production environment and a testing environment. It also serves as a foundation for more complex systems, such as devices that need to switch between a low-power sensing mode and a high-performance communication mode based on user input or external triggers. By following this method, developers can maximize the utility of the ESP32's generous flash memory while maintaining a clean and manageable development workflow.
