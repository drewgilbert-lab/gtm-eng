# The standard structure every workflow should have

For this role, each workflow should eventually be described using the same set of dimensions, regardless of category.

## A. Workflow objective (why this exists)

What business problem this workflow solves.

## B. Trigger / cadence (when it runs)

What causes this workflow to run:  
	•	event-based  
	•	time-based  
	•	request-based

## C. Inputs (what it consumes)

Data, artifacts, or signals required — not tasks.

## D. Processing & synthesis (what your org actually does)

Where AI, automation, and judgment apply.

## E. Outputs (what shows up on the other side)

Concrete, consumable artifacts.

## F. Primary consumers (who uses it)

Named teams or roles.

## G. Decisions it informs (but does not make)

Explicitly clarify boundaries.

## H. Quality & integrity checks

How you prevent garbage in / garbage out.

## I. Failure & feedback loop

What happens when signals contradict assumptions or performance is poor.

# Workflow Operating Model Example  

## Workflow: Surface segment-level performance signals across the full funnel

⸻

### A. Workflow objective

Provide a fact-based view of how different segments perform across the entire GTM funnel, from initial engagement through closed-won (and optionally expansion), so strategy owners can make informed prioritization decisions.

This workflow exists to answer:  
	•	Which segments convert — and where they break down  
	•	Which segments look good early but fail late  
	•	Which segments deserve further investment or experimentation

⸻

### B. Trigger / cadence

This workflow should be cadence-based, not ad-hoc.

Recommended cadence:  
	•	Monthly standard output  
	•	Quarterly deep-dive version  
	•	On-demand refresh only for predefined leadership reviews

Important:  
This is not a “pull whenever someone asks” workflow.

⸻

### C. Inputs

Primary inputs (owned by systems, not people):  
	•	Lead and contact data (source, persona, segment)  
	•	Opportunity lifecycle data (stage progression, time in stage)  
	•	Closed-won / closed-lost outcomes  
	•	Revenue and deal size  
	•	Attribution or influence markers (as available)  
	•	SDR / Sales activity metadata (high-level only)

Optional enrichment inputs:  
	•	Account firmographics  
	•	Product usage signals (if available)  
	•	Campaign association data

⸻

### D. Processing & synthesis 

This is where your org adds value.

Activities include:  
	•	Normalize segment definitions across systems  
	•	Align lifecycle stages across Marketing and Sales  
	•	Aggregate funnel performance by segment  
	•	Calculate conversion rates at each stage  
	•	Identify drop-off points and bottlenecks  
	•	Detect statistically meaningful differences  
	•	Use AI to surface patterns, not conclusions  
	•	Generate comparative summaries (e.g., Segment A vs B)

Key rule:  
You surface signals and contrasts, not recommendations.

⸻

### E. Outputs

Outputs must be standardized and reusable, not custom decks.

Examples:  
	•	Segment performance scorecards  
	•	Funnel heatmaps by segment  
	•	Trend deltas over time  
	•	Short AI-generated insight summaries  
	•	Flags for anomalies or sudden shifts

These outputs should be:  
	•	easily consumable  
	•	versioned  
	•	comparable over time

⸻

### F. Primary consumers

	•	Demand leadership  
	•	PMM  
	•	Sales leadership  
	•	RevOps  
	•	Executive leadership (summary layer)

Secondary consumers:  
	•	Content  
	•	Enablement

⸻

### G. Decisions it informs

This workflow informs, but does not decide:  
	•	Segment prioritization  
	•	Budget allocation  
	•	Messaging focus  
	•	Territory strategy

Those decisions remain with strategy owners.

Your output answers:

“Here’s what’s happening.”

Not:

“Here’s what we should do.”

⸻

### H. Quality & integrity checks

This workflow must enforce:  
	•	Consistent segment definitions  
	•	Data completeness thresholds  
	•	Minimum sample sizes  
	•	Clear caveats when data is directional  
	•	Alignment with RevOps definitions

If quality thresholds are not met:  
	•	the output is flagged  
	•	conclusions are explicitly constrained

This protects credibility.

⸻

### I. Failure & feedback loop

This is where it connects to other workflows.

If performance is poor:  
	•	This workflow feeds post-mortem workflows  
	•	Signals are compared against:  
	•	persona assumptions  
	•	use-case narratives  
	•	messaging hypotheses

If performance is strong:  
	•	Signals feed experimentation workflows  
	•	Inputs are reused to test scale assumptions

Either way, learning compounds.  
