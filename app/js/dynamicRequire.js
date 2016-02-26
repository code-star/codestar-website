var assets = require.context("../", true, /(?!.*[.](?:png|svg|otf|woff)$).*/igm);
assets.keys().forEach(function(key){
    assets(key);
});
