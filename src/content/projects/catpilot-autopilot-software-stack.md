---
title: CatPilot Autopilot Software Stack
summary: CatPilot is a drone autopilot software stack designed for scalable and distributed
  embedded systems. It utilizes domain-specific notations for behavior specification
  and a minimalistic C codebase for real-time execution on platforms like STM32 and
  Zynq.
slug: catpilot-autopilot-software-stack
codeUrl: https://github.com/ctlst-tech/uas-catpilot
siteUrl: https://docs.ctlst.app/uas-catpilot/intro.html
star: 45
lastUpdated: '2024-03-19'
rtos: freertos
topics:
- autopilot
- c-atlas
- c-atom
- c-language
- c-library
- catalyst-aerospace
- ctlst
- ctlst-tech
- cube
- cubepilot
- drone
- embedded-systems
- eswb
- freertos
- mission-control
- model-based-development
- stm32
- uas
- uav
- vms
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- catpilot
- droners
- protoflight
- fpv-drone-stm32f411-flight-controller
- bitcraze-crazyflie-2-0-2-1-mbed-os-firmware
- flight-controller-rev2
---

CatPilot is a sophisticated autopilot software stack tailored for Unmanned Aerial Systems (UAS). It is built on the philosophy of using top-level domain-specific notations to specify desired behaviors, which are then executed by a minimalistic, generalized C-language codebase. This approach is designed to create scalable, distributed embedded software systems suitable for real-time mission-critical applications.

## Core Concepts: Atomic Functions

One of the defining features of CatPilot is its use of "atomic functions." These are reusable blocks of code that can be formally described using a Python-based specification library (`fspeclib`). From these formal descriptions, the system can automatically generate integration software and implementation stubs. This ensures that the core logic remains clean and portable while the boilerplate code is handled by the framework.

For example, a quaternion propagation function is defined in Python:

```python
from fspeclib import *

Function(
    name='core.quat.prop',
    title=LocalizedString(en='Propagate quaternion'),
    inputs=[
        Input(name='omega', title='Angular rate vector', value_type='core.type.v3f64'),
        Input(name='q0', title='Initial quat', value_type='core.type.quat'),
        Input(name='q', title='Recurrent quat', value_type='core.type.quat'),
        Input(name='reset', title='Reset', value_type='core.type.bool', mandatory=False),
    ],
    outputs=[
        Output(name='q', title='Updated quat', value_type='core.type.quat'),
    ],
    state=[
        Variable(name='inited', title='Initialized flag', value_type='core.type.bool'),
    ],
    injection=Injection(timedelta=True)
)
```

The actual behavior is then implemented in C, focusing purely on the mathematical logic:

```c
#include "core_quat_prop.h"

void core_quat_prop_exec(
    const core_quat_prop_inputs_t *i,
    core_quat_prop_outputs_t *o,
    core_quat_prop_state_t *state,
    const core_quat_prop_injection_t *injection
)
{
    if (state->inited == FALSE) {
        o->q = i->q0;
        state->inited = 1;
    } else {
        o->q.w = i->q.w + -0.5 * ( i->q.x * i->omega.x + i->q.y * i->omega.y + i->q.z * i->omega.z ) * injection->dt;
        // ... additional quaternion math ...
    }
}
```

## DSL-Based Integration

CatPilot employs several Domain-Specific Languages (DSLs) to orchestrate the system's behavior without requiring deep changes to the C codebase:

- **swsys**: Describes the software system layer, allocating functions into tasks and processes.
- **flow**: Arranges computational graphs as a sequence of atomic functions.
- **fsm**: A finite state machine notation for managing states and transitions.
- **ibr**: An interface bridge for converting data between different devices.

## Hardware and OS Support

The stack is designed to be hardware and OS-agnostic. It currently supports the CubePilot (STM32 H753) and Catalyst Aerospace Technologies' own device family (Zynq 7020). Depending on the target hardware, CatPilot can run on FreeRTOS, QNX, or even a standard POSIX host for testing and simulation. This flexibility allows developers to migrate from a proof-of-concept prototype to a certification-grade solution with minimal friction.

## Ecosystem and Middleware

CatPilot relies on a robust ecosystem of libraries developed by Catalyst Aerospace Technologies:
- **C-ATOM**: A library providing generic functionality for application-agnostic embedded stacks.
- **Embedded Software Bus (ESWB)**: A core platform-agnostic middleware that facilitates communication between different parts of the system.

By separating UAS-specific functions from the underlying platform software, CatPilot enables a modular development environment where contributors can focus on creating specific atomic functions or extending hardware support without compromising the integrity of the entire autopilot stack.
