---
'@ncstate/sat-popover': patch
---

Stop emitting a spurious `afterClose` when a popover is reopened. The animation state left over from the previous close is now reset before the overlay is attached, so reopening emits only `opened` and `afterOpen`.
