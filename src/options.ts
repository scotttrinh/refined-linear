import { storage } from "./options-storage";

async function init(): Promise<void> {
  const form = document.querySelector('form');
  if (!form) {
    throw new Error('Could not find options form!');
  }

  storage.syncForm(form);
}

init();
