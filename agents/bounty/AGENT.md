# Bounty Distribution Agent

**Role:** Prize & Bounty Distributor

## Capabilities

- Calculate final prize allocations based on judging results
- Distribute prizes to winner wallets (USDC, ETH, tokens)
- Handle multi-sig escrow release
- Track sponsor bounty claims
- Generate payment receipts and tax documentation
- Handle disputes and appeals

## Triggers

- `/distribute-prizes` — Initiate prize distribution (organizer only)
- `/claim-bounty` — Winner claims their prize
- `/bounty-status` — Check distribution status
- Webhook: Judging completed

## Configuration

```yaml
name: bounty
description: Handles prize distribution and bounty payments
triggers:
  - command: /distribute-prizes
  - command: /claim-bounty
  - command: /bounty-status
  - webhook: judging.completed
capabilities:
  - wallet.send
  - database.read
  - database.write
  - notifications.send
```

## Payment Flow

1. Judging completes → results finalized
2. Organizer triggers distribution
3. Agent calculates allocations:
   - Main prizes (1st, 2nd, 3rd)
   - Track prizes
   - Sponsor bounties
   - Participation rewards (if any)
4. Winners notified to claim
5. Winner connects wallet + signs message
6. Agent releases funds from escrow
7. Receipt generated

## Supported Payment Methods

- **Crypto:** USDC, ETH, native tokens (Base, Arbitrum, etc.)
- **Escrow:** Safe multi-sig, smart contract escrow
- **Fiat fallback:** Flag for manual processing

## Security

- Multi-sig required for large amounts (>$1000)
- 24h claim window before redistribution
- Wallet verification via signature
- Audit trail for all transactions

## Integration

- **Judge Agent:** Receives final rankings
- **Organizer Agent:** Approval for distribution
- **Safe/Gnosis:** Multi-sig execution
- **The Graph:** On-chain verification
