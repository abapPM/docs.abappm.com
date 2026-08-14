---
title: Unpublish Policy
order: 80
---

This policy explains when apm.to Inc. (apm) may allow packages or versions to be unpublished from the registry.

## General Rule

Published packages and versions are part of a software supply chain. For that reason, unpublishing is not treated as a routine cleanup action.

apm may limit or deny unpublish requests when removal would:

- break downstream users
- create supply-chain confusion
- disrupt package resolution or trust
- hide abuse, fraud, or policy violations that require investigation

Only package owers/maintainers are allowed to unpublish packages.

## When Unpublish May Be Allowed

apm may consider unpublish requests for reasons such as:

- accidental publication
- publication of material that should not have been shared
- legal or rights-based issues
- significant security concerns
- other exceptional circumstances

## Alternatives

When full unpublish is not appropriate, apm may prefer alternatives such as:

- deprecating a version
- publishing a fixed version
- updating package metadata or ownership
- restricting access while an issue is reviewed

## How to Unpublish

Use the apm Client to unpublish a single version (the most recent one) or all versions of a package.

## Requests

Send unpublish requests to [support@abappm.com](mailto:support@abappm.com) with the package name, affected versions, reason for the request, and urgency.

## Related Policies

- [Package Name Disputes](/policies/package-name-disputes.html)
- [Security](/policies/security.html)
- [Terms of Use](/policies/terms-of-use.html)
