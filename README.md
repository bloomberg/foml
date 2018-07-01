#  Foundations of Machine Learning

## Editing, rebuilding, and deploying this page

### Building locally: quickstart

Be sure to have [Node.js](https://iojs.org/) 7.x+ installed.

Run `npm install` in the project root. This will install some build tools we use.

Run `npm run watch` to start a watcher that will compile things in place. You can then view the site by simply opening `index.html`.

Run `npm run build` to do a local build into the `out/` directory. You can then preview the site at `out/index.html`. This should usually be the same as just `index.html`, but it is good to check before committing, since the build process is slightly more complicated than the in-place watch process.

### How to edit content
The file index.hbs is usually what you should edit, basically as though you were editing an HTML file. The final HTML is generated with some JavaScript processing that pulls in data from the YAML files in the data directory -- basically the information in the lectures and assignments tables. 

### Deployment
Run the script `./deploy.sh` from the root directory of the project to build and deploy the page to GitHub.  The script does the following: 1) Pulls down the gh-pages branch into a folder called "out" in the project root directory. (GitHub serves webpages from gh-pages branches.) Then it runs `npm run build` which compiles the page and puts the output into out. Then the revised out folder is committed and pushed back to the gh-pages branch, ready to be served.

### Technologies used

[Stylus](https://learnboost.github.io/stylus/) is used for styling.

[Handlebars](http://handlebarsjs.com/) is used for templating. `index.hbs` is minimally templated, mostly delegating to the partials in `templates/`. Those pull their data from `data/`. The logic that ties them all together is in `build/templater.js`.

[Gulp](http://gulpjs.com/) is used for a build/watch system. This is abstracted behind npm tasks though (`npm run watch`, `npm run build`).

The site is intended to be responsive, which we accomplish with per-device stylesheets and media queries in the HTML.

### Things to Keep in Mind

While editing you should be using an [EditorConfig](http://editorconfig.org/) plugin for your text editor to enforce a few basic stylistic things.

We are trying to maintain a reasonable HTML document outline (so, don't use `<section>` as if it were `<div>`). To preview the document outline, use the [HTML 5 Outliner tool](https://gsnedders.html5.org/outliner/).
