---
title: EasyPill V0
summary: EasyPill V0 is a smart pillbox built with a Seeed Studio XIAO ESP32-C3 microcontroller
  running FreeRTOS via the Arduino framework. It tracks individual compartment lid
  openings using seven omnipolar Hall effect switches and an analog multiplexing matrix
  while disguised as a conventional plastic container. The device serves a local web
  dashboard for dosage scheduling, activity tracking, and NTP time synchronization
  without requiring cloud infrastructure.
slug: easypill-v0
codeUrl: https://github.com/MilosRasic98/EasyPillV0
lastUpdated: '2026-11-24'
licenses:
- GPL-3.0
image: /202611/EasyPillV0_0.avif
rtos: freertos
isShow: true
createdAt: '2026-11-24T13:01:45+00:00'
updatedAt: '2026-11-24T13:01:45+00:00'
---

Remembering to take daily medication on schedule is a common challenge for elderly individuals. Many smart dispensers introduce screens, flashing LEDs, or loud prompts that can overwhelm or alienate users accustomed to simple containers. EasyPill V0 addresses this issue by embedding discreet monitoring electronics directly inside what appears to be an everyday, off-the-shelf plastic pillbox.


## Idea and Design Requirements

The fundamental requirement is to present zero behavioral friction to the user. From the outside, the dispenser looks like an ordinary weekly organizer with seven columns—one for each day—and three internal compartments per day. Instead of relying on user-facing displays or forced interactions, the hardware passively tracks interactions and exposes schedule compliance data over the local network.

![EasyPill V0 mechanical and sensor concept design](/202611/EasyPillV0_2.avif)

Lid tracking is achieved without physical switches protruding into the compartments. Small neodymium magnets are mounted to the underside of each transparent lid, aligning with magnetic sensors hidden behind a thin structural plastic wall. When a user opens any daily compartment, the magnetic field disengages, triggering the sensing circuit.

## Electronics Architecture

The electronics package is centered around a Seeed Studio XIAO ESP32-C3 board, housed on a narrow four-layer printed circuit board positioned alongside the hinge edge of the enclosure.

Because the compact XIAO module offers limited GPIO lines, the design employs peripheral expansion and power management circuitry:

- **Hall Effect Sensing**: Seven Diodes Inc AH1912 omnipolar Hall effect switches sit on the bottom layer of the PCB, aligned directly beneath each lid magnet.
- **Analog Multiplexers**: Three NX3L4051 8:1 multiplexers share a single 3-bit address bus from the ESP32. One multiplexer samples the Hall effect switches, the second monitors system voltages (battery, USB input, wireless receiver) and control signals, and the third drives the status LED and buzzer outputs.
- **Wake-Up Logic**: Two 74LV32A quad OR gate ICs combine all Hall effect signals, the external button, and the charger state into a single interrupt line capable of waking the ESP32 from deep sleep.
- **Power Management**: A TPS63021 buck-boost converter regulates system power to 3.3 V as the single-cell Li-ion battery discharges. An MCP73831 controller manages charging from USB or an optional wireless coil, backed by an AP9101C battery protection IC.

## Mechanical Design

The structural assembly is optimized for FDM 3D printing in white PLA, paired with transparent polycarbonate lids cut to size from 4 mm stock. 

![CAD model of the EasyPill V0 assembly](/202611/EasyPillV0_5.avif)

A continuous steel pin runs along the rear hinge line to retain all seven lids simultaneously. Each lid holds two printed elements: a hinge clip on the rear and an alignment latch on the front housing the magnet. Inside the main shell, a modular 3x7 compartment tray drops directly into position, allowing internal slot configurations to be modified in the future without reprinting the main chassis. An end cap encloses the battery pack, wake button, and connector wiring.

## Firmware and Web Dashboard

The system runs firmware developed under PlatformIO using the Arduino core on the ESP32-C3. Network connectivity provides automatic timekeeping via NTP, eliminating the need for a dedicated onboard real-time clock.

![EasyPill web dashboard interface](/202611/EasyPillV0_6.avif)

An embedded HTTP server serves a single-page web dashboard stored directly in flash memory. Accessible locally at `easypill.local` or through a fallback captive portal access point, the interface allows users to:

- Monitor real-time open/closed status across all seven lids
- Configure medication schedules with up to four daily doses and customizable detection windows
- Inspect historical adherence logs categorized by on-time, late, or missed events
- Adjust hardware settings, mapping physical Hall sensors to specific days of the week
- Configure outbound alert notifications via Pushover, ntfy, or custom webhooks

For functional verification without physical hardware, a standalone Python simulation environment mocks sensor transitions, timing routines, and battery discharge curves against the embedded web UI.
