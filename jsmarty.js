const fs = require("fs");
const path = require("path");
const JSmarty = require("jsmart");

module.exports = function (RED) {
    function JSmartyNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.templateCode = config.templateCode; // Template depuis l'éditeur
        node.basePath = config.basePath; // Chemin de base défini dans la configuration

        node.on("input", function (msg) {
            let template = "";
            const data = msg || {}; // Passe tout l'objet msg comme données

            // Cas 1 : Template dans msg.payload
            if (msg.payload && typeof msg.payload === "string") {
                template = msg.payload;
            } 
            // Cas 2 : Template défini par un chemin
            else if (msg.template && node.basePath) {
                try {
                    const filePath = path.isAbsolute(msg.template)
                        ? msg.template // Chemin absolu
                        : path.join(node.basePath, msg.template); // Chemin relatif au basePath
                    template = fs.readFileSync(filePath, "utf8");
                } catch (err) {
                    node.error(`Failed to read template file: ${err.message}`);
                    return;
                }
            } 
            // Cas 3 : Template défini dans l'éditeur
            else if (node.templateCode) {
                template = node.templateCode;
            } else {
                node.error("No template provided in msg.payload, msg.template, or node configuration");
                return;
            }

            // Exécution du template
            try {
                const compiledTemplate = new JSmarty(template);
                msg.payload = compiledTemplate.fetch(data); // Rend le résultat dans msg.payload
                node.send(msg);
            } catch (err) {
                node.error(`Template rendering failed: ${err.message}`);
            }
        });
    }

    RED.nodes.registerType("jsmarty", JSmartyNode);
};