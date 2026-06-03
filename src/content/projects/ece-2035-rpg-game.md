---
title: ECE 2035 RPG Game
summary: A top-down RPG game developed for the Georgia Tech ECE 2035 course, utilizing
  the mbed platform and an LPC1768 microcontroller. It features a hash table for efficient
  game object management, accelerometer-based character movement, and a fetch-quest
  narrative with custom dialogue.
codeUrl: https://github.com/kwilson33/ECE2035-Game
isShow: false
rtos: mbed-os
libraries: []
topics:
- accelerometer
- embedded
- hashtable
- mbed-os
- rpg-game
star: 0
lastUpdated: '2018-04-24'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- pixelroot32-game-engine
- esp32-pseudo-3d-racing-game
- esp32-rex-dinosaur-game-in-rust
- m5stack-tab5-game-watch-emulator
- stm32l476g-discovery-rtos-sensor-project
- pico-rex-dinosaur-game-for-raspberry-pi-pico-2
---

## Exploring the ECE 2035 RPG Game

Developed as a final project for the ECE 2035 course at Georgia Tech, this project is a charming example of how embedded systems can be used to create interactive entertainment. The game is a top-down RPG that combines classic gaming tropes with modern embedded hardware, featuring a Kirby-themed adventure (as suggested by the repository's video assets) centered around a fetch quest and humorous dialogue.

### Core Gameplay and Mechanics

Unlike traditional RPGs that rely on a D-pad or joystick, this project leverages an accelerometer for character movement. Players tilt the hardware to navigate the game world, providing a unique physical interaction with the digital environment. The game loop involves interacting with NPCs, collecting items (such as hamburgers), and navigating around obstacles like walls.

### Technical Architecture

One of the most interesting technical aspects of this project is its memory management. The developer implemented a custom **hash table** to store and manage game objects. This allows the system to efficiently track the state and location of NPCs, items, and environmental boundaries on the map without the overhead of simpler, less efficient search algorithms.

The software is structured into several modular components:
- **`hash_table.cpp/h`**: Manages the storage and retrieval of game entities.
- **`map.cpp/h`**: Handles the logic for the game world and tile-based navigation.
- **`graphics.cpp/h`**: Manages the visual rendering on the LCD screen.
- **`hardware.cpp/h`**: Interfaces with the physical components like the accelerometer and buttons.

### Hardware Integration

The project is designed to run on the SparkFun mbed Starter Kit, specifically targeting the **LPC1768** microcontroller. Key hardware components include:
- **uLCD-144-G2**: A 4D Systems micro-LCD used for the graphical interface.
- **MMA8452 Accelerometer**: Used for detecting tilt to control character movement.
- **SD Card**: Utilized via the `SDFileSystem` library for potential data storage or asset loading.
- **Pushbuttons**: Used for user interaction and dialogue progression.

### Implementation Details

The game utilizes the mbed framework, which provides a high-level C++ API for interacting with the microcontroller's peripherals. The repository includes specialized drivers for the 4DGL uLCD and the MMA8452 accelerometer, ensuring that the game can perform smooth graphics updates and responsive input polling.

```cpp
// Example of how the game might initialize hardware
#include "mbed.h"
#include "uLCD_4DGL.h"
#include "MMA8452.h"

uLCD_4DGL uLCD(p9, p10, p11); // serial tx, serial rx, reset pin
MMA8452 accel(p28, p27);      // sda, scl

int main() {
    // Initialize game state and hardware
    uLCD.printf("Welcome to the Kirby RPG!");
    // Game loop follows...
}
```

### Conclusion

This ECE 2035 project serves as an excellent demonstration of embedded systems programming, combining data structure implementation (hash tables) with real-time hardware interfacing. It transforms a standard microcontroller kit into a functional gaming device, showcasing the creative potential of the mbed platform.
