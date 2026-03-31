---
title: HomeRPC
summary: HomeRPC is an embedded Remote Procedure Call (RPC) framework designed for
  smart home scenarios on the ESP32 platform. Built on FreeRTOS and ESP-IDF, it facilitates
  efficient communication between IoT devices and backend services, particularly for
  conversational AI and LLM-driven automation.
slug: homerpc
codeUrl: https://github.com/guidons-master/HomeRPC
lastUpdated: '2024-05-05'
licenses:
- Apache-2.0
image: /202603/HomeRPC_0.avif
rtos: freertos
topics:
- esp32
- freertos
- iot
- rpc
isShow: true
createdAt: '2026-03-31'
updatedAt: '2026-03-31'
---

HomeRPC is a specialized Remote Procedure Call (RPC) framework tailored for the unique demands of smart home ecosystems. Developed primarily for the ESP32 microcontroller, it leverages the power of FreeRTOS and the ESP-IDF framework to provide a lightweight, efficient, and scalable solution for controlling hardware remotely. While many RPC frameworks are designed for high-performance servers, HomeRPC focuses on the constraints of embedded systems, making it an ideal bridge between physical devices and high-level logic like Large Language Models (LLMs).

## Bridging Hardware and AI

The primary motivation behind HomeRPC is to simplify the interaction between smart home devices and conversational interfaces. By providing a structured way to define and call services on an ESP32, developers can easily hook up physical actions—like toggling a light or checking a sensor—to an AI-driven agent. This allows for a more natural, dialogue-based interaction with the home environment, where a user can ask a system to "check if the bedroom light is on" and have the underlying framework handle the routing and execution of that request.

## Technical Architecture and Implementation

HomeRPC is built on top of the ESP-IDF and utilizes several key components of the Espressif ecosystem, including MQTT for messaging and mDNS for service discovery. It also supports `mesh_lite`, suggesting capabilities for mesh networking which is crucial for large-scale smart home deployments where Wi-Fi coverage might be inconsistent.

One of the core technical features of HomeRPC is its flexible data handling. It uses a custom union type, `rpc_any_t`, which allows the framework to pass various data types—such as characters, integers, and floating-point numbers—across the RPC boundary using a standardized signature system. 

```c
typedef union {
    char c;
    unsigned char uc;
    short s;
    unsigned short us;
    int i;
    unsigned int ui;
    long l;
    float f;
    double d;
} __attribute__((aligned(1))) rpc_any_t;
```

## Defining and Calling Services

Setting up a device with HomeRPC is straightforward. Developers define "Services" on the ESP32 client, which include a function pointer, input/output type signatures, a name, and a description. These descriptions are particularly useful when integrating with LLMs, as they provide the necessary metadata for an AI to understand what a specific function does.

On the client side, a service to trigger an LED might look like this:

```c
static rpc_any_t trigger_led(rpc_any_t state) {
    gpio_set_level(BLINK_GPIO, state.uc);
    rpc_any_t ret;
    ret.i = 0;
    return ret;
}

// Within app_main:
Service_t services[] = {
    {
        .func = trigger_led,
        .input_type = "i",
        .output_type = 'i',
        .name = "trigger",
        .desc = "open the light",
    }
};
```

On the server or broker side, HomeRPC provides a Python-based interface that makes calling these services feel like native object-oriented programming. A Python script can locate a device by its location (e.g., "room") and type (e.g., "light") and invoke the "trigger" command with a simple method call.

## Scalability and Configuration

The framework is designed to be highly configurable via the ESP-IDF `menuconfig` system. Users can define router credentials, broker URLs, and limits for parameters and topic lengths, ensuring the framework fits within the memory constraints of the specific application. By combining the reliability of FreeRTOS with the ubiquity of MQTT, HomeRPC provides a robust foundation for modern, intelligent home automation projects.
