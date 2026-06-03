---
title: esp-razorlike
summary: A code generator for ESP8266 that enables dynamic HTML generation using a
  syntax inspired by ASP.NET Razor. It allows developers to mix C++ code directly
  within HTML templates, which are then parsed into efficient C++ code for use with
  ESPAsyncWebServer and SPIFFS.
slug: esp-razorlike
codeUrl: https://github.com/gertvantslot/esp-razorlike
star: 2
version: v0.0
lastUpdated: '2017-09-06'
rtos: ''
libraries:
- spiffs
topics:
- esp32-arduino
- esp8266-arduino
- razor-parsing-engine
- spiffs
isShow: false
createdAt: '2025-12-28'
updatedAt: '2025-12-28'
relatedProjects:
- esp8266-mywidget
- esp-fs-webserver
- configassist-esp32-esp8266
- effortless-spiffs
- arduino-esp-utils
- esp8266-micropython-development
---

## Overview

esp-razorlike is a specialized code generator designed for developers building web interfaces on the ESP8266 platform. It brings the familiar Razor-like syntax from the ASP.NET MVC world to the embedded space, allowing for a seamless blend of HTML templates and C++ logic. By pre-parsing templates into C++ code, it achieves a balance between developer productivity and the strict resource constraints of microcontrollers.

The project focuses on four primary goals: dynamic HTML generation, minimal program size, minimal runtime memory footprint, and high runtime performance. This makes it an excellent choice for IoT devices that require responsive, data-driven web dashboards without the overhead of heavy client-side frameworks or complex string manipulation in firmware.

## The Razor-like Syntax

The core strength of esp-razorlike is its simplified Razor syntax. In a `.cshtml` file, standard HTML is sent directly to the client. To insert the result of server-side C++ code, developers simply use the `@` symbol. For example:

```html
<p>The temperature is @temperature()</p>
```

For more complex logic, such as loops or conditional rendering, developers can use code blocks. This allows for powerful dynamic content generation, such as generating table rows based on hardware sensor readings or GPIO states:

```cpp
<div class="row">
@{
  for(int i = 0; i < 3; i++) {
     int led = digitalRead(i);
     <div class="col-md-4">
       <p>Status of led #<strong>@i</strong> = <strong>@led</strong></p>
     </div>
  }
}
</div>
```

## Technical Implementation and Workflow

The tool operates as a pre-processor. The typical development cycle involves:
1. Setting up a standard Arduino sketch with WiFi and `ESPAsyncWebServer`.
2. Creating `.cshtml` files in the project's `data` folder.
3. Running the `RazorLikeParser` (a .NET-based tool) to convert these templates into `.ino` files.
4. Compiling the generated files with the main sketch and uploading the static assets to the SPIFFS filesystem.

When the ESP8266 serves a page, the generated code reads the static parts of the HTML from SPIFFS and interleaves them with the execution of the C++ expressions. This approach is significantly more memory-efficient than storing large HTML strings in RAM or performing expensive string concatenations at runtime.

## Integration and Performance

By generating code that interacts directly with the `ESPAsyncWebServer` response stream, esp-razorlike ensures that data is sent to the client as it is processed. This streaming approach minimizes the peak memory usage, which is critical on the ESP8266's limited heap. The generated code uses specific helper functions like `_razor_fromFile` and `_razor_fromExpression` to manage the flow between the filesystem and the network stack efficiently.
