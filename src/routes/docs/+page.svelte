<script lang="ts">
  import { currentUser } from "$lib/stores";
  import { goto } from "$app/navigation";
  import * as Resizable from "$lib/components/ui/resizable";
  import { getDocuments } from "$lib/functions/docs";
  import DocsList from "./docs-list.svelte";
  import Document from "./document.svelte";
  import ProfileEmbed from "./profile-embed.svelte";
  import DocumentTools from "./document-tools.svelte";
  import { createQuery } from "@tanstack/svelte-query";
  import { flyAndScale } from "$lib/utils";

  $: if (!$currentUser) {
    goto("/");
  }

  const documentQuery = createQuery({
    queryKey: ["documents"],
    queryFn: () => getDocuments(),
    refetchInterval: 10000,
  });
</script>

<svelte:head>
  <title>Documents</title>
</svelte:head>

<div class="w-full p-5 h-svh overflow-hidden" transition:flyAndScale>
  <Resizable.PaneGroup
    direction="horizontal"
    class="w-full h-full rounded-lg border"
  >
    <Resizable.Pane defaultSize={25}>
      <div class="flex flex-col space-y-3">
        <ProfileEmbed />
        <hr class="!m-0 p-0" />
        {#if $documentQuery.isSuccess}
          <DocsList items={$documentQuery.data} />
        {/if}
        {#if $documentQuery.isError}
          <div class="text-center">Failed to fetch documents</div>
        {/if}
        {#if $documentQuery.isLoading}
          <div class="text-center" out:flyAndScale>กำลังโหลด...</div>
        {/if}
      </div>
    </Resizable.Pane>
    <Resizable.Handle withHandle />
    <Resizable.Pane>
      <DocumentTools />
      <hr />
      <Document />
    </Resizable.Pane>
  </Resizable.PaneGroup>
</div>
