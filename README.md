# COREX Framework

> A modern FiveM framework for Zombie Survival gameplay — built on a simple table architecture with StateBag synchronization, Lua 5.4, and oxmysql.

---

## Features

- **Simple Table Architecture** — no OOP, all operations via `Corex.Functions`
- **StateBag sync** instead of network events
- **Tetris grid inventory** (corex-inventory)
- **Character creation & spawn flow** (corex-spawn)
- **Dynamic weather & time** (corex-weather)
- **Death/respawn system** (corex-death)
- **Crafting system** (corex-crafting)
- **HUD overlay** (corex-hud)
- **Core player, money, metadata & persistence** (corex-core)

---

## Requirements

| Dependency | Version |
|---|---|
| [FiveM Server Artifact](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/) | latest recommended |
| MySQL / MariaDB | 5.7+ / 10.4+ |
| [oxmysql](https://github.com/overextended/oxmysql) | latest (included) |
| Lua | 5.4 (set per resource) |
| Cfx.re License Key | [Generate here](https://keymaster.fivem.net/) |

---

## Installation

### 1. Clone the repo

```bash
git clone https://github.com/ABUGIZA/COREX-Framework.git
cd COREX-Framework
```

### 2. Install the FiveM server binary (FXServer)

The `FXServer/` folder is **not** included in this repo.

1. Download the latest recommended build:
   👉 https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/
2. Extract the contents to `FXServer/` at the project root.

Final structure should look like:
```
COREX-Framework/
├── FXServer/
│   ├── FXServer.exe
│   ├── run.cmd
│   └── ...
└── server-file/
```

### 3. Create your `server.cfg`

```bash
cd server-file
copy server.cfg.example server.cfg
notepad server.cfg
```

Edit the following keys:
- `sv_licenseKey` → your Cfx.re key from <https://keymaster.fivem.net/>
- `mysql_connection_string` → `mysql://USER:PASSWORD@localhost/corex?charset=utf8mb4`
- `add_principal` → your FiveM/Discord identifiers for admin access

### 4. Set up the database

Create a database named `corex` and import the schema:

```bash
mysql -u root -p -e "CREATE DATABASE corex CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"
mysql -u root -p corex < server-file/resources/[corex]/corex-core/sql/corex_framework.sql
```

### 5. Run FXServer (first-time launch)

Double-click `FXServer/run.cmd` — or from terminal:

```bash
FXServer\run.cmd
```

The console will show:

```
All ready! Please access:
  http://localhost:40120/
```

---

## 🖥️ txAdmin Setup Wizard (first run)

Open **<http://localhost:40120/>** in your browser. First-time setup:

### Step 1 — Create your PIN
Set a 4-digit PIN. Save it — you'll use it to log in.

### Step 2 — Link Cfx.re account (or create local admin)
Either link your keymaster.fivem.net account, or create a local admin user with username + password.

### Step 3 — Server Name
Enter any short name, e.g. `COREX Zombies`.

### Step 4 — Deployment Type
Choose **📁 Existing Server Data** (NOT Popular Recipes or Remote URL).

### Step 5 — Server Data Folder
Enter the absolute path to `server-file`:
```
C:\COREX_Framework\server-file
```
(Adjust if your clone path is different.)

### Step 6 — Server CFG File
Enter:
```
server.cfg
```
(Relative to the data folder — txAdmin should show **"Config file detected!"** in green.)

Click **Save**.

### Step 7 — Start the server
On the txAdmin dashboard click the green **Start Server** button. Watch the Live Console — you should see:

```
Started resource corex-core
Started resource corex-spawn
Started resource corex-inventory
[oxmysql] Database server connection established!
```

If you see any red errors, check:
- MySQL is running and the `corex` database exists
- `mysql_connection_string` credentials are correct
- Port `30120` is free (TCP + UDP)

---

## Project Structure

```
COREX-Framework/
├── FXServer/                 # FiveM binary (not in repo — download separately)
├── txData/                   # txAdmin data (not in repo — per-server)
└── server-file/
    ├── server.cfg.example    # Config template (copy to server.cfg)
    └── resources/
        ├── [cfx-default]/    # Default cfx resources
        ├── [standalone]/     # Third-party resources (oxmysql, etc.)
        ├── [assets]/         # Map / prop assets
        └── [corex]/          # COREX framework resources
            ├── corex-core/       # Player, DB, state management
            ├── corex-spawn/      # Character creation & spawn
            ├── corex-inventory/  # Tetris grid inventory
            ├── corex-weather/    # Weather & time
            ├── corex-death/      # Death / respawn
            ├── corex-crafting/   # Crafting system
            ├── corex-hud/        # HUD overlay
            └── corex-events/     # Global event system
```

---

## Core API — Quick Reference

### Server-side

```lua
local player = Corex.Functions.GetPlayer(source)
local name   = player.name
local cash   = player.money.cash

Corex.Functions.AddMoney(source, 'cash', 500)
Corex.Functions.RemoveMoney(source, 'bank', 100)
Corex.Functions.SetMetaData(source, 'hunger', 100)
Corex.Functions.SavePlayer(source)
```

### Client-side

```lua
local data = Corex.Functions.GetPlayerData()
local cash = Corex.Functions.GetMoney('cash')
local skin = Corex.Functions.GetMetaData('skin')
```

### Using COREX from another resource

```lua
-- fxmanifest.lua
dependencies { 'corex-core' }

-- main.lua
local Corex = exports['corex-core']:GetCoreObject()
local player = Corex.Functions.GetPlayer(source)
```

---

## Useful Links

| Resource | Link |
|---|---|
| txAdmin Dashboard (after setup) | <http://localhost:40120/> |
| FXServer Windows Artifacts | <https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/> |
| Cfx.re Keymaster (license keys) | <https://keymaster.fivem.net/> |
| FiveM Docs | <https://docs.fivem.net/> |
| txAdmin Docs | <https://github.com/tabarra/txAdmin> |
| oxmysql Docs | <https://github.com/overextended/oxmysql> |

---

## Development Rules

1. **Never call FiveM natives directly** — use `Corex.Functions.*`
2. **Missing function?** Add it to `corex-core` first, then use it
3. **No duplication** — reuse core logic
4. **Lua 5.4 compliant**, modular, defensive
5. **UI must follow** the Anti-Default Protocol (premium fonts, Bento grid, micro-interactions)

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/my-feature`
3. Follow the architecture rules
4. Commit with conventional style: `feat:`, `fix:`, `refactor:`, `docs:`
5. Open a Pull Request

---

## Troubleshooting

**txAdmin asks to create a new deployment**
→ You picked the wrong option. Go back and choose **Existing Server Data**.

**`Config file detected!` never appears**
→ `server.cfg` isn't in `server-file/`. Make sure you copied `server.cfg.example` to `server.cfg`.

**`oxmysql` fails to connect**
→ Check MySQL is running, the `corex` database exists, and credentials in `mysql_connection_string` are correct.

**Port 30120 already in use**
→ Another FiveM server is running, or change the port in `server.cfg` (`endpoint_add_tcp` / `endpoint_add_udp`).

---

## License

Private repository — all rights reserved until explicitly open-sourced.
