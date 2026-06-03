---
title: MCP2515 CAN Testing App for Mongoose OS
summary: A Mongoose OS application designed to test the MCP2515 CAN controller library,
  which was ported from Arduino. It provides a framework for initializing CAN interfaces
  over SPI, sending messages, and receiving data from other controllers on the bus.
slug: mcp2515-can-testing-app-for-mongoose-os
codeUrl: https://github.com/Podnet/mcp2515-mgos-test
star: 0
lastUpdated: '2020-08-02'
rtos: mongoose-os
topics:
- can
- esp32
- esp8266
- mcp2515
- mongoose-os
- mongoose-os-app
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- max17263-test-app-for-mongoose-os
- hx711-testing-app-for-mongoose-os
- spirit-motor-driver-library
- uart-out-test-app
- ltc68xx-battery-monitoring-library-for-mongoose-os
- hx711-library-for-mongoose-os
---

## Overview

The MCP2515 testing app is a specialized firmware project for Mongoose OS designed to validate the functionality of the MCP2515 CAN controller library. Originally ported from the Arduino ecosystem, this implementation allows developers to integrate Controller Area Network (CAN) capabilities into Mongoose OS-based IoT devices. The project demonstrates how to configure the SPI interface, initialize the CAN controller, and handle basic message transmission and reception.

## Key Features

- **Arduino Port Compatibility**: Utilizes a CAN library ported from Arduino, making it easier for developers familiar with the Arduino `MCP_CAN` library to transition to Mongoose OS.
- **SPI Integration**: Leverages the Mongoose OS SPI driver to communicate with the MCP2515 hardware, with configurable Chip Select (CS) pins and clock frequencies.
- **Standardized CAN Operations**: Supports standard CAN operations including initialization at various bitrates (e.g., 500KBPS), message transmission, and message reception.
- **Logging and Debugging**: Includes built-in logging via the Mongoose OS `LOG` macro to provide real-time feedback on the initialization status and bus activity.

## Technical Implementation

The project is structured around the Mongoose OS build system, using `mos.yml` to manage dependencies and hardware configurations. It specifically depends on the `hrithik098/MCP2515` library and the standard Mongoose OS SPI and RPC modules.

### Hardware Configuration

Configuration is handled through the `config_schema` in the manifest. By default, the application enables SPI and assigns GPIO 10 as the Chip Select pin. The SPI frequency is also adjustable through the system configuration, allowing for tuning based on the specific hardware layout or cable lengths.

### Application Lifecycle

The application follows the standard Mongoose OS initialization flow. During the `mgos_app_init` phase, the system creates the MCP2515 object and attempts to start the CAN interface. If the initialization fails (e.g., due to wiring issues or hardware absence), the app logs an error and retries until a successful connection is established.

```c
enum mgos_app_init_result mgos_app_init(void) {
  LOG(LL_INFO, ("TCU: Adding CAN interface."));
  
  // Create MCP object with CS pin 10
  mc = mgos_mcp2515_create(10);
  
  // Loop until CAN init is successful at 500KBPS
  while (CAN_OK != mgos_mcp2515_begin(mc, CAN_500KBPS)) {
    LOG(LL_INFO, ("TCU: CAN init failed"));
  }

  LOG(LL_INFO, ("TCU: CAN init ok!"));

  return MGOS_APP_INIT_SUCCESS;
}
```

## Usage and API

Developers can interact with the CAN bus using two primary functions defined in the test application:

- `can_send(void *arg)`: Handles the logic for packaging and sending messages to the CAN controller.
- `can_recieve(void *arg)`: Manages the retrieval of incoming messages from other nodes on the CAN network.

This project serves as a robust starting point for building automotive diagnostic tools, industrial sensor networks, or any embedded system requiring reliable CAN bus communication within the Mongoose OS environment.
