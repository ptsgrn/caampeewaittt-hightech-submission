<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Input } from "$lib/components/ui/input";
  import { createNewDocument } from "$lib/functions/docs";
  import { toast } from "svelte-sonner";
  import { currentUser } from "$lib/stores";
  import { flyAndScale } from "$lib/utils";

  let topic = "";
  let writer = $currentUser?.name;
  let content = "";

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
      saveDocument(undefined);
    }
  }

  async function saveDocument(
    event:
      | (SubmitEvent & {
          currentTarget: EventTarget & HTMLFormElement;
        })
      | undefined,
  ) {
    await createNewDocument({
      title: topic,
      author: writer || "Unknown",
      content,
    });
    toast.success("บันทึกเอกสารเรียบร้อยแล้ว", {
      dismissable: true,
    });
    if (event?.submitter?.dataset.isaddanother === "true") {
      topic = "";
      content = "";
    } else {
      await goto(`/simple`);
    }
  }
</script>

<svelte:head>
  <title>เพิ่มเอกสารใหม่</title>
</svelte:head>

<svelte:window on:keydown={onKeyDown} />

<form
  class="max-w-lg border w-full h-full m-auto rounded-lg flex flex-col p-5 space-y-3"
  on:submit|preventDefault={saveDocument}
  transition:flyAndScale
>
  <h1 class="text-2xl font-bold">เพิ่มเอกสารใหม่</h1>
  <Input placeholder="หัวข้อเอกสาร (Topic)" bind:value={topic} required />
  <Input placeholder="ผู้เขียน (Writer)" bind:value={writer} required />
  <Textarea
    class="w-full h-full bg-transparent border border-foreground/30s p-3 mt-3 rounded focus-visible:outline-none [field-sizing:_normal] min-h-80"
    placeholder="เนื้อหาเอกสาร (Content)"
    bind:value={content}
    required
  ></Textarea>
  <div class="flex flex-col sm:flex-row gap-2">
    <Button variant="outline" class="w-full" href="/simple">
      <span>ยกเลิกและกลับ</span>
    </Button>
    <Button type="submit" variant="secondary" class="w-full">
      <span>บันทึกและกลับ</span>
    </Button>
    <Button
      type="submit"
      variant="default"
      class="w-full"
      data-isaddanother="true"
    >
      <span>บันทึกและเพิ่มอีก</span>
    </Button>
  </div>
</form>
