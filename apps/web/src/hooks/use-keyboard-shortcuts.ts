import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  handler: () => void;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  /** If true, also fires when focus is in an input/textarea. Default: false */
  enableInInputs?: boolean;
}

function isInteractiveElement(element: Element | null): boolean {
  if (!element) return false;

  const tagName = element.tagName.toLowerCase();
  if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
    return true;
  }
  if (element.getAttribute('contenteditable') === 'true') {
    return true;
  }

  // Radix UI interactive elements (popovers, dialogs, listboxes)
  const role = element.getAttribute('role');
  if (role === 'dialog' || role === 'listbox' || role === 'combobox') {
    return true;
  }
  if (element.closest('[data-radix-popper-content-wrapper]')) {
    return true;
  }

  return false;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) return;

      for (const shortcut of shortcuts) {
        const keyMatch =
          event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = !!shortcut.ctrlKey === event.ctrlKey;
        const metaMatch = !!shortcut.metaKey === event.metaKey;
        const shiftMatch = !!shortcut.shiftKey === event.shiftKey;
        const altMatch = !!shortcut.altKey === event.altKey;

        if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
          if (
            !shortcut.enableInInputs &&
            isInteractiveElement(document.activeElement)
          ) {
            return;
          }
          event.preventDefault();
          shortcut.handler();
          return;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
