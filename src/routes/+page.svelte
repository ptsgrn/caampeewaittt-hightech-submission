<script lang="ts">
  import { login } from "$lib/functions/auth";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { flyAndScale } from "$lib/utils";
  import { onMount } from "svelte";
  import { initDatabase } from "$lib/functions/database";

  onMount(initDatabase);
</script>

<svelte:head>
  <title>Welcome to magical scroll คัมภีเวทเฮ้วเป้อร์</title>
</svelte:head>

<div class="min-h-svh flex flex-col p-5" in:flyAndScale>
  <Card.Root class="w-full max-w-96 min-w-56 m-auto">
    <Card.Header>
      <Card.Title>📜 Magic Scroll (Modernized)</Card.Title>
      <Card.Description>
        ส่วนหนึ่งของ High-tech interview submission
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <h2 class="font-bold">อย่าลืมเซฟข้อมูลที่เขียนไว้ที่อื่นด้วย!</h2>
      <p>
        เว็บนี้ใช้ IndexedDB ในการเก็บข้อมูล และข้อมูลจะหายไปเมื่อ Clear Site
        Data หรือ Clear Browsing Data
      </p>
      <hr class="m-2" />
      <h2 class="font-bold">พอดีผมทำไว้ 2 เวอร์ชัน</h2>
      <p>ดูเวอร์ชันปกติก่อนได้เลยครับ</p>
    </Card.Content>
    <Card.Footer class="flex justify-end flex-col gap-2 w-full">
      <Button on:click={login} href="/simple"
        >Simple เวอร์ชันเหมือนในบรีฟ</Button
      >
      <Button variant="secondary" on:click={login} href="/docs"
        >เวอร์ชันปรับจากบรีฟนิดหน่อย</Button
      >
    </Card.Footer>
  </Card.Root>
</div>
