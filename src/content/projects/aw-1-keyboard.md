---
title: aW_1 Keyboard
summary: A split (semi-)wireless mechanical keyboard project featuring a modified
  ErgoDox layout and powered by the Nordic nRF52832 SoC. It utilizes the Zephyr RTOS
  through both a custom implementation and the ZMK firmware framework.
codeUrl: https://github.com/winnedatsch/aW_1-keyboard
isShow: false
rtos: zephyr
libraries: []
topics:
- bluetooth-low-energy
- keyboard
- nrf52832
- zephyr
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- custom-5x7-dactyl-manuform-with-integrated-trackball
- zmk-firmware
- esp32-s3-usb-to-ble-keyboard-bridge
- esp32-morse-keyer
- gesture-detecting-macro-keyboard
- totemx-split-keyboard
---

The aW_1 is a split, semi-wireless mechanical keyboard designed with a focus on ergonomics, portability, and modern connectivity. Based on the Nordic nRF52832 SoC, which integrates both the CPU and Bluetooth module into a single chip, the aW_1 offers a low-power solution for users who want the freedom of Bluetooth without sacrificing the reliability of a wired connection between halves.

### Design Philosophy and Hardware
The aW_1 layout is a refined modification of the classic ErgoDox layout. It features straightened rows and removes the traditional thumb clusters, making it fully compatible with standard ErgoDox keysets while maintaining a more compact footprint. 

One of the most interesting aspects of the aW_1 is its "semi-wireless" approach. While the keyboard connects to host devices (laptops, phones, tablets) via Bluetooth, the two halves are connected to each other using a USB-C cable. This choice was intentional: unlike the TRRS cables commonly used in split keyboards, USB-C is hot-pluggable, reducing the risk of short-circuiting components when connecting or disconnecting the halves. The right half contains the primary circuitry, while the left half functions via an IO expander. To keep manufacturing costs low, the project utilizes a single reversible PCB design that works for both the left and right sides.

### Firmware Options: Custom Zephyr vs. ZMK
The project provides two distinct firmware paths, both built on the Zephyr RTOS:

1.  **Custom Firmware:** Located in `firmware/custom`, this is a bespoke implementation using Zephyr. It was developed primarily as an educational effort and covers essential functionality like Bluetooth connectivity, layout customization, and sleep modes. 
2.  **ZMK Firmware:** For daily use, the project recommends ZMK. ZMK is a modern, Pro-Micro compatible keyboard firmware built on top of Zephyr that offers advanced features like multiple Bluetooth profiles, complex layer configurations, and high stability.

### Technical Specifications
- **Microcontroller:** Nordic nRF52832 (ARM Cortex-M4 with Bluetooth 5 support).
- **Power:** Can be operated via a standard JST-connected battery or via USB-C, which also handles battery charging.
- **Case:** A low-cost, 5-layer laser-cut acrylic design.
- **RTOS:** Zephyr RTOS.

### Getting Started with ZMK
Because the aW_1 is licensed under the GPL, its board configuration is maintained within this repository rather than the main ZMK tree. To flash the keyboard with ZMK, users follow a standard Zephyr-based workflow using the `west` meta-tool:

```bash
# Setup ZMK locally and copy the board definition
cp -r firmware/zmk/aW_1 {zmk_folder}/app/boards

# Build the firmware
cd {zmk_folder}/app
west build -b aW_1

# Flash using a Segger J-Link
west flash
```

Once flashed, the keyboard functions as a standard HID Bluetooth device, capable of pairing with multiple devices. The repository includes all necessary KiCAD schematics, layout files, and DXF files for the case, providing a complete open-source package for keyboard enthusiasts and embedded developers alike.
