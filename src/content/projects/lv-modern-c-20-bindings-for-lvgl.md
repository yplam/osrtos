---
title: 'lv: Modern C++20 Bindings for LVGL'
summary: A zero-cost, type-safe C++20 wrapper for the LVGL embedded graphics library.
  It provides modern abstractions like reactive state management, fluent API method
  chaining, and compile-time verified event handling while maintaining the performance
  of the underlying C implementation.
slug: lv-modern-c-20-bindings-for-lvgl
codeUrl: https://github.com/aptumfr/lv
lastUpdated: '2026-04-15'
licenses:
- AGPL-3.0
rtos: ''
libraries:
- lvgl
topics:
- cpp20
- embedded
- lvgl
- lvgl-esp32
- lvgl-ui
- lvgl9
isShow: false
createdAt: '2026-04-19T08:42:30+00:00'
updatedAt: '2026-04-19T08:42:30+00:00'
---

LVGL has long been the industry standard for creating sophisticated graphical user interfaces on resource-constrained embedded systems. However, as embedded development increasingly adopts modern C++ standards, the traditional C API can feel verbose and error-prone. The `lv` project addresses this by providing a header-only, C++20 wrapper that brings modern programming paradigms to the LVGL ecosystem without sacrificing performance.

## Zero-Cost Abstractions

A primary concern when wrapping a high-performance C library in C++ is overhead. The `lv` library is designed with "zero-cost" as a core pillar. Every wrapper class is exactly the size of a single pointer (`sizeof(void*)`), ensuring that the resulting assembly code is identical to what a developer would write using the raw LVGL C API. By utilizing C++20 concepts and inline functions, the compiler can optimize the wrapper away entirely, leaving only the direct calls to the underlying LVGL functions.

## Modern C++ Features and Type Safety

Moving beyond simple wrappers, `lv` leverages C++20 features to improve developer productivity and code safety:

*   **Type-Safe Events**: Instead of passing generic `void*` pointers for callbacks, `lv` uses member function pointers and compile-time verification. This catches signature mismatches at compile time rather than crashing at runtime.
*   **Fluent API**: The library supports method chaining, allowing for a declarative and highly readable UI definition style. Setting properties like text, alignment, and size can be done in a single cohesive block of code.
*   **Reactive State Management**: One of the most powerful features is the `State<T>` system. By utilizing LVGL's observer pattern, UI elements can be bound to state variables. When the state changes, the UI updates automatically, significantly reducing the boilerplate code typically required for manual synchronization.

## Example: Building a Counter

The following example demonstrates the library's component-based approach and reactive bindings. This counter application uses a `State<int>` to automatically update a label whenever the increment or decrement buttons are pressed.

```cpp
class CounterApp : public lv::Component<CounterApp> {
    lv::State<int> m_count{0};

public:
    lv::ObjectView build(lv::ObjectView parent) {
        auto root = lv::vbox(parent).fill().center_content();

        lv::Label::create(root)
            .bind_text(m_count, "Count: %d");

        auto buttons = lv::hbox(root).gap(10);

        lv::Button::create(buttons)
            .text("-")
            .on_click<&CounterApp::decrement>(this);

        lv::Button::create(buttons)
            .text("+")
            .on_click<&CounterApp::increment>(this);

        return root;
    }

private:
    void increment(lv::Event) { ++m_count; }
    void decrement(lv::Event) { --m_count; }
};
```

## Architecture and Integration

The project is designed as a header-only library, making it easy to integrate into existing CMake-based workflows. It targets LVGL version 9.4 and requires a modern C++20 compliant compiler (such as GCC 11+, Clang 14+, or MSVC 2022). While it is built for embedded targets, the repository includes examples and demos that run on native Linux environments using X11 or SDL2 as display backends, facilitating rapid prototyping on a desktop before deploying to hardware.

With coverage for over 35 LVGL widgets, `lv` provides a comprehensive toolkit for developers who want the power of LVGL paired with the safety and expressiveness of modern C++.
