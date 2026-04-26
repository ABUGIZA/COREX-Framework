# COREX Framework

> Modern FiveM Zombie-Survival framework — Lua 5.4, oxmysql, StateBag sync.

- 📖 **Full Documentation:** <https://corex-zombies.gitbook.io/corex-docs>
- 💬 **Discord Community:** <https://discord.gg/G95rtnb9sg>

---

## ⚡ Install COREX in One Click

The recommended way to deploy a full COREX server is through the **txAdmin recipe**. It downloads every resource, sets up the database, and pre-configures `server.cfg` for you.

👉 **Full step-by-step guide + video tutorial:**
**<https://github.com/corex-zombies/txAdminRecipe>**

```
https://raw.githubusercontent.com/corex-zombies/txAdminRecipe/main/corex.yaml
```

Paste that URL into the **Remote URL Template** field in the txAdmin setup wizard.

---

## 🎬 Video Tutorial

[![Watch the install video](https://img.youtube.com/vi/Y7mIvYN7gVo/maxresdefault.jpg)](https://youtu.be/Y7mIvYN7gVo)

▶ <https://youtu.be/Y7mIvYN7gVo>

---

## Individual Script Repositories

Every COREX script lives in its own repo under [`corex-zombies`](https://github.com/corex-zombies). Update a single script without pulling the whole framework.

| Script | Repository |
|---|---|
| `corex-core`       | <https://github.com/corex-zombies/corex-core> |
| `corex-spawn`      | <https://github.com/corex-zombies/corex-spawn> |
| `corex-death`      | <https://github.com/corex-zombies/corex-death> |
| `corex-hud`        | <https://github.com/corex-zombies/corex-hud> |
| `corex-survival`   | <https://github.com/corex-zombies/corex-survival> |
| `corex-inventory`  | <https://github.com/corex-zombies/corex-inventory> |
| `corex-crafting`   | <https://github.com/corex-zombies/corex-crafting> |
| `corex-notify`     | <https://github.com/corex-zombies/corex-notify> |
| `corex-events`     | <https://github.com/corex-zombies/corex-events> |
| `corex-weather`    | <https://github.com/corex-zombies/corex-weather> |
| `corex-zombies`    | <https://github.com/corex-zombies/corex-zombies> |
| `corex-zones`      | <https://github.com/corex-zombies/corex-zones> |
| `corex-redzones`   | <https://github.com/corex-zombies/corex-redzones> |
| `corex-loot`       | <https://github.com/corex-zombies/corex-loot> |

---

## API — Quick Reference

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

## License
Released under the [MIT License](LICENSE).
