---
title: Installation
order: 10
---

## Summary

**apm** exists in 2 flavours: _standalone_ version or _developer_ version.

- The standalone version is targeted at users. It consists of one large program that contains all the needed code. You run the standalone version in transaction `ZAPM`, executing the program you created.
- The developer version is targeted at developers contributing to the **apm** codebase. It consists of all the ABAP programs, classes, interfaces, and related objects of the **apm** client. You run the developer version with transaction `/n/APMG/APM`.

## Prerequisites

apm requires SAP Basis 7.50 or higher.

**apm** works best with SAP GUI for Windows. 

Support for SAP GUI for Java and SAP GUI for HTML is experimental. If you are testing these and something is not working, contact [support@abappm.com](mailto:support@abappm.com).

## Install Standalone Version

1. Download the current standalone build from the official apm distribution source and save it to a local file.
2. Via `SE38`, `SE80`, or [ADT](https://tools.hana.ondemand.com/#abap), create a new report named `ZABAPPM_STANDALONE`.
3. In source code change mode, upload the code from the file using `Utilities -> More Utilities -> Upload/Download -> Upload`.
4. Activate the report.

Typically, **apm** will only be used in the development system, so it can be installed in a local `$` package such as `$ZAPM`.

Now you can use **apm** by executing the report in transaction `SE38`. For convenience, you can also create report transaction `ZAPM` for program `ZABAPPM_STANDALONE`.

## Install Developer Version

To contribute to the **apm** project, install the developer version of **apm** using abapGit.

Create an online repository in abapGit for the public apm source and package `/APMG/APM`. First pull only the namespace, then pull the rest of the objects.

For more details, see the contribution guidance in the developer documentation and the public apm source.
