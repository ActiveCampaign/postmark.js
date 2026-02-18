import { createHash } from "crypto";

/**
 * Returns a short, stable tag to isolate integration test resources.
 *
 * Goal: avoid cross-job interference when CI runs multiple Node versions in parallel,
 * while keeping names short and DNS-safe.
 */
export function getTestRunTag(): string {
    const nodeMajor = (process.versions.node || "0").split(".")[0];
    const base =
        process.env.CIRCLE_WORKFLOW_ID ||
        process.env.CIRCLE_PIPELINE_ID ||
        process.env.CIRCLE_BUILD_NUM ||
        process.env.GITHUB_RUN_ID ||
        process.env.BUILD_BUILDID ||
        `${Date.now()}`;

    const hash = createHash("md5").update(base).digest("hex").slice(0, 6);

    // Example: ci14-a1b2c3
    return `ci-${nodeMajor}-${hash}`;
}

