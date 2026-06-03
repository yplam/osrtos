---
title: Awesome Provable
summary: A curated collection of resources, languages, and tools focused on formal
  verification and provably correct software. It covers interactive theorem provers
  like Coq and Lean, dependently typed languages like Idris and Agda, and high-assurance
  projects such as the seL4 microkernel.
codeUrl: https://github.com/awesomo4000/awesome-provable
isShow: false
rtos: sel4
libraries: []
topics:
- agda
- certified-programming
- coq
- formal-verification
- idris
- isabelle
- isabelle-hol
- sel4
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- awesome-zephyr-rtos
- sel4-tools
- sel4-microkernel-website
- awesome-circuitpython
- sel4-ci-actions-and-workflows
- awesome-micropython
---

In the world of mission-critical software and embedded systems, the cost of a bug can be catastrophic. While traditional testing can find many errors, it can rarely prove their absence. This is where formal verification comes in—the process of using mathematical proofs to ensure that a program behaves exactly as intended. The **Awesome Provable** repository serves as a comprehensive guide to this rigorous field, collecting the best tools, languages, and projects that make provably correct software a reality.

### The Foundation: Languages with Formal Type Safety
At the heart of provable software are programming languages designed with advanced type systems. The list highlights several key players:

*   **Idris and Agda**: These are dependently typed functional languages. In these systems, types can depend on values, allowing developers to encode complex properties (like the length of a vector or the sorted property of a list) directly into the type system. If the code compiles, the property is mathematically guaranteed to hold.
*   **Liquid Haskell**: This project refines Haskell's types with logical predicates, enabling compile-time checks for pointer bounds, totality, and other critical safety properties.
*   **Ur/Web**: A specialized language for web applications that prevents common vulnerabilities like SQL injection and invalid HTML generation by construction.

### Interactive Theorem Provers
To prove deep properties about complex systems, developers often turn to Proof Assistants. These tools provide an environment for writing mathematical definitions and machine-checked proofs. The repository lists the industry standards:

*   **Coq**: Perhaps the most famous proof management system, used to verify everything from mathematical theorems to the CompCert C compiler.
*   **Isabelle/HOL**: A generic proof assistant used extensively in the verification of the seL4 microkernel.
*   **Lean**: A newer prover from Microsoft Research that aims to bridge the gap between interactive and automated theorem proving.
*   **K Framework**: A rewrite-based semantic framework used to define the formal semantics of programming languages and perform formal analysis.

### High-Assurance Projects in the Wild
The most exciting part of the Awesome Provable list is the section on real-world applications. These projects demonstrate that formal verification is not just an academic exercise but a practical tool for building unhackable systems.

*   **seL4 Microkernel**: Known as the world's first OS kernel with an end-to-end proof of implementation correctness. It is a cornerstone of modern high-assurance security research, particularly in military and aerospace applications.
*   **CertiKOS**: A certified operating system kernel designed at Yale that provides deep specifications for every abstraction layer, ensuring security and resilience against zero-day vulnerabilities.
*   **CompCert**: A verified C compiler. Unlike standard compilers which might introduce bugs during optimization, CompCert is mathematically proven to produce executable code that behaves exactly as the source program prescribes.
*   **HACMS (High-Assurance Cyber Military Systems)**: A DARPA-funded initiative that uses formal methods to create hack-proof drones and vehicles.

### Learning and Community
For those looking to dive into the world of formal methods, the repository points to essential textbooks like *Software Foundations* and *Certified Programming with Dependent Types*. It also includes links to the DeepSpec Summer School and lectures by prominent researchers like Adam Chlipala and Benjamin Pierce. 

Whether you are an embedded engineer looking to secure a bootloader or a researcher interested in the Curry-Howard correspondence, Awesome Provable provides the roadmap for navigating the complex but rewarding landscape of mathematical software verification.
