---
title: seL4 CI Actions and Workflows
summary: A centralized repository of GitHub Actions and reusable workflows designed
  specifically for the seL4 microkernel ecosystem. It automates critical tasks such
  as kernel compilation, formal proof verification, hardware simulation, and code
  style enforcement across multiple seL4-related projects.
codeUrl: https://github.com/seL4/ci-actions
isShow: false
rtos: sel4
libraries: []
topics:
- ci
- ci-actions
- continuous-integration
- sel4
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- sel4-tools
- sel4-camkes-and-l4v-docker-build-environments
- rt-thread-linux-ci-environment
- docker-embedded-development-toolchains
- remote-flash-and-test-for-bl602-bl604-nuttx
- awesome-provable
---

Maintaining a high-assurance ecosystem like the seL4 microkernel requires more than just high-quality code; it requires rigorous, automated verification and testing. The **seL4/ci-actions** repository serves as the central hub for the continuous integration (CI) infrastructure used by the seL4 Foundation. By consolidating GitHub Actions and workflow definitions into a single location, the project avoids duplication and ensures that every repository in the seL4 ecosystem adheres to the same stringent standards.

### Centralizing the seL4 CI Pipeline

The primary goal of this repository is to provide a shared set of tools that can be easily integrated into other seL4 projects. This includes everything from basic linting to complex hardware-in-the-loop testing. By using the `workflow_call` trigger, other repositories can invoke these standardized workflows, ensuring that a change to the CI logic in this central repo automatically propagates across the entire ecosystem.

### Key Actions and Capabilities

The repository contains a diverse set of actions tailored to the unique needs of microkernel development and formal verification:

*   **Formal Proof Verification**: The `run-proofs` action checks if Isabelle/HOL proofs still hold after code changes, a critical step for seL4's security guarantees.
*   **Kernel Compilation**: The `standalone-kernel` action handles complex cross-compilation tasks for various architectures (ARM, x86, RISC-V) and compiler versions.
*   **Hardware and Simulation Testing**: Workflows like `sel4test-sim.yml` and `sel4test-hw.yml` automate the process of running the seL4 test suite in both QEMU simulators and on physical hardware targets.
*   **Compliance and Quality Control**: Automated checks for licenses (SPDX headers), link integrity, and shell script portability (bashisms) ensure the codebase remains clean and legally compliant.
*   **Binary Verification**: Specialized triggers like `bv-trigger` help bridge the gap between source-level proofs and the final compiled binary.

### Technical Implementation

The project utilizes a mix of technologies to achieve its goals. Many actions are implemented as **Node.js** applications, leveraging the `@actions/core` and `@actions/github` libraries to interact with the GitHub API. Others are containerized using **Docker**, as seen in the `camkes-test` and `camkes-vm` directories, which provide isolated environments for building and testing the CAmkES (Component Architecture for microkernel-based Embedded Systems) framework.

For example, the `await-remote-artifacts` action demonstrates a sophisticated use of the GitHub API to coordinate between different workflow runs, allowing one job to wait for and download artifacts produced by a separate, asynchronous process.

### Reusable Workflows

Beyond individual actions, the repository defines several high-level workflows that can be called by other repositories:

- **pr.yml**: Standard checks for pull requests, including gitlint, whitespace, and style filters.
- **push.yml**: Post-merge checks for broken links and license compliance.
- **sel4bench-hw.yml**: Automates the execution of performance benchmarks on hardware, ensuring that kernel updates do not introduce performance regressions.

### Contribution and Community

As an open-source project under the seL4 Foundation, contributions are encouraged. The repository follows a structured contribution process outlined in `CONTRIBUTING.md` and uses a variety of licenses (including BSD-2-Clause and Apache 2.0) to ensure the tools remain accessible to the community. For developers looking to contribute to the seL4 ecosystem, this repository provides a fascinating look into the automated machinery that keeps the world's most secure microkernel running smoothly.
