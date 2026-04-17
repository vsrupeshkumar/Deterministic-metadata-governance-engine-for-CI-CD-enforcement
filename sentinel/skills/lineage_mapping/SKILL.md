# Skill

## Purpose
Implements dynamic governance skills and assessments defined in SKILL.md.

## Scope
Relates to the `sentinel` subsystem.



## Purpose
Extracts a structured summary of downstream dependencies from the
OpenMetadata lineage graph. Always active — lineage context is
universally useful for governance decisions.

## Activation
Always applicable (returns ``True`` for any context).

## Output
```json
{
  "downstream_count": 5,
  "downstream_nodes": [
    {"name": "analytics.orders_daily", "type": "table"},
    {"name": "dashboard.sales_overview", "type": "dashboard"}
  ]
}
```

