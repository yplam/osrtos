---
title: BQ35100 Mbed Library
summary: A specialized Mbed OS library for the TI BQ35100 primary battery fuel gauge.
  It provides comprehensive support for battery monitoring, including accumulator
  mode, internal/external temperature sensing, and advanced calibration routines for
  voltage, current, and offsets.
codeUrl: https://github.com/pilotak/BQ35100
isShow: false
rtos: mbed-os
libraries: []
topics:
- battery-gauge
- bq35100
- mbed-os
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- max17263-library-for-mongoose-os
- ltc68xx-battery-monitoring-library-for-mongoose-os
- ds248x-1-wire-library
- max17263-test-app-for-mongoose-os
- hlw8012-and-bl0937-energy-meter-library-for-mongoose-os
- onewireng
---

Managing primary (non-rechargeable) batteries in embedded systems presents unique challenges compared to standard Li-ion packs. The TI BQ35100 is a dedicated fuel gauge designed specifically for these chemistries, providing accurate state-of-health and remaining capacity information. The **BQ35100 Mbed library** by pilotak provides a robust interface for this chip, specifically tailored for the Mbed OS ecosystem.

Originally based on a version by u-blox, this library has been completely rewritten to ensure compatibility with modern Mbed OS 6 environments, where older versions often fail. Beyond simple data reading, this implementation adds critical functionality for device calibration and security management, making it suitable for production-grade firmware.

## Key Features and Capabilities

The library focuses on providing a high-level API for the BQ35100's various operating modes and maintenance tasks:

*   **Mbed OS 6 Compatibility**: Rewritten to work seamlessly with the latest Mbed drivers and APIs.
*   **Accumulator Mode Support**: Ideal for tracking total energy delivery in primary battery applications.
*   **Comprehensive Calibration**: Includes built-in functions for voltage, current, and temperature calibration, as well as CC (Coulomb Counter) and board offset adjustments.
*   **Security Management**: Easy methods to transition between Sealed and Unsealed security modes, which is necessary for configuration and calibration.
*   **Temperature Flexibility**: Supports both internal chip temperature and external thermistor sensing.

## Getting Started

Integrating the library into an Mbed project is straightforward. The constructor requires the I2C pins and the GAUGE_ENABLE pin (often connected to a GPIO to save power when the gauge is not in use).

```cpp
#include "mbed.h"
#include "BQ35100.h"

// SDA, SCL, and Enable Pin
BQ35100 gauge(I2C_SDA, I2C_SCL, D7);

int main() {
    if (!gauge.init()) {
        return 0;
    }

    gauge.setGaugeMode(BQ35100::ACCUMULATOR_MODE);
    gauge.useInternalTemp(true);
    gauge.setDesignCapacity(3800); // mAh
    gauge.setBatteryAlert(0);      // Disable ALERT pin if not used
    gauge.setSecurityMode(BQ35100::SECURITY_SEALED);
}
```

## Advanced Calibration

One of the standout features of this library is its support for the calibration workflow. Accurate fuel gauging requires the chip to be calibrated to the specific hardware environment it inhabits. This involves unsealing the device, starting the gauge, and performing a sequence of measurements.

The library simplifies this into a series of logical steps, as shown in the following snippet:

```cpp
// Unseal the device to allow calibration
if (gauge.setSecurityMode(BQ35100::SECURITY_UNSEALED)) {
    // Calibrate Voltage (e.g., 3600mV)
    gauge.calibrateVoltage(3600);

    // Perform offsets
    gauge.performCCOffset();
    gauge.performBoardOffset();

    // Calibrate Current (e.g., 100mA load)
    gauge.calibrateCurrent(100);

    // Calibrate Temperature (in 0.1°K, e.g., 2962 for 23.05°C)
    gauge.calibrateTemperature(2962);

    // Reseal the device
    gauge.setSecurityMode(BQ35100::SECURITY_SEALED);
}
```

By providing these low-level hooks in a clean C++ interface, the BQ35100 library enables developers to build sophisticated power management systems for long-term deployments where primary battery life is a critical metric.
