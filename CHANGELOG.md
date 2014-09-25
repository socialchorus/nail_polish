Change Log
==========

## 0.4.1 - 2014-09-25

### Fixed
- Removed accidentally forgotten inline overlay style for stackable modals, causing much lighter overlay color.

## 0.4.0 - 2014-09-24

### Changed
- Removed z-index from NailPolish.Widget.Modal `#overlay`. *The `#overlay` div should be moved to the bottom of the page!*

### Added
- NailPolish.Widget.StackableModal

## 0.3.0 - 2014-09-10

### Changed
- Not replacing `click` events with `touchstart` anymore for touch devices (fixes scrolling/click issues).
