// ==========================================================================
// 🚀 LEGEND OF FAIRY TAIL - HUGGING FACE MULTI-CORE PHYSICS & AI WORKER
// Runs on a separate CPU Core (Background Thread) to offload Host Main Thread!
// ==========================================================================

function isBoxColliding(r1, r2) {
  if (!r1 || !r2) return false;
  return (
    r1.x < r2.x + r2.w &&
    r1.x + r1.w > r2.x &&
    r1.y < r2.y + r2.h &&
    r1.y + rect2H(r2) > r2.y
  );
}

function rect2H(r2) {
  return r2.h || 50;
}

self.onmessage = function (e) {
  const data = e.data;
  if (!data || data.type !== "step_physics_radar") return;

  const fighters = data.fighters || [];
  const projectiles = data.projectiles || [];
  const targetMap = {};
  const meleePairs = [];
  const projHits = [];

  // 1. Offloaded 16-Fighter Smart Target Radar (O(N^2) distance matrix on Worker Core)
  for (let i = 0; i < fighters.length; i++) {
    const f = fighters[i];
    if (!f || f.health <= 0) continue;
    let minDist = Infinity;
    let closestId = null;

    for (let j = 0; j < fighters.length; j++) {
      if (i === j) continue;
      const enemy = fighters[j];
      if (!enemy || enemy.health <= 0 || enemy.team === f.team) continue;
      const d = Math.abs(enemy.x - f.x);
      if (d < minDist) {
        minDist = d;
        closestId = enemy.id;
      }
    }
    if (closestId) {
      targetMap[f.id] = closestId;
    }

    // 2. Broadphase Melee Collision Pre-Check (Attacker vs Enemy Hurtboxes)
    if (f.isAttacking && f.hit) {
      for (let j = 0; j < fighters.length; j++) {
        if (i === j) continue;
        const victim = fighters[j];
        if (!victim || victim.health <= 0 || victim.team === f.team || !victim.hurt) continue;
        if (isBoxColliding(f.hit, victim.hurt)) {
          meleePairs.push({ attackerId: f.id, victimId: victim.id });
        }
      }
    }
  }

  // 3. Broadphase Projectile vs Fighter Collision Pre-Check
  for (let p = 0; p < projectiles.length; p++) {
    const proj = projectiles[p];
    if (!proj || !proj.hit) continue;
    for (let j = 0; j < fighters.length; j++) {
      const victim = fighters[j];
      if (!victim || victim.health <= 0 || victim.team === proj.ownerTeam || !victim.hurt) continue;
      if (isBoxColliding(proj.hit, victim.hurt)) {
        projHits.push({ projIdx: proj.idx, victimId: victim.id });
      }
    }
  }

  self.postMessage({
    type: "worker_radar_result",
    tick: data.tick,
    targetMap: targetMap,
    meleePairs: meleePairs,
    projHits: projHits,
  });
};