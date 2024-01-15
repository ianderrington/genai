# Clean up all incorrect arxiv references to abstract instead of the pdf directly. 
find . -type f -name '*.md' -exec sed -i '' 's|https://arxiv.org/abs/\([^)]*\)|https://arxiv.org/pdf/\1.pdf|g' {} +
