---
title: Galagino for PlatformIO
summary: Galagino is an ESP32-based arcade emulator ported to PlatformIO, supporting
  24 classic games like Galaga, Pac-Man, and Donkey Kong. It is specifically optimized
  for the 'Cheap Yellow Display' (CYD) and designed to be retrofitted into commercial
  micro-arcade cabinets using the Arduino framework on FreeRTOS.
slug: galagino-for-platformio
codeUrl: https://github.com/speckhoiler/galagino
lastUpdated: '2026-05-25'
licenses:
- GPL-3.0
image: /202605/galagino_0.avif
rtos: freertos
topics:
- '1942'
- arcade
- arduino
- bagman
- bombjack
- cyd
- digdug
- donkeykong
- emulator
- esp32
- frogger
- galaga
- gyruss
- ladybug
- mrdo
- pacman
- pengo
- platformio
- z80
isShow: true
createdAt: '2026-05-26T01:10:41+00:00'
updatedAt: '2026-05-26T01:10:41+00:00'
---

Galagino is a specialized port of Till Harbaum’s original Galaga emulator, now expanded to support 24 classic arcade titles and optimized for the PlatformIO ecosystem. This version integrates contributions from developers like Alby1970 and SurvivalHacking, bringing a diverse library of games—including Bombjack, Mr. Do!, Gyruss, and Time Pilot—to the ESP32 platform. The project provides an accessible path for enthusiasts to build their own mini arcade machines without the need for custom PCBs or 3D printing.

### Hardware Foundation
The project is designed to be retrofitted into existing commercial hardware, specifically the "Arcade-Galaga-Micro-Player-Pro." This choice is critical because the cabinet provides a full joystick and a fire button, which are necessary for the expanded library of games. 


The core of the emulation runs on a "Cheap Yellow Display" (CYD), an ESP32-based development board with an integrated 2.8-inch display. It is essential to use a CYD variant that includes a speaker output and comes with the necessary connection cables to interface with the cabinet's controls. To complete the build, a 1kOhm resistor and a plug from a USB-C cable are also required.

### Building the Machine
Transforming the commercial micro-player into a Galagino machine involves carefully opening the cabinet by softening the adhesive on the artwork stickers with a heat gun to reveal hidden screws. Once inside, the original mainboard is replaced with the CYD.

![Wiring schematics for connecting the CYD to arcade controls](/202605/galagino_1.avif)

The build requires a soldering iron to disconnect the original main board and reconnect the wires from the CYD according to the provided schematics. The CYD fits perfectly into the front of the cabinet and is secured using cable ties and existing screw points, ensuring a clean and stable installation.

![Internal mounting of the CYD inside the cabinet](/202605/galagino_2.avif)

### Software and ROM Preparation
The firmware utilizes the Arduino framework for ESP32 and incorporates a Z80 software emulation by Marat Fayzullin. Because of licensing restrictions, the project does not include the original arcade ROMs or the Z80 emulator code. Users must source these files independently, ensuring they match specific filenames like `galaga.zip`, `dkong.zip`, and `mspacman.zip`.

A set of Python scripts provided in the repository handles the conversion and patching of ROM data. Running these scripts processes the raw arcade data into a format that the ESP32 can execute. Once the assets are prepared, the project can be compiled and uploaded via Visual Studio Code using the PlatformIO plugin. For optimal performance, the release build is recommended, as it allows all 24 games to run at nearly 100% speed.

### Configuration and Controls
Users can fine-tune the experience through `config.h`, `machines.h`, and `platformio.ini`. The control scheme is mapped to accommodate the limited physical buttons on the cabinet through various combinations:

*   **Volume Control**: Holding the coin button while moving the joystick up or down adjusts the audio levels.
*   **Navigation**: Holding the coin button for more than three seconds returns the user to the main menu.
*   **Game Specifics**: Special functions, such as calling elevators in *The Glob* or using flash bombs in *Tutankham*, are mapped to the coin button.
*   **Attract Mode**: The machine features an attract mode that cycles through all available games every five minutes if the joystick remains untouched.

### Current Limitations
While the project provides a robust emulation experience, some hardware limitations exist due to the number of available GPIO pins. Features like the original headphone jack, light button, and dedicated volume buttons on the cabinet are not currently functional. Additionally, some games have minor emulation quirks, such as missing drum sounds in *Gyruss* due to the absence of the I8039 sound CPU, and certain sound substitutions in *Tutankham*.
