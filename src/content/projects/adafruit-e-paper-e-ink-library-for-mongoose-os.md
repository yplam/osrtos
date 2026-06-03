---
title: Adafruit E-Paper / E-Ink Library for Mongoose OS
summary: A comprehensive port of the Adafruit EPD library for Mongoose OS, providing
  drivers for various e-paper displays. It supports multiple programming interfaces
  including C, C++, and JavaScript (mJS), and features automated hardware configuration
  via YAML.
codeUrl: https://github.com/mongoose-os-libs/arduino-adafruit-epd
siteUrl: https://mongoose-os.com/
isShow: false
rtos: mongoose-os
libraries: []
topics:
- mongoose-os
- adafruit
- e-ink
- e-paper
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- micropython-waveshare-e-paper-drivers
- lis3dh-accelerometer-library-for-mongoose-os
- mongoose-os-relay-library
- esp-e-paper-component
- telegram-bot-api-for-mongoose-os
- arduino-ir-for-mongoose-os
---

The Adafruit E-Paper / E-Ink Library for Mongoose OS is a powerful wrapper around the popular [Adafruit EPD Library](https://github.com/adafruit/Adafruit_EPD), specifically tailored for the Mongoose OS ecosystem. E-paper displays (EPD) are increasingly popular in low-power IoT applications due to their high contrast and ability to maintain an image without power. This library brings that capability to Mongoose OS developers with a seamless integration that supports multiple languages and hardware configurations.

### Supported Drivers and Hardware

This library provides robust support for several common e-paper display controllers. Whether you are working with monochrome or tri-color displays, the library includes drivers for:
- **IL0373**: Often found in 1.54", 2.13", and 2.9" tri-color displays.
- **IL0398**: Used in larger 4.2" tri-color displays.
- **IL91874**: Found in 2.7" tri-color displays.
- **SSD1608**: A common controller for smaller monochrome displays.
- **SSD1675**: Frequently used in high-resolution monochrome e-paper modules.

In addition to the display controllers, the library also includes support for `Adafruit_MCPSRAM`, allowing for external SRAM buffering which is often necessary for rendering complex graphics on memory-constrained microcontrollers.

### Multi-Language Flexibility

One of the standout features of Mongoose OS is its multi-language support, and this library fully embraces that. Developers can interact with their e-paper displays using C, C++, or JavaScript (mJS).

#### Using JavaScript (mJS)
For rapid prototyping, the library provides a JavaScript API. You can initialize and control the display with just a few lines of code:

```javascript
load('api_arduino_adafruit_epd.js');
// Get the e-paper display as configured in mos.yml
let epd = ArduinoAdafruitEpd.createGlobal();
// Use standard Adafruit_EPD methods
epd.someMethod(...);
```

#### Using C and C++
For performance-critical applications, the C and C++ interfaces provide direct access to the underlying hardware. The library offers a global instance getter that retrieves the display object based on your project's configuration file.

```c
#include "mgos_aepd.h"

// Get the e-paper display as configured in mos.yml
Adafruit_EPD *epd = mgos_aepd_get_global();
// Invoke methods via snake_case wrappers
mgos_aepd_some_method(epd, ...);
```

### Configuration-Driven Setup

Mongoose OS emphasizes configuration over boilerplate code. This library allows you to define your display hardware entirely within your `mos.yml` file. By setting `aepd.enable: true`, the library automatically handles the initialization of the SPI bus and GPIO pins during the boot sequence. This includes settings for the EPD chip select (CS), SRAM chip select, Data/Command (DC) pin, and Reset pin.

This approach significantly reduces the amount of setup code required in your application logic, making it easier to swap hardware or change pin assignments without refactoring your source code. If you prefer manual control, the library also supports manual instantiation through `mgos_aepd_create` or direct C++ class instantiation.
