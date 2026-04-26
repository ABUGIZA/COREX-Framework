# COREX Framework

> FiveM Zombie-Survival framework — Lua 5.4, oxmysql, StateBag sync.

- 📖 **Full Documentation:** <https://corex-zombies.gitbook.io/corex-docs>
- 💬 **Discord Community:** <https://discord.gg/G95rtnb9sg>

## Individual Script Repositories

Each COREX script also lives in its own dedicated repo under the [`corex-zombies`](https://github.com/corex-zombies) organization. If you only want to update a single script, grab the latest version from its repo instead of pulling the whole framework:

| Script | Repository |
|---|---|
| `corex-core`       | <https://github.com/corex-zombies/corex-core> |
| `corex-spawn`      | <https://github.com/corex-zombies/corex-spawn> |
| `corex-inventory`  | <https://github.com/corex-zombies/corex-inventory> |
| `corex-weather`    | <https://github.com/corex-zombies/corex-weather> |
| `corex-death`      | <https://github.com/corex-zombies/corex-death> |
| `corex-crafting`   | <https://github.com/corex-zombies/corex-crafting> |
| `corex-hud`        | <https://github.com/corex-zombies/corex-hud> |
| `corex-events`     | <https://github.com/corex-zombies/corex-events> |
| `corex-loot`       | <https://github.com/corex-zombies/corex-loot> |
| `corex-notify`     | <https://github.com/corex-zombies/corex-notify> |
| `corex-redzones`   | <https://github.com/corex-zombies/corex-redzones> |
| `corex-survival`   | <https://github.com/corex-zombies/corex-survival> |
| `corex-zombies`    | <https://github.com/corex-zombies/corex-zombies> |
| `corex-zones`      | <https://github.com/corex-zombies/corex-zones> |

> The monorepo stays in sync automatically — any change pushed to an individual repo is mirrored here within seconds.

---

## 🎬 Video Tutorial

Full install & run walkthrough:

[![Watch the video](https://img.youtube.com/vi/vSct4sr6mgs/maxresdefault.jpg)](https://youtu.be/vSct4sr6mgs)

▶ <https://youtu.be/vSct4sr6mgs>

---

## ⚡ One-Click Install (txAdmin Recipe)

Skip the manual setup entirely. In **txAdmin** setup wizard:

1. **Deployment Type** → `Remote URL Template`
2. Paste this URL:
   ```
   https://raw.githubusercontent.com/corex-zombies/txAdminRecipe/main/corex.yaml
   ```
3. Click **Next** — txAdmin downloads everything, sets up the database, and configures `server.cfg` automatically.

After install, just open `server.cfg` and set your `sv_licenseKey` and `mysql_connection_string`.

Recipe repo: <https://github.com/corex-zombies/txAdminRecipe>

---

## Quick Start

### 1. Clone
```bash
git clone https://github.com/ABUGIZA/COREX-Framework.git
cd COREX-Framework
```

### 2. Download FXServer
Get the latest Windows build → <https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/>
Extract into `FXServer/` at the project root.

### 3. Create `server.cfg`
```bash
cd server-file
copy server.cfg.example server.cfg
```
Edit and set:
- `sv_licenseKey` → <https://keymaster.fivem.net/>
- `mysql_connection_string` → pick the format that matches your MySQL setup:

**A) MySQL WITH a password** (most production setups, MySQL Workbench, remote hosts)
```cfg
set mysql_connection_string "mysql://root:YOUR_PASSWORD@localhost/corex?charset=utf8mb4"
```
Example with a real password:
```cfg
set mysql_connection_string "mysql://root:A11223344@localhost/corex?charset=utf8mb4"
```

**B) MySQL WITHOUT a password** (XAMPP / Laragon / WAMP default root user)
```cfg
set mysql_connection_string "mysql://root@localhost/corex?charset=utf8mb4"
```

> Notice there is **no colon and no password** after `root` in option B.
> Use this only if your `root` user has an empty password.

### 4. Create the database

Run this SQL once in your MySQL client (HeidiSQL / phpMyAdmin / CLI):

```sql
CREATE DATABASE IF NOT EXISTS `corex`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `corex`;

CREATE TABLE IF NOT EXISTS `players` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(60) NOT NULL,
    `name` VARCHAR(50) NOT NULL DEFAULT 'Unknown',
    `money` LONGTEXT NOT NULL,
    `metadata` LONGTEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `identifier` (`identifier`),
    KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `inventories` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(60) NOT NULL,
    `inventory_type` VARCHAR(50) NOT NULL DEFAULT 'player',
    `inventory_id` VARCHAR(60) NOT NULL,
    `items` LONGTEXT NOT NULL,
    `hotbar` LONGTEXT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_inventory` (`identifier`, `inventory_type`, `inventory_id`),
    KEY `idx_inventory_lookup` (`identifier`, `inventory_type`),
    KEY `idx_inventory_id` (`inventory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 5. Start FXServer
Double-click `FXServer/FXServer.exe`.

---

## 🖥️ How to Open txAdmin

txAdmin runs **locally on your own PC** as soon as you start FXServer. There is no public website — you open it through your browser at:

### 👉 http://localhost:40120

**Steps:**
1. Run `FXServer.exe` (a console window opens — keep it running).
2. The console prints:
   ```
   All ready! Please access:
     http://localhost:40120/
   ```
3. Open that URL in any browser (Chrome / Firefox / Edge).
4. First time only — set a PIN, link Cfx.re, and finish the setup wizard.

> **Useful:** bookmark <http://localhost:40120/> in your browser so you can open txAdmin in one click.

Official txAdmin site & docs: <https://github.com/citizenfx/txAdmin>

---

## txAdmin Setup Wizard (first run)

1. Set PIN → link Cfx.re (or local admin)
2. **Deployment Type:** `Existing Server Data`
3. **Server Data Folder:** `C:\COREX_Framework\server-file`
4. **CFG File:** `server.cfg`
5. Save → click **Start Server**

---

## API

### Server
```lua
local player = Corex.Functions.GetPlayer(source)
Corex.Functions.AddMoney(source, 'cash', 500)
Corex.Functions.SetMetaData(source, 'hunger', 100)
Corex.Functions.SavePlayer(source)
```

### Client
```lua
local data = Corex.Functions.GetPlayerData()
local cash = Corex.Functions.GetMoney('cash')
```

### From another resource
```lua
-- fxmanifest.lua
dependencies { 'corex-core' }

-- main.lua
local Corex = exports['corex-core']:GetCoreObject()
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| txAdmin asks for a new deployment | Choose **Existing Server Data** instead |
| `Config file detected` not showing | Copy `server.cfg.example` → `server.cfg` first |
| oxmysql connection fails | Check MySQL is running + credentials in `server.cfg` |
| Port 30120 in use | Close other FiveM server or change port in `server.cfg` |

---

## License
Released under the [MIT License](LICENSE).
