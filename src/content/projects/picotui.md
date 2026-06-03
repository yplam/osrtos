---
title: Picotui
summary: Picotui is a minimalist Text User Interface (TUI) widget library for Python
  3 and Pycopy. It provides a comprehensive set of widgets including dropdowns, menus,
  and dialogs without relying on the curses library. Designed with a 'Keep It Simple,
  Stupid' (KISS) philosophy, it is particularly well-suited for resource-constrained
  environments and minimalist Python implementations.
slug: picotui
codeUrl: https://github.com/pfalcon/picotui
star: 812
version: v1.1
lastUpdated: '2021-11-25'
rtos: ''
libraries:
- micropython
topics:
- curses
- micropython
- minimalist
- pycopy
- python
- suckless
- terminal
- tui
- unbloated
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- pycopy-standard-library-pycopy-lib
- pycopy
- gooey-gui-library
- micropython-encoder-menu
- micropython-lib
- espui
---

## Overview

Picotui is a Text User Interface (TUI) widget library specifically designed for Python 3 and [Pycopy](https://github.com/pfalcon/pycopy), a minimalist fork of MicroPython. While many TUI libraries for Python exist, Picotui fills a specific niche by providing advanced widgets like dropdowns and floating windows while maintaining an extremely small footprint and avoiding heavy dependencies like `curses`.

The project was born out of a need for a more capable widget set than what was available in established libraries like Urwid or Npyscreen, particularly for environments where architectural complexity or library size is a concern. Picotui follows the KISS (Keep It Simple, Stupid) principle, focusing on providing the widgets developers need most without over-engineering the underlying screen management.

## The "No Curses" Philosophy

One of the most distinct technical choices in Picotui is its avoidance of the `curses` library. Traditionally, `curses` was essential for optimizing screen updates over slow serial connections (like 300 baud modems) by calculating the minimal set of character changes needed to refresh the display. 

Picotui operates on the premise that modern terminal environments—even those used in embedded systems—typically operate at much higher speeds (115200 baud or faster) or over local network connections. By bypassing `curses`, Picotui remains compatible with minimalist Python implementations like Pycopy and reduces the complexity of the stack. While this means the library lacks some advanced features like automatic double-buffering or complex geometry managers, it provides a straightforward path to building functional interfaces on constrained systems.

## Key Features and Widgets

Despite its minimalist core, Picotui offers a surprisingly rich repertoire of UI components. It includes standard elements that are often missing from other lightweight TUI libraries:

- **Input Widgets**: Text entries, multi-line entries, password fields, and auto-complete boxes.
- **Selection Widgets**: Dropdown menus, combo boxes, list boxes, checkboxes, and radio buttons.
- **Layout Elements**: Frames, labels, and buttons.
- **Complex Components**: Full-screen menu bars (`WMenuBar`) and multi-level dialogs.
- **Standard Dialogs**: Pre-built dialogs for common tasks like text entry or multi-line comments.

## Technical Implementation

Picotui uses a `Context` manager to handle terminal initialization and cleanup, ensuring that the terminal state is restored even if the application crashes. The library manages input through a main loop that routes events (including keyboard and mouse clicks) to the active widget.

Because Picotui does not use a geometry manager, developers specify coordinates for widgets manually. This approach aligns with the library's goal of transparency and low overhead, giving the developer full control over the layout at the cost of manual calculation.

### Example: Creating a Simple Dialog

Building a user interface with Picotui involves defining a `Dialog` and adding widgets to it. The following example demonstrates how to create a dialog with a label, a text entry, and a dropdown:

```python
from picotui.context import Context
from picotui.widgets import Dialog, WLabel, WTextEntry, WDropDown, WButton, ACTION_OK

with Context():
    d = Dialog(5, 5, 50, 10)
    
    d.add(1, 1, "Name:")
    d.add(10, 1, WTextEntry(20, "John Doe"))
    
    d.add(1, 3, "Color:")
    d.add(10, 3, WDropDown(10, ["Red", "Green", "Blue"]))
    
    b = WButton(8, "OK")
    d.add(10, 7, b)
    b.finish_dialog = ACTION_OK

    res = d.loop()
print("Result:", res)
```

## Target Platforms

Picotui is officially supported on CPython 3 and the Unix version of Pycopy. Its design makes it an excellent choice for:
- Embedded Linux systems requiring a local configuration interface.
- MicroPython-based devices with enough resources to run the Unix port.
- Command-line tools that need a more interactive experience than standard CLI arguments provide.

## Getting Started

As an experimental and work-in-progress project, the best way to explore Picotui is through its source code and the provided examples. The repository includes several demonstration scripts:
- `example_widgets.py`: A showcase of the entire widget repertoire.
- `example_menu.py`: A demonstration of a full-screen application with a main menu bar.
- `example_dialogs.py`: Examples of standard dialog implementations.
- `seditor.py`: A very simple VT100 terminal text editor widget built using the library's primitives.
