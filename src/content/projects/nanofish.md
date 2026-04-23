---
title: Nanofish
summary: Nanofish is a lightweight, zero-copy HTTP client and server library designed
  for resource-constrained embedded systems. Built on the Embassy async networking
  stack, it provides full no_std compatibility and operates without heap allocations,
  making it ideal for microcontrollers and IoT devices.
slug: nanofish
codeUrl: https://github.com/rttfd/nanofish
version: v0.11.3
lastUpdated: '2026-04-22'
licenses:
- MIT
image: /202604/nanofish_0.avif
rtos: ''
topics:
- embedded
- http-client
- http-server
- rust
isShow: true
createdAt: '2026-04-23T00:47:09+00:00'
updatedAt: '2026-04-23T00:47:09+00:00'
---

## Efficient Networking for the Embedded Edge

In the world of embedded systems, handling HTTP traffic often comes with a significant memory tax. Traditional HTTP libraries frequently rely on heap allocations and multiple data copies as information moves from the network stack to the application layer. Nanofish addresses these constraints head-on by providing a lightweight, `no_std` HTTP client and server specifically architected for the Embassy networking ecosystem.

At the heart of Nanofish is a zero-copy philosophy. By utilizing Rust's borrowing system, the library allows response data to be accessed directly from user-provided buffers. This approach eliminates the overhead of internal buffering and redundant memory operations, ensuring that memory usage remains predictable and efficient even on low-power microcontrollers.

## Zero-Copy Architecture

Most HTTP clients follow a path where data is read from the network into an internal stack buffer, copied into a response structure, and then potentially copied again into user-accessible memory. Nanofish collapses this pipeline. When you perform a request, you provide the buffer; the library reads the network data directly into that memory and then provides zero-copy references (slices) back to your application code. 

This architecture provides several critical benefits for IoT developers:
- **Predictable Footprint**: Since you provide the buffers, there are no hidden allocations that could lead to out-of-memory errors at runtime.
- **Performance**: Reducing memory copies saves CPU cycles and reduces power consumption, which is vital for battery-operated devices.
- **Flexibility**: You can use small buffers for simple status checks or larger buffers for data-heavy operations like firmware updates, all using the same API.

## Comprehensive HTTP Support

Despite its small footprint, Nanofish is a complete HTTP implementation. It supports all standard HTTP methods, including GET, POST, PUT, DELETE, and more. The client includes smart response parsing that automatically detects whether a response is text or binary based on the `Content-Type` header.

For developers working with modern web APIs, Nanofish provides extensive helper methods for header management. It includes pre-defined constants for common headers and MIME types (like JSON, XML, and HTML), making it easy to build compliant requests without manually typing string keys.

### Client Example

```rust
let client = DefaultHttpClient::new(stack);
let mut response_buffer = [0u8; 8192];

let headers = [
    HttpHeader::user_agent("Nanofish/0.11.1"),
    HttpHeader::content_type(mime_types::JSON),
];

let (response, bytes_read) = client.get(
    "http://example.com/api/status", 
    &headers,
    &mut response_buffer
).await?;

if response.status_code.is_success() {
    if let ResponseBody::Text(text) = response.body {
        println!("Received: {}", text);
    }
}
```

## Built-in Async Server

Nanofish isn't just for making requests; it also includes a built-in HTTP server. This allows embedded devices to host their own web interfaces or REST APIs for local configuration and monitoring. The server is fully asynchronous and integrates seamlessly with the Embassy executor.

Developers can implement the `HttpHandler` trait to define custom routing logic. The server supports customizable timeouts for accepting connections and reading request data, ensuring that a single stalled client doesn't hang the entire system.

### Server Implementation

```rust
struct MyHandler;

impl HttpHandler for MyHandler {
    async fn handle_request(&mut self, request: &HttpRequest<'_>) -> Result<HttpResponse<'_>, Error> {
        match request.path {
            "/" => Ok(HttpResponse {
                status_code: StatusCode::Ok,
                headers: Vec::new(),
                body: ResponseBody::Text("<h1>Embedded Web Server</h1>"),
            }),
            _ => Ok(HttpResponse { status_code: StatusCode::NotFound, ..Default::default() }),
        }
    }
}
```

## Security and Diagnostics

While the server is currently HTTP-only, the Nanofish client supports HTTPS/TLS 1.2 and 1.3 via the `embedded-tls` crate. This allows secure communication with cloud services and external APIs without sacrificing the `no_std` requirement.

To aid in debugging, Nanofish offers flexible logging options. Developers can choose between the `defmt` framework—optimized for the probe-rs ecosystem—or the standard `log` crate. If overhead is the primary concern, logging can be disabled entirely, causing all diagnostic calls to be compiled away to zero-ops.
