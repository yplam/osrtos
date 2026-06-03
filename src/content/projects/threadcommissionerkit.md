---
title: ThreadCommissionerKit
summary: A Swift library for iOS and macOS that implements the Thread 1.4 Commercial
  Commissioning (TCS) flow. It enables automatic discovery of Thread Border Routers
  via mDNS and secure credential retrieval using EC-JPAKE authentication over DTLS
  1.2. Designed for modern Swift concurrency, it allows mobile and desktop applications
  to seamlessly join and manage Thread networks.
slug: threadcommissionerkit
codeUrl: https://github.com/phil-margetson/ThreadCommissionerKit
star: 10
version: v1.1.0
lastUpdated: '2025-10-30'
rtos: ''
libraries:
- open-thread
topics:
- border-router
- coap
- coap-client
- commissioner
- device
- dtls
- espkc
- iot
- mbedtls
- openthread
- swift
- swift-package-manager
- swift5-9
- tbr
- thread
- thread-1-4
- unify-thread-network
isShow: false
createdAt: '2026-01-26'
updatedAt: '2026-01-26'
relatedProjects:
- pelion-device-management-client-example-for-mbed-os
- mbed-os-client-example
- coap-eap-with-eap-noob-in-contiki
- coremqtt-agent-library
- autonetwork-library
- zephyr-coaps-client-with-tinydtls
---

## Overview

ThreadCommissionerKit is a specialized Swift package designed to bridge the gap between Apple ecosystems (iOS and macOS) and Thread-based IoT networks. Specifically targeting the Thread 1.4 specification, this library implements the Commercial Commissioning (TCS) flow, allowing applications to securely retrieve Thread network credentials from Border Routers without requiring pre-shared keys or manual entry of complex network parameters.

By leveraging modern networking protocols and Swift's structured concurrency model, the kit provides a high-level API for discovering Thread hubs, establishing secure tunnels, and extracting the Operational Dataset required for devices to join a mesh network.

## Key Features

ThreadCommissionerKit automates several complex layers of the Thread commissioning stack:

- **mDNS/Bonjour Discovery**: Automatically locates Thread Border Routers on the local network using the `_meshcop-e._udp` service.
- **Secure Authentication**: Implements EC-JPAKE (Elliptic Curve J-PAKE), a password-authenticated key exchange that allows secure mutual authentication using temporary, ephemeral admin codes.
- **Encrypted Communication**: Utilizes DTLS 1.2 via mbedTLS with the `TLS-ECJPAKE-WITH-AES-128-CCM-8` ciphersuite to ensure all commissioning data is encrypted.
- **CoAP Implementation**: Handles the Constrained Application Protocol (CoAP) required for commissioner petitioning and dataset retrieval.
- **Dataset Parsing**: Automatically decodes TLV-encoded Thread Operational Datasets into native Swift structures, including Network Keys, PAN IDs, and PSKc.

## Technical Architecture

The library is organized into three primary functional components that mirror the Thread commissioning lifecycle:

1.  **HubDiscovery**: Uses Apple's Network.framework to perform Bonjour service discovery, identifying compatible Border Routers (such as the Aeotec SmartThings hub V2) currently in commissioning mode.
2.  **ThreadDTLSClient**: A wrapper around mbedTLS 3.6.4 that manages the DTLS handshake and secure transport layer. This component is crucial for the EC-JPAKE exchange, which ensures the admin code is never transmitted in the clear.
3.  **ThreadCommissioner**: The high-level coordinator that manages the CoAP state machine. It handles the "Commissioner Petition" to gain authorization from the leader and the subsequent request for the active network dataset.

## Implementation Example

The kit is designed for Swift's `async/await` pattern, making network operations straightforward to integrate into modern app architectures. Below is a basic example of searching for a hub and retrieving credentials:

```swift
import ThreadCommissionerKit

@MainActor
func discoverAndCommission(adminCode: String) async {
    let commissioner = ThreadCommissioner()

    // Search for a Thread Border Router on the local network
    guard let threadHub = await commissioner.searchForHub(timeout: 10) else {
        print("No Thread hub found.")
        return
    }

    do {
        // Connect using the ephemeral admin code (ePSKc)
        try await commissioner.connectToHub(threadHub: threadHub, adminCode: adminCode)
        
        // Retrieve the Thread Operational Dataset
        if let dataset = await commissioner.getThreadDataset() {
            print("Success! Network Name:", dataset.networkName ?? "Unknown")
        } 
    } catch {
        print("Commissioning error:", error.localizedDescription)
    }
    
    commissioner.close()
}
```

## Security and Compliance

ThreadCommissionerKit prioritizes security by adhering to the Thread 1.4 Commercial Commissioning flow. It relies on ephemeral admin codes (ePSKc), which are typically valid for only 5-10 minutes, reducing the risk of long-term credential exposure. The inclusion of mbedTLS as an internal XCFramework ensures that the cryptographic heavy lifting is handled by a proven, industry-standard library while maintaining a clean integration for Swift developers.

This library is particularly useful for developers building smart home management apps, industrial IoT configuration tools, or any application that needs to onboard devices into a Thread mesh network using the latest industry standards.
