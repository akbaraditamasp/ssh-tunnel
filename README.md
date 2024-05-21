Simple NodeJS-based CLI application to easily create SSH tunnels.

# Installation

```bash
npm install @akbaraditamasp/ssh-tunnel -g
```

# Usage

```bash
ssh-tunnel -c /PATH_TO_CONFIG <REMOTE_PORT> <LOCAL_PORT>
```

# Config File

Create a config file to manage SSH connections using JSON.

```json
{
  "host": "127.0.0.1",
  "port": 22,
  "user": "example",
  "password": "example"
}
```
