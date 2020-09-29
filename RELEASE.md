<a href="https://postmarkapp.com">
    <img src="https://github.com/wildbit/postmark.js/raw/master/postmark.png" alt="Postmark Logo" title="Postmark" width="120" height="120" align="right">
</a>

# Release process

When releasing a new version of the library, make sure to follow these steps:

Pre-release recommendations:

* Make sure to check if there are any styling or code errors by running lint tools defined in package.json

Release steps:

1. Merge your branch to master
2. Update version in package.json
3. Compile latest version (details how to run in package.json)
4. Make sure tests pass (details how to run in package.json)
5. Compile the docs (details in the package.json - unless it's a very small change) 
6. Push the changes to Github and wait for tests to pass
7. Push the changes to NPM with `npm publish`
8. Update any related content in the [Github wiki](https://github.com/wildbit/postmark.js/wiki)
9. Add release version in the [Github releases](https://github.com/wildbit/postmark.js/releases)
