Running agent-generated code safely requires isolating it from your real filesystem and network, typically inside a VM or a lighter-weight sandbox.

!!! tip "[Lume](https://github.com/trycua/lume)"
    A lightweight virtualization tool for running macOS and Linux VMs, useful for isolating agent-executed code without the overhead of a full container orchestration setup.
