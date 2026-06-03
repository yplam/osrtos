---
title: Icetea Test Framework
summary: Icetea is an automated testing framework for Mbed development that automates
  flashing, test execution, and result reporting. It uses a host-side Python driver
  to control devices under test via a command-line interface, supporting both physical
  hardware and simulated processes.
slug: icetea-test-framework
codeUrl: https://github.com/ARMmbed/icetea
star: 7
version: v2.0.1
lastUpdated: '2021-07-07'
rtos: mbed-os
topics:
- iot
- mbed-os
- mbed-test
- test-framework
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- tcf-test-case-framework
- tock-test-harness
- remote-flash-and-test-for-bl602-bl604-nuttx
- wsntestbed
- smart-home-device-configurator
- mbed-tools
---

Icetea is a specialized automated testing framework designed for the Mbed ecosystem. It provides a robust environment for developers to automate the process of flashing Mbed boards, executing test sequences, and gathering results into comprehensive reports. While the project is currently deprecated, it remains a significant tool for understanding host-driven testing in embedded systems.

## Core Philosophy

The primary differentiator for Icetea compared to other Mbed-related frameworks, such as Greentea, is its host-side architecture. In Icetea, the host application (written in Python) acts as the driver for the entire test execution phase. This means the logic of the test case resides on the computer, which remotely controls the Device Under Test (DUT). This approach allows for complex test scenarios that might involve multiple devices or external services that would be difficult to coordinate from within the firmware itself.

## Key Features and Capabilities

Icetea is built to handle the full lifecycle of an embedded test:
- **Automated Flashing**: It integrates with tools like `mbed-flasher` to deploy binaries to hardware automatically.
- **Remote Command Execution**: It communicates with the DUT via a Command Line Interface (CLI), typically over UART or stdio. This allows the host to send commands and verify responses in real-time.
- **Flexible Targeting**: The framework can target physical hardware (such as the NXP K64F) or local process-based simulations, making it useful for different stages of the development cycle.
- **Metadata Filtering**: Tests can be organized and filtered based on metadata such as test type (smoke, regression, acceptance), feature, or component.
- **Suite Management**: Support for JSON-formatted suite files allows developers to define and run groups of related test cases easily.

## Technical Implementation

Icetea test cases are implemented as Python classes that inherit from the `Bench` object. A standard test case structure includes:
- **Initialization**: Defining metadata and hardware requirements (e.g., "I need one K64F board").
- **Setup**: Preparing the environment or the device state.
- **Case**: The actual test logic, using the `command` API to interact with the device.
- **Teardown**: Cleaning up resources after the test completes.

### Example Test Case

```python
from icetea_lib.bench import Bench

class Testcase(Bench):
    def __init__(self):
        Bench.__init__(self,
                       name="example_test",
                       title="Example Smoke Test",
                       status="development",
                       purpose="Show example of a test",
                       component=["examples"],
                       type="smoke",
                       requirements={
                           "duts": {
                               '*': {
                                    "count": 1,
                                    "type": "hardware"
                               }
                           }
                       })

    def case(self):
        # Sends a command to the device and waits for a response
        self.command(1, "echo hello world", timeout=5)
        self.command("help")
```

## Device-Side Requirements

For Icetea to interact with a device, the firmware must include a compatible CLI application (cliapp). This application is expected to handle basic terminal behavior, such as toggling echo and returning status codes (retcodes) after command execution. This handshake between the Python host and the C++ firmware ensures that the framework can reliably determine if a specific command succeeded or failed on the hardware.

## Integration and Environment

Icetea is designed to be cross-platform, supporting Linux (Ubuntu preferred), Windows, and macOS. It integrates deeply with the Mbed toolchain, utilizing `mbed-ls` for device discovery and `mbed-flasher` for deployment. For advanced networking tests, it even supports sniffer integration via Pyshark, allowing developers to capture and analyze network traffic as part of their automated test assertions.
