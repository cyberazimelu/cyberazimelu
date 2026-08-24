# VAPT Case Study #001

## MySQL Service Reachability Through Overly Permissive Firewall Access Control

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

Initial Nmap reconnaissance did not clearly identify the MySQL service and produced inconclusive results. I therefore performed host-level verification using:

```bash
sudo ss -lntp | grep 3306
```

The output confirmed that a service was listening on TCP port `3306` on the assessed host.

I then reviewed the relevant firewall access-control configuration and identified an ACL permitting traffic from `0.0.0.0/0` to the MySQL service on TCP/3306.

The finding was an overly permissive network access-control configuration because the rule permitted traffic from an unrestricted IPv4 source range.

I advised the organization's security team and worked with them during remediation. Following the changes, I retested the relevant access-control configuration and confirmed that the identified rule had been fixed.

---
![VAPT Investigation Flow](./Investigation%20Flow.jpeg)
## Investigation Methodology

The investigation followed this sequence:

1. Investigated the initial MySQL connectivity issue.
2. Performed authorized network reconnaissance using Nmap.
3. Reviewed the inconclusive scan results.
4. Performed host-level verification of TCP/3306 using `ss`.
5. Reviewed the relevant firewall ACL configuration.
6. Identified the unrestricted `0.0.0.0/0` source rule.
7. Communicated the finding to the organization's security team.
8. Worked with the organization during remediation.
9. Retested the relevant access-control configuration.
10. Confirmed that the identified rule had been fixed.

This approach demonstrated the importance of correlating automated reconnaissance with host-level verification and configuration review.

---

## Nmap Observation

Nmap reconnaissance did not clearly identify the MySQL service during the assessment.

The results were inconclusive and did not provide reliable service identification for TCP/3306.

Rather than treating the absence of a clear Nmap identification as evidence that the service was not present, I performed local host-level verification:

```bash
sudo ss -lntp | grep 3306
```

This confirmed that a service was listening on TCP port `3306`.

The subsequent firewall ACL review revealed the overly permissive source rule.

---

## Finding

### Overly Permissive Firewall Access Control

| Attribute | Details |
|---|---|
| Affected Service | MySQL |
| Protocol | TCP |
| Port | 3306 |
| Source | `0.0.0.0/0` |
| Action | ALLOW |
| Category | Network Access Control |

The firewall ACL permitted traffic to the MySQL service from `0.0.0.0/0`, representing all IPv4 source addresses.

The security weakness was the absence of a sufficiently restricted source range for a sensitive database service.

The finding was an access-control weakness rather than a demonstrated vulnerability in the MySQL software itself.

The actual risk depends on factors including network architecture, service reachability, authentication controls, database sensitivity, and other compensating controls.

---

## Security Impact

The primary concern was unnecessary network reachability of a sensitive database service.

An unrestricted source rule can increase the attack surface where an attacker already has access to a network location from which the service is reachable. This may include scenarios involving a compromised internal host or malicious insider activity.

This assessment did not demonstrate unauthorized database access or compromise.

Instead, the finding identified a weakened network access-control boundary that could provide an additional pathway for unauthorized systems to attempt communication with the service.

---
![ACL Before vs After — Conceptual / Sanitized](./ACL%20Before%20vs%20After.jpeg)
## Security Principle

The finding primarily concerned the principle of **least privilege** at the network access-control layer.

A sensitive service should only be reachable from systems, networks, or sources with a legitimate operational requirement.

### Overly Permissive

```text
0.0.0.0/0
     │
     ▼
FIREWALL ACL
     │
     ▼
TCP/3306
     │
     ▼
MySQL
```

### Least Privilege

```text
AUTHORIZED SOURCES
        │
        ▼
   FIREWALL ACL
        │
        ▼
    TCP/3306
        │
        ▼
      MySQL
```

The security objective was to reduce unnecessary network reachability and strengthen the access-control boundary surrounding the database service.

---

## My Role

During the engagement, I:

- Investigated the MySQL connectivity issue.
- Performed authorized network reconnaissance using Nmap.
- Reviewed the inconclusive Nmap results.
- Performed host-level verification using `ss`.
- Reviewed the relevant firewall ACL configuration.
- Identified the `0.0.0.0/0` source rule permitting access to TCP/3306.
- Advised the organization's security team of the finding.
- Worked with the organization during remediation.
- Retested the relevant access-control configuration.
- Confirmed that the identified firewall rule had been fixed.

The organization determined the final remediation approach and implemented the required changes according to its internal security requirements and processes.

---

## Remediation

I advised the organization's security team on the identified access-control weakness and worked with them during the remediation process.

The relevant firewall ACL was reviewed and updated to remove the unnecessarily broad `0.0.0.0/0` source range and restrict connectivity to authorized sources according to the organization's security requirements.

The organization also addressed authorization requirements according to its internal security policies.

---

## Retesting & Validation

Following remediation, I retested the relevant access-control configuration.

The previously identified overly permissive firewall rule was confirmed to have been fixed.

This provided evidence that the specific access-control weakness identified during the assessment had been remediated.

The retest was limited to validating the identified firewall access-control issue and did not constitute a full security assessment of the environment.

---

## Tools Used

### Network Reconnaissance

- Nmap

### Host-Level Verification

- `ss` — Linux socket and listening-service inspection

### Access-Control Analysis

- Firewall ACL configuration review

### Service

- MySQL

---

## Outcome

The organization remediated the identified firewall ACL weakness.

Following remediation, I confirmed through retesting that the previously identified rule had been fixed.

The change reduced unnecessary network reachability of the MySQL service and strengthened the surrounding access-control boundary.

---

## Lessons Learned

- Automated reconnaissance should be correlated with host-level and configuration evidence.
- An inconclusive scan does not necessarily indicate that a service is absent.
- Network reachability and application-level authorization are separate security controls.
- Firewall rules should follow least-privilege principles.
- Sensitive services should be restricted to legitimate sources.
- Effective VAPT extends beyond identifying weaknesses to communication, remediation support, and validation.
