# Reusable company workspace for Claude Code

This is a generic starter, with no Rook company content. Copy this template into a separate company-approved workspace. Rename CLAUDE.template.md to CLAUDE.md and replace every bracketed placeholder. This nested template does not configure the current course project.

## How the course repository works

- Git tracks versions on your computer; GitHub hosts the shared repository and its history.
- README.md is the human entry point.
- AGENTS.md contains assistant instructions and short working context.
- 00-rook/ contains reference documents and the routing code excerpt.
- 01-origin-story/ through 06-sidekicks/ organize activities and prompt libraries.
- .agents/skills/ contains reusable workflows, with scripts for checking and saving.
- .codex/config.toml declares the two fictional Rook MCP connections.
- .gitignore excludes selected local files. It is not access control.
- The course is a PM workspace, not a complete deployed application. Its Python excerpt has unimplemented integration functions.

GitHub does not automatically connect the AI to external documents. Local files, repository access and MCP connections are separate mechanisms.

## Suggested structure for another company

```text
company-product/
├── README.md                   # Purpose, owner, how to start
├── CLAUDE.md                   # Short instructions and durable context
├── .gitignore                  # Exclude credentials and local-only files
├── .mcp.json                   # Optional approved project MCP configuration
├── context/
│   ├── company.md              # Business and product overview
│   ├── people.md               # Owners and responsibilities
│   ├── glossary.md             # Company vocabulary
│   └── source-index.md         # Links/paths, dates, owners, access limits
├── sources/
│   ├── research/               # Approved interviews and research
│   ├── product/                # Roadmaps, handovers, requirements
│   ├── data/                   # Approved exports and metric definitions
│   └── engineering/            # Architecture notes or code references
├── work/
│   └── initiative-name/
│       ├── brief.md
│       ├── prompts.md
│       └── findings.md
├── decisions/
│   └── decision-log.md         # Decision, date, owner, evidence, rationale
├── outputs/                   # Briefs, diagrams and prototypes
├── sessions/                  # Dated handovers and next steps
└── .claude/
    └── skills/                # Optional reusable Claude Code workflows
```

Start with README.md, CLAUDE.md, context/, work/ and outputs/. Add the rest when useful. Empty folders do not appear in Git unless they contain a tracked file.

For an actual software project, keep the team's existing src/, tests/ and build files; add this PM structure alongside them rather than moving application code.

## What changes for Claude Code

CLAUDE.md is the project instruction file. Reusable project skills can live in .claude/skills/<skill-name>/SKILL.md. Project-scoped MCP configuration lives in .mcp.json; connect and authorize each service separately. Do not copy the course's Rook endpoints, GitHub helper scripts or approval rules into a real company project.

If using ordinary Claude chat instead of Claude Code, treat this as a content organization template; do not assume local files or configuration are automatically loaded.

## GitHub workflow

1. Create a separate company-approved repository for each company/product. Use the organization's required visibility and access controls; the course's Public requirement does not apply.
2. Add this starter and replace placeholders with approved company context.
3. Add source links first; include document copies only when permitted. A link does not grant Claude access.
4. Open the project in Claude Code and ask it to read CLAUDE.md and the source index.
5. Work on one initiative at a time, reviewing diffs before saving.
6. Commit a meaningful checkpoint; push to the verified company repository. Use pull requests if the team requires review.

A commit records a local version. A push sends commits to GitHub. A pull brings remote changes onto your computer. An MCP connector lets Claude access an external tool under your account's permissions.

## First prompt to use in the new workspace

> Read CLAUDE.md and context/source-index.md. Tell me what this product does, who the users and decision owners are, which sources you can actually access, and what is missing. Separate facts from assumptions. Then propose the next three useful tasks. Do not edit source documents or publish anything.

## Optional repeatable workflows

Once the basics work, create company-specific skills for research synthesis, product briefs and session wrap-up. Define the trigger, inputs, output location, evidence requirements and approval boundaries for each. This starter does not install those skills.

## Official Claude Code references

- Instructions: https://code.claude.com/docs/en/memory
- Skills: https://code.claude.com/docs/en/skills
- MCP: https://code.claude.com/docs/en/mcp
