module.exports = {
    client: {
        addTypename: true,
        includes: ["src/**/*.ts", "src/**/*.tsx"],
        name: "web",
        service: {
            localSchemaFile: "schema.graphql",
            name: "delity"
        }
    }
};