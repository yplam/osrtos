---
title: ReadyMail
summary: A fast, lightweight, and asynchronous email client library for Arduino supporting
  SMTP and IMAP protocols. Designed for 32-bit microcontrollers, it provides full
  RFC compliance, SSL/TLS security, and support for attachments and filesystem integration.
slug: readymail
codeUrl: https://github.com/mobizt/ReadyMail
star: 24
version: v0.3.8
lastUpdated: '2025-12-26'
rtos: ''
libraries:
- littlefs
- spiffs
topics:
- arduino-library
- arduino-mkr
- esp32
- esp8266
- imap-client
- raspberry-pi-pico
- read-email
- send-email
- smtp-client
isShow: false
createdAt: '2026-01-25'
updatedAt: '2026-01-25'
relatedProjects:
- asyncmqtt-esp32
- multiftpserver-library
- simpleftpserver-library
- arduino-freertos-library
- asynchttpsrequest-esp32-ethernet
- espai-unified-ai-api-client-for-esp32
---

ReadyMail is a high-performance, asynchronous email client library specifically tailored for the Arduino environment. It provides a comprehensive solution for embedded systems that need to communicate via email, supporting both the Simple Mail Transfer Protocol (SMTP) for sending messages and the Internet Message Access Protocol (IMAP) for retrieving them.

One of the standout features of ReadyMail is its hardware-agnostic design. While it targets 32-bit microcontrollers such as the ESP32, ESP8266, STM32, SAMD, and RP2040, it maintains compatibility with a wide range of network layers. Whether your project uses WiFi, Ethernet, GSM, or PPP, ReadyMail can integrate seamlessly by wrapping the standard Arduino Client interface. This flexibility ensures that developers can implement email functionality across diverse hardware and connectivity environments without rewriting their core logic.

## Security and Compliance

Security is a primary concern for modern email communication. ReadyMail addresses this by supporting SSL/TLS and STARTTLS, ensuring that credentials and message content remain encrypted during transit. It also adheres strictly to key email protocol standards, including RFC 5321 (SMTP), RFC 9051 (IMAP v4rev2), and RFC 822 (Message Format). This adherence guarantees compatibility with major email providers like Gmail, Outlook, and private mail servers.

## Asynchronous Architecture

The library is built with an asynchronous, non-blocking architecture. This is crucial for embedded applications where the main loop must remain responsive to handle sensors, displays, or other real-time tasks. It supports advanced features like inline images, file attachments, and even nested RFC822 message attachments. For memory-constrained devices like the ESP8266, the library provides mechanisms for buffer tuning to ensure stability during large transfers.

## Getting Started with SMTP

Sending an email is straightforward. The following example demonstrates how to configure an SMTP client using a secure WiFi connection:

```cpp
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#define ENABLE_SMTP
#include <ReadyMail.h>

WiFiClientSecure ssl_client;
SMTPClient smtp(ssl_client);

void setup() {
  ssl_client.setInsecure();
  smtp.connect("smtp.example.com", 465);

  if (smtp.isConnected()) {
    smtp.authenticate("user@example.com", "password", readymail_auth_password);

    SMTPMessage msg;
    msg.headers.add(rfc822_from, "ReadyMail <user@example.com>");
    msg.headers.add(rfc822_to, "Recipient <recipient@example.com>");
    msg.headers.add(rfc822_subject, "Hello from ReadyMail");
    msg.text.body("This is a plain text message.");

    smtp.send(msg);
  }
}
```

## Receiving Email with IMAP

ReadyMail also provides a robust IMAP implementation for searching, fetching, and managing mailboxes. It includes support for the IMAP IDLE command, allowing devices to receive real-time notifications when new mail arrives without constant polling.

```cpp
#include <ReadyMail.h>
// ... setup WiFi and Client ...
IMAPClient imap(ssl_client);

void setup() {
  imap.connect("imap.example.com", 993);
  if (imap.isConnected()) {
    imap.authenticate("user@example.com", "password", readymail_auth_password);
    imap.select("INBOX");
    imap.fetch(imap.getMailbox().msgCount, dataCallback);
  }
}
```

## Filesystem Integration

ReadyMail supports all Arduino-compatible filesystem types, including SPIFFS, LittleFS, SD, and SDMMC. This allows developers to easily attach files stored on local storage or save incoming attachments directly to a disk. This is particularly useful for data logging applications where sensor logs need to be periodically emailed to a central server or for OTA (Over-the-Air) updates delivered via email attachments.
