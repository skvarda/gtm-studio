**Art Direction — Round 25** is written to `/home/gtm/docs/art-direction-round25.md`.

Key decisions:

- **Ping pong table** is 32x16px (2 tiles wide), flat 3/4 view with a single net stripe and corner leg dots. Green surface (`#3d9e4a`) with dark edge shadow — reads instantly at 16px tile scale.
- **Palette** keeps the existing navy/tan office warmth. Added `ppGreen` family for the table plus `textYellow`/`textRed` for buff/debuff dialog so the player reads the consequence immediately.
- **Text rendering** is specified precisely for the Programmer: `Math.round()` on all coordinates, dark `bgDark` shadow pass drawn 1px offset before the main color, 8px minimum font size, `imageSmoothingEnabled = false` hardened.
- **Employee reaction states** are sprite-level simple — a 1px slump for the debuffed dev, a 2-frame collar shimmer for the hyped salesperson. Low implementation cost, high readability.
- **Visual gag:** A ping pong paddle sits on the co-founder's desk. He never touches it. Feeds the mystery arc without any extra code.