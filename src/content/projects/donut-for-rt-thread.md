---
title: Donut for RT-Thread
summary: Donut for RT-Thread is a character-based 3D rendering package that brings
  the famous spinning ASCII donut to the RT-Thread RTOS. It integrates with the RT-Thread
  shell (msh) to provide a visual demonstration of mathematical rendering on embedded
  terminals.
codeUrl: https://github.com/mysterywolf/donut
siteUrl: https://www.a1k0n.net/2021/01/13/optimizing-donut.html
isShow: false
rtos: rt-thread
libraries: []
topics:
- donut
- donut-3d
- rt-thread
star: 1
lastUpdated: '2021-12-14'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- aclock-for-rt-thread
- termbox-for-rt-thread
- rtt-math-mathematics-library-for-rt-thread
- rtt-tetris
- rtt-ssd1306-oled-driver-package
- lua2rtt
---

The "donut.c" code is a legendary piece of C programming, famous for its obfuscated shape and the complex math required to render a 3D torus using only ASCII characters. Now, thanks to the `donut` package for RT-Thread, this iconic demo is available for embedded developers to run directly on their RTOS-enabled hardware.

This package is more than just a visual treat; it is designed to inspire developers to appreciate the power of mathematics in programming. By leveraging the RT-Thread shell (msh), users can trigger the animation with a simple command, turning a standard serial terminal into a 3D viewport. It serves as an excellent example of how portable C code can be integrated into the RT-Thread ecosystem as a reusable component.

### Technical Background

The core logic is based on the optimized donut code by Andy Sloane (a1k0n). The rendering process involves calculating the projection of a 3D torus onto a 2D plane using trigonometric rotations. The code determines the surface normal at each point to calculate lighting, which is then mapped to a specific ASCII character (.,-~:;=!*#$@) based on brightness. In the RT-Thread implementation, this logic is encapsulated into a command-line utility that can be executed from the FinSH console.

### Integration with RT-Thread

As an RT-Thread online package, `donut` is designed to be easily included in any project using the RT-Thread environment. It is categorized under miscellaneous entertainment packages. Once enabled, the `donut.c` source is compiled into the project, and the `donut` command is exported to the msh (module shell) using the `MSH_CMD_EXPORT` macro.

### How to Get Started

To add the donut to your RT-Thread project, navigate through the menuconfig interface as follows:

```text
RT-Thread online packages  --->
    miscellaneous packages  --->
        entertainment: terminal games and other interesting software packages  --->
            [*] donut: a 3D spinning donut
```

After updating your packages and compiling the project, flash the firmware to your target board. Open your terminal emulator (like PuTTY or TeraTerm) connected to the board's serial port and enter:

```shell
msh> donut
```

The donut will begin its hypnotic rotation. This demonstration is particularly useful for verifying that your terminal settings, serial baud rate, and basic floating-point math (if supported by your MCU) are functioning correctly.

### Community and Maintenance

The package is maintained by Meco Man and is based on the mathematical optimizations detailed by the original author on their technical blog. It stands as a testament to the vibrant RT-Thread community, which continues to port interesting and educational software to the RTOS platform.
