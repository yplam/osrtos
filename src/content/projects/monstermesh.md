---
title: MonsterMesh
summary: A Game Boy emulator and monster-battling RPG implemented as a Meshtastic
  module for the LilyGO T-Deck. It features a deterministic Gen-1 battle engine, a
  mesh-wide daycare system with save-file XP patching, and LoRa-based multiplayer
  battles, all running alongside standard mesh networking.
slug: monstermesh
codeUrl: https://github.com/GoatsAndMonkeys/monster_mesh
siteUrl: https://goatsandmonkeys.github.io/monster_mesh/
version: v0.0.02-techdemo
lastUpdated: '2026-07-05'
licenses:
- GPL-3.0
rtos: freertos
libraries:
- nanopb
- lvgl
- littlefs
- nimble
topics:
- bluetooth-le
- esp32
- esp32-s3
- firmware
- game-boy-emulator
- heltec
- homebrew
- lora
- mesh-networking
- meshtastic
- monstermesh
- peanut-gb
- pentest
- raspberry-pi
- retro-gaming
- sx1262
- t-deck
- wifi-security
isShow: false
createdAt: '2026-07-20T10:48:21+00:00'
updatedAt: '2026-07-20T10:48:21+00:00'
---

## Turning Mesh Networking into a Living Game World

MonsterMesh is a unique project that transforms the LilyGO T-Deck—an ESP32-S3 based handheld with a QWERTY keyboard and LoRa radio—into more than just a secure messaging device. By forking the Meshtastic firmware and integrating a custom module, MonsterMesh creates a persistent, monster-battling RPG layer that lives on top of the existing mesh network. While the device continues to handle its duties as a Meshtastic node—managing GPS, telemetry, and encrypted messaging—it simultaneously runs a Game Boy emulator and a social RPG ecosystem that functions entirely without the internet.

The project is designed for the T-Deck hardware, taking full advantage of its 320x240 color TFT, integrated SX1262 LoRa radio, and micro-SD slot. It bridges the gap between retro gaming and modern off-grid communication, allowing users to raise a team of monsters and interact with other trainers across miles of wilderness.

## The Game Boy Emulator and Save-File Integration

At the core of MonsterMesh is a port of Peanut-GB, a lightweight Game Boy emulator optimized for the ESP32-S3. This allows the T-Deck to run Generation-1 monster-catching titles and other classic GB/GBC games at full speed. What makes MonsterMesh distinct is how it interacts with the game data. Rather than just playing the game in isolation, the system reads the Gen-1 SRAM (save files) directly from the SD card.

This integration allows the firmware to extract monster species, levels, moves, and nicknames from the player's `.sav` file. Most impressively, the system features a "Daycare" module that functions as a background process. While you aren't actively playing, your monsters are broadcast to the mesh. When your node hears from other nodes, it generates social events—friendships, rivalries, and training sessions—that happen autonomously. The experience gained during these mesh-based interactions is patched back into the Game Boy save file, complete with SRAM checksum repairs, so your progress is waiting for you the next time you boot the emulator.

## Deterministic Battles Over LoRa

One of the most significant technical hurdles in embedded multiplayer gaming is latency and bandwidth, especially over a low-bitrate medium like LoRa. MonsterMesh solves this with a from-scratch, deterministic C++ Generation-1 battle engine. 

Instead of streaming the entire state of a battle, which would be too heavy for the mesh, the engine uses a "pure-input" architecture. When two players engage in a live MonsterMesh Battle (`mmb`), they exchange a shared random number seed and their initial party data. From that point on, only the players' move choices are transmitted over the air. Because the engine is perfectly deterministic, both devices calculate the exact same results for damage, critical hits, and status effects. To ensure integrity, the devices exchange state hashes every five turns; if a discrepancy is detected, the match is forfeited to prevent desynchronization.

## The Legend of Charizard and Multiplayer Modes

The project introduces a persistent RPG layer called "The Legend of Charizard," accessible via a dedicated terminal within the Meshtastic UI. This layer provides a structured campaign where players can challenge a sequence of eight gyms and the Elite Four. The game state is saved to the device's internal LittleFS storage, tracking badges and daily progress.

Multiplayer interactions are handled through three distinct modes:

*   **Mirror Matches**: Users can fight a CPU-controlled version of a nearby trainer’s team based on the last broadcasted beacon, allowing for practice and grinding without needing the other player to be active.
*   **Player-Hosted Gyms (mmg)**: A node can be configured as a "Gym," allowing other trainers on the mesh to discover it and attempt a five-trainer ladder challenge. The gym node automatically serves the rosters to the challenger over LoRa.
*   **Live PvP (mmb)**: A real-time, head-to-head duel between two trainers using the deterministic engine described above.

## System Architecture and UI

MonsterMesh is built on the Meshtastic framework, utilizing FreeRTOS for task management and LVGL for its graphical interface. It introduces a sophisticated theme system that allows the entire Meshtastic UI to shift between classic aesthetics like DMG (green LCD), Pocket, and high-contrast color modes. These themes even swap system fonts for bitmap fonts like Cozette to enhance the retro feel.

To maintain system stability, the project implements strict resource hygiene. The emulator and the daycare module must coordinate access to the SD card to prevent file corruption. When the emulator is active, background daycare processes pause their file I/O, ensuring that the Game Boy's save-state remains the primary source of truth. This modular approach ensures that the "monster" features never interfere with the primary mission of the device: reliable, long-range mesh communication.
