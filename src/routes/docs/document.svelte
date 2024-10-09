<script lang="ts">
  import { documentStore, tempDocumentStore } from "$lib/stores";

  let tempDocTitle = "";
  let tempWriter = "";
  let tempDocContent = "";

  documentStore.subscribe((value) => {
    tempDocTitle = value.title;
    tempDocContent = value.content;
    tempWriter = value.author || "";
  });

  $: $tempDocumentStore = {
    ...$documentStore,
    title: tempDocTitle,
    author: tempWriter,
    content: tempDocContent,
  };
</script>

{#if $documentStore.id !== 0}
  <div class="p-5 h-full overflow-auto">
    <h1 class="my-3">
      <input
        type="text"
        bind:value={tempDocTitle}
        class="bg-transparent w-full border-b pb-1 font-bold focus-visible:outline-none text-3xl"
      />
    </h1>
    <div class="flex gap-2 flex-row">
      <span class="text-nowrap">ผู้เขียน: </span>
      <input
        type="text"
        bind:value={tempWriter}
        class="bg-transparent border-b pb-1 focus-visible:outline-none w-full"
      />
    </div>
    <div class="flex flex-row text-xs text-foreground/60 space-x-2 py-2">
      <span
        >สร้างเมื่อ {$documentStore?.createdAt.toLocaleString("th-TH", {
          dateStyle: "medium",
          timeStyle: "medium",
        })} น.</span
      >
      {#if $documentStore?.updatedAt && $documentStore?.updatedAt instanceof Date}
        <span>
          อัปเดตล่าสุดเมื่อ {$documentStore.updatedAt.toLocaleString("th-TH", {
            dateStyle: "medium",
            timeStyle: "medium",
          })} น.
        </span>
      {/if}
    </div>
    <textarea
      class="w-full max-h-screen bg-transparent border border-foreground/30s p-3 mt-3 rounded focus-visible:outline-none [field-sizing:_normal] min-h-80"
      bind:value={tempDocContent}
    ></textarea>
  </div>
{:else}
  <div
    class="flex flex-col h-1/2 w-full align-middle text-center justify-center gap-2"
  >
    <h1 class="text-2xl font-bold">ยินดีต้อนรับ!</h1>
    <span> เลือกเอกสาร หรือ สร้างเอกสารใหม่จากแถบด้านข้าง </span>
  </div>
{/if}
