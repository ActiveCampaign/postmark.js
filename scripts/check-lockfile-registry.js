#!/usr/bin/env node
/*
 * Guards package-lock.json against internal/private registry URLs.
 *
 * This is a public package, so every resolved dependency must come from the public
 * npm registry. Running `npm install` on a machine configured with a corporate mirror
 * (e.g. a Nexus proxy) can rewrite "resolved" URLs to that internal host, which then
 * breaks CI and leaks internal infrastructure into a public lockfile. This check fails
 * the commit if any such URL is present.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ALLOWED_HOST = "registry.npmjs.org";
const lockfilePath = path.join(__dirname, "..", "package-lock.json");

function collectResolvedUrls(node, urls) {
    if (Array.isArray(node)) {
        node.forEach((child) => collectResolvedUrls(child, urls));
    } else if (node !== null && typeof node === "object") {
        for (const [key, value] of Object.entries(node)) {
            if (key === "resolved" && typeof value === "string") {
                urls.push(value);
            } else {
                collectResolvedUrls(value, urls);
            }
        }
    }
}

const lockfile = JSON.parse(fs.readFileSync(lockfilePath, "utf8"));

const resolvedUrls = [];
collectResolvedUrls(lockfile, resolvedUrls);

const offenders = resolvedUrls.filter((url) => {
    if (!/^https?:\/\//.test(url)) { return false; }
    try {
        return new URL(url).host !== ALLOWED_HOST;
    } catch (error) {
        return true; // unparseable URL is treated as an offender
    }
});

if (offenders.length > 0) {
    const unique = Array.from(new Set(offenders));
    console.error(`ERROR: package-lock.json references non-public registry hosts (expected ${ALLOWED_HOST}):`);
    unique.forEach((url) => console.error(`  ${url}`));
    console.error("\nRegenerate the lockfile against the public registry, for example:");
    console.error("  npm install --registry=https://registry.npmjs.org");
    process.exit(1);
}

console.log(`package-lock.json OK: all resolved dependencies use ${ALLOWED_HOST}.`);
