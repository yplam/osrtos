---
title: 'lwNBD: A Lightweight NBD Server Library'
summary: A portable, lightweight Network Block Device (NBD) server library designed
  for bare metal and embedded systems. It features a modular architecture with support
  for lwIP and targets resource-constrained hardware like the PlayStation 2 IOP.
slug: lwnbd-a-lightweight-nbd-server-library
codeUrl: https://github.com/bignaux/lwNBD
star: 20
lastUpdated: '2023-10-02'
rtos: ''
libraries:
- lwip
topics:
- disks
- driver
- embedded
- framework
- library
- libuv
- linux
- lwip
- nbd
- playstation2
- reverse-engineering
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- nanofish
- embedmcp-embedded-mcp-server-library
- libwebsockets
- pycopy-standard-library-pycopy-lib
- lwirax
- stm32duino-lwip
---

lwNBD (Lightweight Network Block Device) is a specialized server library designed to bring standard block device networking to resource-constrained environments. Originally developed for the PlayStation 2's Input/Output Processor (IOP)—a 37.5 MHz MIPS-based processor with only 2MB of RAM—lwNBD is built for portability, modularity, and efficiency.

The project addresses a specific challenge in the retro-gaming and embedded communities: the lack of standardized network protocols for accessing storage. On the PlayStation 2, for instance, there is no central partition table like GPT, and file systems like PFS or HDLoader are often handled by custom, non-standard servers. lwNBD solves this by implementing the NBD protocol, allowing standard NBD clients (like `nbd-client` or `nbdfuse`) to mount and interact with embedded storage devices over a network as if they were local block devices.

### Architecture and Design

lwNBD is written in C99 and adheres to strict embedded programming standards. It avoids dynamic memory allocation entirely, favoring static linking to ensure predictability and stability in bare-metal environments. The library is structured into three distinct layers:

*   **Management API**: Handles the server lifecycle and content embedding within applications, functioning similarly to how xinetd manages services.
*   **Server API**: Allows for the creation of protocol and transport plugins. While NBD is the primary focus, the architecture is flexible enough to support other protocols like Zmodem or AoE (ATA over Ethernet).
*   **Plugin API**: Facilitates the creation of content plugins. This API is modeled after the `nbdkit-plugin` architecture, making it easier for developers familiar with `nbdkit` to port code to lwNBD.

### Platform Support

The library currently supports two primary targets:

*   **Playstation 2 IOP**: Integrated via an IRX module for Open-PS2-Loader. It can export various block devices, including the internal hard drive (via the `atad` plugin), Memory Cards (`mcman`), ROM0, and IOP RAM.
*   **GNU/Linux**: Primarily used for development and testing, this target utilizes `libuv` as an event loop and can serve multiple clients simultaneously using a `file` plugin to serve local files as NBD exports.

### Networking and Compatibility

lwNBD leverages the BSD-style socket API, supporting both the `lwIP` (version 2.0.0) stack and standard Linux networking. Despite its lightweight nature, it provides a thread-safe synchronous implementation of the NBD protocol. It has been tested successfully with several modern clients, including `nbdcopy`, `nbdfuse` (which works on Windows via WSL2), and Ceph for Windows (`wnbd-client.exe`).

By providing a bridge between specialized embedded hardware and standard networking protocols, lwNBD enables developers to manage remote storage using familiar tools, bypassing the need for proprietary client software and facilitating easier toolchain updates.
