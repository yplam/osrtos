---
title: ESP-IDF Matter
summary: A Rust-based implementation of the Matter (Project CHIP) protocol for Espressif
  microcontrollers using the ESP-IDF framework. It integrates the rs-matter stack
  with ESP-IDF services to provide BLE commissioning, Wi-Fi/Thread networking, and
  persistent storage.
slug: esp-idf-matter
codeUrl: https://github.com/sysgrok/esp-idf-matter
siteUrl: https://github.com/ivmarkov/esp-idf-matter
lastUpdated: '2026-03-30'
licenses:
- Apache-2.0
rtos: freertos
libraries:
- lwip
- open-thread
topics:
- embedded
- esp-idf
- esp32
- matter
- rs-matter
isShow: false
createdAt: '2026-04-05T01:06:25+00:00'
updatedAt: '2026-04-05T01:06:25+00:00'
---

Building smart home devices that are compatible with the Matter protocol often involves navigating complex C++ SDKs. The `esp-idf-matter` project offers a modern alternative for developers who prefer Rust, allowing them to run the `rs-matter` implementation on Espressif chips using the `esp-idf-svc` abstraction layer.

This project provides the glue code necessary to bridge the pure-Rust Matter stack with the underlying hardware capabilities of the ESP32 series. By leveraging the ESP-IDF's support for the Rust Standard Library, features like UDP networking work seamlessly, while this crate adds specific implementations for BLE commissioning and persistent storage.

## Key Capabilities

The repository includes several critical components for a functional Matter device:

*   **BLE Commissioning**: A Bluedroid-based implementation of the `GattPeripheral` trait, enabling devices to be provisioned via Bluetooth Low Energy.
*   **Flexible Transport**: Support for Wi-Fi, Ethernet, and Thread (via OpenThread) through the `rs-matter-stack` abstractions.
*   **Persistent Storage**: Integration with the ESP-IDF Non-Volatile Storage (NVS) via `KvBlobStore` to maintain device state and credentials across reboots.
*   **Coexistence**: Pre-configured support for Wi-Fi/Thread and BLE coexistence, ensuring stable communication even when multiple radios are active.

## Hardware Support

The project is designed to work across the modern ESP32 lineup, specifically targeting:
*   **ESP32, ESP32-S3**: Dual-core performance for complex Matter nodes.
*   **ESP32-C3, ESP32-C6**: RISC-V based chips ideal for low-power Matter endpoints.
*   **ESP32-H2**: Specifically suited for Matter over Thread applications.

## Implementation Example

Setting up a Matter node involves initializing the stack and defining the device's endpoints and clusters. The following example demonstrates a simple On-Off light device using Wi-Fi for transport and BLE for commissioning.

```rust
async fn matter() -> Result<(), anyhow::Error> {
    // Initialize the Matter stack
    let stack = MATTER_STACK
        .uninit()
        .init_with(EspWifiMatterStack::init_default(
            &TEST_DEV_DET,
            TEST_DEV_COMM,
            &TEST_DEV_ATT,
        ));

    let sysloop = EspSystemEventLoop::take()?;
    let timers = EspTaskTimerService::new()?;
    let nvs = EspDefaultNvsPartition::take()?;
    let mut peripherals = Peripherals::take()?;

    // Create the default crypto provider
    let crypto = default_crypto(rand::thread_rng(), DAC_PRIVKEY);
    let mut weak_rand = crypto.weak_rand()?;

    // Define an On-Off cluster handler
    let on_off = OnOffHandler::new_standalone(
        Dataver::new_rand(&mut weak_rand),
        LIGHT_ENDPOINT_ID,
        TestOnOffDeviceLogic::new(true),
    );

    // Chain handlers for the node
    let handler = EmptyHandler
        .chain(
            EpClMatcher::new(
                Some(LIGHT_ENDPOINT_ID),
                Some(TestOnOffDeviceLogic::CLUSTER.id),
            ),
            on_off::HandlerAsyncAdaptor(&on_off),
        );

    // Run the Matter stack
    let matter = pin!(stack.run_coex(
        EspMatterWifi::new_with_builtin_mdns(peripherals.modem, sysloop, timers, nvs, stack),
        &persist,
        &crypto,
        (NODE, handler),
        (),
    ));

    matter.await?;
    Ok(())
}
```

## Technical Architecture

The integration relies on `esp-idf-svc` to handle the low-level FreeRTOS task management and hardware abstraction. Because `rs-matter` futures can be quite large, the project often requires manual stack size adjustments for the Matter task (typically around 20KB) to prevent stack overflows. The use of `static_cell` for the Matter stack allocation is a common pattern here to ensure memory stability during asynchronous execution.

## Future Roadmap

The project continues to evolve with planned support for several advanced features:
*   **Secure Device Attestation**: Utilizing secure flash storage for sensitive attestation data.
*   **System Time**: Synchronizing the ESP32 system clock via Matter protocols.
*   **OTA Updates**: Leveraging the native ESP-IDF OTA API to support Over-The-Air firmware updates initiated via Matter.
