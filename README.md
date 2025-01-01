# Roblox Trading Card Game

This is an attempt at a custom trading card game developed for Roblox, with mechanics inspired by recently released Pokemon TCGP and Card Wars from Adventure Time. 

**Uses many features of the [this](https://github.com/christopher-buss/roblox-ts-project-template) project template by [christopher-buss](https://github.com/christopher-buss)**. I use it for file/data structure inspiration and understanding the Roblox lifecycle.

## Current Tech Stack
This is my first time developing for Roblox so the tech stack is just mangled together from what I could find in sample projects and the roblox-ts discord. Who needs to know Lua? Not me. Not even a little bit. I mean, TypeScript is just objectively better: look at the packages, the frameworks, the community... even without that, you think I would pass up type and null (kind of) safety?

### Tools
- [roblox-ts](https://roblox-ts.com/): TS to Luau transpiler
- [rojo](https://rojo.space): Locally hosted server that optimizes and modularizes Luau

### Packages
- [Flamework](https://flamework.fireboltofdeath.dev/): Development framework with many useful abstractions
- [Lapis](https://nezuo.github.io/lapis/): Datastore abstraction
- [React](https://www.npmjs.com/package/@rbxts/react): Reactive UI library/framework
- [Ripple](https://github.com/littensy/ripple): UI motion library for React
- [Reflex](https://littensy.github.io/reflex/docs/guides/): Immutable state management using producers

I might look into other tools as the project progresses. So far I know about [Charm](https://github.com/littensy/charm-example/) as an alternative to Reflex using atoms instead of producers, and [Vide](https://github.com/littensy/vide) as a possible additional UI library.
