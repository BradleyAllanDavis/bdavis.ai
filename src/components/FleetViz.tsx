import { useEffect, useState } from 'preact/hooks';
import fleet from '../data/fleet.json';

type Status = 'cyan' | 'yellow' | 'blue' | 'green';
type Machine = { role: string; status: Status; hub?: boolean };
type FleetData = { updated: string; cloud: string[]; control: string[]; machines: Machine[] };

// Build-time fallback -- also what /public-data/fleet.json serves today.
// Three tiers, function labels only: no hostnames, IPs, ports, or service
// topology (see ~/.dotfiles/docs/philosophy.md's scarcity rule -- this panel
// states "here's the projection, the control plane, and the fleet" once, in
// outline, and nothing more). Top-down mirrors the sovereignty model: `cloud`
// is the public edge projection (Cloudflare -- hosting/DNS/TLS, all verifiable
// from any DNS lookup, no leak); `control` names capability categories, not
// the individual agents/servers behind them; `machines` is roles, not
// instances -- the sovereign home substrate. The vertical spine is a design
// cue that the whole thing is one stack from home to edge, not a topology
// claim. `updated` is the honest freshness of this file; there is no live
// health signal in this payload yet, so nothing here claims one (the real
// heartbeat pipeline republishes this file out-of-band and is the seam in the
// fetch below).
const FALLBACK = fleet as FleetData;

function isFleetData(json: unknown): json is FleetData {
  if (!json || typeof json !== 'object') return false;
  const j = json as { machines?: unknown; control?: unknown; cloud?: unknown };
  return (
    Array.isArray(j.machines) &&
    j.machines.length === 5 &&
    Array.isArray(j.control) &&
    Array.isArray(j.cloud)
  );
}

export default function FleetViz() {
  const [data, setData] = useState<FleetData>(FALLBACK);

  useEffect(() => {
    // Single fetch on mount against the same static payload the build already
    // rendered -- so there's no flash of different content. When the P1
    // heartbeat pipeline lands (protectli collects abstracted status and
    // pushes it out to a cloud edge object), this is the seam: point the fetch
    // at that public URL and move to a periodic poll. Not worth a poll yet
    // against a file that only changes on redeploy.
    let cancelled = false;
    fetch('/public-data/fleet.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!cancelled && isFleetData(json)) setData(json);
      })
      .catch(() => {
        /* no pipeline yet -- static fallback already rendered */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div class="fleetviz" role="group" aria-label="Control plane and homelab fleet, by role">
      <div class="fleetviz-caption-row">
        <p class="fleetviz-caption">// one nix flake, one control plane, five machines</p>
        <span class="fleetviz-meta">updated {data.updated}</span>
      </div>

      <div class="fleetviz-body">
        <span class="fleetviz-spine" aria-hidden="true" />

        <span class="fleetviz-band-label">cloud</span>
        <ul class="fleetviz-tags">
          {data.cloud.map((label, i) => (
            <li class="fleetviz-tag" key={i}>
              <span class="fleetviz-tagmark" aria-hidden="true">◦</span>
              {label}
            </li>
          ))}
        </ul>

        <span class="fleetviz-band-label">agent layer</span>
        <ul class="fleetviz-tags">
          {data.control.map((label, i) => (
            <li class="fleetviz-tag" key={i}>
              <span class="fleetviz-tagmark" aria-hidden="true">◦</span>
              {label}
            </li>
          ))}
        </ul>

        <span class="fleetviz-band-label">machines</span>
        <div class="fleetviz-row">
          <div class="fleetviz-line" aria-hidden="true" />
          {data.machines.map((node, i) => (
            <div class={`fleetviz-node${node.hub ? ' is-hub' : ''}`} key={i}>
              <span class={`fleetviz-dot fleetviz-dot--${node.status}`} aria-hidden="true" />
              <span class="fleetviz-role">{node.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
