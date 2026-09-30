// Regenerates every list in this repo from the public Nullgen AI vendor catalog.
// No dependencies; Node 20+. Run: `node scripts/generate.mjs`
//
// Files whose entries did not change are left untouched so their
// "last modified" header stays stable and the daily workflow only commits
// when the catalog actually moved.

import { mkdir, readFile, writeFile, readdir, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CATALOG_URL = "https://nullgen.ai/api/ai-vendors";
// Override for local builds against a not-yet-deployed catalog.
const SOURCE_URL = process.env.SOURCE_URL ?? CATALOG_URL;
const HOMEPAGE = "https://nullgen.ai";
const REPO_URL = "https://github.com/nullgen-inc/ai-blocklist";
const RAW_BASE = "https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main";
const TITLE = "AI Blocklist";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const listsDir = join(root, "lists");
const vendorsDir = join(listsDir, "vendors");
const readmePath = join(root, "README.md");

const today = new Date().toISOString().slice(0, 10);

async function fetchCatalog() {
    const response = await fetch(SOURCE_URL, { headers: { "User-Agent": "ai-blocklist-generator" } });
    if (!response.ok) {
        throw new Error(`${SOURCE_URL} responded ${response.status}`);
    }
    const { data } = await response.json();
    if (!Array.isArray(data?.vendors) || data.vendors.length === 0) {
        throw new Error("Catalog payload had no vendors");
    }
    return data.vendors
        .map((vendor) => ({
            id: vendor.id,
            name: vendor.name,
            mainDomain: vendor.mainDomain,
            // `conditionalHosts` (e.g. google.com for the Gemini app) are
            // intentionally excluded: they are shared apexes that would break
            // Google Search on a whole network.
            hosts: [...new Set(vendor.hosts.map((host) => host.trim().toLowerCase()))].sort(),
        }))
        .sort((a, b) => a.name.localeCompare(b.name, "en"));
}

function allHosts(vendors) {
    return [...new Set(vendors.flatMap((vendor) => vendor.hosts))].sort();
}

// Header comments carry the date; entries are compared without them.
function isComment(line) {
    return line.startsWith("#") || line.startsWith("!");
}

async function writeIfChanged(path, header, entries) {
    let previous = null;
    try {
        previous = await readFile(path, "utf8");
    } catch {
        // new file
    }
    if (previous !== null) {
        const previousEntries = previous.split("\n").filter((line) => line && !isComment(line));
        if (previousEntries.join("\n") === entries.join("\n")) {
            return false;
        }
    }
    await writeFile(path, `${header.join("\n")}\n\n${entries.join("\n")}\n`);
    return true;
}

// Hosts files cannot match subdomains, so give apex entries a www. twin.
function hostsFileEntries(hosts) {
    const out = new Set();
    for (const host of hosts) {
        out.add(host);
        if (host.split(".").length === 2) {
            out.add(`www.${host}`);
        }
    }
    return [...out].sort().map((host) => `0.0.0.0 ${host}`);
}

function hostsHeader(count, scope) {
    return [
        `# ${TITLE}${scope} — hosts file format`,
        `# ${count} entries · updated ${today}`,
        `# Source: ${CATALOG_URL}`,
        `# Project: ${REPO_URL}`,
        `# Maintained by Nullgen — ${HOMEPAGE}`,
        `# Hosts files match exact names only (www. twins included); use the AdGuard or domains list for full subdomain coverage.`,
    ];
}

function adguardHeader(count, scope) {
    return [
        `! Title: ${TITLE}${scope}`,
        `! Description: Known generative-AI websites, apps, and API hosts, maintained by Nullgen. Excludes shared apexes (google.com, microsoft.com) that would break unrelated products.`,
        `! Homepage: ${HOMEPAGE}`,
        `! Source: ${REPO_URL}`,
        `! License: CC0-1.0`,
        `! Last modified: ${today}`,
        `! Expires: 1 day`,
        `! Entries: ${count}`,
    ];
}

function domainsHeader(count, scope) {
    return [
        `# ${TITLE}${scope} — plain domain list (each entry also covers its subdomains)`,
        `# ${count} entries · updated ${today}`,
        `# Source: ${CATALOG_URL}`,
        `# Project: ${REPO_URL}`,
        `# Maintained by Nullgen — ${HOMEPAGE}`,
    ];
}

async function writeFormats(dir, base, hosts, scope) {
    const changed = await Promise.all([
        writeIfChanged(join(dir, `${base}.hosts.txt`), hostsHeader(hostsFileEntries(hosts).length, scope), hostsFileEntries(hosts)),
        writeIfChanged(join(dir, `${base}.adguard.txt`), adguardHeader(hosts.length, scope), hosts.map((host) => `||${host}^`)),
        writeIfChanged(join(dir, `${base}.domains.txt`), domainsHeader(hosts.length, scope), hosts),
    ]);
    return changed.some(Boolean);
}

async function writeVendorsJson(vendors) {
    const path = join(listsDir, "vendors.json");
    const next = JSON.stringify({ source: CATALOG_URL, homepage: HOMEPAGE, vendors }, null, 4) + "\n";
    let previous = null;
    try {
        previous = await readFile(path, "utf8");
    } catch {
        // new file
    }
    if (previous === next) {
        return false;
    }
    await writeFile(path, next);
    return true;
}

async function pruneRemovedVendors(vendors) {
    const keep = new Set(vendors.flatMap((vendor) => ["hosts", "adguard", "domains"].map((format) => `${vendor.id}.${format}.txt`)));
    for (const file of await readdir(vendorsDir)) {
        if (!keep.has(file)) {
            await unlink(join(vendorsDir, file));
        }
    }
}

async function updateReadme(vendors, hostCount) {
    const readme = await readFile(readmePath, "utf8");
    const rows = vendors.map((vendor) => {
        const links = ["hosts", "adguard", "domains"]
            .map((format) => `[${format}](${RAW_BASE}/lists/vendors/${vendor.id}.${format}.txt)`)
            .join(" · ");
        return `| ${vendor.name} | \`${vendor.mainDomain}\` | ${vendor.hosts.length} | ${links} |`;
    });
    const table = [
        "| Vendor | Main domain | Hosts | Per-vendor lists |",
        "| --- | --- | ---: | --- |",
        ...rows,
    ].join("\n");

    const next = readme
        .replace(/<!-- vendors:start -->[\s\S]*<!-- vendors:end -->/, `<!-- vendors:start -->\n${table}\n<!-- vendors:end -->`)
        .replace(/<!-- count:vendors -->\d+<!-- \/count -->/g, `<!-- count:vendors -->${vendors.length}<!-- /count -->`)
        .replace(/<!-- count:hosts -->\d+<!-- \/count -->/g, `<!-- count:hosts -->${hostCount}<!-- /count -->`);

    if (next === readme) {
        return false;
    }
    await writeFile(readmePath, next);
    return true;
}

const vendors = await fetchCatalog();
const hosts = allHosts(vendors);

// Refuse a catalog that shrank sharply: a partial API response or a stale
// deploy must not wipe entries subscribers rely on. Set ALLOW_SHRINK=1 to
// override for an intentional large removal.
try {
    const previous = JSON.parse(await readFile(join(listsDir, "vendors.json"), "utf8")).vendors.length;
    if (vendors.length < previous * 0.9 && process.env.ALLOW_SHRINK !== "1") {
        throw new Error(`Catalog shrank from ${previous} to ${vendors.length} vendors; refusing to regenerate (ALLOW_SHRINK=1 to override)`);
    }
} catch (error) {
    if (error.code !== "ENOENT") {
        throw error;
    }
}

await mkdir(vendorsDir, { recursive: true });

const results = await Promise.all([
    writeFormats(listsDir, "ai", hosts, ""),
    writeVendorsJson(vendors),
    ...vendors.map((vendor) => writeFormats(vendorsDir, vendor.id, vendor.hosts, ` — ${vendor.name}`)),
]);
await pruneRemovedVendors(vendors);
const readmeChanged = await updateReadme(vendors, hosts.length);

const changed = results.some(Boolean) || readmeChanged;
console.log(`${vendors.length} vendors, ${hosts.length} hosts — ${changed ? "files updated" : "no changes"}`);
