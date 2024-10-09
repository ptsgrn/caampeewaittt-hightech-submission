<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Input } from "$lib/components/ui/input";
  import * as Dialog from "$lib/components/ui/dialog";
  import {
    deleteDocument,
    getDocument,
    updateDocument,
  } from "$lib/functions/docs";
  import { toast } from "svelte-sonner";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Trash from "lucide-svelte/icons/trash";
  import Download from "lucide-svelte/icons/download";
    import { flyAndScale } from '$lib/utils';

  let topic = "";
  let writer = "";
  let content = "";
  let id = $page.params.id;

  if (Number.isNaN(+id)) goto(`/simple`);

  function onKeyDown(
    event: KeyboardEvent & {
      currentTarget: EventTarget & Window;
    },
  ) {
    if (event.key === "Escape") {
      goto(`/simple`);
    }
    // ctrl + s
    if (event.ctrlKey && event.key === "s") {
      saveDocument();
    }
  }

  async function saveDocument() {
    if (!topic || !writer || !content) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน", {
        dismissable: true,
      });
      return;
    }
    if (!id) return;
    if (Number.isNaN(+id)) {
      goto(`/simple`);
      return;
    }
    await updateDocument(+id, {
      title: topic,
      content,
      author: writer,
      updatedAt: new Date(),
    });
    toast.success("บันทึกเอกสารเรียบร้อยแล้ว", {
      dismissable: true,
    });
    await goto(`/simple`);
  }

  async function onDeleteDocument() {
    await deleteDocument(+id);
    toast.success("ลบเอกสารเรียบร้อยแล้ว", {
      dismissable: true,
    });
    await goto(`/simple`);
  }

  async function downloadDocument() {
    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic}_by_${writer || "Unknown"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }

  onMount(async () => {
    if (Number.isNaN(+id)) goto(`/simple`);
    const doc = await getDocument(+id);
    if (!doc) {
      toast.error("ไม่พบเอกสารที่คุณต้องการ");
      await goto(`/simple`);
    }
    topic = doc.title;
    writer = doc.author ?? "";
    content = doc.content ?? "";
  });
</script>

<svelte:head>
  <title>แก้ไข {topic}</title>
</svelte:head>

<svelte:window on:keydown={onKeyDown} />

<form
  class="max-w-lg border w-full h-full m-auto rounded-lg flex flex-col p-5 space-y-3"
  on:submit={saveDocument}
  transition:flyAndScale
>
  <div class="">
    <h1 class="text-2xl font-bold">แก้ไขเอกสาร {topic}</h1>
    <div class="my-2">
      <Button
        size="sm"
        variant="default"
        on:click={() => downloadDocument()}
        class="gap-2"
      >
        <Download class="size-4" />
        <span>ดาวน์โหลด</span>
      </Button>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button size="sm" variant="destructive" class="gap-2">
            <Trash class="size-4" />
            <span>ลบเอกสาร</span>
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>ต้องการลบหรือไม่</Dialog.Title>
            <Dialog.Description>
              การกระทำไม่สามารถยกเลิกได้ และจะไม่สามารถเข้าถึงเอกสารนี้ได้อีก
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer class="gap-2">
            <Button
              variant="destructive"
              on:click={() => onDeleteDocument()}
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
  </div>
  <Input placeholder="หัวข้อเอกสาร (Topic)" bind:value={topic} required />
  <Input placeholder="ผู้เขียน (Writer)" bind:value={writer} required />
  <Textarea
    class="w-full h-full bg-transparent border border-foreground/30s p-3 mt-3 rounded focus-visible:outline-none [field-sizing:_normal] min-h-80"
    placeholder="เนื้อหาเอกสาร (Content)"
    bind:value={content}
    required
  ></Textarea>
  <div class="flex flex-row gap-2">
    <Button variant="outline" class="w-full" href="/simple">
      <span>ยกเลิกและกลับ</span>
    </Button>
    <Button type="submit" variant="default" class="w-full">
      <span>บันทึกและกลับ</span>
    </Button>
  </div>
</form>
