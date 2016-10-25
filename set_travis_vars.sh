echo "Clearing Environment Variables"
travis env clear --no-interactive
echo "Setting Variables"
jq -r '. | to_entries[] | "travis env set \(.key) \(.value) --no-interactive --private\n"' testing_keys.json | bash
echo "Variables set:"
travis env list
