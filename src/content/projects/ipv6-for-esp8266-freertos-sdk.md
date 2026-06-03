---
title: IPv6 for ESP8266 FreeRTOS-SDK
summary: A technical guide and implementation for enabling IPv6 support on the ESP8266
  using the FreeRTOS-SDK and LWIP stack. It addresses the limitations of the standard
  Espressif API by utilizing the underlying socket-API and manual link-local address
  configuration.
slug: ipv6-for-esp8266-freertos-sdk
codeUrl: https://github.com/IPv6-ESP8266/IPv6-ESP8266
star: 28
lastUpdated: '2018-03-30'
rtos: freertos
libraries:
- lwip
topics:
- c
- esp
- esp8266
- freertos
- ipv6
isShow: false
createdAt: '2025-12-29'
updatedAt: '2025-12-29'
relatedProjects:
- lwip-for-esp8266
- esp8266-rtos-software-development-kit-sdk
- rtos-wot
- esp8266-rtos-homekit-accessory
- esp-open-rtos
- stm32duino-lwip
---

## Enabling IPv6 on the ESP8266

While the ESP8266 is a staple of the IoT world, its official documentation and standard APIs have historically focused almost exclusively on IPv4. This project demonstrates that IPv6 communication is indeed possible on the ESP8266 by bypassing the standard `espconn` layer and interacting directly with the LWIP (Lightweight IP) stack included in the FreeRTOS-SDK.

## The Challenge with Standard APIs

The primary hurdle for IPv6 on the ESP8266 is the `espconn.h` header provided by Espressif. Analysis of the `esp_tcp` structure reveals that it is hardcoded for 32-bit IP addresses, making it incompatible with the 128-bit addresses required for IPv6. 

```c
typedef struct _esp_tcp {
    int remote_port;
    int local_port;
    uint8 local_ip[4];
    uint8 remote_ip[4];
    // ... callbacks
} esp_tcp;
```

To overcome this, developers must utilize the LWIP socket API, which supports `AF_INET6`. However, simply switching to the socket API is not enough; the ESP8266 firmware does not automatically handle IPv6 address assignment or ICMPv6 neighbor discovery by default.

## Manual Network Interface Configuration

A critical discovery in this project is that the ESP8266 does not automatically assign a link-local address upon startup. Without a link-local address, the device cannot participate in ICMPv6 communication, such as Router Solicitations or Neighbor Discovery. 

Because the SDK prevents configuration within the standard `user_init` function, the address must be assigned manually within the WiFi event callback once the station has successfully connected to an Access Point. The following implementation shows how to find the network interface and trigger the creation of an IPv6 link-local address based on the device's MAC address:

```c
void manual_netif_setup() {
    struct netif *interface = netif_find("en0"); 
    if (!netif_is_up(interface)) {
        netif_set_up(interface);
    }
    // Assign a link-local address via the MAC address
    netif_create_ip6_linklocal_address(interface, 0);
}
```

## Implementing the Socket API

Once the interface is properly configured, standard LWIP socket calls can be used to establish connections. The project provides examples of converting IPv6 strings to address structures and initializing `sockaddr_in6` for TCP or UDP communication. This allows the ESP8266 to act as either a client or a listener in a modern IPv6 environment.

## Testing and Validation

To validate the implementation, the project utilizes a controlled environment consisting of a Cisco router configured for IPv6 unicast routing and a laptop running Wireshark. By monitoring the traffic, one can observe the ESP8266 successfully performing Router Solicitation and Neighbor Solicitation—the backbone of IPv6 connectivity. 

While the implementation is successful, users should be aware that the integration between LWIP and the ESP8266 FreeRTOS-SDK can occasionally be unstable, sometimes leading to unexplained boot loops. Despite these quirks, this project provides a vital roadmap for developers needing to move beyond IPv4 on legacy ESP8266 hardware.
