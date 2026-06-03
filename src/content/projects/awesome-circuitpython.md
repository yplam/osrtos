---
title: Awesome CircuitPython
summary: A curated collection of resources for CircuitPython, an Adafruit-supported
  fork of MicroPython designed for education and prototyping on microcontrollers.
  It provides a comprehensive directory of libraries, hardware support, tutorials,
  and community tools for the Python-on-hardware ecosystem.
codeUrl: https://github.com/adafruit/awesome-circuitpython
siteUrl: https://circuitpython.org/
isShow: false
rtos: ''
libraries:
- micropython
topics:
- adafruit
- awesome
- awesome-list
- circuitpython
- embedded
- iot
- micropython
- python
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- awesome-micropython
- awesome-zephyr-rtos
- oficina-de-circuitpython
- sparkfun-python-examples
- micropython-lib
- micropython-samples-and-drivers
---

CircuitPython has revolutionized the way beginners and experts alike approach embedded systems. By bringing the simplicity of Python to microcontrollers, it removes the steep learning curve traditionally associated with low-level languages like C or C++. The **Awesome CircuitPython** repository serves as the definitive directory for this ecosystem, cataloging everything from core firmware to community-driven libraries and specialized hardware.

### What is CircuitPython?
CircuitPython is Adafruit's branch of MicroPython, specifically optimized for experimentation and education. Unlike traditional embedded development that requires complex toolchains and compilers, CircuitPython allows users to write code and see results instantly. When a CircuitPython-compatible board is plugged into a computer, it appears as a USB flash drive; saving a `code.py` file to that drive triggers an immediate restart and execution of the script. This "no-install" workflow makes it an ideal choice for rapid prototyping and classroom environments.

### A Massive Ecosystem of Hardware
The project supports an impressive array of hardware, with over 500 boards currently in the family. These range from Adafruit's own Circuit Playground Express and Feather series to third-party boards using the RP2040, ESP32-S2/S3, and nRF52840 chips. The repository points users toward [CircuitPython.org](https://circuitpython.org/downloads), where firmware can be filtered by maker, features, and MCU architecture.

### Libraries and Code Resources
One of the strongest aspects of the CircuitPython ecosystem is its library support. The repository highlights:
- **The Adafruit Bundle**: A collection of over 150+ libraries for sensors, displays, and motor drivers.
- **Community Bundle**: Over 45+ libraries contributed by the community for niche hardware and specific use cases.
- **Blinka**: A compatibility layer that allows CircuitPython libraries to run on single-board computers (SBCs) like the Raspberry Pi, bridging the gap between microcontrollers and Linux-based systems.

### Development Tools and Frameworks
To support different workflows, the repository lists several IDEs and editors tailored for Python on hardware:
- **Mu Editor**: The recommended offline editor featuring a built-in REPL and plotter.
- **code.circuitpython.org**: A browser-based editor that can communicate with devices via WiFi, Bluetooth, or USB.
- **Thonny**: A beginner-friendly IDE with robust support for both CircuitPython and MicroPython.
- **VSCode Extensions**: For professional developers who prefer a more feature-rich environment.

### Community and Learning
Beyond code, the repository is a gateway to a massive learning system. It links to the Adafruit Learning System, which contains hundreds of step-by-step guides, and the CircuitPython Weekly Meeting, where developers and users discuss the project's roadmap. For those looking to dive deeper, it catalogs books, podcasts like *The CircuitPython Show*, and newsletters that keep the community updated on the latest "Python on Hardware" news.

### Contributing to the List
As an "Awesome List," the project is community-driven. Developers are encouraged to contribute new resources, libraries, or hardware links via a standard GitHub pull request workflow. This ensures that the repository remains the most up-to-date and comprehensive starting point for anyone entering the world of CircuitPython.
