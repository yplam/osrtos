---
title: Awesome Zephyr RTOS
summary: A curated collection of high-quality resources, libraries, tools, and learning
  materials for the Zephyr RTOS ecosystem. It serves as a comprehensive directory
  for developers looking for official documentation, community-supported libraries,
  and hardware platforms compatible with Zephyr.
codeUrl: https://github.com/golioth/awesome-zephyr-rtos
siteUrl: https://www.zephyrproject.org/
isShow: false
rtos: zephyr
libraries:
- littlefs
- lvgl
- mcuboot
- micropython
- nanopb
- nffs
- open-thread
- tensorflow-micro
topics:
- awesome
- awesome-list
- embedded
- iot
- lists
- mcu
- microcontroller
- real-time
- rtos
- zephyr
- zephyr-rtos
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- awesome-circuitpython
- awesome-micropython
- rt-thread-package-list
- pico-zephyr-project
- esp32-repo
- sama5d27-resource-sharing
---

The Zephyr RTOS has rapidly become one of the most significant open-source real-time operating systems for resource-constrained devices. As the ecosystem grows, keeping track of the best libraries, tools, and hardware can be a challenge. The **Awesome Zephyr RTOS** repository, maintained by Golioth, acts as a curated map for this vast landscape, providing developers with a centralized hub for everything Zephyr.

### A Gateway to the Zephyr Ecosystem

Zephyr is more than just a kernel; it is a complete ecosystem designed for IoT and embedded controllers. This repository organizes the chaos into logical categories, starting with official resources. Whether you are looking for the main project documentation, the `west` command-line tool, or the official SDK, this list ensures you are starting from the right place. It also highlights community hubs like Discord and the mailing list, which are essential for developers seeking support or wanting to contribute to the core project.

### Extensive Library Support

One of Zephyr's greatest strengths is its modularity. The Awesome list highlights a wide array of libraries that extend Zephyr's capabilities across various domains:

- **Application Frameworks**: From Arduino Core API modules to ROS 2 (micro-ROS) for microcontrollers.
- **Filesystems**: Support for reliable storage via `littlefs`, `fatfs`, and `nffs`.
- **IoT & Cloud**: Integration with platforms like Golioth, Memfault, and Anjay for LwM2M protocol support.
- **Security**: Essential security components like `MCUboot` for secure bootloading, `mbed TLS` for cryptography, and Trusted Firmware-M (TF-M).
- **Graphics & UI**: The inclusion of `lvgl` allows developers to create sophisticated user interfaces on embedded displays.

### Tools for Modern Embedded Development

Modern firmware development requires more than just a compiler. The repository lists tools that streamline the entire lifecycle of a project. This includes build and configuration tools like `bazel2zephyr`, shell-like interfaces for devicetrees (`dtsh`), and a variety of IDE extensions. 

Visual Studio Code users will find a wealth of extensions, including the official nRF Connect for VS Code and Circuit Dojo's Zephyr Tools, which simplify the setup process for new developers. For those focused on testing and simulation, the list points toward `Renode` and `QEMU`, which allow for hardware-less development and automated CI testing.

### Real-World Hardware and Learning

Beyond software, the list showcases what is possible with Zephyr through open-source hardware projects. Notable examples include **ZMK Firmware**, a powerful keyboard firmware, and **ZSWatch**, an open-source smartwatch built entirely on Zephyr. 

For those just starting their journey, the Learning Material section provides links to tutorials, the Nordic Developer Academy, and comprehensive courses on embedded DevOps. This makes the repository an excellent starting point for both hobbyists and professional engineers looking to transition to the Zephyr RTOS.
