const fs = require("fs");
const path = require("path");
const expresss = require("express");
const TestRunner = require("./testRunner").testRunner;
const specs = require("../specConfig");

function createMockApp() {
    let mockApp = expresss();

    mockApp.all("/xapi/*", (req, res, next) => {
        
        res.set('Content-Type', 'text/plain');
        res.set('x-experience-api-consistent-through', (new Date(Date.now() +100)).toISOString());
        res.set('x-experience-api-version', "1.0.3");
        res.send({
            "verb": {
                "id": "http://adlnet.gov/expapi/verbs/attended",
                "display": {
                "en-GB": "attended",
                "en-US": "attended"
                }
            },
            "version": "1.0.0",
            "timestamp": (new Date(Date.now() +100)).toISOString(),
            "object": {
                "id": "http://www.example.com/meetings/occurances/34534",
                "objectType": "Activity"
            },
            "actor": {
                "mbox": "mailto:xapi@adlnet.gov",
                "name": "xAPI mbox",
                "objectType": "Agent"
            },
            "stored": (new Date(Date.now() +100)).toISOString(),
            "authority": {
                "mbox": "mailto:lou.wolford.ctr@adlnet.gov",
                "name": "lou",
                "objectType": "Agent"
            },
            "id": "0be2bf9f-cb7f-4d06-9987-22a9ac406edd"
        });	
    });

    return mockApp;
}

/**
 * Create a battery summary for a given spec version.
 * @param {string} version 
 */
async function createBattery(version) {

    const runnerFlags = {};
    runnerFlags.endpoint = "http://localhost:3001/xapi";
    runnerFlags.basicAuth = true;
    runnerFlags.authUser = "No:";
    runnerFlags.authPass = "User";
    runnerFlags.xapiVersion = version;
    // runnerFlags.bail = true;

    const runner = new TestRunner(
        "batteryInfo",
        "Admin",
        runnerFlags,
        null,
        {}
    );

    return new Promise((resolve, reject) => {
        runner.on("message", function (msg) {
            if (msg.action === "end") {
                function cleanLog(log) {
                    return {
                        text: log.name,
                        children: log.tests.map(cleanLog)
                    };
                }

                let record = runner.getCleanRecord();
                let info = {
                    conformanceTestCount: record.summary.total,
                    tests: cleanLog(record.log)
                };

                console.log(`[${version}] found ${record.summary.total} tests.`);
    
                return resolve(info);
            }
        });
    
        runner.start();
    });
}

/**
 * Create a battery summary for a given spec version.
 * @param {string} version 
 */
async function createBatteries() {
    let app = createMockApp();
    let server = app.listen(3001);
    
    let output = {};
    for (let version of specs.availableVersions) {
        
        let info = await createBattery(version);
        output[version] = info;
    }

    server.close();
    return output;
}

async function main() {
    let batteryOutput = await createBatteries();
    let batteryPath = path.join(__dirname, "../batteries.js");

    let fileContents = `module.exports = ${JSON.stringify(batteryOutput, null, 2)}`;

    fs.writeFileSync(batteryPath, fileContents);
}

main();

