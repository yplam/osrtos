---
title: STM32 FATFS on SD Card using FreeRTOS
summary: A working example project for implementing FatFs on an SD card using an STM32L476
  microcontroller and FreeRTOS. It specifically addresses and resolves common DMA
  conflicts in CubeMX-generated code for the SDMMC peripheral.
slug: stm32-fatfs-on-sd-card-using-freertos
codeUrl: https://github.com/alireza-montazeri/STM32_SD_FATFS_freeRTOS
star: 3
lastUpdated: '2022-01-05'
rtos: freertos
topics:
- dma
- fatfs
- freertos
- sdcard
- stm32
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- stm32-fatfs-and-freertos-integration
- stm32f407vg-freertos-fatfs-sdio-sd-card-demo
- practice-project-for-stm32f746g-discovery
- stm32h743-cmake-template
- stm32-usb-mass-storage-with-fatfs
- ff-iso-stm32-multitasking-fatfs-sdio
---

## Overview

Integrating a file system on an SD card using STM32 microcontrollers often presents challenges when combining FreeRTOS, FatFs, and DMA (Direct Memory Access). A common issue encountered by developers using ST's CubeMX tool is that the automatically generated code for SDMMC DMA frequently fails when both RX and TX channels are utilized. 

This project provides a robust, tested solution for the STM32L476, demonstrating how to successfully implement a FAT file system on an SD card within a FreeRTOS environment. By utilizing a single DMA channel for both read and write operations, it bypasses the stability issues found in the standard multi-channel configuration.

## The DMA Conflict Solution

The core contribution of this repository is a specific workflow to fix the SDMMC DMA implementation. In standard CubeMX configurations, separate DMA requests are often assigned for RX and TX. This project demonstrates that selecting a single DMA channel (specifically DMA2 Channel 4 for the STM32L476) and manually handling the context switching within the interrupt service routine (ISR) provides a stable and working interface.

### Key Technical Features

- **Hardware Target**: STM32L476VGTx (though the logic is applicable to other STM32 families).
- **RTOS Integration**: Fully compatible with FreeRTOS, ensuring file operations do not block the entire system.
- **Optimized DMA**: Uses a single-channel DMA approach to prevent peripheral bus conflicts.
- **FatFs Middleware**: Implements the standard FatFs library for high-level file manipulation (open, read, write, close).
- **CubeIDE Ready**: Provided as a complete project that can be imported directly into the STMicroelectronics integrated development environment.

## Implementation Details

The project requires specific manual modifications to the CubeMX generated files to ensure the fixes persist even after code regeneration. 

### Interrupt Handling

A critical part of the fix involves modifying the `DMA2_Channel4_IRQHandler` in `stm32l4xx_it.c`. The code checks the current SD context to determine whether a read or write operation is in progress before calling the appropriate BSP (Board Support Package) handler:

```c
void DMA2_Channel4_IRQHandler(void)
{
  /* USER CODE BEGIN DMA2_Channel4_IRQn 0 */
    if((hsd1.Context == (SD_CONTEXT_DMA | SD_CONTEXT_READ_SINGLE_BLOCK)) ||
     (hsd1.Context == (SD_CONTEXT_DMA | SD_CONTEXT_READ_MULTIPLE_BLOCK)))
      {
        BSP_SD_DMA_Rx_IRQHandler();
      }
    else if((hsd1.Context == (SD_CONTEXT_DMA | SD_CONTEXT_WRITE_SINGLE_BLOCK)) ||
          (hsd1.Context == (SD_CONTEXT_DMA | SD_CONTEXT_WRITE_MULTIPLE_BLOCK)))
     {
       BSP_SD_DMA_Tx_IRQHandler();
     }
  /* USER CODE END DMA2_Channel4_IRQn 0 */
  HAL_DMA_IRQHandler(&hdma_sdmmc1);
}
```

### BSP Driver Enhancements

The project also includes a rewritten `bsp_driver_sd.c` which adds custom DMA configuration functions (`SD_DMAConfigTx` and `SD_DMAConfigRx`) and overrides the standard block read/write functions to use the optimized single-channel DMA logic.

## Getting Started

To use this project, users should clone the repository and import it into STM32CubeIDE via *File -> Import -> General -> Import existing project*. The repository is structured to be "regeneration-proof," meaning that if you change hardware settings in the `.ioc` file and regenerate code, the manual fixes are protected by specific compiler commands like `#if(false)` or placed within designated `USER CODE` sections.
