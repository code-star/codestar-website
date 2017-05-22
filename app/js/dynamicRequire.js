let assets = require.context('../', true, /^.*(.png|.svg|.otf|.woff|.jpg)$/);
assets.keys().forEach(function(key){
    assets(key);
});
