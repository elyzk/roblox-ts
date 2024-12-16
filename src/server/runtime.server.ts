import { Flamework } from "@flamework/core";

Flamework.addPaths("src/server/components");
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");

print("Server runtime");
Flamework.ignite();
