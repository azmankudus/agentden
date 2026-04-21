# Documentation Lint Rules Reference

Detailed linting rules for all Markdown documentation. Used by `/docs validate` and `/docs health`.

---

## Rule Set

### DL-001: ATX Headers

**Requirement:** Use `#` style headers (ATX), never Setext (underlines).

**Rationale:** ATX headers are consistent, support all levels, and are easier to maintain.

```markdown
<!-- PASS -->
# Document Title
## Section
### Subsection

<!-- FAIL -->
Document Title
==============
Section
-------
```

**Auto-fix:** Replace Setext underlines with `#` prefix (level 1 → `#`, level 2 → `##`).

---

### DL-002: Dash Lists

**Requirement:** Use `-` (dash) for unordered lists, not `*` or `+`.

**Rationale:** Consistency. Dash is the most common Markdown list marker.

```markdown
<!-- PASS -->
- First item
- Second item
  - Nested item

<!-- FAIL -->
* First item
+ Second item
```

**Auto-fix:** Replace `*` and `+` at list start with `-`.

---

### DL-003: 2-Space Indent

**Requirement:** Indent nested content with 2 spaces per level.

**Rationale:** Consistency with code conventions. 2 spaces is standard for Markdown nesting.

```markdown
<!-- PASS -->
- Item one
  - Nested (2 spaces)
    - Deep nested (4 spaces)

<!-- FAIL -->
- Item one
    - Nested (4 spaces)
	- Deep nested (tab)
```

**Auto-fix:** Convert tabs to spaces, normalize to 2-space increments.

---

### DL-004: 120-Character Line Width

**Requirement:** Lines must not exceed 120 characters.

**Exceptions:** URLs, code blocks, table rows.

**Rationale:** Readability in terminals and editors. Git diff friendliness.

```markdown
<!-- PASS -->
This paragraph stays within the 120 character limit and
wraps naturally in the editor.

<!-- FAIL -->
This is a very long line that exceeds one hundred and twenty characters and should be broken into multiple lines for readability in any text editor or terminal window.
```

**Auto-fix:** Break long lines at sentence boundaries or natural break points.

---

### DL-005: Single H1

**Requirement:** Exactly one top-level heading (`#`) per file.

**Rationale:** Document structure clarity. Single title per document.

```markdown
<!-- PASS -->
# Document Title

## Section One
## Section Two

<!-- FAIL -->
# Document Title
## Section One
# Another Title
```

**Auto-fix:** Change subsequent `#` to `##` or lower.

---

### DL-006: Fenced Code Blocks

**Requirement:** Use triple backticks with language identifier.

**Rationale:** Syntax highlighting, readability, consistency.

````markdown
<!-- PASS -->
```java
public record User(UUID id, String name) {}
```

<!-- FAIL -->
    public record User(UUID id, String name) {}

```
public record User(UUID id, String name) {}
```
````

**Auto-fix:** Convert indented code blocks to fenced. Add language identifier if detectable.

---

### DL-007: Trailing Whitespace

**Requirement:** No trailing whitespace on any line.

**Rationale:** Clean diffs. Prevents accidental formatting issues.

**Auto-fix:** Strip trailing whitespace from all lines.

---

### DL-008: Final Newline

**Requirement:** File ends with a single newline character.

**Rationale:** POSIX compliance. Clean git diffs.

**Auto-fix:** Ensure file ends with `\n`. Remove multiple trailing newlines.

---

### DL-009: No Raw HTML

**Requirement:** No raw HTML in Markdown (except inside code blocks).

**Severity:** Warning

**Rationale:** Markdown should be portable. Use Markdown constructs instead.

```markdown
<!-- PASS -->
**Bold text** and [a link](https://example.com)

<!-- FAIL -->
<b>Bold text</b> and <a href="https://example.com">a link</a>
```

**Exceptions:** `<br>` for line breaks in tables, `<details>/<summary>` for collapsible sections.

---

### DL-010: No Broken Links

**Requirement:** All internal links must resolve to existing files.

**Rationale:** Trustworthiness. Readers expect links to work.

```markdown
<!-- PASS -->
[Architecture](./01-architecture/system-overview.md)

<!-- FAIL -->
[Architecture](./01-architecture/nonexistent.md)
```

**Auto-fix:** Cannot auto-fix. Report broken links for manual correction.

---

### DL-011: Consistent Header Casing

**Requirement:** Use sentence case for headers (capitalize first word and proper nouns only).

**Severity:** Warning

**Rationale:** Readability and consistency.

```markdown
<!-- PASS -->
## Getting started with SolidJS
## API reference

<!-- FAIL -->
## Getting Started With SolidJS
## API Reference
```

**Exceptions:** Proper nouns (SolidJS, Micronaut, TypeScript), acronyms (API, JWT, HTTP).

---

### DL-012: No TBD/TODO

**Requirement:** No unresolved markers (TODO, TBD, FIXME, XXX).

**Severity:** Warning

**Rationale:** Committed documentation should be complete.

```markdown
<!-- PASS -->
[Resolved description]

<!-- FAIL -->
TBD: [need to fill this in]
TODO: [complete later]
FIXME: [known issue]
```

**Auto-fix:** Cannot auto-fix. Report for manual resolution.

---

### DL-013: Badge Format

**Requirement:** Shields.io badges use standard format.

**Severity:** Warning

```markdown
<!-- PASS -->
[![Status](https://img.shields.io/badge/status-draft-yellow)]()

<!-- FAIL -->
![Status](https://img.shields.io/badge/status-draft-yellow)
[Status](https://img.shields.io/badge/status-draft-yellow)
```

**Auto-fix:** Wrap in link syntax with `()` href.

---

### DL-014: No Hardcoded Secrets

**Requirement:** No API keys, passwords, tokens, or connection strings.

**Severity:** Error (Critical)

**Rationale:** Security.

```markdown
<!-- PASS -->
DATABASE_URL=${DATABASE_URL}
api-key: ${API_KEY}

<!-- FAIL -->
DATABASE_URL=jdbc:postgresql://prod-db:5432/app?password=secret123
api-key: sk-1234567890abcdef
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

**Patterns to detect:**
- Passwords in connection strings
- Bearer tokens / JWTs
- API keys starting with common prefixes (`sk-`, `pk_`, `key-`)
- Private keys (BEGIN PRIVATE KEY)
- AWS keys (AKIA...)

---

### DL-015: Table Alignment

**Requirement:** Pipe tables have consistent column alignment.

**Severity:** Warning

```markdown
<!-- PASS -->
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |

<!-- FAIL -->
| Header 1 | Header 2 | Header 3 |
|---|---|---|
| Cell 1 | Cell 2 | Cell 3 |
```

**Auto-fix:** Align pipe delimiters and pad cell content.

---

## Severity Levels

| Level | Meaning | Action |
|-------|---------|--------|
| Error | Must fix before merge | Block PR |
| Warning | Should fix | Show in report, non-blocking |

## Rules by Severity

### Errors (must fix)
- DL-001: ATX headers
- DL-002: Dash lists
- DL-003: 2-space indent
- DL-005: Single H1
- DL-006: Fenced code blocks
- DL-007: Trailing whitespace
- DL-008: Final newline
- DL-010: No broken links
- DL-014: No hardcoded secrets

### Warnings (should fix)
- DL-004: 120-char line width
- DL-009: No raw HTML
- DL-011: Consistent header casing
- DL-012: No TBD/TODO
- DL-013: Badge format
- DL-015: Table alignment
