const specInfo = {

    defaultVersion: "2.0.0",
    availableVersions: [
        "1.0.3",
        "2.0.0"
    ],

    specToFolder: {
        "1.0.2": "v1_0_2",
        "1.0.3": "v1_0_3",
        
        "2": "v2_0",
        "2.0": "v2_0",
        "2.0.0": "v2_0",
    },

    /**
     * Get a version from the given folder.
     * @param {string} folder 
     */
    getSpecFromFolder(folder) {
        if (folder.includes("v1_0_3"))
            return "1.0.3";

        if (folder.includes("v1_0_2"))
            return "1.0.2";

        if (folder.includes("v2_0"))
            return "2.0.0";

        return null;
    }
}

module.exports = specInfo;
