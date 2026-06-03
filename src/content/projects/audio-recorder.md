---
title: Audio Recorder
summary: An embedded audio recording and playback system for the STM32F446RE Nucleo
  board. It features real-time audio capture via ADC, storage using FatFs on SD cards,
  and playback through the DAC, utilizing DMA for efficient data transfer.
codeUrl: https://github.com/daniel-v-e/audio-recorder
isShow: false
rtos: cmsis
libraries: []
topics:
- adc
- c
- dac
- fatfs
- gpio
- hal
- i2c
- spi
- stm32
- uart
- x86-assembly
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- esp32-pcm1808-sound-recorder
- s-pdif-recorder-for-raspberry-pi-pico
- midi-player-for-nucleo-f446re
- stm32-fatfs-on-sd-card-using-freertos
- stm32f407vg-freertos-fatfs-sdio-sd-card-demo
- micropython-i2s-examples
---

The Audio Recorder project is a practical implementation of a digital audio workstation on a microcontroller. Designed for the Nucleo-F446RE, it demonstrates how to bridge the gap between analog signals and digital storage using the STM32 ecosystem.

### Core Functionality
The system is designed to record, process, and play back audio. By leveraging the STM32's high-performance peripherals, the project achieves real-time audio handling. The workflow typically involves capturing analog audio via the ADC, writing the sampled data to an SD card using the FatFs library, and reading data back from the SD card for output through the DAC.

### Technical Deep Dive
The project relies heavily on the STM32 HAL (Hardware Abstraction Layer) to manage complex peripherals. Key technical highlights include:

- **DMA Integration**: To handle the high data rates required for audio without interrupting the main CPU flow, DMA is used for both ADC capture and DAC playback. This is documented in the project's resources regarding DAC and DMA configuration.
- **File System Management**: The integration of FatFs allows the device to interact with SD cards using a standard FAT file system. This ensures that the recorded audio files are easily accessible and manageable on standard PCs.
- **Peripheral Interfacing**: The software makes extensive use of UART for debugging, SPI for SD card communication, and I2C/GPIO for various hardware control tasks.
- **Language Mix**: According to the project documentation, the software is written in C and Assembly to ensure performance-critical sections remain responsive.

### Project Structure
The repository is organized as a standard STM32CubeIDE project, making it easy for developers to import and build. Key directories include:

- **Core/Src & Core/Inc**: Contains the main application logic, including `recording.c` for audio logic and `sinewave.c` for signal generation.
- **FATFS/**: Houses the configuration and target-specific implementation for the file system middleware.
- **Drivers/**: Includes the CMSIS and STM32F4xx HAL drivers necessary for hardware abstraction.
- **Resources/**: Provides additional documentation, such as Excel configurations and text files detailing the DAC and DMA setup.

Whether you are interested in digital signal processing (DSP), file system implementation on embedded devices, or high-speed peripheral management, this project provides a solid foundation and clear examples of these concepts in action.
