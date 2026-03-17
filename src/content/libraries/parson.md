---
title: parson
slug: parson
summary: Parson is a lightweight, C89-compliant JSON library for C that provides a
  simple API for parsing, manipulating, and serializing JSON data. It is uniquely
  characterized by its dot-notation addressing system for nested objects and its minimal
  footprint, consisting of only two source files.
codeUrl: https://github.com/kgabis/parson
star: 1445
lastUpdated: '2023-10-31'
components:
- FileSystem
platforms:
- POSIX
- Linux
- Windows
- macOS
- Native
licenses:
- MIT
libraryType: Middleware
createdAt: '2023-10-31'
updatedAt: '2026-03-17'
---

### Features


- Lightweight implementation consisting of only two source files (parson.h and parson.c).

- Full compatibility with the C89 standard for broad compiler support.

- Addressing JSON values using dot notation for easy access to nested structures.

- Support for parsing JSON data directly from files on disk.

- Support for parsing JSON data from memory strings.

- JSON validation capabilities against a basic schema-like structure.

- Serialization of JSON structures to files for persistence.

- Serialization of JSON structures to formatted (pretty) strings.

- Automatic object hierarchy creation when using dot-set functions.

- Support for standard JSON types including objects, arrays, strings, numbers, booleans, and null.

- Memory management functions for safely freeing JSON values and serialized strings.

- Simple and intuitive API for JSON manipulation and data extraction.

- Includes comprehensive test suites to ensure library reliability.

- Support for both formatted and compact serialization.

- Recursive cleanup of JSON value trees to prevent memory leaks.



### Architecture

Parson is designed with a minimalist approach, encapsulated within a single header and source file pair. The architecture revolves around a hierarchical tree of `JSON_Value` objects, which act as a generic container for all JSON types, including Objects, Arrays, Strings, Numbers, Booleans, and Null. This tree-based structure allows for intuitive manipulation of complex JSON data within a C environment.

The library utilizes a recursive descent parser for reading JSON strings and files. A key architectural feature is the "dot notation" engine, which allows users to traverse or create nested structures without manually iterating through intermediate objects or arrays. Memory management is handled through a centralized `json_value_free` function that recursively cleans up the entire tree, ensuring that even deeply nested structures are safely deallocated.

#### Core Components
- **Value Container**: The `JSON_Value` structure which encapsulates type information and the underlying data.
- **Parser**: Functions for converting raw strings or files into a structured `JSON_Value` tree.
- **Serializer**: Logic for converting `JSON_Value` trees back into string representations (formatted or compact).
- **Dot-Notation Engine**: A specialized subsystem for path-based access to nested data structures.

### Use Cases

This library is ideal for:

- **Embedded Systems**: Providing JSON support in resource-constrained environments due to its small footprint and C89 compatibility.
- **Configuration Management**: Saving and loading application settings to local files using the persistence and validation features.
- **Web API Integration**: Parsing responses from RESTful services where lightweight processing is required.
- **Data Serialization**: Converting internal C structures into JSON format for transmission over networks or inter-process communication.
- **Cross-Platform Development**: Projects requiring a JSON parser that works consistently across Windows, Linux, and macOS without external dependencies.

### Getting Started

To get started with Parson, clone the repository and copy `parson.h` and `parson.c` into your project's source directory. The library is designed to be compiled alongside your application code without complex build systems, though a `Makefile`, `CMakeLists.txt`, and `meson.build` are provided for testing and standard integration. 

Developers should begin by using `json_parse_file` or `json_parse_string` to generate a `JSON_Value` root, then use the `json_object_get_*` or `json_object_dotget_*` family of functions to extract data. Always ensure that `json_value_free` is called on the root value to prevent memory leaks. Detailed usage examples for parsing, persistence, and serialization are available in the project's README.
