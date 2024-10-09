<script lang="ts">
  import Trash from "lucide-svelte/icons/trash";
  import Save from "lucide-svelte/icons/save";
  import Download from "lucide-svelte/icons/download";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { Separator } from "$lib/components/ui/separator";
  import {
    deleteDocument,
    getDocuments,
    updateDocument,
  } from "$lib/functions/docs";
  import { documentStore, tempDocumentStore } from "$lib/stores";
  import { getQueryClientContext } from "@tanstack/svelte-query";

  const queryClient = getQueryClientContext();

  async function deleteCurrentDocument() {
    if (!$documentStore) return;
    await deleteDocument($documentStore.id);
    const remainingDocs = await getDocuments();
    if (remainingDocs.length > 0) {
      $documentStore = remainingDocs[0];
    } else {
      $documentStore = {
        id: 0,
        title: "",
        content: "",
        author: "",
        createdAt: new Date(),
        updatedAt: null,
      };
    }
    await queryClient.refetchQueries({
      queryKey: ["documents"],
    });
  }

  async function saveCurrentDocument() {
    if ($documentStore.id == 0) return;
    $documentStore = {
      ...$documentStore,
      title: $tempDocumentStore.title,
      content: $tempDocumentStore.content,
      author: $tempDocumentStore.author,
      updatedAt: new Date(),
    };
    await updateDocument($documentStore.id, {
      createdAt: $documentStore.createdAt,
      updatedAt: new Date(),
      title: $documentStore.title,
      author: $documentStore.author,
      content: $documentStore.content,
    });
    await queryClient.refetchQueries({
      queryKey: ["documents"],
    });
  }

  async function downloadCurrentDocument() {
    const blob = new Blob([$documentStore.content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${$documentStore.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="h-16 flex flex-row p-2 align-middle justify-end items-center gap-1">
  <Tooltip.Root>
    <Tooltip.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="ghost"
        size="icon"
        on:click={downloadCurrentDocument}
        disabled={$documentStore.id === 0}
      >
        <Download />
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>ดาวน์โหลดเอกสารนี้</p>
    </Tooltip.Content>
  </Tooltip.Root>
  <Separator orientation="vertical" />
  <Tooltip.Root>
    <Tooltip.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="ghost"
        size="icon"
        on:click={deleteCurrentDocument}
        disabled={$documentStore.id === 0}
      >
        <Trash />
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>ลบเอกสารนี้</p>
    </Tooltip.Content>
  </Tooltip.Root>

  <Tooltip.Root>
    <Tooltip.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="default"
        size="default"
        class="gap-2"
        on:click={saveCurrentDocument}
        disabled={$documentStore.id === 0}
      >
        <Save />
        <span>บันทึก</span>
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>บันทึกการแก้ไข</p>
    </Tooltip.Content>
  </Tooltip.Root>
</div>
