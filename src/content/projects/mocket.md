---
title: Mocket
summary: Mocket is a socket mocking framework for Python that monkey-patches the socket
  and ssl modules to intercept network traffic. It provides built-in support for HTTP,
  HTTPS, and Redis, and is compatible with asyncio, gevent, and MicroPython's urequests.
  It is primarily used as a testing utility to simulate network responses and record
  real socket traffic for playback.
slug: mocket
codeUrl: https://github.com/mindflayer/python-mocket
siteUrl: https://pypi.org/project/mocket
star: 308
version: v3.14.0
lastUpdated: '2025-12-01'
rtos: ''
libraries:
- micropython
topics:
- aiohttp
- asyncio
- coverage
- framework
- http
- httpretty
- https
- micropython
- mock
- mocket
- mocking
- python
- socket
- socket-communication
- socket-programming
- ssl
- tdd
- tdd-utilities
- testing
- urequests
isShow: false
createdAt: '2026-01-04'
updatedAt: '2026-01-04'
relatedProjects:
- cse160-network-protocols-project-skeleton
- modbux
- riden-dongle
- icetea-test-framework
- whitefield-framework
- lwip-contrib-unix-port
---

Mocket is a versatile socket mocking framework for Python, often described as "monkey-patching on steroids" for the `socket` and `ssl` modules. It provides a low-level framework for building custom mocks for any protocol, as well as high-level, ready-to-use mocks for common protocols like HTTP, HTTPS, and Redis. 

One of Mocket's strengths is its broad compatibility. It supports standard synchronous Python code as well as asynchronous environments like `asyncio`, `gevent`, and `trio`. It even extends its reach into the embedded world by supporting mocks for MicroPython's `urequests` library, making it a valuable tool for developers writing cross-platform Python network code that targets microcontrollers.

### Key Features and Capabilities

Mocket is designed to intercept network calls at the socket level. This allows it to work regardless of the high-level library being used, whether it is `requests`, `httpx`, `urllib3`, or `aiohttp`.

- **Protocol Mocking**: Includes built-in support for HTTP and Redis.
- **Strict Mode**: Developers can enable a strict mode that forces tests to fail if any unmocked network activity is detected, ensuring complete isolation.
- **Traffic Recording**: Similar to VCRpy, Mocket can record real socket traffic and save it to JSON files for later playback in tests.
- **Custom Matching**: Beyond simple URL matching, Mocket allows for custom request matching logic using the `can_handle_fun` parameter.

### Asynchronous and Embedded Support

Mocket integrates seamlessly with Python's asynchronous ecosystem. By using the `@async_mocketize` decorator, developers can mock network calls in `asyncio` applications. For libraries like `aiohttp` that create SSL contexts at import time, Mocket provides specialized connectors to ensure the mocking layer remains in control.

For developers working with MicroPython, Mocket's support for `urequests` allows for testing network logic on a development machine before deploying to embedded hardware. This bridges the gap between desktop development and embedded execution.

### Example: Mocking an HTTP Call

Using Mocket is straightforward, typically involving a decorator or a context manager. Here is a basic example using `pytest` and `requests`:

```python
import json
from mocket import mocketize
from mocket.mocks.mockhttp import Entry
import requests

@mocketize
def test_json_api():
    url_to_mock = 'https://testme.org/json'
    response_data = {"status": "success"}

    Entry.single_register(
        Entry.GET,
        url_to_mock,
        body=json.dumps(response_data),
        headers={'content-type': 'application/json'}
    )

    response = requests.get(url_to_mock).json()
    assert response == response_data
```

### Advanced Testing Scenarios

Mocket also excels at testing "non-happy paths." It can be configured to raise specific socket errors or exceptions, allowing developers to verify how their applications handle network timeouts, connection resets, or DNS failures. This level of control is essential for building resilient network-dependent software, especially in constrained embedded environments where network reliability can be an issue.
