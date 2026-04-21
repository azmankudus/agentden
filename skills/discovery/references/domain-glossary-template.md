# Domain Glossary & Entity Model Template

## Domain Entities

| Entity | Description | Key Attributes | Lifecycle |
|--------|-------------|----------------|-----------|
| [Entity Name] | [What it represents in the business domain] | [Comma-separated key fields] | [States it goes through] |

### Entity: [Name]

**Description:** [Business definition — what this entity represents]

**Attributes:**

| Attribute | Type | Required | Unique | Description | Business Rules |
|-----------|------|----------|--------|-------------|---------------|
| id | UUID | Yes | Yes | Primary key | Auto-generated |
| | | | | | |

**Value Objects:**

| Value Object | Attributes | Description |
|-------------|------------|-------------|
| [Name] | [Attributes] | [Description] |

**Enumerations:**

| Enum | Values | Default | Description |
|------|--------|---------|-------------|
| [EnumName] | VALUE_A, VALUE_B, VALUE_C | VALUE_A | [When each value applies] |

---

## Entity Relationships

```
[EntityA] ──1:1──▶ [EntityB]
[EntityA] ──1:N──▶ [EntityC]
[EntityA] ──N:M──▶ [EntityD] (via [JunctionEntity])
```

### Relationship Details

| From Entity | To Entity | Cardinality | Foreign Key | Cascade | Description |
|-------------|-----------|-------------|-------------|---------|-------------|
| [EntityA] | [EntityB] | 1:N | [entity_a_id] on EntityB | DELETE cascade? | [Business meaning] |

---

## Domain Glossary

### Core Terms

| Term | Definition | Also Known As | Do Not Confuse With |
|------|-----------|---------------|---------------------|
| | [Precise, unambiguous definition] | [Aliases] | [Similar but distinct terms] |

### Acronyms

| Acronym | Expansion | Context |
|---------|-----------|---------|
| | | |

### Reserved Terms

Terms with specific meaning in this domain that should NOT be used loosely:

| Term | Approved Usage | Incorrect Usage |
|------|---------------|-----------------|
| | | |

---

## Workflows

### Workflow: [Name]

**Description:** [What this workflow accomplishes]

**Participants:** [Roles/personas involved]

**Trigger:** [What starts this workflow]

**End State:** [What constitutes completion]

```
State Diagram:

[Start] ──▶ [State 1] ──▶ [State 2] ──▶ [State 3] ──▶ [End]
                │              │
                │              └──▶ [Error State]
                └──▶ [Cancel State]
```

### Transitions

| From | To | Trigger | Actor | Guard Condition | Side Effects |
|------|----|---------|-------|-----------------|-------------|
| | | [Event/action] | [Who/what initiates] | [What must be true] | [What else happens] |

### Business Rules Enforced

| Rule ID | Rule | Enforced At Transition |
|---------|------|----------------------|
| | | |

---

## Aggregate Roots

Identify aggregate roots (transaction boundaries):

| Aggregate Root | Contains | Invariant | Consistency Rule |
|---------------|----------|-----------|-----------------|
| [Root Entity] | [Contained entities] | [What must always be true] | [Immediate vs eventual consistency] |

---

## Events

### Domain Events

| Event | Emitted By | Payload | Subscribers | Purpose |
|-------|-----------|---------|-------------|---------|
| [EventName] | [Entity] | [Data carried] | [Who listens] | [Why it matters] |

### Integration Events

| Event | Direction | Format | Transport | Contract |
|-------|-----------|--------|-----------|----------|
| | Inbound/Outbound | JSON/Protobuf | HTTP/MQ/Webhook | [Schema reference] |
