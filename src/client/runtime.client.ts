import { Flamework } from "@flamework/core";

Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/shared/components");


print("Client runtime");
Flamework.ignite();
