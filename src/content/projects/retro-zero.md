---
title: Retro-Zero
summary: Retro-Zero is a Libretro-based emulator frontend designed for the Cardputer
  Zero running ARM64 Linux. It utilizes the LVGL graphics library for its user interface
  and supports a wide variety of retro gaming systems through on-demand core loading
  and hardware-accelerated graphics.
slug: retro-zero
codeUrl: https://github.com/geo-tp/Retro-Zero
lastUpdated: '2026-05-22'
image: /202606/Retro-Zero_0.avif
rtos: ''
libraries:
- lvgl
topics:
- cardputer
- cardputer-zero
- dreamcast
- emulation
- gameboy
- genesis
- libretro
- m5stack
- mame
- megadrive
- msx
- neogeo
- nes
- pi-zero-2w
- playstation
- psp
- retroarch
- snes
- wonderswan
isShow: true
createdAt: '2026-06-04T00:43:57+00:00'
updatedAt: '2026-06-04T00:43:57+00:00'
relatedProjects:
- lvgl-game-boy-advance-emulator
- retrojam-multi-retro-game-console-emulator
- m5pi-launcher
- cardputer-game-station
- msx1-emulator-for-raspberry-pi-pico
- m5stack-tab5-game-watch-emulator
---

Retro-Zero provides a sophisticated graphical interface for retro gaming on the Cardputer Zero platform. Built as a Libretro frontend, it transforms the compact ARM64 Linux-based device into a versatile handheld console capable of emulating decades of gaming history.

### A Versatile Emulation Hub
The core of Retro-Zero's appeal lies in its broad compatibility. By leveraging the Libretro API, it supports an extensive list of classic systems. Users can enjoy everything from 8-bit classics like the NES and Master System to more demanding 3D-capable consoles like the PlayStation, Nintendo 64, and even the PSP and Dreamcast.

One of the project's most convenient features is its approach to emulator cores. Rather than requiring users to manually source and install every possible core upfront, Retro-Zero implements an on-demand download system. When a user attempts to launch a game, the frontend checks for the corresponding `.so` core file locally. If it is missing, the application can fetch the appropriate ARM64 Linux binary automatically, ensuring a seamless setup process.

### Modern UI for Retro Gaming
To provide a smooth and responsive user experience on the Cardputer Zero's display, Retro-Zero utilizes the Light and Versatile Graphics Library (LVGL). This choice allows for a high-quality GUI that remains performant even on compact embedded hardware. The rendering pipeline is further enhanced by hardware acceleration, utilizing EGL and GLESv2 to ensure that both the UI and the emulated games run at optimal frame rates.

### Supported Systems and File Management
Retro-Zero organizes content through a structured directory system, making it easy for users to manage their collections. ROMs are categorized by system, and the project even includes features for direct ROM uploading to the device. 

The list of supported platforms is extensive:
*   **Nintendo:** NES (QuickNES), SNES (Snes9x), Game Boy/Color/Advance (Gearboy, mGBA), and N64 (Mupen64Plus).
*   **Sega:** Master System, Mega Drive, Game Gear (Genesis Plus GX), and Dreamcast (Flycast).
*   **Sony:** PlayStation (PCSX ReARMed) and PSP (PPSSPP).
*   **Arcade:** Neo Geo, FBNeo, and MAME 2010.
*   **Classic Handhelds & Computers:** Atari (2600, 7800, Lynx), PC Engine, MSX/MSX2, and WonderSwan.

Save files are handled with similar care, with dedicated subdirectories for each system within the user's home directory. This ensures that progress in a Game Boy Advance RPG is kept separate and organized from a high-score run in a MAME arcade title.

### Technical Foundation
Under the hood, Retro-Zero is built for the ARM64 Linux environment. Its build system uses a standard Makefile that links against ALSA for audio output and POSIX threads for multi-threaded performance. This architecture allows it to take full advantage of the Cardputer Zero's hardware while maintaining the flexibility of a Linux-based system. By combining the power of Libretro with the modern UI capabilities of LVGL, Retro-Zero offers a professional-grade emulation experience in a pocket-sized form factor.
