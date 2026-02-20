#!/bin/bash

echo -e "\033[33mAdding all changes to git...\033[0m"
git add .

echo -e "\033[33mCommitting changes...\033[0m"
git commit -m "feat: implement dark/light theme support

- Add theme selection with Light/Dark/System options
- Implement Ant Design dark algorithm for proper theming
- Add CSS custom properties for full popup background
- Update popup.html with theme-aware styles
- Add theme translations for all 4 languages
- Fix background color issues in dark mode
- Ensure complete theme coverage for all UI elements"

echo -e "\033[33mPushing to remote repository...\033[0m"
git push

echo -e "\033[32mDone! Changes pushed successfully.\033[0m"
