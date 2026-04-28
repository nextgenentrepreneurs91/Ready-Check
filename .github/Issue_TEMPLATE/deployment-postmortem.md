
---
name: Deployment Postmortem
about: Document and review a failed or degraded deployment or release
title: "[POSTMORTEM] "
labels: postmortem, incident
assignees: ""
---

## Summary

Provide a concise overview of the incident, including what failed or degraded and why this postmortem is being created.

---

## Timeline

Detail key events from start to resolution.

- Detection Time:
- Incident Start Time:
- Mitigation Start Time:
- Resolution Time:
- Post-Resolution Monitoring Completed:

### Event Log

| Time | Event |
|------|-------|
|      |       |
|      |       |

---

## Blast Radius

Describe the scope of impact:

- Affected Apps/Services: (e.g., admin, mobile, api-gateway, ai-orchestrator)
- Affected Regions:
- Affected User Roles: (e.g., volunteers, coordinators, NGOs, stakeholders)
- Systems/Workflows Impacted: (e.g., assessments, deployment planning, readiness verification)

---

## User Impact

Describe how users were affected:

- Was deployment blocked or delayed?
- Were readiness decisions incorrect or unavailable?
- Were users given incomplete or incorrect instructions?
- Any degradation in dashboards or coordination visibility?

---

## Root Cause

Explain the underlying cause(s):

- Primary Cause:
- Contributing Factors:
- Why this was not caught earlier:

Avoid blame. Focus on systems, assumptions, and gaps.

---

## Detection

How was the issue detected?

- Monitoring/Alerting:
- User Report:
- Internal Discovery:
- Detection Delay (if any):

---

## Resolution

Describe how the issue was resolved:

- Immediate Mitigation Steps:
- Final Fix:
- Rollback (if applicable):
- Verification of Fix:

---

## Corrective Actions

List concrete actions to prevent recurrence:

- [ ] Code changes
- [ ] Test coverage improvements
- [ ] Monitoring/alerting improvements
- [ ] Documentation updates
- [ ] Process changes

Include owners and timelines:

| Action | Owner | Due Date |
|--------|-------|----------|
|        |       |          |

---

## Follow-up Owners

Assign responsible owners for post-incident tasks:

- Incident Lead:
- Engineering Owner:
- QA/Validation Owner:
- Operations/Coordination Owner:

---

## Lessons Learned

Capture key learnings:

- What worked well?
- What failed or was missing?
- What assumptions were incorrect?
- What should be improved in future deployments?

---

## Readiness / Operational Impact

Assess how this incident affected ReadyCheck’s core mission:

- [ ] Blocked deployment
- [ ] Incorrect readiness status
- [ ] Role misassignment or confusion
- [ ] Missing or incorrect instructions
- [ ] Reduced coordination visibility
- [ ] No direct operational impact

Provide additional details:

---

## Prevention Strategy

Describe long-term improvements:

- System design changes
- Workflow adjustments
- Validation or gating improvements
- AI or decision-support safeguards (if relevant)

---

## Additional Context

Include any logs, diagrams, links, or references that provide further clarity.
