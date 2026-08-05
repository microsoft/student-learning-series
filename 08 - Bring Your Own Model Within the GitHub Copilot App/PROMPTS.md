# Episode 8 prompt path

These prompts turn the useful parts of several Microsoft Foundry setup and testing
sessions into one safer path. Replace values in square brackets only when Copilot asks
you to approve a plan.

Do not put API keys, tenant IDs, subscription IDs, portal URLs, or real endpoint values
in a prompt.

## How to use this file

1. Complete Azure for Students signup and verification in your browser.
2. Sign in with Azure CLI.
3. Connect the official Azure MCP Server.
4. Use the prompts below in order.
5. Read each proposed action before approving it.
6. Stop when a check fails; do not continue and hope a later step fixes it.

## 1. Verify Azure sign-in and Azure MCP

```text
Use the official Azure MCP tools to verify my Azure sign-in. List the subscriptions
available to me, confirm that Azure for Students is selected, and show only the names,
states, and my relevant roles. Do not create, update, or delete anything.
```

**Expected result:** Azure for Students is active and selected.

**Stop if:** The subscription is disabled, missing, or not the intended subscription.

## 2. Inventory existing resources

```text
Using Azure MCP, inventory the resource groups and Microsoft Foundry resources in my
Azure for Students subscription. Summarize what each resource is for and whether it can
create ongoing cost. Do not reveal keys, full resource IDs, tenant IDs, or endpoint
hosts. Do not change anything.
```

**Expected result:** You know whether a Foundry setup already exists.

**Stop if:** Copilot proposes creating duplicates before checking the existing setup.

## 3. Check permissions

```text
Check whether my current Azure account has the minimum permissions needed to create a
resource group, a Microsoft Foundry resource and project, and a model deployment in the
Azure for Students subscription. Explain missing permissions in simple language. Do not
make role assignments or change resources.
```

**Expected result:** Your account can create the required resources.

**Stop if:** A school policy or missing Azure role blocks creation.

## 4. Find a usable region and model

```text
Using Azure MCP where its current tools support the check, and the official Foundry
portal or Azure CLI for quota and deployment details that MCP cannot provide, compare
supported Azure regions and currently available Microsoft Foundry chat models for my
Azure for Students subscription. Recommend a low-cost region and model for a short
GitHub Copilot learning demo. The model must:

- accept new deployments,
- have nonzero quota in that region,
- support streaming and tool calling,
- support the API needed by the GitHub Copilot model provider,
- use a usage-based deployment without a provisioned-throughput commitment,
- and fit a small student-credit experiment.

Show current quota, billing units, deployment type, API support, possible idle charges,
and any Marketplace terms. Link to the official model or quota documentation. Prefer
Standard or Global Standard when available. Do not deploy anything yet.
```

**Expected result:** One current, compatible model/region pair is recommended from live
Azure data.

**Stop if:** The answer relies only on a remembered model name or does not check quota
and API support.

## 5. Propose one minimal setup

```text
Plan the smallest Microsoft Foundry setup for this demo in my Azure for Students
subscription. Use placeholders for the resource group, Foundry resource, project, and
deployment names. Explain what each resource does, the selected region, estimated cost,
billing unit, possible idle charges, Marketplace terms, and the exact portal or Azure
CLI actions you would take.

Create one resource group, one Foundry resource, one project, and one deployment only.
Do not use provisioned throughput or accept Marketplace terms unless I explicitly
approve them.
Do not make changes until I approve the complete plan.
```

**Expected result:** A simple plan with no duplicate Foundry accounts.

**Stop if:** The plan creates extra resources without explaining why.

## 6. Confirm exact names and billing

```text
Replace the plan placeholders with these names that I choose:

- [RESOURCE_GROUP]
- [FOUNDRY_RESOURCE]
- [FOUNDRY_PROJECT]
- [DEPLOYMENT_NAME]

Check whether each name is valid and available, then show one final table containing the
exact names, subscription name, region, model name and version, deployment type,
capacity, billing unit, estimated test cost, possible idle charges, and Marketplace
terms.

Do not create anything. Wait for me to explicitly approve this exact table.
```

**Expected result:** Every real name and billing choice is visible before a write.

**Stop if:** Copilot changes a name, region, model, deployment type, or capacity after
approval without asking again.

## 7. Create the approved Foundry resources

Use this only after reviewing the proposed names, region, and cost.

```text
Create the approved minimal Microsoft Foundry setup with the official Foundry portal or
Azure CLI commands. Before each write operation, state what will change. After creation,
verify the provisioning state of the resource and project.

Use Azure MCP for supported inventory checks, but do not claim it can create the project
or deployment if its current tool list cannot. Do not silently create substitute
resources, duplicate accounts, role assignments, or extra projects.
```

**Expected result:** The resource and project both report `Succeeded`.

**Stop if:** Azure reports a policy, identity, region, or permission error. Diagnose the
error before retrying in another region or creating another resource.

## 8. Recheck the selected model before deployment

```text
Now that the Foundry resource exists, recheck the selected model against this exact
resource, region, and subscription. Confirm that the version accepts new deployments,
quota is nonzero, the deployment type is allowed, and the required inference API is
supported. Show the smallest reasonable capacity for a short test. Do not deploy yet.

If the model, model version, deployment type, capacity, or billing differs from the
approved table, return to step 6 and wait for my approval of a new table.
```

**Expected result:** The recommendation still works in the resource that was created.

**Stop if:** The model is retired, has zero quota, or lacks the required API.

## 9. Deploy and verify the model

```text
Using the official Foundry portal or Azure CLI, deploy the approved compatible model to
the existing Foundry resource with the exact approved deployment name, deployment type,
and usage-based capacity. Make it available to the existing project. Do not create a new
Foundry resource or project.

Wait for provisioning to finish, then report the deployment state, model version,
deployment type, capacity, supported inference APIs, and quota remaining. Do not print
keys, endpoint hosts, tenant IDs, subscription IDs, or full resource IDs.
```

**Expected result:** The deployment state is `Succeeded`.

**Stop if:** Provisioning fails or Azure says the model is unsupported or over quota.

## 10. Test in Foundry Playground

```text
Open or guide me to the Foundry Playground for the new deployment. Use this harmless
test prompt:

"Explain the difference between a cloud model and a local model in three short
sentences for a student."

Confirm that the deployment returns a response. Do not display or copy an API key.
```

**Expected result:** The Playground returns a sensible response.

**Stop if:** The Playground fails; the Copilot provider cannot fix an Azure deployment
problem.

## 11. Verify the inference API

```text
Determine which inference API the GitHub Copilot provider will use for this model
mapping. Test the deployed model directly with that API using a harmless prompt,
streaming, and a basic tool definition.

If a key is needed, open a local PowerShell terminal and first show me the complete
test command for review. The command must read the key with `Read-Host -AsSecureString`,
keep it only in the current process, remove it immediately after the request, and zero
any unmanaged copy. Never ask me to paste it into chat, agent logs, command arguments,
or a repository file.

Report only pass or fail, the HTTP status, and a sanitized explanation. Do not print the
key or the real endpoint.
```

**Expected result:** The deployment supports the same API and features Copilot will use.

**Stop if:** The deployment supports a different API only. Choose another compatible
model instead.

## 12. Prepare the Copilot provider values

```text
Using the verified deployment, show me how to configure the Microsoft Foundry model
provider in the GitHub Copilot app. Use these placeholders:

- [FOUNDRY_BASE_URL]
- [DEPLOYMENT_NAME]
- [COPILOT_MODEL_ID]
- [API_TYPE]

Explain where I should copy each real value from in Microsoft Foundry. Make clear that
the Playground browser URL is not the provider base URL and that the deployment name
must match exactly. Never ask me to paste the API key into chat.
```

**Expected result:** You know which provider field receives each value.

**Stop if:** The suggested base URL is a browser/Playground page rather than an
inference endpoint.

## 13. Connect and test Copilot

After entering the API key in the app's secure provider field, start a new Copilot
session and use:

```text
Tell me which configured model provider and model mapping this session is using, without
showing credentials or full endpoint values. Then answer: "What is one safe way for a
student to avoid unexpected Azure charges?"
```

Then test tool calling:

```text
List the Markdown files in the current repository without changing any files. Explain
which tool you used.
```

**Expected result:** The configured deployment answers and can call a simple tool.

**Stop if:** Copilot reports a provider error or cannot stream/use tools.

## 14. Diagnose a 404 safely

```text
My GitHub Copilot model provider receives HTTP 404 from a Microsoft Foundry deployment.
Diagnose it without requesting or displaying secrets. Compare:

- the inference base URL versus the Playground browser URL,
- the exact Azure deployment name versus the Copilot model mapping,
- whether the deployment belongs in the URL, the mapping, or both,
- and the API path expected by this provider.

Test the deployment directly only after asking me to enter the key privately. Return
sanitized findings and the smallest configuration change to try.
```

## 15. Diagnose an unsupported-operation error

```text
The deployment works in Foundry Playground, but GitHub Copilot reports HTTP 400 or
"operation is unsupported." Check which inference API the Playground used and which API
Copilot used. Also test streaming and tool calling.

Do not change the deployment until you identify the mismatch. If the required API is
unsupported, recommend a currently available compatible model rather than guessing at
URL changes.
```

## 16. Diagnose quota or rate limits

```text
Check the current quota, assigned capacity, and usage for this deployment's exact model,
deployment type, and region. Explain whether the problem is deployment capacity,
subscription quota, or request rate. Recommend the smallest safe change.

Do not request the highest possible capacity, create another deployment, or claim Azure
MCP can bypass a quota limit.
```

## 17. Check cost and remaining credit

```text
Using Azure MCP, show a sanitized cost and usage summary for the resource group used in
this episode and the remaining Azure for Students credit if available. Identify
resources that can continue to generate cost. Do not change or delete anything.
```

## 18. Clean up

Use this only when you are finished.

```text
Inventory the episode's resource group and list everything that deletion would remove,
including deployments and dependent resources. Explain that deleting a resource group
is irreversible. Show any resources outside the group that would remain.

Wait for my explicit approval before deleting anything. After approval, delete only the
episode resource group, then verify that its billable resources are gone. Do not purge
soft-deleted resources unless I separately request and approve that action.
```

## Source journey

The prompts above were cleaned and combined from these prior learning stages. No
internal session IDs, local paths, credentials, endpoints, or real Azure resource names
are included.

| Date (2026) | Session topic | Lesson carried into this path |
|---|---|---|
| July 17 | Foundry Local and Copilot compatibility | Check hardware and required model features before choosing local inference. |
| July 20-21 | Failed local connection diagnosis | Test one layer at a time and inspect logs before changing configuration. |
| July 21 | Copilot provider configuration | Provider URL, model mapping, and API compatibility are separate checks. |
| July 22 | Foundry Local installation and hardware questions | Local and cloud models have different limits and costs. |
| July 23 | Azure for Students and Foundry research | Signup is manual; Azure MCP starts helping after authentication. |
| July 23 | Minimal Foundry resource attempts | Plan one resource set and stop on policy, identity, region, or quota errors. |
| July 24 | Quota and model deployment testing | A model needs a current version, supported region, quota, and the right API. |
| July 24 | Azure cleanup and fresh setup | Inventory before destructive actions and verify cleanup afterward. |
| July 24 | Fresh Foundry deployment | Recheck live availability and verify provisioning before connection work. |
| July 24 | Copilot 404 diagnosis | A Playground URL is not an inference base URL; names and paths must match. |
| July 24 | Direct API and Copilot tests | Playground success alone does not prove Copilot API compatibility. |
