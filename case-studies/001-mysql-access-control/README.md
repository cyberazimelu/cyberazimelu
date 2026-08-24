# VAPT Case Study #001

## MySQL Network Exposure Through Overly Permissive Firewall Access Control

**Engagement:** Authorized Network VAPT  
**Period:** May 2026  
**Environment:** Enterprise Infrastructure — Client & Assets Anonymized  
**Role:** Network VAPT  
**Status:** Remediated and Retested
---

## Confidentiality Notice

This case study has been prepared for public portfolio use with authorization to describe the engagement.

Client identity, hostnames, IP addresses, infrastructure details, credentials, data, proprietary configurations, and other identifying or sensitive information have been omitted or anonymized.

The technical narrative reflects my personal activities and observations during the authorized engagement.
---

## Executive Summary

During an authorized Network VAPT engagement in May 2026, I investigated a MySQL connectivity issue within the assessed environment.

Initial Nmap reconnaissance did not clearly identify the MySQL service. The scan produced inconclusive results, so I performed host-level verification using:

```bash
sudo ss -lntp | grep 3306
The `ss` output confirmed that a service was listening on TCP port `3306` on the assessed host.

This provided a local indication that the MySQL service was listening on the host, despite the inconclusive Nmap result.
---

## Firewall ACL Discovery

Following the host-level verification, I reviewed the relevant firewall access-control configuration.

The review identified an ACL permitting traffic from:

`0.0.0.0/0`

to the MySQL service on:

`TCP/3306`

Conceptually:

```text
SOURCE       : 0.0.0.0/0
DESTINATION  : MySQL
PORT         : 3306
PROTOCOL     : TCP
ACTION       : ALLOW
---

## My Role

During the assessment, I:

- Investigated the MySQL connectivity issue.
- Performed authorized network reconnaissance using Nmap.
- Recognized that the Nmap results were inconclusive regarding the MySQL service.
- Performed host-level verification using `ss`.
- Reviewed the relevant firewall ACL configuration.
- Identified the overly permissive `0.0.0.0/0` source rule for TCP/3306.
- Advised the organization's security team of the security concern.
- Worked with the organization during the remediation process.
- Retested the environment after remediation.
- Confirmed that the identified overly permissive firewall rule had been fixed.

The organization's security team determined and implemented the final remediation according to its internal security requirements and change-management processes.
