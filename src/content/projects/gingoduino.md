---
title: Gingoduino
summary: A high-performance music theory engine for embedded systems that provides
  advanced analysis of notes, chords, scales, and harmonic progressions. It features
  a zero-heap architecture and supports MIDI 1.0 and MIDI 2.0 UMP serialization across
  Arduino, ESP-IDF, and PlatformIO platforms.
slug: gingoduino
codeUrl: https://github.com/sauloverissimo/gingoduino
version: v0.4.1
lastUpdated: '2026-05-28'
licenses:
- MIT
image: /202606/gingoduino_0.avif
rtos: ''
libraries:
- tft-espi
topics:
- arduino
- daisyseed
- esp32
- midi2
- music
- stm32
- teensy
- theory
isShow: true
createdAt: '2026-06-04T23:38:36+00:00'
updatedAt: '2026-06-04T23:38:36+00:00'
relatedProjects:
- esp32-s3-soundfont-sf2-sampler-synthesizer
- arduino-pico
- esp32-soundfont-sf2-sampler-synthesizer
- esp32-host-midi
- picosound-audio-library-for-rp2040
- microgroove
---

Gingoduino is a sophisticated music theory engine specifically engineered for the constraints of embedded systems. While many libraries focus on the transport layer of musical data—parsing MIDI bytes or handling USB descriptors—Gingoduino occupies the "musical domain." It provides the logic required to understand what those notes actually mean, how they relate to one another, and how they fit into broader harmonic structures like scales and fields.

### Architecture and Philosophy

The library is a port of the `gingopy` C++17 library, redesigned for the embedded world with a zero-heap architecture and C++11 compatibility. This ensures that it can run on everything from 8-bit AVR microcontrollers to modern 32-bit SoCs without the risk of memory fragmentation. It uses PROGMEM lookup tables to minimize RAM usage, making it suitable for resource-constrained environments.

Gingoduino follows a "tier" system to scale its features based on the target hardware's capabilities:
- **Tier 1**: Basic note, interval, and chord logic (optimized for AVR/Uno/Nano).
- **Tier 2**: Adds scales, harmonic fields, fretboard engines, and MIDI 1.0 adapters (optimized for ESP8266).
- **Tier 3**: Includes advanced features like harmonic trees, progression analysis, chord comparison, and MIDI 2.0 UMP adapters (targeting ESP32, RP2040, Teensy, and Daisy Seed).

### Comprehensive Musical Logic

At its core, Gingoduino handles the 12-note chromatic system with full support for enharmonic equivalents. It includes a massive database of over 42 chord formulas with reverse lookup capabilities, allowing a system to identify a chord from a set of active MIDI notes in real-time. 

For melodic and harmonic composition, the engine supports over 40 scale types and modes. It can calculate signatures, brightness levels, and relative/parallel relationships. The harmonic field analysis tool is particularly powerful, enabling the deduction of T/S/D (Tonic, Subdominant, Dominant) functions and roles from a sequence of notes or chords.

### Fretboard and Instrument Support

One of the unique aspects of Gingoduino is its integrated fretboard engine. It comes pre-configured for various instruments, including guitar, violão, cavaquinho, mandolin, and ukulele. It supports alternate tunings like Drop D and DADGAD and can calculate fingerings for common chords or open-position patterns, making it an excellent foundation for digital instrument projects or educational tools.

### MIDI 1.0 and 2.0 Integration

Gingoduino is designed to sit between a hardware transport and the application logic. It does not "own the wire"—meaning it doesn't handle the physical serial or USB communication—but it provides stateless output adapters that translate musical structures into serialized formats. This includes raw MIDI 1.0 byte streams and the newer MIDI 2.0 Universal MIDI Packet (UMP) Flex Data. 

For developers working with modern protocols, the MIDI 2.0 adapters support encoding chord names, key signatures, and per-note controllers into 128-bit Flex Data packets. This makes Gingoduino a bridge between traditional music theory and the next generation of musical instrument communication.

### Quick Start Example

The library's API is designed to be intuitive for musicians and developers alike:

```cpp
#include <Gingoduino.h>

using namespace gingoduino;

void setup() {
    Serial.begin(9600);

    // Analyze a note
    GingoNote note("C");
    Serial.println(note.midiNumber(4));    // 60

    // Explore a chord
    GingoChord chord("Dm7");
    GingoNote notes[4];
    chord.notes(notes, 4);                 // D, F, A, C

    // Analyze a harmonic field
    GingoField field("C", SCALE_MAJOR);
    GingoChord triads[7];
    field.chords(triads, 7);               // CM, Dm, Em, FM, GM, Am, Bdim
}
```

### Real-Time Monitoring

The `GingoMonitor` module allows for real-time tracking of musical events. By feeding it `noteOn` and `noteOff` events from a MIDI keyboard, the monitor can track held notes, the sustain pedal state, and automatically detect the current chord or harmonic field. This is ideal for creating visualizers, auto-accompaniment systems, or intelligent MIDI processors.
