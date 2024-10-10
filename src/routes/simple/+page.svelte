<script lang="ts">
  import { currentUser } from "$lib/stores";
  import * as Avatar from "$lib/components/ui/avatar";
  import CirclePlus from "lucide-svelte/icons/circle-plus";
  import Trash from "lucide-svelte/icons/trash";
  import Download from "lucide-svelte/icons/download";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { getDocument, getDocuments } from "$lib/functions/docs";
  import { deleteDocument } from "$lib/functions/docs";
  import { toast } from "svelte-sonner";
  import { flyAndScale } from "$lib/utils";
  import * as Dialog from "$lib/components/ui/dialog";

  let documents: Promise<
    {
      title: string;
      id: number;
      author: string | null;
      content: string;
      createdAt: Date;
      updatedAt: Date | null;
    }[]
  > = getDocuments();

  async function onDeleteDocument(id: number) {
    await deleteDocument(id);
    await refetchDocuments();
    toast.success("ลบเอกสารเรียบร้อยแล้ว", {
      dismissable: true,
    });
  }

  async function refetchDocuments() {
    documents = getDocuments();
  }

  async function downloadDocument(id: number) {
    const doc = await getDocument(id);
    if (!doc) return;
    const blob = new Blob([doc.content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.title}_by_${doc.author || "Unknown"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }
</script>

<svelte:head>
  <title>Simple mode ตามดีไซน์ที่คิดว่าใช่</title>
</svelte:head>

<main
  class="container border h-full mx-auto rounded-lg flex flex-col p-5 space-y-5"
  transition:flyAndScale
>
  <a
    class="flex flex-col justify-center items-center hover:bg-muted p-3 rounded-sm transition-all"
    title="กลับสู่หน้าหลัก"
    href="/"
  >
    <span class="text-2xl mb-3">ยินดีต้อนรับ</span>
    <Avatar.Root class="h-20 w-20">
      <Avatar.Image src={$currentUser?.imageUrl} alt={$currentUser?.name} />
      <Avatar.Fallback>{$currentUser?.name}</Avatar.Fallback>
    </Avatar.Root>
    <span class="font-semibold">{$currentUser?.name}</span>
    <span class="font-mono text-xs">{$currentUser?.role}</span>
  </a>
  <h2 class="text-center my-2 font-bold">รายการเอกสาร</h2>
  <div class="flex flex-col space-y-3 h-full overflow-auto">
    {#await documents}
      <span class="text-center"> กำลังโหลด... </span>
    {:then docs}
      {#each docs as doc}
        <div
          class="flex felx-row w-full hover:gap-1 focus-within:gap-1 group transition-all overflow-hidden p-1"
          transition:flyAndScale
        >
          <Tooltip.Root>
            <Tooltip.Trigger asChild let:builder>
              <Button
                builders={[builder]}
                variant="outline"
                class="text-left justify-start flex flex-row gap-2 w-full overflow-hidden select-none"
                href="/simple/{doc.id}"
              >
                <span class="text-sm shrink-0">{doc.title}</span>
                <span
                  class="line-clamp-1 text-xs text-foreground/60 font-bold shrink-0"
                  >{doc.author}</span
                >
                <span
                  class="text-ellipsis w-full text-xs text-foreground/60 font-mono"
                  >{doc.content}</span
                >
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>ไปที่หน้าแก้ไข</p>
            </Tooltip.Content>
          </Tooltip.Root>
          <Tooltip.Root>
            <Tooltip.Trigger asChild let:builder>
              <Button
                builders={[builder]}
                size="icon"
                variant="default"
                class="max-w-0 shrink-0 group-hover:max-w-10 group-active:max-w-10 group-focus-within:max-w-10 group-focus:max-w-10 transition-all aspect-square"
                on:click={() => downloadDocument(doc.id)}
              >
                <Download class="size-4" />
                <span class="sr-only">ดาวน์โหลด</span>
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <p>ดาวโหลด</p>
            </Tooltip.Content>
          </Tooltip.Root>
          <Dialog.Root>
            <Dialog.Trigger>
              <Tooltip.Root>
                <Tooltip.Trigger asChild let:builder>
                  <Button
                    builders={[builder]}
                    size="icon"
                    variant="destructive"
                    class="max-w-0 shrink-0 group-hover:max-w-10 group-active:max-w-10 group-focus-within:max-w-10 group-focus:max-w-10 transition-all aspect-square"
                  >
                    <Trash class="size-4" />
                    <span class="sr-only">ลบเอกสารนี้</span>
                  </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>ลบเอกสารนี้</p>
                </Tooltip.Content>
              </Tooltip.Root>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>ต้องการลบหรือไม่</Dialog.Title>
                <Dialog.Description>
                  การกระทำไม่สามารถยกเลิกได้
                  และจะไม่สามารถเข้าถึงเอกสารนี้ได้อีก
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Footer class="gap-2">
                <Button
                  variant="destructive"
                  on:click={() => onDeleteDocument(doc.id)}
                  class="w-full"
                >
                  <span>ลบเอกสาร</span>
                </Button>
                <Dialog.Close let:builder class="contents">
                  <Button variant="outline" class="w-full" builders={[builder]}>
                    <span>ยกเลิก</span>
                  </Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      {/each}
    {/await}
    <Button
      variant="outline"
      class="flex flex-row gap-2 items-center align-middle border-2 rounded-sm border-dashed sticky bottom-0"
      href="/simple/_new"
    >
      <CirclePlus class="size-5" />
      <span>สร้างเอกสารใหม่</span>
    </Button>
  </div>
</main>
