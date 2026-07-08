import { useEffect, useState } from 'preact/hooks';
import fleet from '../data/fleet.json';

type Status = 'cyan' | 'yellow' | 'blue' | 'green';
type Node = { role: string; status: Status; hub?: boolean };
type FleetData = { updated: string; nodes: Node[] };

// Build-time fallback -- also what /public-data/fleet.json serves today.
// Role labels only: no hostnames, IPs, or service topology (see
// ~/.dotfiles/docs/philosophy.md's scarcity rule -- this panel states
// "here's the infrastructure" once, in outline, and nothing more).
const FALLBACK = fleet as FleetData;

function isFleetData(json: unknown): json is FleetData {
  if (!json || typeof json !== 'object') return false;
  const nodes = (json as { nodes?: unknown }).nodes;
  return Array.isArray(nodes) && nodes.length === 5;
}

export default function FleetViz() {
  const [data, setData] = useState<FleetData>(FALLBACK);

  useEffect(() => {
    // Single fetch on mount against the same static payload the build
    // already rendered -- so there's no flash of different content. Once a
    // real public-data pipeline republishes this file on its own schedule,
    // this is the seam to move to a periodic poll; not worth one yet
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
    <div class="fleetviz" role="group" aria-label="Homelab fleet, by role">
      <p class="fleetviz-caption">// one nix flake, five machines</p>
      <div class="fleetviz-row">
        <div class="fleetviz-line" aria-hidden="true" />
        {data.nodes.map((node, i) => (
          <div class={`fleetviz-node${node.hub ? ' is-hub' : ''}`} key={i}>
            <span class={`fleetviz-dot fleetviz-dot--${node.status}`} aria-hidden="true" />
            <span class="fleetviz-role">{node.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
