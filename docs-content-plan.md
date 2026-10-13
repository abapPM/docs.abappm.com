# apm Documentation Plan

## Purpose

This repository documents the apm ecosystem:

- `www.abappm.com`: marketing site, account flows, organizations, billing, and dashboard
- `registry.abappm.com` and `playground.abappm.com`: package publishing and registry workflows
- `apm` client: ABAP package management inside SAP ABAP systems
- Policies: legal and operational documents that apply across the ecosystem
- Developer guide: contribution and development material for the apm client

The recommended delivery order is:

1. Define and implement the final docs information architecture.
2. Complete the policy/legal section from the material in [`todo/Legal`](C:\GitHub\abapPM\docs.abappm.com\todo\Legal).
3. Produce product documentation for website, registry, playground, and client using demo recordings and transcripts.
4. Fill in the developer guide after the user-facing product documentation is stable.

## Principles

- Use the docs site as the canonical written reference, not the videos.
- Organize by user goal first, by technical component second.
- Keep public-user documentation separate from contributor documentation.
- Treat policy pages as publishable artifacts with review and approval, not drafts.
- Write transcript-derived docs in a task-oriented style instead of mirroring spoken narration.
- Use one consistent left-hand navigation tree for the whole site.
- Keep the voice friendly, concise, fact-based, and lightly playful where it fits.

## Confirmed Decisions

- Founder and approver: Marc
- Company/legal owner: apm.to Inc.
- All policy pages are public.
- The files in `todo/Legal` are starting points, not final or necessarily complete.
- The documentation will be text-only for the initial pass.
- `playground.abappm.com` should be mentioned as a free public test environment for trying apm, with no credit card required.
- The site should use a single left navigation structure.
- The top navbar may link to the main categories represented within that left navigation.
- The repository is public, anyone may contribute, and Marc reviews and approves all pull requests.

## Recommended Site Structure

Replace the current `user-guide` section with the following main content areas within one shared navigation tree:

1. `Get Started`
   - Set up account
   - Manage account
   - Pay for account
   - Configure ABAP system
   - Introductory concepts and first steps
2. `Packages and Modules`
   - Public registry
   - Packages and modules
   - Scopes
   - Public packages
   - Private packages
   - Access levels
   - Publish packages to the registry
   - Update and manage packages
   - Get packages from the registry
   - Secure your code
   - Mention the free public playground
3. `apm`
   - Commands
   - Settings
   - Installation
   - Configuration
   - SAP-specific workflows and troubleshooting
4. `Policies`
   - Terms of Use
   - Open Source Terms
   - Paid Services Terms
   - Code of Conduct
   - Package Name Disputes
   - apm License
   - Privacy Policy
   - Unpublish Policy
   - Copyright and DMCA Policy
   - Logos and Usage
   - Security
   - Replication and crawler policy
   - Cookies Policy
   - Legal Disclosure
5. `Developer Guide`
   - Local setup
   - Architecture overview
   - Contributing workflow
   - Testing and release process

## Suggested Directory Model

Suggested content model inside `src`:

```text
src/
  README.md
  get-started/
  packages-and-modules/
  apm/
  policies/
  development-guide/
```

Notes:

- The current `user-guide` area should be replaced.
- `organizations` should stay out of navigation until there is real content to publish.
- `playground.abappm.com` should be documented inside `Packages and Modules` as a clearly marked free public test environment, not as a separate top-level section.

## Navigation Recommendation

Recommended primary navigation in the top navbar:

- Home
- Get Started
- Packages and Modules
- apm
- Policies
- Developer Guide

Recommended cross-linking:

- Get Started pages link to billing, privacy, account, and relevant client setup pages.
- Packages and Modules pages link to package governance, unpublish, disputes, security, and client usage pages.
- apm pages link to package workflows, registry authentication, publishing, and troubleshooting flows.

Recommended left navigation behavior:

- One shared documentation tree
- Top-level categories mirror the main product areas
- Policies appear as one category with all policy documents beneath it
- Playground is mentioned under `Packages and Modules` instead of getting its own category
- Organizations stays hidden until the feature area is ready for documentation

## Phase Plan

## Phase 1: Information Architecture

Goal: prepare the site to receive content cleanly.

Deliverables:

- Final section names and URL structure
- Navbar and sidebar updates
- Landing pages for each major section
- Placeholder pages for known feature areas
- Writing template for feature docs

Tasks:

- Replace `user-guide` with the approved top-level sections: `get-started`, `packages-and-modules`, and `apm`.
- Define consistent frontmatter conventions for title, order, category, and tags.
- Create section landing pages with short scope statements.
- Create a documentation template for:
  - Summary
  - When to use this feature
  - Prerequisites
  - Step-by-step instructions
  - Expected result
  - Troubleshooting
  - Related policies or related features
- Add obvious placeholders so progress is visible and contributors know where content belongs.

Exit criteria:

- The full intended structure exists in the repo.
- Every planned user-facing topic has a known home.
- Navigation matches the final content model closely enough that future writing is mostly fill-in work.

## Phase 2: Policies

Goal: convert the `todo/Legal` material into complete, publish-ready policy pages.

Source material currently exists in [`todo/Legal`](C:\GitHub\abapPM\docs.abappm.com\todo\Legal), including:

- Terms of Use
- Privacy Policy
- Cookies Policy
- Payment Plans
- Trademark Guidelines
- Logos and Usage
- Copyright Policy
- Crawler Policy
- Security Policy
- Unpublish Policy
- Dispute Policy
- Legal Disclosure
- Open Source Terms
- Code of Conduct
- Threats and Mitigations

Tasks:

- Inventory all policy source documents and map them to publishable docs pages.
- Vet the source material for completeness against the intended public policy set.
- Normalize naming, tone, headings, and legal references.
- Remove duplication between related items such as trademark/logo and dispute/name-squatting.
- Add “effective date” and “last updated” handling.
- Apply Marc review and approval before publication.

Policy coverage to vet for completeness based on the current target menu:

- Terms of Use
- Open Source Terms
- Private Terms
- Code of Conduct
- Package Name Disputes
- apm License
- Privacy Policy
- Unpublish Policy
- Copyright and DMCA Policy
- Logos and Usage
- Security
- Replication and crawler policy
- Cookies Policy
- Legal Disclosure

Notes:

- Some current `todo/Legal` filenames may need to be renamed to match the public navigation labels.
- `Private Terms` should explain that apm does not distinguish between open-source terms and private-service terms in the way some ecosystems do, because services are generally available only to paid subscribers, with explicit exceptions for the free playground and free browsing of the registry.
- `Copyright and DMCA Policy` should likely absorb or replace the current copyright material in a clearer public form.
- `Replication and crawler policy` appears to map most closely to the current crawler-policy material, but should be reviewed for scope.
- `Payment Plans` should be absorbed into `Paid Services Terms`, covering monthly and yearly subscriptions.

Exit criteria:

- Each policy page has a final location under `src/policies/`.
- Public-facing legal pages are consistent and complete.
- Any internal-only material is explicitly separated from published policy pages.

## Phase 3: Transcript-Driven Product Documentation

Goal: generate user documentation efficiently from narrated demos.

Recommended workflow:

1. Record one demo per feature or tightly related workflow.
2. Produce a transcript for each recording.
3. Clean the transcript lightly:
   - remove filler words
   - label the product area
   - identify prerequisites and expected outcome
4. Convert each transcript into a documentation draft using a fixed template.
5. Review the draft against the actual UI or workflow.
6. Add screenshots, callouts, and links to related pages.
7. Publish after a final factual pass.

Rules for transcript conversion:

- Do not preserve spoken order if it hurts clarity.
- Prefer imperative steps over descriptive narration.
- Split long demos into multiple pages when they cover more than one user goal.
- Capture hidden assumptions explicitly, especially auth state, permissions, SAP prerequisites, and environment differences.
- Mark production-only vs playground-only behavior clearly.
- Mention the playground where relevant as a free, no-restrictions public test environment.

Recommended documentation unit:

- One page per user goal, not one page per video.

Examples:

- “Create an organization”
- “Invite a team member”
- “Publish a package”
- “Deprecate or manage a version”
- “Install a package in SAP”
- “Authenticate apm against the registry”

## Phase 4: Product Content Backlog

### Website backlog

- About apm
- Sign up
- Sign in
- Password reset or account recovery
- User profile management
- Create an organization
- Manage organization members
- Roles and permissions
- Billing overview
- Plan changes
- Invoice or payment management
- Dashboard overview

### Registry backlog

- Browse and search packages
- Package detail page anatomy
- Create or claim package ownership
- Publish a package
- Manage versions
- Unpublish or deprecate content
- Access control and maintainers
- Organization-linked packages
- Playground overview
- Playground vs production differences

### Client backlog

- Install apm
- Standalone vs developer version
- System prerequisites
- Initial configuration
- Authenticate against the registry
- Search for packages
- Install packages
- Update packages
- Remove packages
- Publish from ABAP
- Troubleshooting and common errors

### Developer guide backlog

- Repo overview
- Local development setup
- Build/test workflow
- Contribution guidelines
- Coding standards
- Release or packaging process
- How the client talks to the registry

## Content Standards

- Every page should state audience and prerequisites.
- Product pages should be task-based.
- Policy pages should be reference-style and stable.
- First pass is text-only.
- Prefer short pages with strong linking over very long narrative pages.
- Keep environment naming consistent: production, playground, local, SAP system.
- Use one shared voice across website, registry, client, policies, and contributor docs.
- Tone should be friendly, to the point, and fact-based. Sparse emoji use is acceptable but should stay rare.

## Roles and Workflow

Suggested ownership:

- Product/domain owner: Marc
- Legal owner and final approver: Marc
- Deployment owner: Marc
- Documentation editor: whoever prepares the draft, with Marc reviewing final content
- Technical reviewer: contributor or maintainer preparing the page, with Marc approving merge

Suggested production rhythm:

1. Build structure.
2. Finish policies.
3. Record demos by product area.
4. Convert transcripts into drafts.
5. Review and publish in batches.

## Decisions Needed

These are the remaining high-value open decisions before implementation starts:

1. Whether organization features should later live under `Get Started`, `Packages and Modules`, or return as their own section once there is enough content.

## Recommended Immediate Next Steps

1. Approve the section model and URL strategy.
2. Implement the doc structure in the repo.
3. Map the legal source files to the intended public policy pages and identify missing drafts.
4. Publish the policy section first.
5. Define the transcript-to-doc template before recording demos.

## Assumptions

- This is a one-time documentation production effort, not a video-synced maintenance process.
- The existing VuePress site will remain the documentation platform.
- The docs should cover both public SaaS surfaces and the ABAP client in one site.
- Policies apply across website, registry, playground, and client unless stated otherwise.
- Public contributions are welcome, but all merges are reviewed and approved by Marc.
