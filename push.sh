#!/bin/bash

echo "Adding all changes to git..."
git add .

echo "Committing changes..."
git commit -m "feat: implement dark/light theme support

- Add theme selection with Light/Dark/System options
- Implement Ant Design dark algorithm for proper theming
- Add CSS custom properties for full popup background
- Update popup.html with theme-aware styles
- Add theme translations for all 4 languages
- Fix background color issues in dark mode
- Ensure complete theme coverage for all UI elements"

echo "Pushing to remote repository..."
git push

echo "Done! Changes pushed successfully."
