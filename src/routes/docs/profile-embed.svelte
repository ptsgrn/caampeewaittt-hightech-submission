<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import { currentUser } from "$lib/stores";
</script>

<a
  class="flex flex-row space-x-2 p-3 h-16 align-middle hover:bg-muted rounded-tl-md"
  href="/"
>
  <Avatar.Root>
    <Avatar.Image src={$currentUser?.imageUrl} alt={$currentUser?.name} />
    <Avatar.Fallback>{$currentUser?.name}</Avatar.Fallback>
  </Avatar.Root>
  <div class="flex flex-col">
    <span class="text-sm">{$currentUser?.name}</span>
    <span class="text-xs text-foreground/60 font-mono"
      >{$currentUser?.role}</span
    >
  </div>
</a>
