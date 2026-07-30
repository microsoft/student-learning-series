# Episode 8 - Bring Your Own Model with Microsoft Foundry

**Phase 2 - Concepts**

In this episode, you connect GitHub Copilot to a model that you deploy in Microsoft
Foundry. The example uses an **Azure for Students** subscription and the Azure MCP
Server, so Copilot can help inspect and create Azure resources after you sign in.

This guide is written for students who are new to cloud AI. You do not need to know
how to train a model.

> [!IMPORTANT]
> Azure services can use paid credit. Check the estimated cost before approving a
> deployment, monitor usage, and delete resources when you finish.

## What you are building

Think of the pieces like this:

```text
Your prompt
    |
    v
GitHub Copilot app
    |
    | uses your provider settings
    v
Model deployment in Microsoft Foundry
    |
    v
Model response
```

- A **large language model (LLM)** reads text and produces text. It does not understand
  the world like a person does.
- **Microsoft Foundry** is the Azure service used here to find, deploy, and test a
  cloud model.
- A **deployment** is a named, usable copy of a model in your Azure resource.
- **Bring your own key (BYOK)** means Copilot uses credentials that you provide for an
  external model service.
- **Bring your own model (BYOM)** means you choose and manage the model deployment.
  This episode uses both: your Foundry deployment and its key.
- **Azure MCP Server** gives Copilot tools for working with Azure. It does not give
  Copilot unlimited permission: Azure still checks your account and roles.

## Before you begin

You need:

1. An eligible Azure for Students account.
2. A [GitHub Copilot app](https://docs.github.com/copilot/how-tos/github-copilot-app/getting-started)
   build that supports custom model providers.
3. [GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli)
   if you want to configure Azure MCP with `/mcp` or use the CLI provider fallback.
4. [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).
5. [Node.js](https://nodejs.org/) to run Azure MCP Server with `npx`.
6. Permission to create resources in the Azure for Students subscription.

The model you choose must support **streaming** and **tool calling**. A large context
window is also helpful for coding tasks. Availability, price, quota, and supported
APIs differ by model, subscription, and Azure region.

## 1. Set up Azure for Students

[Azure for Students](https://azure.microsoft.com/free/students/) provides eligible
higher-education students with USD 100 of Azure credit for 12 months and does not
require a credit card at signup. At the time this guide was written, you must:

- Be at least 18 years old.
- Be a full-time student at an accredited, degree-granting two-year or four-year
  institution.
- Verify your status with your institution's email address.

Microsoft's terms and eligibility can change. Read the
[current Azure for Students requirements](https://learn.microsoft.com/azure/education-hub/about-azure-for-students)
before signing up.

Signup and student verification happen in your browser. Copilot and Azure MCP cannot
accept the offer or prove your student status for you.

After signup, open the Azure portal and confirm that **Azure for Students** appears in
your subscriptions.

## 2. Sign in to Azure

Open PowerShell and run:

```powershell
az login
az account list --output table
az account set --subscription "Azure for Students"
az account show --output table
```

The final command should show the Azure for Students subscription you intend to use.
If it shows another subscription, stop and select the correct one before creating
anything.

## 3. Connect Azure MCP Server to Copilot

In the GitHub Copilot app, open **Settings > MCP Servers** and add a custom local
server with:

| Field | Value |
|---|---|
| Server name | `azure-mcp` |
| Command | `npx -y @azure/mcp@latest server start` |
| Environment variables | Leave blank to use Azure CLI authentication |
| Tools | `*` |

The exact form can change while the app is updated. See
[Customizing the GitHub Copilot app](https://docs.github.com/copilot/how-tos/github-copilot-app/customize-github-copilot-app)
for the current location of MCP settings.

You can also configure the server through GitHub Copilot CLI. MCP servers configured
for Copilot CLI are automatically available in the app. Start Copilot CLI:

```powershell
copilot
```

Inside Copilot, run:

```text
/mcp add
```

Use these settings in the `/mcp add` form:

| Field | Value |
|---|---|
| Server name | `azure-mcp` |
| Server type | `1` (Local) |
| Command | `npx -y @azure/mcp@latest server start` |
| Environment variables | Leave blank to use Azure CLI authentication |
| Tools | `*` |

Save the configuration, then verify it:

```text
/mcp show
```

You should see `azure-mcp` in the list. The usual configuration file is
`~/.copilot/mcp-config.json`.

The official walkthrough is
[Integrate Azure MCP Server with GitHub Copilot CLI](https://learn.microsoft.com/azure/developer/azure-mcp-server/how-to/github-copilot-cli).

## 4. Use the reviewed prompt path

Open [`PROMPTS.md`](PROMPTS.md) and use the prompts in order. They tell Copilot to:

1. Confirm the active subscription and permissions.
2. Check model availability, region support, quota, deployment type, and cost.
3. Propose one minimal resource plan.
4. Confirm the exact names and wait for your approval before creating resources.
5. Create and verify a Foundry resource, project, and compatible deployment.
6. Test each layer before connecting Copilot.

Read every proposed command and resource change before approving it. Azure MCP can
inspect Azure, list Foundry models, and test some existing deployments. Its
[current Foundry tools](https://learn.microsoft.com/azure/developer/azure-mcp-server/tools/azure-foundry)
do not create a Foundry project or model deployment. Use the Foundry portal or the
official Azure CLI commands for those steps, with Copilot explaining and running the
commands only after your approval.

### What the Azure setup should contain

Keep the first setup small:

```text
[RESOURCE_GROUP]
    |
    +-- [FOUNDRY_RESOURCE]
            +-- [FOUNDRY_PROJECT]
            |
            +-- [DEPLOYMENT_NAME]
```

Use placeholder values while planning. Choose real names only when you create the
resources. A resource group makes it easier to see and delete the episode's resources
together. The deployment belongs to the Foundry resource and can be used by its
project.

The current official quickstart is
[Set up Microsoft Foundry resources](https://learn.microsoft.com/azure/foundry/tutorials/quickstart-create-foundry-resources).

## 5. Choose and deploy a compatible model

Do not copy a model name from a video or this repository. Ask Azure for the models that
are currently available to your subscription in your chosen region.

Before deployment, confirm all of these:

- The model is not retired or blocked for new deployments.
- Your subscription has nonzero quota for the model and deployment type.
- The model supports streaming and tool calling.
- The deployment supports the API that your Copilot provider will call.
- The estimated usage fits within your remaining student credit.
- The billing type has no unexpected reservation, idle, or Marketplace charge.

For a short demo, prefer a usage-based Standard or Global Standard deployment when
available. Do not choose provisioned throughput or accept Marketplace terms unless you
understand and explicitly approve the billing.

In the Foundry portal, use **Discover > Models** to review a model card and deploy it.
After deployment, use **Build > Models** to confirm that its provisioning state is
`Succeeded`.

See
[Deploy Microsoft Foundry Models](https://learn.microsoft.com/azure/foundry/foundry-models/how-to/deploy-foundry-models)
for the current portal steps.

## 6. Test before connecting Copilot

Test one layer at a time:

1. **Deployment:** Its state is `Succeeded`.
2. **Foundry Playground:** A simple prompt returns a response.
3. **API:** The deployment responds through the API type Copilot will use.
4. **Copilot:** A new session returns a response and can call a simple tool.

This order matters. If the Playground fails, fix Azure first. If the Playground works
but Copilot fails, check the provider URL, deployment mapping, API support, and key.

## 7. Connect the deployment to the GitHub Copilot app

> [!CAUTION]
> Never paste an API key into chat, a prompt, a screenshot, source control, or a
> committed configuration file. If a key is exposed, rotate it immediately.

In the GitHub Copilot app, open **Settings > Model providers > Add provider** and select
**Microsoft Foundry**. Add it using values copied from the deployment's connection
details:

| Field | What to enter |
|---|---|
| Display name | A local label that does not need to match an Azure resource |
| Base URL | `[FOUNDRY_BASE_URL]`, not the browser's Playground URL |
| API key | A current key entered only in the secure provider field |
| Copilot model | A compatible model identifier offered by the app |
| Provider/deployment model | `[DEPLOYMENT_NAME]`, exactly as Azure shows it |
| API type, if shown | The API confirmed by the deployment test |

The model mapping is conceptually:

```text
[COPILOT_MODEL_ID] -> [DEPLOYMENT_NAME]
```

The deployment name is case-sensitive. Start a new Copilot session after saving the
provider. The app stores provider credentials in your operating system's credential
store and does not display them later.

The exact app fields can change because app BYOK support is in public preview. Check
[Using your own LLM models in the GitHub Copilot app](https://docs.github.com/copilot/how-tos/github-copilot-app/use-byok-models)
for current instructions. If your build does not show a Microsoft Foundry provider, use
the officially documented GitHub Copilot CLI provider configuration instead.

### Copilot CLI fallback

GitHub documents Azure OpenAI as a supported provider type. In the same PowerShell
window that will start Copilot, set temporary environment variables:

```powershell
$env:COPILOT_PROVIDER_TYPE = "azure"
$env:COPILOT_PROVIDER_BASE_URL = `
    "https://[RESOURCE_NAME].openai.azure.com/openai/deployments/[DEPLOYMENT_NAME]"
$env:COPILOT_MODEL = "[DEPLOYMENT_NAME]"

$secureKey = Read-Host "Azure API key" -AsSecureString
$keyPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureKey)
try {
    $env:COPILOT_PROVIDER_API_KEY = `
        [Runtime.InteropServices.Marshal]::PtrToStringBSTR($keyPointer)
    copilot
}
finally {
    Remove-Item Env:COPILOT_PROVIDER_API_KEY -ErrorAction SilentlyContinue
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($keyPointer)
}
```

This hides the key while you type it and removes the key environment variable when
Copilot closes. Do not use `setx` for the key, because that stores it persistently.
Use this `azure` provider format only when the deployment connection details give you
an Azure OpenAI endpoint.

Read
[Using your own LLM models in GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/use-byok-models)
for the current provider formats and model requirements.

## Troubleshooting

### HTTP 404: Not Found

A 404 usually means Copilot called the wrong path.

1. Do not use the Foundry Playground's browser URL as the base URL.
2. Copy the inference base URL from the deployment's connection details.
3. Check the deployment name exactly, including capitalization.
4. Check whether the provider expects the deployment in the URL, in the model mapping,
   or both.
5. Test the deployment directly before testing Copilot again.

### HTTP 400 or "operation is unsupported"

The deployment may work with one API but not the API selected by Copilot. For example,
a deployment can support chat completions but not responses.

Check the model card and test the required API directly. If it is unsupported, choose a
compatible deployment instead of repeatedly changing the key or URL.

### No deployable model

Three things must line up: current model version, supported region, and nonzero quota.
Ask Azure MCP to list all three before selecting a model. Trying random model names can
produce confusing retirement or quota errors.

### Quota or rate-limit error

Check the quota for that exact model, deployment type, and region. Reduce deployment
capacity or request quota if the subscription is eligible. Azure MCP cannot bypass a
quota limit.

### Authentication error

- Run `az account show` and confirm the intended subscription.
- Confirm your role allows resource and deployment operations.
- Rotate the model key and update the secure provider field.
- Do not confuse Azure CLI sign-in with model API-key authentication; they serve
  different purposes.

### Azure MCP cannot complete a step

MCP tools change over time and may not expose every Foundry operation. Ask Copilot to
show the official portal or Azure CLI fallback, then verify the result before
continuing. Do not install an unofficial server only to avoid one manual step.

## Protect your student credit

Azure for Students credit is limited. During the demo:

- Check the Azure cost analysis and remaining credit.
- Prefer usage-based Standard or Global Standard deployments for the test.
- Avoid provisioned-throughput commitments and unreviewed Marketplace terms.
- Use the smallest usage-based capacity that works.
- Avoid duplicate resources and deployments.
- Never assume an unused deployment is free.
- Delete test resources when the episode is complete.

Before deletion, ask Copilot to inventory the resource group and show exactly what will
be removed. Deleting a resource group is destructive and removes everything inside it.
After you approve, delete the episode's resource group and verify that the billable
resources are gone.

## Foundry Local: a short comparison

[Foundry Local](https://learn.microsoft.com/azure/foundry-local/what-is-foundry-local)
runs supported models on your own computer instead of using Azure-hosted inference.

| Azure-hosted Foundry | Foundry Local |
|---|---|
| Uses cloud quota and Azure credit | Uses your computer's memory and processor |
| Works without a powerful student laptop | Model choices depend on local hardware |
| Sends prompts to the configured Azure service | Can keep inference on the local machine |
| Requires an Azure deployment and credentials | Requires installation and a local model |

Foundry Local is useful for learning and privacy-sensitive experiments, but it is not
automatically free: your computer still supplies the hardware and electricity. Local
models must also support the features Copilot requires.

## What you can do after this episode

- Explain BYOK/BYOM without treating the model and Copilot as the same thing.
- Connect Azure MCP Server after signing in to Azure.
- Check model availability, quota, compatibility, and cost before deployment.
- Create and test a minimal Microsoft Foundry setup.
- Connect a compatible deployment to GitHub Copilot without exposing a key.
- Diagnose common endpoint, API, quota, and authentication problems.
- Delete resources when the learning exercise is complete.
