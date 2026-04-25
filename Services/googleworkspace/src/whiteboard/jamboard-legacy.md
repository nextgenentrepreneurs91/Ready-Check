### services/google-workspace/src/whiteboard/jamboard-legacy.md
```markdown
/**
 * ============================================================
 * FILE: services/google-workspace/src/whiteboard/jamboard-legacy.md
 * ============================================================
 */

# ENGINEERING NOTE: Jamboard Lifecycle & Migration

## STATUS: LEGACY / DEPRECATED
Jamboard logic within the ReadyCheck ecosystem is preserved for regional partners still using legacy hardware. However, due to Google's public sunset of the Jamboard application (Oct 2024), we no longer support the `.jamb` export format for mission debriefs.

## STRATEGIC DIRECTION
The `IWhiteboardAdapter` contract was specifically designed to decouple ReadyCheck's planning engine from these sunsetting services. 

1. **Preference:** FigJam or Lucidspark are the primary recommendation for the "Mission Hub" visual.
2. **Compatibility:** Ensure all "Action Cards" and "Hazard Markers" types remain generic strings in the adapter layer to allow for varied canvas APIs.
3. **Migration:** Partners on legacy hardware should transition to the FigJam web-client or Miro's interactive board view for real-time mission synchronization.

## MAINTENANCE GUIDANCE
- Do NOT implement new feature sets for Jamboard.
- All "Regional Memory" exports from Jamboard should be converted to PDF summaries immediately to ensure historical data persistence.
```
