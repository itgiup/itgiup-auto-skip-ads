#!/bin/bash

echo -e "\033[33mAdding all changes to git...\033[0m"
git add .

echo -e "\033[33mCommitting changes...\033[0m"
git commit -m "feat: implement advanced auto-skip ad functionality

- Add Shadow DOM traversal for YouTube button detection
- Implement element readiness check with CSS properties validation
- Add 4 advanced click methods with timing delays
- Include direct click, focus+enter, mouse sequence, and event chain
- Add comprehensive error handling and debug logging
- Support multiple button selectors for robustness
- Fix TypeScript type safety for DOM manipulation
- Optimize timing for YouTube ad skip button interaction"

echo -e "\033[33mPushing to remote repository...\033[0m"
git push

echo -e "\033[32mDone! Changes pushed successfully.\033[0m"
