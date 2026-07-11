import { useEffect, useState } from 'preact/hooks';
import fleet from '../data/fleet.json';

type Status = 'cyan' | 'yellow' | 'blue' | 'green';
type Machine = { role: string; status: Status; hub?: boolean };
type FleetData = {
  updated: string;
  cloud: string[];
  control: string[];
  machines: Machine[];
  status?: string;
};

// Live heartbeat object, pushed every 5 min by a protectli systemd timer
// (modules/nixos/services/fleet-heartbeat) -- see
// docs/research/bdavis-io-heartbeat-HANDOFF.md. Only the bundled build-time
// FALLBACK below has no `status` field, so the word only ever renders once a
// real collector backs it.
const FLEET_URL = 'https://pub-af3ab64cccd24209ac231f124c517f41.r2.dev/fleet.json';

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
    // Poll the live R2 heartbeat object, which the protectli collector
    // republishes every 5 min. Renders instantly from the bundled FALLBACK,
    // then swaps in the live payload once it lands -- so there's no flash of
    // empty content, and a fetch failure (e.g. CORS on a non-production
    // origin) just leaves the static fallback in place.
    let cancelled = false;
    const poll = () => {
      fetch(FLEET_URL)
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          if (!cancelled && isFleetData(json)) setData(json);
        })
        .catch(() => {
          /* fetch blocked or unreachable -- fallback stays rendered */
        });
    };
    poll();
    const id = setInterval(poll, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <div class="fleetviz" role="group" aria-label="Control plane and homelab fleet, by role">
      <div class="fleetviz-caption-row">
        <p class="fleetviz-caption">// one nix flake, one control plane, five machines</p>
        <span class="fleetviz-meta">
          {data.status ? `${data.status} · ` : ''}updated {data.updated}
        </span>
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
