---
title: Xaloqi Embedded Diagnostics Suite (EDS)
summary: A production-grade UDS diagnostic stack for Zephyr RTOS and FreeRTOS that
  automates ISO 14229 compliance through a YAML-driven code generation workflow. It
  features ASIL-B safety wrappers, ISO-TP and DoIP transport support, and comprehensive
  testing tools for automotive and industrial ECUs.
slug: xaloqi-embedded-diagnostics-suite-eds
codeUrl: https://github.com/Xaloqi/EDS
siteUrl: https://xaloqi.com
version: v1.10.0
lastUpdated: '2026-07-08'
licenses:
- GPL-2.0
rtos: zephyr
libraries:
- lwip
- mcuboot
topics:
- automotive
- diagnostics
- doip
- embedded
- freertos
- iso14229
- uds
- zephyr
isShow: false
createdAt: '2026-07-22T13:51:40+00:00'
updatedAt: '2026-07-22T13:51:40+00:00'
---

Building a Unified Diagnostic Services (UDS) stack from scratch is a notoriously time-consuming endeavor in the embedded world. Engineers often spend weeks handling ISO-TP framing, session state machines, security access, and Data Identifier (DID) dispatching. The Xaloqi Embedded Diagnostics Suite (EDS) aims to reduce this multi-week effort to seconds by providing a configuration-driven workflow for Zephyr RTOS and FreeRTOS applications.

At its core, EDS allows developers to describe an ECU's diagnostic interface—including DIDs, Diagnostic Trouble Codes (DTCs), and routines—in a single YAML file. A Python-based generator then produces ISO 14229-compliant C code, safety wrappers, and test suites. This approach ensures consistency across projects and eliminates the boilerplate code typically associated with automotive diagnostics.

### Architectural Robustness and Safety

EDS is designed with safety-critical applications in mind, targeting ASIL-B candidate status (ISO 26262). The architecture is strictly deterministic, featuring zero dynamic memory allocation and no recursion. Every DID access is governed by a generated five-step ASIL-B safety chain that validates the request against session states, security levels, and data lengths before execution.

The suite supports 19 different UDS services, covering everything from basic data reading (0x22) and writing (0x2E) to more complex operations like routine control (0x31) and direct memory access (0x23/0x3D). For communication, it includes robust transport layers for both ISO-TP (CAN) and DoIP (Ethernet), the latter utilizing Zephyr’s native networking stack or LwIP on FreeRTOS targets.

### Workflow and Integration

The development cycle with EDS starts with a simple configuration. For example, defining a Vehicle Identification Number (VIN) DID looks like this:

```yaml
dids:
  - id: "0xF190"
    name: "VIN"
    data_length: 17
    access: [read]
    min_session: default
    read_security_level: 0
```

Once defined, the `codegen.py` tool generates the necessary C handlers and safety logic. For Zephyr users, EDS functions as a `west` module, integrating seamlessly into existing projects via `Kconfig` symbols. FreeRTOS users can utilize a standalone CMake build system targeting ARM Cortex-M architectures. 

### Testing and Simulation

One of the standout features of EDS is its emphasis on verification. The suite includes a test generator that produces a full `pytest` suite for every DID and DTC defined in the configuration. These tests can run in a host-native simulator (`native_sim`), allowing developers to verify their diagnostic logic in CI pipelines without needing physical CAN hardware. For more advanced setups, the suite can also generate CANoe CAPL scripts and SOVD (Service-Oriented Vehicle Diagnostics) CDA files.

### Versatile ECU Examples

The repository provides a wide array of reference implementations, ranging from basic ECUs to complex domain controllers:
- **BMS ECU**: Features 24 DIDs and 10 DTCs for battery management.
- **Motor Controller**: Includes 27 DIDs and 6 routines for motion control.
- **SafeBoot ECU**: Demonstrates MCUboot-based firmware updates over UDS.
- **DoIP ECUs**: Shows how to handle diagnostics over Ethernet using TCP/IP.

By combining a dual-licensed open-core runtime with powerful commercial generation tools, EDS provides a scalable path from hobbyist projects to production-grade automotive firmware.
