#!/bin/bash

echo -e "\033[33mAdding all changes to git...\033[0m"
git add .

echo -e "\033[33mCommitting changes...\033[0m"
git commit -m "feat: implement advanced auto-skip with Chrome Debugger Protocol

- Add Chrome Debugger Protocol (CDP) for trusted mouse events
- Implement Shadow DOM traversal for robust button detection
- Add element readiness validation with CSS properties
- Include 4 advanced click methods with proper timing
- Fix debugger attach/detach connection issues
- Add comprehensive error handling and state tracking
- Support multiple button selectors for YouTube variations
- Optimize MutationObserver for instant button detection
- Add fallback interval for edge cases
- Improve TypeScript type safety throughout"

echo -e "\033[33mPushing to remote repository...\033[0m"
git push

echo -e "\033[32mDone! Changes pushed successfully.\033[0m"
