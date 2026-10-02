---
title: Holocubic NES Dynamic Module
summary: A high-performance NES emulator implemented as a dynamic shared object for
  the Clocteck Holocubic ESP32-S3 platform. It utilizes the ESP-ELFLoader to integrate
  with cubic Lua firmware, providing a scriptable interface for gaming with support
  for multiple mappers and BLE controllers.
slug: holocubic-nes-dynamic-module
codeUrl: https://github.com/clocteck/holocubic-nes-esp32
lastUpdated: '2026-06-03'
licenses:
- NOASSERTION
rtos: freertos
libraries:
- lwip
topics:
- esp-elfloader
- esp-idf
- esp32
- holocubic
- lua
- nes
isShow: false
createdAt: '2026-08-09T09:14:30+00:00'
updatedAt: '2026-08-09T09:14:30+00:00'
relatedProjects:
- anemoia-esp32
- esp32-s3-nes-emulator
- anemoia-esp32-nes-emulator
- cardputer-game-station
- t-hmi-c64-emulator
- pixelroot32-game-engine
---

The Holocubic NES Dynamic Module brings classic 8-bit emulation to the Clocteck Holocubic and cubic Lua firmware ecosystem. Unlike traditional monolithic firmware, this project is built as a dynamic module (`nes.so`) that can be loaded at runtime using the ESP-ELFLoader. This architecture allows developers to extend the functionality of their ESP32-S3 based devices without re-flashing the entire system, enabling a flexible environment where Lua applications can control and interact with a high-performance C++ emulation core.

## Technical Architecture and Performance

At its heart, the module features a robust NES core encompassing the 6502 CPU, PPU, and APU, alongside support for a wide range of common mappers including 0, 1, 2, 3, 4, 7, 15, 69, and 226. By leveraging the ESP32-S3's capabilities, the emulator achieves a smooth performance of approximately 50 frames per second. 

The project utilizes a unique bridge between high-level scripting and low-level execution. The core emulation is written in C++ for speed, while the user interface, ROM scanning, and input handling are managed via Lua. This is made possible through the `module_host_api_v1` host ABI, which provides the module with access to essential system services such as file I/O on SD cards, DMA-accelerated display updates, and task management.

## Integration and Usage

Loading the emulator within the Holocubic environment is straightforward. Once the `nes.so` file is placed on the device's SD card, it can be initialized with a few lines of Lua code. The module exposes a comprehensive API for controlling the emulation lifecycle, including loading ROMs, stepping through frames, and managing input masks.

```lua
local nes = require("/sd/modules/nes.so")

-- Create an emulator instance
local emu, err = nes.create({
  rom = "/sd/nes/mario.nes",
  fps = 60,
  autorun = true,
  video = { x = 32, y = 0 },
})

if emu then
  emu:start()
  -- Map inputs (e.g., Start button)
  emu:set_input_mask(nes.PAD_START)
end
```

## Input and Display Handling

The module is designed for modern portable gaming setups. It supports Xbox BLE gamepads by mapping controller events in Lua to the standard NES 8-bit input mask. For visuals, the module employs an RGB565 display output wrapper that utilizes `TFT_eSPI` style DMA transfers. This ensures that frame data is pushed to the screen efficiently, minimizing CPU overhead and maintaining a consistent frame rate during gameplay.

## Build System and Requirements

Building the module requires the ESP-IDF framework and the `espressif/elf_loader` component. The build process is configured to optimize for performance (`-O3` via `CONFIG_COMPILER_OPTIMIZATION_PERF`), which is critical for maintaining playable speeds on an embedded microcontroller. The project also highlights a sophisticated ABI lookup mechanism, ensuring compatibility with the host firmware by searching for the appropriate `module_abi.h` across multiple local and environment paths.
