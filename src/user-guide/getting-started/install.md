---
title: Installation
category: getting-started
order: 10
---

## Summary

apm exists in 2 flavours: _standalone_ version or _developer_ version.

* The standalone version is targeted at users. It consists of one (huge) program which contains all the needed code. You run the standalone version in transaction `ZAPM`, executing the program you created.
* The developer version is targeted at developers contributing to the apm codebase. It consists of all the ABAP programs/classes/interfaces/etc. of the apm client. You run the developer version with transaction `/n/APMG/APM`. 

## Prerequisites

apm requires SAP Basis 7.50 or higher.

apm works best with SAP GUI for Windows. Check [SAP GUI](/user-guide/setup/sapgui.html) for details about the SAP GUI Browser Control and other SAP GUI versions (for Java or for HTML). 

## Install Standalone Version

1. Download the [ABAP code](https://raw.githubusercontent.com/abappm/abappm/main/build/zabappm_standalone.prog.abap) (right click -> save-as) to a file.
2. Via `SE38`, `SE80`, or [ADT](https://tools.hana.ondemand.com/#abap), create a new report named `ZABAPPM_STANDALONE`.
3. In source code change mode, upload the code from the file using Utilities -> More Utilities -> Upload/Download -> Upload
4. Activate

Typically, apm will only be used in the development system, so it can be installed in a local `$` package (e.g.  `$ZAPM`).

Now you can use apm by executing the report in transaction `SE38`.

## Install Developer Version

In order to contribute to the apm project, you install the developer version of apm using [abapGit](https://github.com/abapGit/abapGit). Create an Online Repository in abapGit for `https://github.com/abapPM/abapPM` and package `/APMG/APM`. First, pull only the namespace. Then pull the rest of the objects.

For more details, see [Contribution Guidelines](https://github.com/abapPM/abapPM/blob/main/CONTRIBUTING.md).

