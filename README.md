[![Build Status](https://travis-ci.org/code-star/codestar-website.svg?branch=develop)](https://travis-ci.org/code-star/codestar-website)

<img align=center src=https://cloud.githubusercontent.com/assets/4116708/12473911/e67fdd44-c016-11e5-9c21-5714e07549fe.png width=450 />

*Passionate programmers standing to make a change*

---

# Github and branches

**Pay attention!** The default branch is `develop` on Github. This is mainly to prevent default Pull Requests directly mutating our `master` branch, which reflects the production environment.
Read more about developing under `Development` in this Readme.

# Howto

## Installing / Upgrading

// TODO
* update outdated npm packages
* karma via webpack?


Install node 8.2.1 and npm 5.3.0

`npm update`

`npm install`

## Developing

`npm run dev`

After running this command the website is running locally at `http://localhost:8080`.

## Add a team member

Keep in mind the way of working around branching.

* Add an object to the array in app/data/team.json with these properties:
```JavaScript
{
    "name": "FirstName",
    "job": "Front-end Developer",
    "tagline": "“A tagline”",
    "bio": "A bio",
    "image": "image_name.jpg"
}
```
* Add an image with the name specified in the object under app/img/Team. At least JPEG and PNG work. A resolution of 144 x 144px is adequate.

# Development

Our base branch is develop, from there we create feature branches.  
We create pull requests from these feature branches.  
The master branch represents the stable version deployed to http://www.codestar.nl

To make changes:

1. Checkout develop branch
2. Create new feature branch
3. Make changes, test locally and commit
4. Push feature branch and create pull request
5. After merge, deploy develop branch to [test](#test).
6. Create merge request from develop to master.
7. After merge, deploy master branch to [production](#production).

For issues see: https://github.com/code-star/codestar-website/issues

# Deploying

## Test

Merge a feature branch to the `develop` branch. Travis CI ([task](https://travis-ci.org/code-star/codestar-website/)) 
will automatically build and deploy to the `gh-pages` branch. This can be tested on http://www.codestar.nl/codestar-website/ 

The `build/deploy_to_test.sh` script is deprecated, it deploys your current branch.

## Production

`build/deploy_to_production.sh` deploys the `master` branch to http://www.codestar.nl.

This script pushes the compiled website to [this repository](https://github.com/code-star/code-star.github.io#master), make sure you have write access to it.

## Continuous Deployment

The use of Circle CI is deprecated, see [test](#test) for information on Travis CI.

Builds are run on https://circleci.com/gh/code-star/codestar-website for changes on the master branch and merge requests. 
Log in with your GitHub account. The build code is not yet automatically deployed.
