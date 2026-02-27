---
title: USBSID-Pico
summary: A firmware and hardware project for interfacing MOS SID sound chips with
  modern computers via USB, WebUSB, and MIDI. Built for Raspberry Pi Pico (RP2040)
  and Pico 2 (RP2350) platforms, it supports up to four SID chips or emulators for
  high-fidelity Commodore 64 audio playback and synthesis.
slug: usbsid-pico
codeUrl: https://github.com/LouDnl/USBSID-Pico
siteUrl: https://usbsid.loudai.nl/
star: 90
version: v0.6.4-BETA
lastUpdated: '2026-02-21'
rtos: ''
topics:
- asid
- c64
- chiptune-player
- chiptunes
- commodore
- commodore64
- midi
- mos6581
- mos8580
- retro
- rp2040
- rp2350
- rpi-pico
- sid
- sidchip
- sidusb
- sysex
- usb
- usbsid
- webusb
isShow: true
image: /202602/usbsid-pico.webp
createdAt: '2026-02-27'
updatedAt: '2026-02-27'
---

USBSID-Pico is a versatile interface board designed to bring the iconic sound of the Commodore 64's MOS SID chip to modern computing environments. By leveraging the power of the Raspberry Pi Pico (RP2040) and the newer Pico 2 (RP2350), this project allows users to connect real SID hardware or modern emulators to computers, phones, and MIDI controllers via USB.

The project supports a wide range of SID chips, including the MOS6581, MOS6582, and MOS8580, as well as hardware replacements like the SIDKick-Pico, ARMSID, and FPGASID. With its dual-socket design, it can handle stereo configurations or even quad-SID setups using specialized expansion boards.

### Key Features and Capabilities

USBSID-Pico is packed with features for both listeners and creators:

- **Broad Software Support**: Compatible with popular SID players and emulators such as Vice, JSIDPlay2, Denise, and Acid64 Pro.
- **WebUSB Integration**: Out-of-the-box support for browser-based players like DeepSID, allowing for a plug-and-play experience without complex driver installations.
- **MIDI Functionality**: Acts as a USB MIDI device, enabling the use of SID chips as hardware synthesizers with MIDI controllers or DAWs.
- **Embedded Emulators**: Includes built-in versions of Cynthcart and a standalone USBSID-Player for playing SID files directly from the hardware.
- **Hardware Refinements**: Features like IO-controlled stereo/mono switching, filtered voltage regulators for clean audio, and onboard LED/RGB VU meters.

### Technical Architecture

The firmware is built using the Pico SDK (version 2.1.1) and utilizes the TinyUSB stack for robust USB communication. To ensure accurate timing—critical for the SID's 1MHz operation—the project employs the RP2040/RP2350's Programmable I/O (PIO) state machines to generate precise clock signals and manage the SID bus. DMA (Direct Memory Access) is used for high-efficiency bus control, ensuring cycle-exact writes and reads.

The project is designed with flexibility in mind, offering multiple PCB revisions. Revision v1.3, for instance, introduces separate voltage regulators for mixed-voltage setups (e.g., running a 12V 6581 alongside a 9V 8580) and improved IO port layouts for future expansions.

### Getting Started

For developers looking to build the firmware from source, the project requires the Pico SDK with submodules. The build process is managed via CMake, with specific targets for different board types (Pico, Pico W, Pico 2) and PCB revisions. 

Users can configure their boards using a dedicated web configuration tool or a command-line utility. The repository also provides extensive documentation, including software manuals, firmware guides, and hardware schematics, making it accessible for both hobbyists and advanced users. Whether you are a chiptune enthusiast looking to play SID files with authentic hardware or a musician wanting to integrate the unique grit of the SID chip into a modern MIDI setup, USBSID-Pico provides a comprehensive, open-source solution.
