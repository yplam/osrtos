---
title: 'PS1 IGR-MFO: In-Game Reset and Frequency Oscillator'
summary: An RP2040-based firmware for PlayStation 1 consoles that implements In-Game
  Reset (IGR) and In-Game Disk Switching (IGDS). It also functions as a controller
  for the Si5351 clock generator, providing a Dual/Multiple Frequency Oscillator (DFO/MFO)
  for perfect PAL/NTSC video timing.
slug: ps1-igr-mfo-in-game-reset-and-frequency-oscillator
codeUrl: https://github.com/RangerKoc/ps1-igr-mfo
version: '20251026'
lastUpdated: '2026-04-27'
image: /202606/ps1-igr-mfo_0.avif
rtos: ''
topics:
- dfo
- igds
- igr
- mfo
- playstation
- rp2040
- rp2040-zero
isShow: true
createdAt: '2026-06-09T00:27:32+00:00'
updatedAt: '2026-06-09T00:27:32+00:00'
relatedProjects:
- picogamepadconverter
- retrojam-multi-retro-game-console-emulator
- pico-smsplus-sega-master-system-and-game-gear-emulator
- catos
- cardputer-game-station
- openfire-the-open-four-infa-red-emitter-light-gun-system
---

The PlayStation 1 remains a cornerstone of retro gaming, but as enthusiasts move toward modern Optical Drive Emulators (ODEs) like XStation, PicoStation, or PSIO, the limitations of original hardware become more apparent. The **ps1-igr-mfo** project addresses these limitations by leveraging the power of the RP2040 microcontroller (found in the Raspberry Pi Pico) to provide a sophisticated In-Game Reset (IGR) and clock management system.

### Advanced Console Control

At its simplest level, this project allows users to reset their console or return to an ODE menu directly from the controller. This eliminates the need to physically reach for the console, which is especially useful in modern living room setups. Beyond standard resets, it introduces **In-Game Disk Switching (IGDS)**. This feature is a game-changer for multi-disc titles played on ODEs. By using an N-channel MOSFET (such as the IRLML2402) and a 100K resistor, the RP2040 can electrically simulate the opening and closing of the disc tray, allowing for seamless disc swaps without physical intervention.

### Precision Timing with DFO/MFO

One of the most technical challenges in PS1 modding is handling the transition between PAL and NTSC regions. Standard region mods often result in slightly off-spec video frequencies, leading to "rolling" screens or lack of color on certain displays. This project solves this by controlling an **Si5351 clock generator**. 

The RP2040 acts as a Dual/Multiple Frequency Oscillator (DFO/MFO) controller, monitoring the GPU's PAL/NTSC signal (GPIO 14) and dynamically instructing the Si5351 to output the exact required frequency. This ensures that whether you are playing a European PAL game or a Japanese/US NTSC game, the video timing is 100% accurate to original hardware specifications.

### Controller Combinations

The firmware sniffs data from the controller port to trigger specific actions. The following combinations are supported:

| Buttons | Function |
|---------|---------|
| `L1 + R1 + SELECT + START` or `L2 + R2 + SELECT + START` | Standard Reset |
| `L1 + R1 + SELECT + X` or `L2 + R2 + SELECT + X` | Long Reset (Return to XStation Menu) |
| `L1 + R1 + SELECT + O` or `L2 + R2 + SELECT + O` | Disk Tray Open/Close Signal (IGDS) |

### Technical Implementation

The project is built using the **Raspberry Pi Pico SDK** and makes extensive use of the RP2040's hardware peripherals. It utilizes I2C to communicate with the Si5351, while GPIOs are used to sniff the PlayStation's controller bus (Data, Attention, and Clock lines). The firmware also includes support for WS2812 LEDs, which can be used to provide visual status updates during operation.

For those looking to install the mod, the wiring is straightforward but requires precision. The RP2040 monitors the console's 3.3V power rail and GND, with specific GPIOs mapped to the controller port and the GPU signal lines. Detailed installation guides for various PS1 and PSone motherboard revisions are included in the repository to assist with the hardware integration process.
