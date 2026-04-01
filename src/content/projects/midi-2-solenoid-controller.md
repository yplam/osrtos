---
title: MIDI 2 Solenoid Controller
summary: A Raspberry Pi Pico firmware that converts USB MIDI signals into PWM control
  for four solenoid motors. It features a MOSFET-based hardware design, MIDI note
  mapping, and an integrated auto-sleep safety function to prevent solenoid overheating.
slug: midi-2-solenoid-controller
codeUrl: https://github.com/madskjeldgaard/midi2solenoid-pico
lastUpdated: '2024-07-07'
licenses:
- MIT
image: /202604/midi2solenoid-pico_0.avif
rtos: ''
topics:
- platformio
- raspberry-pi-pico
- solenoid
isShow: true
createdAt: '2026-04-01T01:18:51+00:00'
updatedAt: '2026-04-01T01:18:51+00:00'
---

The MIDI 2 Solenoid Controller is a specialized firmware designed for the Raspberry Pi Pico, enabling it to act as a bridge between the digital world of MIDI and physical mechanical action. By converting USB MIDI signals into PWM outputs, this project allows musicians and sound artists to control up to four solenoids directly from a computer or MIDI sequencer.

### Physical Control via MIDI

The core of the system is built around the RP2040 microcontroller. It leverages the USB MIDI capabilities of the Raspberry Pi Pico to provide a plug-and-play experience. When connected to a host device, the Pico appears as a standard MIDI instrument. The firmware specifically listens for MIDI notes 60, 61, 62, and 63. These notes are mapped to four separate output channels, where a MIDI "Note On" message activates the corresponding solenoid and a "Note Off" message releases it.

Driving solenoids requires significantly more current than a microcontroller pin can provide, and this project addresses that through a dedicated hardware design. Each channel utilizes a MOSFET-based circuit to translate the low-power PWM signal from the Pico into the higher voltage and current needed to actuate a solenoid motor. The repository includes KiCad schematics for these solenoid voices, providing a reliable blueprint for builders. While the current design is highly functional, the project remains open to improvements, such as the potential addition of logic gate drivers to further refine the switching performance.

### Safety and Efficiency

Safety is a critical consideration when dealing with solenoids, as they can generate significant heat if left energized for extended periods. To mitigate this risk, the firmware includes an auto-sleep function. This safety measure monitors activity and automatically turns off the solenoids if the system remains idle for a set duration, preventing accidental damage, overheating, or unnecessary power consumption.

### Technical Stack

Developing and deploying this firmware is streamlined through the PlatformIO ecosystem. It utilizes the Earle Philhower Arduino core for the RP2040 and integrates the Adafruit TinyUSB Library for seamless USB communication. The project also relies on the standard Arduino MIDI library to handle message parsing. This combination of well-established libraries ensures that the timing remains tight and the MIDI implementation is standard-compliant.

For those looking to build their own mechanical instruments or automated percussion rigs, this repository provides a solid, accessible foundation. It combines straightforward software logic with a practical hardware implementation, making it an excellent starting point for MIDI-controlled robotics and kinetic sound art.
