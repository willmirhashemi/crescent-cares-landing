// Shared types for the "Existing organization" application flow (8 steps).

export type ExistingData = {
  name: string;
  email: string;
  code: string;
  // Org details (step 3) — searched or IRS-autofilled
  orgName: string;
  ein: string;
  state: string;
  zip: string;
  irsPrefilled: boolean;
  // Mission & program (step 4)
  mission: string;
  program: string;
  // Budget (step 5)
  annualBudget: string;
  projectedBudget: string;
  // Funding sources / focus areas (steps 6-7) — multi-select
  fundingSources: string[];
  focusAreas: string[];
  // Last details (step 8)
  additional: string;
  facebook: string;
  linkedin: string;
};

export type StepProps = {
  data: ExistingData;
  update: (patch: Partial<ExistingData>) => void;
};
