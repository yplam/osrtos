---
title: c2048 for RT-Thread
summary: c2048 is a terminal-based port of the popular 2048 sliding tile puzzle game
  for the RT-Thread RTOS. It allows developers and users to play the game directly
  within the RT-Thread shell (MSH) using standard keyboard inputs.
codeUrl: https://github.com/mysterywolf/c2048
isShow: false
rtos: rt-thread
libraries: []
topics:
- '2048'
- console-game
- finsh
- rt-thread
- rtthread
- terminal-game
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- threes-for-rt-thread
- rtt-tetris
- termbox-for-rt-thread
- micropython-port-for-rt-thread
- donut-for-rt-thread
- sel4-core-platform-sel4cp-workshop
---

The 2048 puzzle game, originally created by Gabriele Cirulli, became a global phenomenon for its simple yet addictive mechanics. While most people are familiar with the mobile or web versions, the embedded world often finds creative ways to bring these experiences to resource-constrained environments. The **c2048** project is a dedicated port of the Linux terminal version of 2048 (originally by Maurits) specifically tailored for the **RT-Thread** real-time operating system.

### Bringing 2048 to the Console

Unlike the original web version that relies on touch gestures or mouse swipes, c2048 is designed to run inside the RT-Thread FinSH/MSH terminal. This makes it a fun addition to any RT-Thread project, serving as both a demonstration of terminal handling and a lightweight entertainment package for developers working on embedded consoles.

One of the most convenient aspects of this port is its flexible control scheme. Players are not limited to a single set of keys; the game supports:
- **Arrow Keys**: For traditional navigation.
- **WASD Keys**: Common for gamers.
- **HJKL Keys**: For those accustomed to Vim-style navigation.

### Technical Integration

The project is structured to integrate seamlessly with the RT-Thread ecosystem. It includes an `SConscript` file, which is the standard build script format for RT-Thread's build system. This allows the game to be easily compiled into a firmware image alongside the kernel and other middleware.

For developers using the RT-Thread Env tool or RT-Studio, obtaining the game is straightforward. It is categorized under the miscellaneous entertainment packages. You can enable it via the menuconfig interface:

```text
RT-Thread online packages  --->
    miscellaneous packages  --->
        entertainment: terminal games and other interesting software packages  --->
            [*] 2048: An indie puzzle video game run on RT-Thread console
```

### How to Play

Once the package is included and the system is booted, starting the game is as simple as entering a single command in the RT-Thread shell:

```bash
msh> 2048
```

The objective remains the same as the original: slide numbered tiles on a grid to combine them. When two tiles with the same number touch, they merge into one, doubling the value. The ultimate goal is to reach the 2048 tile, though the game continues as long as moves are possible.

### Maintenance and Community

The project is currently maintained by Meco Man and is part of the growing RT-Thread online package ecosystem. By porting existing C-based terminal applications to RT-Thread, this project demonstrates the portability of the RTOS and provides a template for others looking to bring CLI-based tools or games to the RT-Thread environment.
