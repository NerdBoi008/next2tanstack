import { useMetricAtom } from "codemod:metrics";

export type MigrationBucket = "automated" | "manual" | "blocked";
export type MigrationEffort = "low" | "medium" | "high";

const migrationImpactMetric = useMetricAtom("migration-impact");
const migrationTimeEstimateMetric = useMetricAtom("migration-time-estimate");

const EFFORT_QUARTER_HOURS: Record<MigrationEffort, number> = {
  low: 1,
  medium: 4,
  high: 16,
};

export function recordMigrationImpact(
  cardinality: { bucket: MigrationBucket; effort?: MigrationEffort },
  amount = 1,
): void {
  migrationImpactMetric.increment(cardinality, amount);

  if (!cardinality.effort || amount <= 0) return;

  if (cardinality.bucket === "automated") {
    migrationTimeEstimateMetric.increment(
      { kind: "saved", unit: "quarter-hours" },
      EFFORT_QUARTER_HOURS[cardinality.effort] * amount,
    );
    return;
  }

  if (cardinality.bucket === "manual") {
    migrationTimeEstimateMetric.increment(
      { kind: "remaining", unit: "quarter-hours" },
      EFFORT_QUARTER_HOURS[cardinality.effort] * amount,
    );
  }
}
