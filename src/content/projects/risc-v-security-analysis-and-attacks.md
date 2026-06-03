---
title: RISC-V Security Analysis and Attacks
summary: A comprehensive security research project exploring side-channel attacks,
  speculative execution vulnerabilities, and control flow integrity on RISC-V architectures.
  It provides practical Proof-of-Concepts (PoCs) for exploits like Spectre and ROP
  on hardware platforms including SiFive U74-MC and Milk-V Duo S.
slug: risc-v-security-analysis-and-attacks
codeUrl: https://github.com/BlessedRebuS/RISCV-Attacks
star: 15
lastUpdated: '2024-08-01'
rtos: ''
libraries:
- micropython
topics:
- bof
- cybersecurity
- embedded-systems
- risc-v
- riscv
- rop
isShow: false
createdAt: '2026-02-11'
updatedAt: '2026-02-11'
relatedProjects:
- zephyr-cve-2021-3625-exploit-examples
- treecore-cpu-a-series-of-risc-v-processors
- cortex-m33-trustzone-experiments-on-qemu-an505
- apache-nuttx-rtos-on-64-bit-risc-v
- multizone-security-tee-for-risc-v
- cybersecurity-tinyos-encryption
---

## Overview

As the RISC-V architecture gains traction in the embedded and high-performance computing sectors, understanding its security landscape becomes paramount. This project provides a deep-dive analysis into various security vulnerabilities affecting RISC-V implementations, ranging from microarchitectural side-channel attacks to traditional memory corruption exploits like Return-Oriented Programming (ROP).

The research focuses on how fundamental hardware implementations—such as out-of-order execution, speculative execution, and performance counters—can be leveraged by attackers. By testing these theories on real-world hardware like the SiFive U74-MC and the Milk-V Duo S, the project bridges the gap between theoretical vulnerability research and practical embedded security.

## Side-Channel Attacks on RISC-V

Side-channel attacks exploit information leaked by the physical implementation of a system rather than flaws in the software logic itself. This project explores several critical vectors:

### Cache Timing Attacks
Two primary methods are analyzed: **Cache Flush and Reload** and **Cache Flush and Fault**. In these scenarios, an attacker monitors the time it takes to access memory to determine if data was already present in the CPU cache. If the access is fast, the data was cached, revealing information about the victim's memory access patterns. The project also introduces a "Flush and Fault" approach, where the timing of a page fault is used to predict cache state.

### Performance Counter Exploitation
RISC-V processors often include performance counters for benchmarking (e.g., cache misses, instructions executed). By default, these counters may be accessible to user-space applications. The project demonstrates how an attacker can use the `rdinstret` (read instructions retired) CSR to perform a side-channel attack that discovers hidden files by measuring the instruction count difference between successful and failed file operations.

## Speculative Execution and Spectre

Modern high-performance CPUs use speculative execution to predict branch outcomes and improve speed. However, this optimization is the root cause of the Spectre vulnerability. The project examines how different RISC-V cores handle this:
- **SiFive U74-MC**: This core utilizes "limited speculation," which mitigates many Spectre-style attacks because it does not speculatively refill or evict data cache lines.
- **T-Head C910/C920**: These more recent microarchitectures allow full speculative execution, making them potentially vulnerable to Spectre exploits.

## Control Flow Integrity and ROP

A significant portion of the research is dedicated to memory safety and Control Flow Integrity (CFI). Because RISC-V uses a Link Register (`ra`) to store return addresses, ROP attacks differ significantly from x86_64. 

**Key findings include:**
- **Non-Leaf Function Vulnerabilities**: ROP exploitation is primarily limited to non-leaf function epilogues where the return address is restored from the stack.
- **Register Manipulation**: The project demonstrates how callee-saved registers (S-registers) can be used to pass malicious arguments across function calls, even without a direct buffer overflow, by exploiting how compilers manage the stack.
- **Syscall Manipulation**: Proof-of-concepts show how an attacker can manipulate the arguments of an `exit()` system call by overwriting specific registers or stack values.

## Hardware Case Study: Milk-V Duo S

The project includes practical implementation details for the Milk-V Duo S, a RISC-V board based on the SG2000 SoC. This includes:
- **Firmware Flashing**: Procedures for burning eMMC firmware and setting up custom Ubuntu 22.04 environments.
- **GPIO Manipulation**: Using C and shell scripts to control hardware peripherals via the `/sys/class/gpio` interface.
- **Embedded Exploit PoC**: A unique demonstration where a buffer overflow is used to manipulate the LED output of the board. By overwriting the return address, the attacker forces the system into a permanent blinking state, illustrating how memory corruption can directly impact the physical behavior of an embedded device.

## Getting Started

For researchers looking to replicate these findings, the repository provides various C and Assembly source files located in the `bin` directory. These include:
- `access-retired`: PoCs for instruction-count side channels.
- `simple_syscall.s`: Basic RISC-V assembly for system call interaction.
- `led_blink.c`: Hardware interaction code for the Milk-V Duo S.

This research serves as a vital resource for embedded developers and security professionals working to harden RISC-V systems against modern microarchitectural and memory-based threats.
