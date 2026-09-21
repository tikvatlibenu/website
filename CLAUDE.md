# tikvatlibenu-website

Client: Tikvatlibenu

## Project context (added by OTW Project Launcher)

When designing or building this project, read and follow:

- Build prompt: `.claude/build-prompt.md` — the intended scope for this project.

## Git: always commit and push as Tikvatlibenu

Vercel only builds commits it can attribute to a project member. A commit
authored as anyone else is pushed but never deployed, so the branch silently
falls behind the live site.

Every commit on this repository must be authored **and** committed as:

```
Tikvatlibenu <tikvatlibenu@users.noreply.github.com>
```

The repository-local git config is set to this identity, so a plain
`git commit` is already correct — verify with `git config user.name`, and
check `git log -1 --format='%an <%ae> | %cn <%ce>'` after committing. Never
override it with `--author`, `-c user.name=...`, or a global config.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
