Written to `/home/gtm/docs/scope-round25.md`.

**The call:**

The interaction system is the whole round — the other two items (ping pong table, text rendering) are low-complexity polish that ship alongside it without competing for attention. Everything else is deferred or cut hard.

The one risk worth flagging before implementation starts: the visual bubble persistence needs a careful look at the existing `gameState` machine. Dialog states can clobber overlay sprites if the transitions aren't accounted for — that's the most likely place to lose a day. Audit that first.