<img align=center src=https://cloud.githubusercontent.com/assets/4116708/12473911/e67fdd44-c016-11e5-9c21-5714e07549fe.png width=450 />

*Passionate programmers standing to make a change*

---

# Howto
## Installing
`brew install imagemagick`
`npm install`

## Developing
npm run dev

#Deploying

## Production
`build/deploy_to_production.sh` deploys the `master` branch to http://www.codestar.nl.

This script pushes the compiled website to [this repository](https://github.com/OrdinaNederland/OrdinaNederland.github.io#master), make sure you have write access to it.

## Test
`build/deploy_to_test.sh` deploys your current branch to http://www.codestar.nl/codestar-website

This script compiles your current branch and commits that to the `gh-pages` branch of this repository.

#Development

Our base branch is develop, from there we create feature branches.
We create pull requests from these feature branches.
The master branch represents the stable version deployed to http://www.codestar.nl

For issues see: https://github.com/OrdinaNederland/codestar-website/issues

# Website
