---
title: Telegram Bot API for Mongoose OS
summary: A comprehensive library for Mongoose OS that implements the Telegram Bot
  API, allowing IoT devices to be controlled and managed through Telegram. It supports
  ESP8266 and ESP32 microcontrollers and provides both C and JavaScript (mJS) interfaces
  for messaging and interactive bot features.
slug: telegram-bot-api-for-mongoose-os
codeUrl: https://github.com/kotelnikov/mgos_telegram
siteUrl: https://mongoose-os.com/
star: 8
lastUpdated: '2025-08-20'
rtos: mongoose-os
topics:
- esp32
- esp8266
- mongoose-os
- telegram-bot-api
isShow: false
createdAt: '2025-12-30'
updatedAt: '2025-12-30'
relatedProjects:
- mongoose-os-relay-library
- arduino-ir-for-mongoose-os
- mongoose-os-programs-and-examples
- mel-ac-library-for-mongoose-os
- electricitydisplay-mqtt-remote-control-for-esp8266-esp32
- lis3dh-accelerometer-library-for-mongoose-os
---

## Overview

The Telegram Bot API library for Mongoose OS provides a streamlined way to integrate Telegram-based control into IoT applications. Developed for the Mongoose OS framework, this library allows developers to build bots that can interact with users, send status updates, and receive commands directly on embedded hardware like the ESP8266 and ESP32. 

By leveraging the Telegram Bot API, developers can bypass the need for custom mobile applications or complex web dashboards, using the Telegram messenger as a ready-made interface for device management. The library is particularly useful for remote monitoring, home automation, and any application requiring a secure, user-friendly communication channel between a human and a machine.

## Key Features and Capabilities

The library implements a subset of the Telegram Bot API specifically tailored for the constraints of embedded systems. It focuses on the most essential interactions required for IoT control:

- **Message Handling**: Support for receiving and processing standard text messages.
- **Callback Queries**: Integration with Telegram's inline keyboards, allowing for interactive buttons and menu systems.
- **Messaging Methods**: Implementation of `sendMessage`, `editMessageText`, and `answerCallbackQuery`.
- **Access Control**: A built-in Access Control List (ACL) mechanism to ensure only authorized users can interact with the device.
- **Echo Mode**: A simplified testing mode that automatically returns received messages to the sender, useful for verifying connectivity and API token validity.

## Technical Architecture

The library is designed to be flexible, offering full functionality through both a C API and a JavaScript (mJS) API. This dual-language support allows developers to choose the environment that best fits their project requirements—using C for performance-critical tasks or JavaScript for rapid prototyping and high-level logic.

Connectivity is handled through Mongoose OS's networking stack, supporting internet access via Wi-Fi, Ethernet, or cellular connections (PPPoS). The library manages the polling of updates from the Telegram servers and provides an event-driven architecture to notify the application when new data arrives.

## Configuration and Setup

Integrating the library into a Mongoose OS project involves adding it to the `mos.yml` configuration file. Developers must provide a Telegram Bot token, which can be obtained from the official Telegram `@BotFather`. The configuration schema allows for easy adjustment of settings such as the update timeout, request queue lengths, and the ACL list.

```yaml
config_schema:
  - ["telegram.enable", true]
  - ["telegram.token", "1111222333:YourTokenGoesHere"]
  - ["telegram.acl", "[555777888, 222333444]"]
```

## Code Examples

### JavaScript (mJS) Example

Using the JavaScript API, setting up a basic command handler is straightforward. The following example demonstrates how to subscribe to the `/start` command and respond to the user:

```javascript
load('api_events.js');
load('api_telegram.js');

let updates_handler = function(ed, ud) {
    let upd = TGB.parse_update(ed);
    if (upd.data === '/start') {
        TGB.send(upd.chat_id, 'Hello from Mongoose OS!');
    }
};

Event.addHandler(TGB.CONNECTED, function() {
    TGB.subscribe('/start', updates_handler, null);
}, null);
```

### C API Example

For developers preferring C, the library provides a similar event-driven workflow. This example shows how to initialize the bot and handle incoming updates:

```c
#include "mgos.h"
#include "mgos_telegram.h"

void telegram_updates_handler(void *ev_data, void *userdata) {
    struct mgos_telegram_update *update = (struct mgos_telegram_update *) ev_data;
    if (strcmp(update->data, "/status") == 0) {
        mgos_telegram_send_message(update->chat_id, "System is Online");
    }
}

void app_start_handler(int ev, void *ev_data, void *userdata) {
    mgos_telegram_subscribe("*", telegram_updates_handler, NULL);
}

enum mgos_app_init_result mgos_app_init(void) {
    mgos_event_add_handler(TGB_EV_CONNECTED, app_start_handler, NULL);
    return MGOS_APP_INIT_SUCCESS;
}
```

## Hardware Support

The library has been successfully tested on the Espressif ESP8266 and ESP32 platforms. Because it relies on the standard Mongoose OS networking and event libraries, it is theoretically compatible with other platforms supported by Mongoose OS, provided they have sufficient resources to handle TLS-encrypted HTTP requests to the Telegram API servers.
