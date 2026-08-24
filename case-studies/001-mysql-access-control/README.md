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
