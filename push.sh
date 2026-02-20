#!/bin/bash

echo "Adding all changes to git..."
git add .

echo "Committing changes..."
git commit -m "feat: add multi-language support with 4 languages

- Add English, Vietnamese, Chinese, Russian support
- Fix language dropdown to show native language names
- Improve UI layout with better alignment
- Add language icons for better UX
- Optimize webpack configuration for better performance"

echo "Pushing to remote repository..."
git push

echo "Done! Changes pushed successfully."
