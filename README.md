# AI Blocklist

A maintained blocklist of known generative-AI websites, apps, and API hosts —
ChatGPT, Claude, Gemini, Perplexity, Midjourney, Copilot, and
<!-- count:vendors -->103<!-- /count --> vendors in total, covering
<!-- count:hosts -->179<!-- /count --> hostnames.

Ready to subscribe from Pi-hole, AdGuard Home, uBlock Origin, NextDNS, ControlD,
pfBlockerNG, or a plain `hosts` file.

It is generated daily from the same vendor catalog that [Nullgen AI Blocker](https://nullgen.ai)
enforces on browsers, phones, and desktops, so it stays current without anyone
hand-editing a text file. Public domain (CC0) — fork it, mirror it, fold it into
your own list.

## Subscribe

| Tool | Use this URL |
| --- | --- |
| Pi-hole, pfBlockerNG, hosts-file based blockers | `https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/ai.hosts.txt` |
| AdGuard Home, AdGuard apps, uBlock Origin, Brave Shields | `https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/ai.adguard.txt` |
| NextDNS, ControlD, Pi-hole (wildcard / regex mode), Little Snitch, anything that wants bare domains | `https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/ai.domains.txt` |
| Scripts and integrations | `https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors.json` |

**Pi-hole:** Group Management → Adlists → paste the hosts URL → `pihole -g`.
**AdGuard Home:** Filters → DNS blocklists → Add blocklist → Add a custom list.
**uBlock Origin:** Dashboard → Filter lists → Import → paste the AdGuard URL.
**NextDNS:** Denylist accepts one domain per line; paste the contents of the domains list.

Only want to block one product? Every vendor has its own file in
[`lists/vendors/`](lists/vendors) — see the table below.

## Formats

| File | Syntax | Subdomains |
| --- | --- | --- |
| `ai.hosts.txt` | `0.0.0.0 host` | **Exact match only.** Apex entries get a `www.` twin, but `cdn.oaistatic.com` or `api.jenni.ai` are not covered. Prefer a wildcard-capable format when your tool supports one. |
| `ai.adguard.txt` | `\|\|host^` | Yes — matches the host and every subdomain. |
| `ai.domains.txt` | one domain per line | Yes, in every tool that treats entries as suffixes (NextDNS, ControlD, Pi-hole wildcard). |
| `vendors.json` | JSON | Structured: `id`, `name`, `mainDomain`, `hosts[]` per vendor. |

### Every entry is a suffix — on purpose

Each hostname in this list is meant to match **itself and all of its
subdomains**. That is how the mobile and desktop apps behind it get blocked,
not just the website: `jenni.ai` also catches `api.jenni.ai`, `huggingface.co`
also catches `api-inference.huggingface.co`, and any subdomain a vendor adds
tomorrow.

That only works because of one rule: **a vendor gets its apex listed only when
that apex is dedicated to AI.** `chatgpt.com`, `claude.ai`, `quillbot.com`,
`civitai.com` — the whole domain is the product, so the whole domain is
blocked. When an AI product lives under an apex that people need for other
things, only the product's own subdomain is listed: `gemini.google.com`,
`copilot.microsoft.com`, `yuanbao.tencent.com`, `codewhisperer.us-east-1.amazonaws.com`.
The shared apex itself (`google.com`, `microsoft.com`, `github.com`,
`openai.com`, `amazon.com`, `adobe.com`, `tencent.com`) is never listed.

## What is (and isn't) blocked

This list blocks **known** AI websites, apps, and their API hosts. The list
keeps growing; a vendor that isn't here yet is a gap, not a decision.

Some AI features live inside a larger product that people need for other
things, and those share hostnames with it:

- **Gemini** inside the Google app and Google Search
- **Copilot** inside Office, Bing, and Edge
- **Meta AI** inside Instagram, WhatsApp, and Facebook

Blocking those hosts would break search, mail, and messaging for everyone on
the network, so this list deliberately leaves out shared apexes such as
`google.com`, `microsoft.com`, `github.com`, `openai.com`, `amazon.com`, and
`adobe.com`. The dedicated Gemini website (`gemini.google.com`) and the
Copilot website are included; the AI features embedded in Search or Office
are not. To remove those apps entirely, use Screen Time (iPhone), Family Link
(Android), or your MDM.

DNS blocking also cannot see inside an app that is already talking to an API
over a host that isn't on this list, and it cannot tell a student writing an
essay apart from a parent who needs ChatGPT for work. If you need per-person
rules, time-boxed approvals, or blocking that follows a device off the home
network, that is what [Nullgen](https://nullgen.ai) does — this list is the
free, DNS-level slice of it.

## Vendors

<!-- vendors:start -->
| Vendor | Main domain | Hosts | Per-vendor lists |
| --- | --- | ---: | --- |
| Adobe Firefly | `firefly.adobe.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/firefly.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/firefly.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/firefly.domains.txt) |
| Amazon Q | `q.us-east-1.amazonaws.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/amazon-q.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/amazon-q.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/amazon-q.domains.txt) |
| Augment | `augmentcode.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/augment.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/augment.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/augment.domains.txt) |
| Base44 | `base44.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/base44.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/base44.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/base44.domains.txt) |
| Black Forest Labs | `bfl.ai` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/bfl.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/bfl.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/bfl.domains.txt) |
| Bolt | `bolt.new` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/bolt.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/bolt.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/bolt.domains.txt) |
| Caktus | `caktus.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/caktus.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/caktus.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/caktus.domains.txt) |
| Candy AI | `candy.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/candy.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/candy.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/candy.domains.txt) |
| Chai | `chai-research.com` | 3 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chai.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chai.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chai.domains.txt) |
| Character.AI | `character.ai` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/character.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/character.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/character.domains.txt) |
| ChatGLM | `chatglm.cn` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chatglm.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chatglm.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chatglm.domains.txt) |
| ChatGPT | `chatgpt.com` | 9 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chatgpt.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chatgpt.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chatgpt.domains.txt) |
| ChatPDF | `chatpdf.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chatpdf.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chatpdf.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/chatpdf.domains.txt) |
| Civitai | `civitai.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/civitai.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/civitai.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/civitai.domains.txt) |
| Claude | `claude.ai` | 3 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/claude.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/claude.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/claude.domains.txt) |
| Codeium | `codeium.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/codeium.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/codeium.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/codeium.domains.txt) |
| Cohere | `cohere.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/cohere.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/cohere.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/cohere.domains.txt) |
| Consensus | `consensus.app` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/consensus.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/consensus.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/consensus.domains.txt) |
| Continue | `continue.dev` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/continue.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/continue.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/continue.domains.txt) |
| Copy.ai | `copy.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/copy-ai.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/copy-ai.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/copy-ai.domains.txt) |
| Cursor | `cursor.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/cursor.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/cursor.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/cursor.domains.txt) |
| DeepSeek | `chat.deepseek.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/deepseek.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/deepseek.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/deepseek.domains.txt) |
| Devin | `devin.ai` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/devin.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/devin.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/devin.domains.txt) |
| Doubao | `doubao.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/doubao.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/doubao.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/doubao.domains.txt) |
| Duck.ai | `duck.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/duck-ai.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/duck-ai.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/duck-ai.domains.txt) |
| ElevenLabs | `elevenlabs.io` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/elevenlabs.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/elevenlabs.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/elevenlabs.domains.txt) |
| Elicit | `elicit.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/elicit.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/elicit.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/elicit.domains.txt) |
| ERNIE | `yiyan.baidu.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/ernie.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/ernie.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/ernie.domains.txt) |
| Factory | `factory.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/factory.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/factory.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/factory.domains.txt) |
| Fireflies | `fireflies.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/fireflies.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/fireflies.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/fireflies.domains.txt) |
| Fireworks | `fireworks.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/fireworks.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/fireworks.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/fireworks.domains.txt) |
| Gamma | `gamma.app` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/gamma.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/gamma.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/gamma.domains.txt) |
| Gauth | `gauthmath.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/gauth.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/gauth.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/gauth.domains.txt) |
| Gemini | `gemini.google.com` | 15 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/gemini.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/gemini.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/gemini.domains.txt) |
| Genspark | `genspark.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/genspark.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/genspark.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/genspark.domains.txt) |
| GitHub Copilot | `copilot.github.com` | 3 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/github-copilot.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/github-copilot.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/github-copilot.domains.txt) |
| Google AI Studio | `aistudio.google.com` | 5 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/google-ai-studio.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/google-ai-studio.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/google-ai-studio.domains.txt) |
| Grok | `grok.com` | 3 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/grok.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/grok.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/grok.domains.txt) |
| Groq | `groq.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/groq.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/groq.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/groq.domains.txt) |
| HeyGen | `heygen.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/heygen.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/heygen.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/heygen.domains.txt) |
| Higgsfield | `higgsfield.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/higgsfield.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/higgsfield.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/higgsfield.domains.txt) |
| Hugging Face | `huggingface.co` | 3 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/huggingface.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/huggingface.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/huggingface.domains.txt) |
| Humata | `humata.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/humata.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/humata.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/humata.domains.txt) |
| Ideogram | `ideogram.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/ideogram.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/ideogram.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/ideogram.domains.txt) |
| Janitor AI | `janitorai.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/janitorai.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/janitorai.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/janitorai.domains.txt) |
| Jasper | `jasper.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/jasper.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/jasper.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/jasper.domains.txt) |
| Jenni | `jenni.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/jenni.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/jenni.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/jenni.domains.txt) |
| Kimi | `kimi.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/kimi.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/kimi.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/kimi.domains.txt) |
| Kindroid | `kindroid.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/kindroid.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/kindroid.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/kindroid.domains.txt) |
| Kling | `klingai.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/kling.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/kling.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/kling.domains.txt) |
| Krea | `krea.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/krea.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/krea.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/krea.domains.txt) |
| Leonardo | `leonardo.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/leonardo.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/leonardo.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/leonardo.domains.txt) |
| LMArena | `lmarena.ai` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/lmarena.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/lmarena.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/lmarena.domains.txt) |
| Lovable | `lovable.dev` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/lovable.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/lovable.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/lovable.domains.txt) |
| Luma | `lumalabs.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/luma.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/luma.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/luma.domains.txt) |
| Magnific | `magnific.ai` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/magnific.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/magnific.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/magnific.domains.txt) |
| Manus | `manus.im` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/manus.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/manus.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/manus.domains.txt) |
| Meta AI | `meta.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/meta-ai.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/meta-ai.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/meta-ai.domains.txt) |
| Microsoft Copilot | `copilot.microsoft.com` | 4 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/copilot.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/copilot.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/copilot.domains.txt) |
| Midjourney | `midjourney.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/midjourney.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/midjourney.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/midjourney.domains.txt) |
| MiniMax | `minimax.io` | 5 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/minimax.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/minimax.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/minimax.domains.txt) |
| Mistral Le Chat | `chat.mistral.ai` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/mistral.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/mistral.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/mistral.domains.txt) |
| Monica | `monica.im` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/monica.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/monica.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/monica.domains.txt) |
| Muse | `muse.ai` | 4 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/muse.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/muse.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/muse.domains.txt) |
| Napkin | `napkin.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/napkin.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/napkin.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/napkin.domains.txt) |
| Nomi | `nomi.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/nomi.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/nomi.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/nomi.domains.txt) |
| NotebookLM | `notebooklm.google.com` | 4 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/notebooklm.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/notebooklm.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/notebooklm.domains.txt) |
| NovelAI | `novelai.net` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/novelai.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/novelai.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/novelai.domains.txt) |
| OpenRouter | `openrouter.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/openrouter.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/openrouter.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/openrouter.domains.txt) |
| Otter | `otter.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/otter.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/otter.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/otter.domains.txt) |
| Perplexity | `perplexity.ai` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/perplexity.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/perplexity.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/perplexity.domains.txt) |
| Phind | `phind.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/phind.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/phind.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/phind.domains.txt) |
| Photomath | `photomath.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/photomath.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/photomath.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/photomath.domains.txt) |
| Pi | `pi.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/pi.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/pi.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/pi.domains.txt) |
| Pika | `pika.art` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/pika.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/pika.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/pika.domains.txt) |
| PixVerse | `pixverse.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/pixverse.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/pixverse.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/pixverse.domains.txt) |
| Playground | `playground.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/playground.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/playground.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/playground.domains.txt) |
| Poe | `poe.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/poe.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/poe.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/poe.domains.txt) |
| QuillBot | `quillbot.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/quillbot.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/quillbot.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/quillbot.domains.txt) |
| Qwen | `chat.qwen.ai` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/qwen.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/qwen.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/qwen.domains.txt) |
| Recraft | `recraft.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/recraft.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/recraft.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/recraft.domains.txt) |
| Replika | `replika.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/replika.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/replika.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/replika.domains.txt) |
| Runway | `runwayml.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/runway.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/runway.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/runway.domains.txt) |
| Rytr | `rytr.me` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/rytr.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/rytr.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/rytr.domains.txt) |
| Sider | `sider.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/sider.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/sider.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/sider.domains.txt) |
| Sora | `sora.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/sora.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/sora.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/sora.domains.txt) |
| Sourcegraph Cody | `sourcegraph.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/cody.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/cody.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/cody.domains.txt) |
| Stability AI | `stability.ai` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/stability.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/stability.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/stability.domains.txt) |
| Sudowrite | `sudowrite.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/sudowrite.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/sudowrite.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/sudowrite.domains.txt) |
| Suno | `suno.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/suno.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/suno.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/suno.domains.txt) |
| Synthesia | `synthesia.io` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/synthesia.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/synthesia.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/synthesia.domains.txt) |
| Tabnine | `tabnine.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/tabnine.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/tabnine.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/tabnine.domains.txt) |
| Talkie | `talkie-ai.com` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/talkie.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/talkie.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/talkie.domains.txt) |
| Together | `chat.together.ai` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/together.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/together.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/together.domains.txt) |
| Udio | `udio.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/udio.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/udio.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/udio.domains.txt) |
| Undetectable AI | `undetectable.ai` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/undetectable.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/undetectable.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/undetectable.domains.txt) |
| v0 | `v0.dev` | 2 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/v0.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/v0.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/v0.domains.txt) |
| Vidu | `vidu.com` | 3 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/vidu.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/vidu.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/vidu.domains.txt) |
| Windsurf | `windsurf.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/windsurf.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/windsurf.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/windsurf.domains.txt) |
| Wordtune | `wordtune.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/wordtune.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/wordtune.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/wordtune.domains.txt) |
| Writesonic | `writesonic.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/writesonic.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/writesonic.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/writesonic.domains.txt) |
| You.com | `you.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/you.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/you.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/you.domains.txt) |
| Yuanbao | `yuanbao.tencent.com` | 1 | [hosts](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/yuanbao.hosts.txt) · [adguard](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/yuanbao.adguard.txt) · [domains](https://raw.githubusercontent.com/nullgen-inc/ai-blocklist/main/lists/vendors/yuanbao.domains.txt) |
<!-- vendors:end -->

## How it's built

[`scripts/generate.mjs`](scripts/generate.mjs) fetches the public catalog at
`https://nullgen.ai/api/ai-vendors` and writes every file in `lists/`. A
[GitHub Action](.github/workflows/update.yml) runs it daily and commits only
when the catalog changed, so the `Last modified` header in each list is
meaningful.

To regenerate locally (Node 20+):

```bash
node scripts/generate.mjs
```

## Contributing

**Missing a vendor?** Open an issue with the product name and the hostnames
you observed (a browser dev-tools network tab or a Pi-hole query log is
enough). Additions land in the upstream catalog and flow here on the next
run; pull requests against `lists/` are overwritten by the generator.

**False positive?** Same — open an issue naming the host and what it broke.

## License

[CC0 1.0 Universal](LICENSE). No attribution required. A link back to
[nullgen.ai](https://nullgen.ai) is appreciated if you redistribute the list.
