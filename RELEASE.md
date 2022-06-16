<a href="https://postmarkapp.com">
    <img src="https://github.com/ActiveCampaign/postmark.js/raw/main/postmark.png" alt="Postmark Logo" title="Postmark" width="120" height="120" align="right">
</a>

# Release process

When releasing a new version of the library, make sure to follow these steps:

Pre-release recommendations:

* Make sure to check if there are any styling or code errors by running lint tools defined in package.json

Release steps:

1. Make sure the tests pass for your branch in CI 
1. Merge your branch to main
1. Determine the next version of the library by following the [SemVer](https://semver.org/) guidelines
1. Update version in package.json
1. Compile the latest version (details how to run command are in the package.json)
1. Make sure the tests pass locally (details how to run them in the package.json)
1. Update CHANGELOG.md with the latest release details   
1. Compile the docs (details in the package.json - unless it's a very small change)
1. Push the changes to Github and wait for tests to pass in CI
1. Push the changes to NPM with `npm publish`
1. Update any related content in the [Github wiki](https://github.com/ActiveCampaign/postmark.js/wiki)
1. Add release version in the [Github releases](https://github.com/ActiveCampaign/postmark.js/releases) so it has a tag.
