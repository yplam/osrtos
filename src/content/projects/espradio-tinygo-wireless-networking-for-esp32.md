---
title: 'espradio: TinyGo Wireless Networking for ESP32'
summary: A wireless communication package for TinyGo that enables WiFi and TCP/IP
  functionality on ESP32-C3 and ESP32-S3 microcontrollers. It combines Espressif's
  low-level binary blobs with a pure-Go networking stack to provide standard Go net/http
  support on embedded hardware.
slug: espradio-tinygo-wireless-networking-for-esp32
codeUrl: https://github.com/tinygo-org/espradio
siteUrl: https://tinygo.org
version: v0.1.0
lastUpdated: '2026-06-13'
licenses:
- NOASSERTION
image: /202607/espradio_0.avif
rtos: ''
topics:
- bluetooth
- esp32
- esp32c3
- esp32s3
- golang
- tinygo
- wifi
isShow: true
createdAt: '2026-07-02T08:30:48+00:00'
updatedAt: '2026-07-02T08:30:48+00:00'
relatedProjects:
- seeed-home-assistant-discovery
- esp32-bus-expander
- airfrog
- esp-hosted-open
- esp32-bit-pirate
- microlink-tailscale-vpn-for-esp32
---

TinyGo has revolutionized how developers build firmware for microcontrollers by bringing the simplicity and safety of Go to embedded systems. However, one of the biggest challenges in the ESP32 ecosystem has been leveraging the chip's powerful radio peripherals without relying on the massive ESP-IDF C framework. The `espradio` project bridges this gap, providing a high-performance wireless communication package specifically for TinyGo.

### How it Works

At its core, `espradio` takes a hybrid approach to networking. Instead of wrapping the entire ESP-IDF stack, it uses Espressif's low-level binary blobs for the physical (PHY) and MAC layers via TinyGo's built-in CGo support. This allows the package to remain fast and utilize well-tested binaries for low-level radio communication while keeping the rest of the stack in Go. 

On top of these raw frames, `espradio` implements a pure-Go networking layer using the `lneto` stack. This design allows developers to use standard Go patterns, such as the `net/http` package, directly on hardware like the ESP32-C3 and ESP32-S3.

### Architecture and Features

The architecture is designed for flexibility, implementing the TinyGo `netdev` and `netlink` interfaces. This means that existing Go code relying on the standard library's networking primitives can often be ported to these microcontrollers with minimal changes. 

Key features include:
- **WiFi Modes**: Support for both Station (STA) and Soft-AP modes.
- **Standard Library Support**: Full Go `net` package compatibility via the TinyGo `netdev` interface.
- **Pure-Go Stack**: Integrated DHCP, DNS, and NTP support through the `lneto` package.
- **MQTT**: Support for machine-to-machine communication using the `natiu-mqtt` package.
- **Simulation**: A QEMU simulation target for the ESP32-C3, enabling testing without physical hardware.

### Hardware Support

Currently, `espradio` supports the most popular modern Espressif chips:
- **ESP32-C3**: A single-core 32-bit RISC-V MCU.
- **ESP32-S3**: A dual-core XTensa LX7 MCU.

Support for Bluetooth and additional processors is currently in progress, expanding the potential for Go-based wireless applications.

### Getting Started

Setting up a web server on an ESP32 using `espradio` is remarkably similar to writing a standard Go web application. By initializing the `Esplink` interface and passing it to the `netdev` driver, you can use the standard `http` package to handle requests.

```go
func main() {
	// Initialize ESP32 radio
	link := link.Esplink{}
	netdev.UseNetdev(&link)

	// Connect to WiFi
	link.NetConnect(&nl.ConnectParams{
		Ssid:       "yourssid",
		Passphrase: "yourpassword",
	})

	// Setup standard Go http server
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		io.WriteString(w, "hello from TinyGo!")
	})

	h, _ := link.Addr()
	http.ListenAndServe(h.String()+":80", nil)
}
```

Flashing the device is handled through the TinyGo CLI, where you can inject WiFi credentials at build time using linker flags, making it easy to deploy firmware across different environments.

### Debugging and Development

For developers needing to troubleshoot network issues, `espradio` provides specialized build tags. The `netlinkdebug` tag enables printing of netlink actions, while `pcapdebug` allows for logging of every packet sent and received, providing a level of visibility usually reserved for desktop network analysis tools.
