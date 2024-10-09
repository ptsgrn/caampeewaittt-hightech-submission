<script lang="ts">
  import type { Document } from "$lib/types";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import Button from "$lib/components/ui/button/button.svelte";
  import CirclePlus from "lucide-svelte/icons/circle-plus";
  import { documentStore } from "$lib/stores";
  import { cn, flyAndScale } from "$lib/utils";
  import { createNewDocument } from "$lib/functions/docs";
  import { getQueryClientContext } from "@tanstack/svelte-query";
  export let items: Document[] = [];

  const queryClient = getQueryClientContext();
  async function addNewDocumentEntry() {
    const newDoc = await createNewDocument({
      title: "เอกสารใหม่",
      content: "เนื้อหาเอกสาร",
      author: "Unknown",
    });
    $documentStore = newDoc[0];
    queryClient.refetchQueries();
  }
</script>

<h2 class="px-3 font-bold">รายการเอกสาร</h2>

<Button
  variant="outline"
  class="flex-row gap-2 items-center align-middle border-2 rounded-sm border-dashed m-3"
  on:click={addNewDocumentEntry}
>
  <CirclePlus class="size-5" /> <span>สร้างเอกสารใหม่</span>
</Button>

<ScrollArea class="h-svh pl-3 pr-3" orientation="vertical">
  <div class="flex flex-col gap-3 mb-52" transition:flyAndScale>
    {#each items as item}
      <button
        class={cn(
          "hover:bg-accent flex flex-row border p-3 rounded space-y-1 justify-start text-left transition-all",
          $documentStore?.id === item.id && "bg-muted",
        )}
        on:click={() => ($documentStore = item)}
        transition:flyAndScale
      >
        <div class="w-full text-left">
          <span class="text-sm font-bold line-clamp-2">{item.title}</span>
          <span class="line-clamp-2 text-xs text-foreground/60"
            >{item.author}&nbsp;· {item.content}</span
          >
        </div>
      </button>
    {/each}
  </div>
</ScrollArea>
