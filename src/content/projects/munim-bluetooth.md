---
title: Munim Bluetooth
summary: A high-performance React Native library for Bluetooth communication, supporting
  BLE central and peripheral modes, Android Classic Bluetooth, and Apple Multipeer
  Connectivity. Built with the Nitro modules architecture, it provides a comprehensive
  API for cross-platform device discovery, GATT operations, and background communication.
slug: munim-bluetooth
codeUrl: https://github.com/munimtechnologies/munim-bluetooth
siteUrl: https://www.munimtech.com/opensource/munim-bluetooth
version: v0.4.3
lastUpdated: '2026-05-22'
licenses:
- Apache-2.0
image: /202607/munim-bluetooth_0.avif
rtos: ''
topics:
- android
- ble
- ble-central
- ble-peripheral
- bluetooth
- bluetooth-classic
- bluetooth-low-energy
- bluetooth-peripheral
- central
- expo
- gatt
- ios
- l2cap
- multipeer-connectivity
- nitro-modules
- peripheral
- react-native
- react-native-bluetooth
- react-native-bluetooth-peripheral
- typescript
isShow: true
createdAt: '2026-07-01T12:34:31+00:00'
updatedAt: '2026-07-01T12:34:31+00:00'
relatedProjects:
- hijelhid-blekeyboard
- arduino-serial-ble
- golden-gate
- mbed-ble-gap-scanner
- nrf-connect-sdk-midi
- esp32-ble-uart-mx
---

Modern mobile applications often require sophisticated Bluetooth capabilities that go beyond simple data transfer. Whether it’s building a mesh network, connecting to specialized medical sensors, or transforming a smartphone into a peripheral for other devices, developers need a robust toolset. **munim-bluetooth** emerges as a comprehensive solution for React Native developers, offering a high-performance bridge to native Bluetooth stacks on both iOS and Android.

What sets this library apart is its foundation on the Nitro modules architecture. By leveraging a C++ core, it achieves low-latency communication and high reliability, making it suitable for performance-critical applications. It doesn't just wrap basic BLE; it exposes advanced features like Android’s Classic Bluetooth RFCOMM APIs and Apple’s Multipeer Connectivity for iOS-to-iOS peer messaging.

## A Dual Approach: Central and Peripheral Modes

Most Bluetooth libraries focus heavily on the "Central" role—scanning for and connecting to other devices. `munim-bluetooth` provides a first-class experience for the "Peripheral" role as well. This allows a React Native app to advertise custom GATT services, define characteristics, and respond to read/write requests from other centrals. This is particularly useful for phone-to-phone communication or creating virtual sensors.

In Central mode, the library offers granular control over device scanning with filtering options, RSSI monitoring, and full GATT operations. Developers can discover services, interact with descriptors, and subscribe to notifications or indications with ease. The API is designed to be platform-aware, reporting unsupported OS-level capabilities through a `getCapabilities()` method instead of failing silently.

## Beyond Standard BLE

The library addresses several platform-specific gaps that often frustrate developers in the cross-platform space:

*   **Android Classic Bluetooth**: While many modern devices use BLE, legacy and industrial hardware often rely on Classic Bluetooth (SPP/RFCOMM). This library provides Android-only APIs to handle discovery and client/server messaging for these devices.
*   **Apple Multipeer Connectivity**: For iOS and iPadOS environments, the library integrates Apple’s proprietary peer transport. This allows devices to discover and message each other over a combination of Wi-Fi and Bluetooth without manual GATT configuration.
*   **LE L2CAP Channels**: For high-throughput requirements, the library supports LE Credit-Based Channels (L2CAP) on supported iOS and Android versions, allowing for streamed payloads.

## Handling the Background

One of the most challenging aspects of Bluetooth development is maintaining connectivity when the app is not in the foreground. `munim-bluetooth` provides a `startBackgroundSession()` method designed for best-effort communication. 

On Android, this utilizes a foreground service with a persistent notification to keep the session alive, ensuring the OS doesn't kill the process during active communication. On iOS, it leverages CoreBluetooth state restoration, allowing the system to keep track of central and peripheral managers even if the app is suspended or terminated by the system. While subject to platform-specific relaunch rules, this provides a much higher level of reliability for long-running IoT integrations.

## Practical Implementation

Setting up a peripheral is straightforward. Developers define their services and characteristics using a clear configuration structure:

```typescript
import { startAdvertising, stopAdvertising, setServices } from 'munim-bluetooth'

// Configure GATT services
setServices([
  {
    uuid: '180D',
    characteristics: [
      {
        uuid: '2A37',
        properties: ['read', 'write', 'writeWithoutResponse', 'notify'],
        value: '48656c6c6f20576f726c64', // Hex-encoded value
      },
    ],
  },
])

// Start advertising with basic options
startAdvertising({
  serviceUUIDs: ['180D'],
  localName: 'My Device',
})
```

On the central side, scanning and connecting follow a promise-based workflow that fits naturally into modern React Native development:

```typescript
import { startScan, connect, discoverServices, readCharacteristic } from 'munim-bluetooth'

// Start scanning for specific services
startScan({
  serviceUUIDs: ['180D'],
  allowDuplicates: false,
})

// Connect and interact
await connect('device-id-here')
const services = await discoverServices('device-id-here')
const value = await readCharacteristic('device-id-here', '180D', '2A37')
```

## Conclusion

`munim-bluetooth` is a feature-rich toolkit that respects the nuances of the underlying operating systems. By providing a clear capability reporting API and high-performance Nitro-based modules, it ensures developers can build resilient applications that adapt to varying hardware and OS limitations. For teams building complex IoT integrations, smart home applications, or peer-to-peer meshes in React Native, this library provides the necessary depth and performance to handle professional-grade Bluetooth requirements.
