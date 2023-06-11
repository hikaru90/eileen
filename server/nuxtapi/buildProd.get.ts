import fs from "fs";
import path from "path";
import PocketBase from "pocketbase";
const pb = new PocketBase("http://dimplegoertz.de");
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const headerConfig = {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + config.GITHUB_ACTIONS_TOKEN,
      },
    };
    const workflows: object = await $fetch("https://api.github.com/repos/hikaru90/dimple/actions/runs", headerConfig);
    const id = workflows.workflow_runs.find((run) => run.name === 'Rebuild Prod').id
    
    const res = await $fetch("https://api.github.com/repos/hikaru90/dimple/actions/runs/" + id + "/rerun", { 
      method: "POST",
      headers: headerConfig.headers,
    })

    return res;
  } catch (err) {
    console.log("error building prod through github actions api", err);
  }
});
