# RustBlood

Site for the RustBlood servers, status, rules, etc.

- **[Gatsby](https://gatsbyjs.org)** static site generator

## Get going

* `gatsby new rustblood https://github.com/austinellingwood/rustblood`
* `cd rustblood`
* `gatsby develop`
* **Check localhost:8000**

## Updating Content

If you want to add servers, you simply need to create a new .md file in the `content/servers` directory, following the same format as the others. Update the server ID for proper stat pulling.

## Deployment

Currently I have this in a S3 bucket with a CloudFront distro in front. You don't have to do it this way, I just already have resources in that account so it was easy.

## Updates to Come

Will be completing form functionality on the `contact` page, fixing the font/size and color scheme, potentially creating a more robust server diagnosis as well.