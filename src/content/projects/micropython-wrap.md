---
title: MicroPython-Wrap
summary: A header-only C++ library that provides seamless interoperability between
  C++ and MicroPython. It automates the conversion of function arguments and return
  values between native types and the MicroPython object model, significantly reducing
  the boilerplate required to extend MicroPython with custom C++ modules.
slug: micropython-wrap
codeUrl: https://github.com/stinos/micropython-wrap
star: 134
lastUpdated: '2024-04-16'
rtos: ''
libraries:
- micropython
topics:
- micropython
isShow: false
createdAt: '2025-12-31'
updatedAt: '2025-12-31'
relatedProjects:
- semito-v-micropython-compatibility-layer-mcl
- lvgl-micropython-bindings
- single-stm32-header
- pycopy-standard-library-pycopy-lib
- freertos-modern-c-wrappers
- freertos-cpp
---

## Overview

MicroPython-Wrap is a header-only C++ library designed to simplify the process of extending the MicroPython programming language with native C++ code. In standard MicroPython development, creating custom modules typically involves writing significant amounts of boilerplate code to convert arguments, check types, and register functions within the MicroPython environment. MicroPython-Wrap abstracts these complexities using C++ templates, allowing developers to focus on their core logic while the library handles the integration.

## Key Features

The library provides a robust set of tools for bridging the gap between native C++ and Python scripts. By leveraging modern C++ standards, it offers automatic type conversion and sophisticated wrapping capabilities for both free functions and complex classes.

**Core capabilities include:**
- **Automatic Type Conversion**: Supports bidirectional conversion between MicroPython objects and standard C++ types, including `std::string`, `std::vector`, `std::map`, `std::tuple`, and `std::function`.
- **Class Wrapping**: Easily expose C++ classes to MicroPython, including support for constructors, destructors, methods, and attributes.
- **Keyword and Optional Arguments**: Define functions that accept optional parameters or keyword-based arguments directly from Python scripts.
- **Exception Handling**: Optional support for catching `std::exception` in native code and re-raising them as MicroPython `RuntimeError` exceptions.
- **Smart Pointer Support**: Integration with `std::shared_ptr` for managing object ownership and lifecycle across the C++/Python boundary.

## Technical Implementation

MicroPython-Wrap is built on standard C++ and is designed to be portable across different MicroPython ports. It has been verified on the Unix port (GCC), the ESP32 port (ESP-IDF SDK v4), and Windows (MSVC and GCC via MSYS2). 

The library uses two primary template classes, `ToPyObj` and `FromPyObj`, to handle the heavy lifting of type marshaling. For class integration, the `ClassWrapper` utility manages the registration of C++ types into MicroPython's global or module-specific dictionaries, ensuring that native objects are reachable by the MicroPython Garbage Collector (GC).

## Usage Example

Integrating a C++ function into MicroPython is straightforward. The following example demonstrates how a C++ function processing a vector of strings can be exposed to a MicroPython module named `foo`:

```cpp
#include <micropython-wrap/functionwrapper.h>

// Function to call from MicroPython
std::vector<std::string> TransformList(std::vector<std::string> vec)
{
  for(auto& v : vec)
    v += "_PROCESSED";
  return vec;
}

struct FunctionNames
{
  func_name_def(TransformList)
};

extern "C" void RegisterMyModule(void)
{
  auto mod = upywrap::CreateModule("foo");
  upywrap::FunctionWrapper wrapfunc(mod);
  
  // Automatic conversion of MicroPython list of strings
  wrapfunc.Def<FunctionNames::TransformList>(TransformList);
}
```

Once registered, the function can be used in MicroPython as if it were a native Python function:

```python
import foo
print(foo.TransformList(['a', 'b'])) # Outputs: ['a_PROCESSED', 'b_PROCESSED']
```

## Integration and Building

Because MicroPython-Wrap is a header-only library, integration primarily involves including the repository in your build path alongside the MicroPython source. The project includes a comprehensive `Makefile` for Unix-based builds and a `.vcxproj` for Windows development. It supports multiple integration methods, including building as a standard 'User C Module' or linking via static and shared libraries.
