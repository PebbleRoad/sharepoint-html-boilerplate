# SharePoint HTML Boilerplate

A boilerplate starter kit for SharePoint html development. Comes with

* Sharepoint CSS Reset
* Gulp build tool
* JADE/SASS templates (Optional)
* Font awesome icon font (Optional)


SharePoint CSS reset credits to [http://responsivesharepoint.codeplex.com/releases/view/112845](http://responsivesharepoint.codeplex.com/releases/view/112845)

### Development
All development files are in `src/` folder

To launch a server and watch development files, run `gulp watch`

### Build

`gulp build` will generate production ready html, css and js and output them to `dist/` folder.


## Fonts

SharePoint uses Segoe UI font across the site. The boilerplate font-face checks for local `Segoe UI` font in both windows and mac, the font is download as per your font-face declaration if not found

Example:

    @font-face {
        font-family: "Segoe UI";
        font-weight: 200;
        src: local("Segoe UI Light"),
            local("SegoeUI-Light"),
            url('../fonts/segoeuil-webfont.eot'),
            url('../fonts/segoeuil-webfont.eot?#iefix') format('embedded-opentype'),
            url('../fonts/segoeuil-webfont.woff') format('woff'),
            url('../fonts/segoeuil-webfont.ttf') format('truetype'),
            url('../fonts/segoeuil-webfont.svg#segoe_uilight') format('svg');
    }

*Note: Segoe UI fonts are not included in the boilerplate due to copyright issues. Please check with your SharePoint vendor for the fonts.*

