---
title: Real-time SPI on Xenomai 3
summary: A real-time SPI implementation for Raspberry Pi 3 using the Xenomai 3 RTOS
  and the Real-Time Driver Model (RTDM). It provides a high-performance SPI interface
  for low-latency embedded applications on BCM283x hardware.
slug: real-time-spi-on-xenomai-3
codeUrl: https://github.com/AirlabRay/real-time-spi-on-xenomai-3
star: 2
lastUpdated: '2017-03-27'
rtos: xenomai
topics:
- real-time
- xenomai
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- rtdm-shift-register-driver-for-elk-pi
- soem-w5500-ethercat-master-for-raspberry-pi
- xenomai-3-for-raspberry-pi-4
- xenomai-3-for-raspberry-pi-2-and-3
- xenomai-on-raspberry-pi
- xenomai-3-for-raspberry-pi-0-1-linux-kernel-4-1-21
---

Xenomai 3 provides a robust framework for hard real-time tasks on Linux. This project demonstrates how to leverage the Real-Time Driver Model (RTDM) to achieve deterministic SPI communication on the Raspberry Pi 3. By bypassing the standard Linux SPI stack, developers can achieve the timing precision required for high-performance industrial and robotics applications.

The core of the project is the integration with the BCM283x SPI RTDM driver. Unlike standard Linux SPI drivers which are subject to kernel preemption and scheduling jitter, the RTDM-based driver operates within the Xenomai co-kernel environment. This ensures that SPI transactions meet strict timing requirements even when the system is under heavy load.

### Hardware and Environment

The implementation is specifically tailored for the Raspberry Pi 3, utilizing the BCM2835/BCM2837 SoC. The project was developed on Ubuntu 16.04 with Xenomai 3. The build system is flexible, supporting both CMake and traditional Makefiles. It utilizes the `xeno-config` utility to dynamically retrieve the necessary compiler flags and linker settings for the Xenomai skins (specifically the native and rtdm skins).

### SPI Configuration and Capabilities

The project includes a comprehensive header file (`spi-bcm283x-rtdm.h`) that defines the IOCTL interface for the driver. This allows for fine-grained control over the SPI hardware. Key configurable parameters include:

- **Bit Order**: Support for both MSB first and LSB first data transmission.
- **Data Mode**: Full support for SPI modes 0, 1, 2, and 3, covering all combinations of Clock Polarity (CPOL) and Clock Phase (CPHA).
- **Bus Speed**: A wide range of selectable frequencies, ranging from 4kHz for slow peripherals up to 125MHz for high-speed data transfer.
- **Chip Select Polarity**: Configurable active-low or active-high logic.

### Implementation Details

The `spi.c` source file provides the primary interface for interacting with the SPI hardware. The `open_device()` function handles the initialization of the RTDM device, typically located at `/dev/rtdm/spidev0.0`. While the code uses standard POSIX-like calls such as `open()`, `read()`, `write()`, and `ioctl()`, these are mapped to the Xenomai real-time domain when linked against the RTDM skin.

```c
// Example of opening the RTDM SPI device
res = open("/dev/rtdm/spidev0.0", O_RDWR);
if (res >= 0) {
    device_handle = res;
    // Configure speed, mode, and bit order via ioctl
    int value = BCM283X_SPI_SPEED_8MHz;
    ioctl(device_handle, BCM283X_SPI_SET_SPEED, &value);
}
```

The project includes testing routines that demonstrate full-duplex communication. The `spi_test` function illustrates how to perform synchronized read and write operations, which is essential for many SPI-based sensors and actuators.

### Getting Started

To utilize this project, a Raspberry Pi 3 must be running a Linux kernel patched with Xenomai 3 (using the Adeos/I-pipe patch). Once the environment is prepared, the project can be compiled using the provided Makefile. The resulting executable serves as both a testing tool and a reference implementation for developers building real-time embedded systems that require reliable peripheral communication.
