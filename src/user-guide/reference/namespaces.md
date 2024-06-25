---
title: Namespaces
category: reference
order: 70
---

apm supports namespaces. Objects with namespaces can be installed, uninstalled, and published, for example `/FOOBAR/REPORT` as `#foobar#report.prog.abap`. The namespace itself is included as well, for example, `/FOOBAR/` as `#foobar#.nspc.xml` when publishing a package. This XML file contains the repair license key for the namespace (but *not* the developer license key).

apm automatically creates namespaces and updates existing namespaces when installing a package. 
