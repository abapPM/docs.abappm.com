---
title: Database Utility
category: reference
order: 99
---

`Database Utility` is a tool for managing database entries created by apm. You can access the tool via the tools icon in the top right corner of the apm user interface [](/img/utilities.png). 

Database entries are stored as key-value pairs. The values are typically JSON or markdown data.

Caution: Backup all apm database entries, first! Be careful when you edit these entries from within apm. Corrupting the JSON or setting invalid options might break your apm!

## Global Settings

The `USER:$GLOBAL$` entry contains global (not user-specific) settings for your apm installation. This is an example:

```json
...
```

## User Settings

A `USER:USERNAME` entry contains meta information like the favorites of an user and their repository configurations e. g. name and email address for Git. 

This is an example of a `USER` entry:

```json
```

## Package Metadata

The `PACKAGE` entries contain metadata like the package name, version, and dependencies.

Here is an example:

```json

```
