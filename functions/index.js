"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const angularUniversal = require("angular-universal-express-firebase");
exports.need = angularUniversal.trigger({
    index: __dirname + '/dist-server/index.html',
    main: __dirname + '/dist-server/main.bundle',
    enableProdMode: true,
    cdnCacheExpiry: 1200,
    browserCacheExpiry: 600
});
//# sourceMappingURL=index.js.map