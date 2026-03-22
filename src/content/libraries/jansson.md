---
title: jansson
slug: jansson
summary: Jansson is a lightweight and portable C library for encoding, decoding, and
  manipulating JSON data with a focus on a simple and intuitive API. It features a
  stable design with no external dependencies, making it suitable for a wide range
  of environments from high-performance servers to resource-constrained embedded systems.
codeUrl: https://github.com/akheron/jansson
siteUrl: http://www.digip.org/jansson/
star: 3313
version: v2.15.0
lastUpdated: '2026-02-01'
platforms:
- POSIX
- Linux
- Windows
- macOS
licenses:
- MIT
libraryType: Middleware
createdAt: '2025-07-24'
updatedAt: '2026-03-22'
---

### Features


- Simple and intuitive C API for JSON data manipulation and structure building.

- No external dependencies on other libraries, ensuring easy integration into any project.

- Full Unicode support with mandatory UTF-8 encoding for all string data.

- Extensive test suite to ensure library reliability and RFC conformance.

- Reference counting memory management for efficient handling of JSON value structures.

- Robust decoding capabilities to parse JSON strings into internal C representations.

- Flexible encoding options including pretty-printing and alphabetical key sorting.

- High-level 'pack' and 'unpack' functions using format strings for rapid data processing.

- Thread-safe design with configurable hash function seeds and locale independence.

- Customizable memory allocation hooks for use in specialized or restricted memory environments.

- Detailed error reporting providing line, column, and descriptive messages for parsing failures.

- Support for fixed-length keys to optimize object property lookups.

- Comprehensive documentation available in HTML and source formats via Sphinx.

- Stable API and ABI, ensuring long-term compatibility for production applications.

- Standard autotools-based build system for seamless compilation on Unix-like systems.

- Native support for Windows platforms including Visual Studio compatibility.

- Deep and shallow copying mechanisms for complex JSON value trees.



### Architecture

Jansson is architected around a central opaque data type, `json_t`, which represents any JSON value including objects, arrays, strings, numbers, booleans, and null. The library employs a reference counting mechanism for memory management; every time a reference to a `json_t` object is stored, its reference count is incremented, and when it is no longer needed, the count is decremented. This allows for efficient memory usage and the ability to share sub-trees between different JSON structures without deep copying.

The library's internal structure is divided into several functional modules: the core value API, the UTF-8 validated string handler, the hash-table-based object implementation, and the dynamic array implementation. The parser (decoder) is a recursive-descent implementation designed to be robust against deeply nested structures, while the generator (encoder) provides various flags for output formatting. A unique feature of Jansson's architecture is the 'pack' and 'unpack' subsystem, which provides a high-level abstraction for converting between C types and JSON structures using a format-string syntax similar to the standard C library's I/O functions.

#### Core Components
- **Value API**: The primary interface for creating, querying, and modifying JSON types.
- **Parser/Decoder**: Converts raw JSON text into a hierarchy of `json_t` objects with strict UTF-8 validation.
- **Generator/Encoder**: Serializes `json_t` structures into strings or streams with optional formatting.
- **Reference Counting**: A built-in manager that handles the lifecycle of JSON values to prevent memory leaks.
- **Pack/Unpack Helpers**: Utility functions that simplify complex JSON construction and parsing using concise format strings.

### Use Cases

This library is ideal for:

- **Embedded Systems**: Managing configuration files and device state persistence due to its zero-dependency design and low memory footprint.
- **Web Services**: Encoding and decoding data for RESTful APIs in C-based server applications or microservices.
- **Inter-Process Communication (IPC)**: Serializing structured data for exchange between disparate processes or over network sockets.
- **Application Configuration**: Providing a human-readable and standard format for software settings and user preferences.
- **IoT Data Formatting**: Preparing sensor data and telemetry for transmission over protocols like MQTT, HTTP, or CoAP.
- **Data Logging**: Storing structured event logs that need to be easily parsed by external analysis tools.

### Getting Started

To begin using Jansson, developers can download the source distribution and use the standard autotools build sequence: `./configure`, `make`, and `make install`. For those working directly from the Git repository, the `autoreconf -i` command must be run first to generate the necessary build scripts. Once installed, simply include the `<jansson.h>` header in your C project and link against the `jansson` library.

The library provides a stable and well-documented API. New users are encouraged to explore the [official documentation](http://jansson.readthedocs.io/en/latest/) which includes a comprehensive tutorial on building a GitHub API client, as well as detailed references for value representation, error reporting, and custom memory allocation. For thread-safe applications, ensure you review the 'Thread Safety' section of the documentation regarding hash seeds and locale settings.
